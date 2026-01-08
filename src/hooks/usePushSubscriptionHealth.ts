import { useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { subscribeToPushNotifications, checkPushSubscription } from "@/lib/pushNotifications";

const CHECK_INTERVAL_MS = 60 * 60 * 1000; // Check every hour
const LAST_CHECK_KEY = "push-subscription-last-check";

export function usePushSubscriptionHealth(userId: string | undefined) {
  const validateAndResubscribe = useCallback(async () => {
    if (!userId) return;
    if (!("PushManager" in window) || !("serviceWorker" in navigator)) return;

    try {
      // Check browser subscription
      const hasLocalSubscription = await checkPushSubscription();
      
      if (!hasLocalSubscription) {
        console.log("[PushHealth] No local subscription, checking if user had one before...");
        
        // Check if user has a subscription in database
        const { data: dbSubs } = await supabase
          .from("push_subscriptions")
          .select("id")
          .eq("user_id", userId)
          .limit(1);
        
        if (dbSubs && dbSubs.length > 0) {
          console.log("[PushHealth] User had subscription in DB but not locally, prompting resubscribe...");
          // Don't auto-resubscribe without user action - just log for now
          // Could trigger a UI prompt here
        }
        return;
      }

      // Validate subscription in database
      const registration = await navigator.serviceWorker.getRegistration("/");
      if (!registration) return;

      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) return;

      const { data: dbSub, error } = await supabase
        .from("push_subscriptions")
        .select("id, endpoint")
        .eq("user_id", userId)
        .eq("endpoint", subscription.endpoint)
        .single();

      if (error || !dbSub) {
        console.log("[PushHealth] Local subscription not in DB, resubscribing...");
        await subscribeToPushNotifications(userId);
      } else {
        console.log("[PushHealth] Subscription is healthy");
      }

      // Update last check timestamp
      try {
        localStorage.setItem(LAST_CHECK_KEY, Date.now().toString());
      } catch {
        // localStorage not available
      }
    } catch (error) {
      console.error("[PushHealth] Error checking subscription:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    try {
      // Check if we should run a health check
      let lastCheck: string | null = null;
      try {
        lastCheck = localStorage.getItem(LAST_CHECK_KEY);
      } catch {
        // localStorage not available
      }
      const shouldCheck = !lastCheck || 
        (Date.now() - parseInt(lastCheck, 10)) > CHECK_INTERVAL_MS;

      if (shouldCheck) {
        // Run after a short delay to not block app load
        const timer = setTimeout(validateAndResubscribe, 5000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.warn("[PushHealth] Error in health check effect:", error);
    }
  }, [userId, validateAndResubscribe]);

  // Listen for subscription change messages from service worker
  useEffect(() => {
    if (!userId) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "PUSH_SUBSCRIPTION_EXPIRED") {
        console.log("[PushHealth] Received subscription expired message");
        validateAndResubscribe();
      }
      if (event.data?.type === "PUSH_SUBSCRIPTION_CHANGED") {
        console.log("[PushHealth] Subscription changed, updating DB...");
        subscribeToPushNotifications(userId);
      }
    };

    navigator.serviceWorker?.addEventListener("message", handleMessage);
    return () => {
      navigator.serviceWorker?.removeEventListener("message", handleMessage);
    };
  }, [userId, validateAndResubscribe]);

  return { validateAndResubscribe };
}
