import { useEffect, useState } from 'react';

declare global {
    interface Window {
        Telegram?: {
            WebApp: any;
        };
    }
}

export function useTelegram() {
    const [tg, setTg] = useState<any>(null);

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const webApp = window.Telegram.WebApp;
            webApp.ready();
            webApp.expand();
            setTg(webApp);
        }
    }, []);

    // Helper to get color from Telegram theme params or fallback
    const themeParams = tg?.themeParams || {};

    // Check if we are in a valid Telegram environment
    // platform can be 'android', 'ios', 'tdesktop', 'macos', 'web', 'weba', 'unknown'
    const platform = tg?.platform || 'unknown';
    // If initData is empty, we are likely not in Telegram (unless it's a very specific edge case, but safe for this app)
    const isTelegram = !!(tg && tg.initData);

    return {
        tg,
        user: tg?.initDataUnsafe?.user,
        themeParams,
        isExpanded: tg?.isExpanded,
        viewportHeight: tg?.viewportHeight,
        initData: tg?.initData,
        platform,
        isTelegram,
        close: () => tg?.close(),
        haptic: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' | 'error' | 'success' | 'warning') => {
            if (tg?.HapticFeedback) {
                tg.HapticFeedback.notificationOccurred(style);
            }
        },
    };
}
