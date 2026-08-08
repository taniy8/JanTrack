import { useEffect, useState } from 'react';
import { getNotifications } from '../../services/jantrackApi';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications().then(({ data }) => setNotifications(data.notifications || [])).catch(() => setNotifications([]));
  }, []);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notifications</h1>
      <div className="mt-6 space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="font-semibold">{notification.title}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
