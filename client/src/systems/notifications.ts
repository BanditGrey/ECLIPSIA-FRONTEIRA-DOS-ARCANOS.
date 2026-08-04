/**
 * SISTEMA DE NOTIFICAÇÕES — Notificações no dispositivo (PC, tablet, celular)
 * Usa a API Notification do navegador quando disponível.
 */

let notificationPermission = Notification?.permission ?? 'default';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) return false;

  if (Notification.permission === 'granted') {
    notificationPermission = 'granted';
    return true;
  }

  if (Notification.permission !== 'denied') {
    try {
      const permission = await Notification.requestPermission();
      notificationPermission = permission;
      return permission === 'granted';
    } catch {
      return false;
    }
  }

  return false;
};

export const showNotification = (title: string, body?: string, icon?: string): boolean => {
  if (!('Notification' in window) || notificationPermission !== 'granted') return false;

  try {
    const notification = new Notification(title, {
      body: body ?? '',
      icon: icon ?? '/icon.png',
      tag: 'eclipsia-game',
      silent: false
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return true;
  } catch {
    return false;
  }
};

export const notifyItemFound = (itemName: string, rarity: string): boolean => {
  return showNotification(`Item encontrado!`, `${itemName} (${rarity})`, '/icon.png');
};

export const notifyBossAvailable = (level: number): boolean => {
  return showNotification('Boss disponível!', `Sala de boss aberta no nível ${level}`, '/icon.png');
};

export const notifyLevelUp = (newLevel: number, pointsGained: number): boolean => {
  return showNotification('Nível subido!', `Nível ${newLevel} — +${pointsGained} pontos de passiva`, '/icon.png');
};
