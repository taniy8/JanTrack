import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiGrid, FiAlertCircle, FiSettings, FiKey, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { showToast } from '../../utils/toast';

export default function ProfileDropdown({ open, onClose }) {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { user, logout, isAuthenticated } = useAuth();

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

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const guestOptions = [
    { label: 'Login', action: () => { navigate('/login'); onClose(); } },
    { label: 'Register', action: () => { navigate('/register'); onClose(); } },
  ];

  const profileOptions = [
    { label: 'My Profile', icon: <FiUser />, action: () => { navigate('/profile'); onClose(); } },
    { label: 'Dashboard', icon: <FiGrid />, action: () => { navigate('/dashboard'); onClose(); } },
    { label: 'My Complaints', icon: <FiAlertCircle />, action: () => { navigate('/tracking'); onClose(); } },
    { label: 'Account Settings', icon: <FiSettings />, action: () => { navigate('/dashboard'); onClose(); } },
    { label: 'Change Password', icon: <FiKey />, action: () => { navigate('/login'); onClose(); } },
    { label: 'Help & Support', icon: <FiHelpCircle />, action: () => { navigate('/contact'); onClose(); } },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-12 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-700 dark:bg-slate-800"
        >
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-700">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 font-semibold text-white">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">Citizen ID: {user.citizenId}</p>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {profileOptions.map((option) => (
                  <button key={option.label} onClick={option.action} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700">
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-700">
                <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-700">
                  <FiLogOut /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-1">
              {guestOptions.map((option) => (
                <button key={option.label} onClick={option.action} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
                  {option.label === 'Login' ? <FiUser /> : <FiUser />}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
