/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

declare let self: ServiceWorkerGlobalScope;

// IndexedDB for storing pending sync data
const DB_NAME = 'ignite-push-sync';
const STORE_NAME = 'pending-subscriptions';

async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

async function savePendingSubscription(data: { userId: string; endpoint: string; p256dh: string; auth: string }): Promise<void> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.add({ ...data, timestamp: Date.now() });
    console.log('[SW] Saved pending subscription for background sync');
  } catch (error) {
    console.error('[SW] Error saving pending subscription:', error);
  }
}

async function getPendingSubscriptions(): Promise<Array<{ id: number; userId: string; endpoint: string; p256dh: string; auth: string }>> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || []);
    });
  } catch (error) {
    console.error('[SW] Error getting pending subscriptions:', error);
    return [];
  }
}

async function deletePendingSubscription(id: number): Promise<void> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.delete(id);
  } catch (error) {
    console.error('[SW] Error deleting pending subscription:', error);
  }
}

// Take control immediately
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith('workbox-') === false) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Precache assets
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

// CRITICAL: Push notification handler - runs even when app is closed
self.addEventListener('push', function(event) {
  console.log('[SW] Push event received at:', new Date().toISOString());
  
  // IMPORTANT: Create the notification promise immediately to avoid the SW being terminated
  const promiseChain = (async () => {
    // Default notification data
    let data: { title?: string; body?: string; url?: string; tag?: string; notificationId?: string } = {
      title: 'Ignite Club HQ',
      body: 'You have a new notification'
    };
    
    // Parse push data
    if (event.data) {
      try {
        const jsonData = event.data.json();
        console.log('[SW] Push data parsed:', JSON.stringify(jsonData));
        data = { ...data, ...jsonData };
      } catch (e) {
        console.log('[SW] Push data as text:', event.data.text());
        data.body = event.data.text();
      }
    } else {
      console.log('[SW] No push data received');
    }
    
    const notificationOptions = {
      body: data.body || 'You have a new notification',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/',
        notificationId: data.notificationId,
        timestamp: Date.now()
      },
      requireInteraction: true,
      tag: data.tag || `ignite-${Date.now()}`,
      renotify: true,
      silent: false
    } as NotificationOptions & { vibrate: number[]; renotify: boolean };
    
    console.log('[SW] Showing notification:', data.title);
    
    try {
      await self.registration.showNotification(
        data.title || 'Ignite Club HQ', 
        notificationOptions as NotificationOptions
      );
      console.log('[SW] Notification displayed successfully');
    } catch (error) {
      console.error('[SW] Error showing notification:', error);
      // Fallback: try showing a simpler notification
      await self.registration.showNotification('Ignite Club HQ', {
        body: data.body || 'You have a new notification',
        icon: '/icon-192.png'
      });
    }
  })();
  
  // CRITICAL: waitUntil keeps the SW alive until the notification is shown
  event.waitUntil(promiseChain);
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Notification clicked:', event.notification.tag);
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  console.log('[SW] Opening URL:', urlToOpen);
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(clientList) {
        console.log('[SW] Found', clientList.length, 'client windows');
        
        // Try to focus existing window
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            console.log('[SW] Focusing existing window');
            return (client as WindowClient).focus().then((focusedClient) => {
              if (focusedClient) {
                return focusedClient.navigate(urlToOpen);
              }
            });
          }
        }
        
        // Open new window if none exists
        console.log('[SW] Opening new window');
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
  );
});

// Handle subscription changes (important for reliability)
self.addEventListener('pushsubscriptionchange', function(event) {
  console.log('[SW] Push subscription changed, attempting to resubscribe');
  
  // CRITICAL: This MUST match the VAPID key in pushNotifications.ts and the server
  const VAPID_PUBLIC_KEY = 'BJIbR83GyZcP0V5x5_xgOo5DhnD60KtPKnz26ZchfxaDwl41NuhGcHW2Twub0WcmAjmwSfFxPX0QagIuOCNE8-Q';
  
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY).buffer as ArrayBuffer
    }).then((subscription) => {
      console.log('[SW] Resubscribed to push:', subscription.endpoint);
      // Save the new subscription - it will be synced to the server
      const p256dh = subscription.getKey('p256dh');
      const auth = subscription.getKey('auth');
      if (p256dh && auth) {
        // Notify any open clients about the new subscription
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'PUSH_SUBSCRIPTION_CHANGED',
              subscription: {
                endpoint: subscription.endpoint,
                p256dh: btoa(String.fromCharCode(...new Uint8Array(p256dh))),
                auth: btoa(String.fromCharCode(...new Uint8Array(auth)))
              }
            });
          });
        });
      }
    }).catch((error) => {
      console.error('[SW] Failed to resubscribe:', error);
    })
  );
});

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Background sync handler for retrying failed push subscriptions
self.addEventListener('sync', function(event: ExtendableEvent & { tag?: string }) {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'push-subscription-sync') {
    event.waitUntil(syncPendingSubscriptions());
  }
});

async function syncPendingSubscriptions(): Promise<void> {
  console.log('[SW] Syncing pending push subscriptions...');
  
  const pendingSubscriptions = await getPendingSubscriptions();
  
  if (pendingSubscriptions.length === 0) {
    console.log('[SW] No pending subscriptions to sync');
    return;
  }
  
  console.log(`[SW] Found ${pendingSubscriptions.length} pending subscription(s)`);
  
  for (const pending of pendingSubscriptions) {
    try {
      // Get the Supabase URL from environment or fallback
      const supabaseUrl = (self as unknown as { __SUPABASE_URL__?: string }).__SUPABASE_URL__ || 
        'https://lvnrlrnwmcfjpttgllcr.supabase.co';
      const supabaseKey = (self as unknown as { __SUPABASE_KEY__?: string }).__SUPABASE_KEY__ ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2bnJscm53bWNmanB0dGdsbGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODg3MzMsImV4cCI6MjA4MDQ2NDczM30.9eIpkGjA6o23k_61G9CFqeOKVMx5YcOy6b-rA5J-50A';
      
      const response = await fetch(`${supabaseUrl}/rest/v1/push_subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          user_id: pending.userId,
          endpoint: pending.endpoint,
          p256dh: pending.p256dh,
          auth: pending.auth
        })
      });
      
      if (response.ok) {
        console.log('[SW] Successfully synced subscription for user:', pending.userId);
        await deletePendingSubscription(pending.id);
      } else {
        console.error('[SW] Failed to sync subscription:', response.status);
      }
    } catch (error) {
      console.error('[SW] Error syncing subscription:', error);
      // Will retry on next sync
    }
  }
}

// Listen for messages from the main app
self.addEventListener('message', function(event) {
  console.log('[SW] Received message:', event.data);
  
  if (event.data && event.data.type === 'SAVE_PENDING_SUBSCRIPTION') {
    savePendingSubscription(event.data.payload);
  }
  
  if (event.data && event.data.type === 'TRIGGER_SYNC') {
    // Manually trigger sync if requested
    syncPendingSubscriptions();
  }
  
  // Keep-alive ping from the app
  if (event.data && event.data.type === 'PING') {
    event.ports?.[0]?.postMessage({ type: 'PONG' });
  }
});

// Fetch handler - caches API responses for offline support and keeps SW active
self.addEventListener('fetch', function(event) {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  // Network-first strategy for API calls, cache-first for assets
  if (event.request.url.includes('/rest/v1/') || event.request.url.includes('/functions/')) {
    // Network-first for API
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request) as Promise<Response>;
        })
    );
  }
  // Let workbox handle precached assets
});

// Periodic sync to refresh push subscription (if supported)
self.addEventListener('periodicsync', function(event: ExtendableEvent & { tag?: string }) {
  console.log('[SW] Periodic sync:', event.tag);
  
  if (event.tag === 'refresh-push-subscription') {
    event.waitUntil(refreshPushSubscription());
  }
});

async function refreshPushSubscription(): Promise<void> {
  try {
    const subscription = await self.registration.pushManager.getSubscription();
    if (subscription) {
      console.log('[SW] Push subscription is active');
      // Notify clients that subscription is still valid
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({ type: 'PUSH_SUBSCRIPTION_VALID' });
      });
    } else {
      console.log('[SW] No push subscription found');
      // Notify clients to resubscribe
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({ type: 'PUSH_SUBSCRIPTION_EXPIRED' });
      });
    }
  } catch (error) {
    console.error('[SW] Error checking subscription:', error);
  }
}
