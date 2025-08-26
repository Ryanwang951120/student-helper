import { useState, useEffect, useCallback } from 'react';

export const useNotifications = () => {
  const [permission, setPermission] = useState(
    typeof window !== 'undefined' ? Notification.permission : 'default'
  );
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported('Notification' in window && 'serviceWorker' in navigator);
  }, []);

  // 請求通知權限
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.log('此瀏覽器不支援通知功能');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('請求通知權限失敗:', error);
      return false;
    }
  }, [isSupported]);

  // 發送即時通知
  const sendNotification = useCallback((title, options = {}) => {
    if (permission !== 'granted') {
      console.log('沒有通知權限');
      return null;
    }

    const notification = new Notification(title, {
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options
    });

    return notification;
  }, [permission]);

  // 排程作業提醒
  const scheduleAssignmentReminder = useCallback((assignment) => {
    if (permission !== 'granted' || !assignment.dueDate) return;

    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // 如果是明天到期，立即發送通知
    if (daysDiff === 1) {
      sendNotification(`作業提醒：${assignment.title}`, {
        body: `明天到期（${assignment.subject}）`,
        tag: `assignment-${assignment.id}`,
        requireInteraction: true
      });
    }
    
    // 如果是 3 天內到期，發送提醒
    else if (daysDiff <= 3 && daysDiff > 0) {
      sendNotification(`作業提醒：${assignment.title}`, {
        body: `還有 ${daysDiff} 天到期（${assignment.subject}）`,
        tag: `assignment-${assignment.id}`
      });
    }
  }, [permission, sendNotification]);

  // 批量檢查並發送作業提醒
  const checkAndNotifyAssignments = useCallback((assignments) => {
    if (permission !== 'granted') return;

    assignments.forEach(assignment => {
      if (!assignment.completed) {
        scheduleAssignmentReminder(assignment);
      }
    });
  }, [permission, scheduleAssignmentReminder]);

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
    scheduleAssignmentReminder,
    checkAndNotifyAssignments
  };
};
