import React from 'react';
import toast from 'react-hot-toast';
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiXCircle, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const iconMap = {
  success: React.createElement(FiCheckCircle, { className: 'h-5 w-5 text-emerald-500' }),
  error: React.createElement(FiXCircle, { className: 'h-5 w-5 text-rose-500' }),
  warning: React.createElement(FiAlertTriangle, { className: 'h-5 w-5 text-amber-500' }),
  info: React.createElement(FiInfo, { className: 'h-5 w-5 text-sky-500' }),
};

function ToastCard({ t, type, title, description }) {
  return React.createElement(
    motion.div,
    {
      initial: { opacity: 0, y: 18, scale: 0.96 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 12, scale: 0.95 },
      className: 'pointer-events-auto flex max-w-[360px] items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/85 p-4 shadow-[0_20px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/80',
    },
    React.createElement('div', { className: 'mt-0.5 flex-shrink-0' }, iconMap[type]),
    React.createElement(
      'div',
      { className: 'min-w-0 flex-1' },
      React.createElement('p', { className: 'text-sm font-semibold text-slate-900 dark:text-white' }, title),
      description ? React.createElement('p', { className: 'mt-1 whitespace-pre-line text-sm leading-6 text-slate-600 dark:text-slate-300' }, description) : null,
    ),
    React.createElement(
      'button',
      {
        type: 'button',
        onClick: () => toast.dismiss(t.id),
        className: 'rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200',
        'aria-label': 'Dismiss notification',
      },
      React.createElement(FiX, { className: 'h-4 w-4' }),
    ),
  );
}

function notify(type, title, description, options = {}) {
  return toast.custom(
    (t) => React.createElement(ToastCard, { t, type, title, description }),
    {
      duration: options.duration ?? 4200,
      position: 'bottom-right',
      style: { background: 'transparent', boxShadow: 'none', padding: 0 },
      className: '',
      ...options,
    },
  );
}

export const showToast = {
  success: (title, description, options) => notify('success', title, description, options),
  error: (title, description, options) => notify('error', title, description, options),
  warning: (title, description, options) => notify('warning', title, description, options),
  info: (title, description, options) => notify('info', title, description, options),
};

export const dismissToast = (id) => toast.dismiss(id);
export const dismissAllToasts = () => toast.dismiss();
