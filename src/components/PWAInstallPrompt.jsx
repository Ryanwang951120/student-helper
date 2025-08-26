import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 檢查是否已經安裝為 PWA
    const checkIfInstalled = () => {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
      }
    };

    // 監聽 PWA 安裝提示事件
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    // 監聽 PWA 安裝完成事件
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    checkIfInstalled();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('安裝 PWA 時發生錯誤:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // 24小時後再顯示
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // 檢查是否在24小時內被關閉過
  useEffect(() => {
    const dismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const now = Date.now();
      const hoursPassed = (now - dismissedTime) / (1000 * 60 * 60);
      
      if (hoursPassed < 24) {
        setShowInstallPrompt(false);
      }
    }
  }, []);

  if (isInstalled || !showInstallPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="pwa-install-prompt">
      <div className="pwa-prompt-content">
        <div className="pwa-prompt-icon">📱</div>
        <div className="pwa-prompt-text">
          <h4>安裝課表 APP</h4>
          <p>將課表管理工具安裝到你的裝置，享受更好的使用體驗！</p>
        </div>
        <div className="pwa-prompt-actions">
          <button className="pwa-install-btn" onClick={handleInstallClick}>
            安裝
          </button>
          <button className="pwa-dismiss-btn" onClick={handleDismiss}>
            稍後
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
