import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheckCircle, FiAlertCircle, FiClock, FiX, FiInbox } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const initialNotifications = [
  { id: 1, title: 'Complaint Assigned', description: 'Your complaint JT202600145 has been assigned to the Public Works team.', time: '2 hours ago', unread: true, type: 'info' },
  { id: 2, title: 'Status Updated', description: 'The officer has marked your complaint under review.', time: '5 hours ago', unread: true, type: 'warning' },
  { id: 3, title: 'Complaint Resolved', description: 'Your complaint has been resolved and is awaiting feedback.', time: '1 day ago', unread: false, type: 'success' },
  { id: 4, title: 'Feedback Requested', description: 'Please share your feedback on the latest resolution.', time: '2 days ago', unread: false, type: 'info' },
];

export default function NotificationDropdown({ open, onClose }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClose();
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const markAsRead = (id) => {
    setNotifications((current) => current.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  };

  const markAllRead = () => {
    setLoading(true);
    setTimeout(() => {
      setNotifications((current) => current.map((item) => ({ ...item, unread: false })));
      setLoading(false);
    }, 250);
  };

  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-12 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex items-center justify-between px-2 py-2">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
              <p className="text-xs text-slate-500 dark:text-slate-300">{unreadCount} unread</p>
            </div>
            <button onClick={markAllRead} className="text-xs font-semibold text-brand-600">Mark all read</button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 py-8 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <FiClock className="animate-pulse" /> Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <FiInbox className="mx-auto mb-2 text-lg" />
              No notifications yet.
            </div>
          ) : (
            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {notifications.map((item) => (
                <div key={item.id} className={`rounded-2xl border p-3 ${item.unread ? 'border-blue-500/20 bg-blue-500/10 dark:border-blue-500/20 dark:bg-slate-700/80' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-700'}`}>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 rounded-full bg-slate-100 p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {item.type === 'success' ? <FiCheckCircle className="text-emerald-600" /> : <FiAlertCircle className="text-amber-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                        {item.unread && <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />}
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-200">{item.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-slate-500 dark:text-slate-300">{item.time}</p>
                        {item.unread && (
                          <button onClick={() => markAsRead(item.id)} className="text-xs font-semibold text-brand-600">Mark read</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-700">
            <button onClick={() => { navigate('/notifications'); onClose(); }} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <FiBell /> View all notifications
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
