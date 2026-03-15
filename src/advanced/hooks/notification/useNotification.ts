import { useState, useCallback } from 'react';
import type { Notification } from '../../../types';

/**
 * 상태/기능 훅: 알림 도메인. 알림 상태 + addNotification 부수 효과.
 */
export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: 'error' | 'success' | 'warning' = 'success') => {
      const id = Date.now().toString();
      setNotifications((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 3000);
    },
    []
  );

  return { notifications, setNotifications, addNotification };
}
