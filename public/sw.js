const CACHE_NAME = 'student-helper-v1';
const urlsToCache = [
  '/',
  '/manifest.json'
];

// 安裝 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果有快取則返回快取，否則發送網路請求
        if (response) {
          return response;
        }
        
        // 對於導航請求，總是返回 index.html（SPA 路由支援）
        if (event.request.mode === 'navigate') {
          return fetch('/').catch(() => caches.match('/'));
        }
        
        return fetch(event.request).catch(() => {
          // 網路失敗時的後備方案
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
        });
      })
  );
});

// 背景同步檢查作業到期
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(checkAssignmentsDue());
  }
});

// 檢查作業到期並發送通知
async function checkAssignmentsDue() {
  try {
    // 從 localStorage 讀取作業資料
    const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const now = new Date();
    
    assignments.forEach(assignment => {
      if (!assignment.completed && assignment.dueDate) {
        const dueDate = new Date(assignment.dueDate);
        const timeDiff = dueDate.getTime() - now.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if (daysDiff === 1) {
          self.registration.showNotification(`明天到期：${assignment.title}`, {
            body: `課程：${assignment.subject}`,
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            tag: `assignment-${assignment.id}`,
            requireInteraction: true,
            actions: [
              {
                action: 'view',
                title: '查看詳情'
              },
              {
                action: 'complete',
                title: '標記完成'
              }
            ]
          });
        }
      }
    });
  } catch (error) {
    console.error('檢查作業到期時發生錯誤:', error);
  }
}

// 處理通知點擊
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    // 開啟應用並跳轉到作業頁面
    event.waitUntil(
      clients.openWindow('/?tab=assignments')
    );
  } else if (event.action === 'complete') {
    // 標記作業為完成（這裡需要更複雜的邏輯）
    console.log('標記作業完成');
  } else {
    // 預設行為：開啟應用
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
