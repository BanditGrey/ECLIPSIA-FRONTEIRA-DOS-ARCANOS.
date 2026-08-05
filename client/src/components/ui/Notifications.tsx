import { useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { NotifyType } from '../../store/useGameStore';

const typeClasses: Record<NotifyType, string> = {
  success: 'border-green-600/70 bg-night-900/95 text-green-200 border-l-green-400',
  error: 'border-red-700/70 bg-night-900/95 text-red-200 border-l-red-500',
  warning: 'border-amber-600/70 bg-night-900/95 text-amber-200 border-l-amber-400',
  info: 'border-blue-600/70 bg-night-900/95 text-blue-200 border-l-blue-400',
  gold: 'border-gold-600/70 bg-night-900/95 text-gold-300 border-l-gold-400'
};

export const Notifications = () => {
  const notifications = useGameStore((state) => state.notifications);
  const removeNotification = useGameStore((state) => state.removeNotification);

  useEffect(() => {
    if (notifications.length === 0) {
      return;
    }

    const timers = notifications.map((notification) =>
      window.setTimeout(() => removeNotification(notification.id), 5000)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [notifications, removeNotification]);

  return (
    <div className="pointer-events-none fixed left-1/2 top-3 z-[999] flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-2 px-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={[
            'anim-fade w-full rounded-lg border border-l-4 px-4 py-2 text-center font-mono text-sm shadow-lg shadow-black/50 backdrop-blur',
            typeClasses[notification.type]
          ].join(' ')}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};
