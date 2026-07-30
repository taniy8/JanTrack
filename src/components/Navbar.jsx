import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './Navbar/ThemeToggle';
import NotificationDropdown from './Navbar/NotificationDropdown';
import ProfileDropdown from './Navbar/ProfileDropdown';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Track Complaint', to: '/tracking' },
  { label: 'Departments', to: '/departments' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20">J</div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">JanTrack</p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Transparent Governance</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `text-sm font-medium tracking-normal transition-colors duration-200 ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="relative flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <div className="relative">
                <button aria-label="Notifications" onClick={() => { setShowNotifications((value) => !value); setShowProfile(false); }} className="rounded-full border border-slate-200 bg-slate-50 p-2.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <FiBell size={18} />
                </button>
                <NotificationDropdown open={showNotifications} onClose={() => setShowNotifications(false)} />
              </div>
              <div className="relative">
                <button aria-label="Profile" onClick={() => { setShowProfile((value) => !value); setShowNotifications(false); }} className="rounded-full border border-slate-200 bg-slate-50 p-2.5 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <FiUser size={18} />
                </button>
                <ProfileDropdown open={showProfile} onClose={() => setShowProfile(false)} />
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Login</NavLink>
              <NavLink to="/register" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Register</NavLink>
            </>
          )}
          <button className="rounded-full border border-slate-200 p-2.5 lg:hidden dark:border-slate-700" aria-label="Open menu">
            <FiMenu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
