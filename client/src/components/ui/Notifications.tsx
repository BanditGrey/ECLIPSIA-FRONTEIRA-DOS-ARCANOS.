import { useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import type { NotifyType } from '../../store/useGameStore';

const typeClasses: Record<NotifyType, string> = {
  success: 'border-green-500 bg-green-950/95 text-green-200',
  error: 'border-red-500 bg-red-950/95 text-red-200',
  warning: 'border-yellow-500 bg-yellow-950/95 text-yellow-200',
  info: 'border-blue-500 bg-blue-950/95 text-blue-200',
  gold: 'border-game-gold bg-game-primary text-game-gold'
};

export const Notifications = () => {
  const notifications = useGameStore((state) => state.notifications);
  const removeNotification = useGameStore((state) => state.removeNotification);

  useEffect(() => {
    if (notifications.length === 0) {
      return;
    }

    const timers = notifications.map((notification) =>
      window.setTimeout(() => removeNotification(notification.id), 3000)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [notifications, removeNotification]);

  return (
    <div className="pointer-events-none fixed left-1/2 top-3 z-[999] flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-2 px-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={[
            'anim-fade w-full rounded-lg border px-4 py-2 text-center font-mono text-sm shadow-lg shadow-black/40',
            typeClasses[notification.type]
          ].join(' ')}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};
