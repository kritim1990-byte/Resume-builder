'use client';

import React, { useEffect, useState } from 'react';
import { Download, WifiOff, CheckCircle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaRegister: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Service Worker Registration
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('PWA ServiceWorker registered with scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('PWA ServiceWorker registration failed:', err);
          });
      });
    }

    // Network Online/Offline status
    const updateOnlineStatus = () => setIsOffline(!navigator.onLine);
    setIsOffline(!navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // BeforeInstallPrompt for PWA install button
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
      setInstallSuccess(true);
      setTimeout(() => setInstallSuccess(false), 4000);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="flex items-center gap-2">
      {isOffline && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline Mode</span>
        </div>
      )}

      {installSuccess && (
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>App Installed!</span>
        </div>
      )}

      {deferredPrompt && !isInstalled && (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-sm hover:shadow transition-all"
          title="Install App for Offline Use"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Install PWA</span>
        </button>
      )}
    </div>
  );
};
