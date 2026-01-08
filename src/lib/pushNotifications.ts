import { supabase } from "@/integrations/supabase/client";

// VAPID public key for push notifications
const VAPID_PUBLIC_KEY = 'BJIbR83GyZcP0V5x5_xgOo5DhnD60KtPKnz26ZchfxaDwl41NuhGcHW2Twub0WcmAjmwSfFxPX0QagIuOCNE8-Q';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.log('Service workers not supported');
    return null;
  }
  
  try {
    // Use the main PWA service worker which handles both caching and push
    const registration = await navigator.serviceWorker.ready;
    console.log('PWA service worker ready:', registration);
    return registration;
  } catch (error) {
    console.error('Service worker registration failed:', error);
    return null;
  }
}

// Request background sync for failed subscriptions
async function requestBackgroundSync(): Promise<void> {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      await (registration as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } }).sync.register('push-subscription-sync');
      console.log('Background sync registered for push subscriptions');
    } catch (error) {
      console.error('Failed to register background sync:', error);
    }
  }
}

// Save pending subscription to service worker for background sync
async function savePendingSubscriptionToSW(data: { userId: string; endpoint: string; p256dh: string; auth: string }): Promise<void> {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    if (registration.active) {
      registration.active.postMessage({
        type: 'SAVE_PENDING_SUBSCRIPTION',
        payload: data
      });
      await requestBackgroundSync();
    }
  }
}

export async function subscribeToPushNotifications(userId: string): Promise<{ success: boolean; error?: string }> {
  if (!('PushManager' in window)) {
    console.log('Push notifications not supported');
    return { success: false, error: 'Push notifications are not supported in this browser' };
  }
  
  if (!VAPID_PUBLIC_KEY) {
    console.error('VAPID public key not configured');
    return { success: false, error: 'Push notifications are not configured' };
  }
  
  try {
    // Request notification permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied:', permission);
      return { success: false, error: `Notification permission ${permission}. Please allow notifications in your browser settings.` };
    }
    
    // Register service worker if not already registered
    let registration = await navigator.serviceWorker.getRegistration('/');
    if (!registration) {
      registration = await registerServiceWorker();
    }
    
    if (!registration) {
      console.error('No service worker registration available');
      return { success: false, error: 'Could not register service worker' };
    }
    
    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;
    
    // Check for existing subscription
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // Create new subscription
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey.buffer as ArrayBuffer
      });
      console.log('New push subscription created:', subscription);
    }
    
    // Extract subscription details
    const subscriptionJson = subscription.toJSON();
    const endpoint = subscription.endpoint;
    const p256dh = subscriptionJson.keys?.p256dh || '';
    const auth = subscriptionJson.keys?.auth || '';
    
    if (!p256dh || !auth) {
      console.error('Invalid subscription keys');
      return { success: false, error: 'Invalid subscription keys from browser' };
    }
    
    // Check if online before attempting database save
    if (!navigator.onLine) {
      console.log('Offline - saving subscription for background sync');
      await savePendingSubscriptionToSW({ userId, endpoint, p256dh, auth });
      return { success: true }; // Optimistically return success, will sync when online
    }
    
    // Delete ALL old subscriptions for this user first (to clean up stale endpoints)
    const { error: deleteError } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('user_id', userId);
    
    if (deleteError) {
      console.warn('Error cleaning up old subscriptions:', deleteError);
    }
    
    // Save new subscription to database
    const { error } = await supabase
      .from('push_subscriptions')
      .insert({
        user_id: userId,
        endpoint,
        p256dh,
        auth
      });
    
    if (error) {
      console.error('Error saving push subscription:', error);
      // Save for background sync retry
      await savePendingSubscriptionToSW({ userId, endpoint, p256dh, auth });
      return { success: false, error: `Database error: ${error.message}. Will retry when online.` };
    }
    
    console.log('Push subscription saved successfully');
    return { success: true };
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
}

export async function unsubscribeFromPushNotifications(userId: string): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.getRegistration('/');
    if (registration) {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        // Remove from database first
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('user_id', userId)
          .eq('endpoint', subscription.endpoint);
        
        // Then unsubscribe
        await subscription.unsubscribe();
        console.log('Unsubscribed from push notifications');
      }
    }
    return true;
  } catch (error) {
    console.error('Error unsubscribing from push:', error);
    return false;
  }
}

export async function checkPushSubscription(): Promise<boolean> {
  if (!('PushManager' in window)) {
    return false;
  }
  
  try {
    const registration = await navigator.serviceWorker.getRegistration('/');
    if (!registration) {
      return false;
    }
    
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription;
  } catch {
    return false;
  }
}

// Trigger manual sync (useful when coming back online)
export async function triggerPushSubscriptionSync(): Promise<void> {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Try Background Sync API first
      if ('SyncManager' in window) {
        await (registration as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } }).sync.register('push-subscription-sync');
        console.log('Background sync triggered');
      } else if (registration.active) {
        // Fallback: send message to service worker to sync manually
        registration.active.postMessage({ type: 'TRIGGER_SYNC' });
        console.log('Manual sync triggered via message');
      }
    } catch (error) {
      console.error('Failed to trigger sync:', error);
    }
  }
}

// Initialize online listener for automatic sync retry
export function initPushSyncListener(): void {
  // Safety check for server-side rendering or Safari WebView issues
  if (typeof window === 'undefined') return;
  
  try {
    window.addEventListener('online', () => {
      console.log('Back online - triggering push subscription sync');
      triggerPushSubscriptionSync().catch(() => {
        // Ignore errors - sync will retry later
      });
    });
  } catch (error) {
    console.warn('Failed to add online listener:', error);
  }
}
