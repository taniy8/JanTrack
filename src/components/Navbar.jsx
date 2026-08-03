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
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[var(--navbar)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-lg font-bold text-white shadow-[0_4px_14px_rgba(15,23,42,0.08)]">J</div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-[var(--text)]">JanTrack</p>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Transparent Governance</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `text-sm font-medium tracking-normal transition-colors duration-200 ${isActive ? 'font-semibold text-sky-400' : 'text-[var(--text)] hover:text-sky-400'}`}
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
                <button aria-label="Notifications" onClick={() => { setShowNotifications((value) => !value); setShowProfile(false); }} className="rounded-full border border-[color:var(--border)] bg-[var(--surface)] p-2.5 text-[var(--text)] shadow-[var(--shadow)]">
                  <FiBell size={18} />
                </button>
                <NotificationDropdown open={showNotifications} onClose={() => setShowNotifications(false)} />
              </div>
              <div className="relative">
                <button aria-label="Profile" onClick={() => { setShowProfile((value) => !value); setShowNotifications(false); }} className="rounded-full border border-[color:var(--border)] bg-[var(--surface)] p-2.5 text-[var(--text)] shadow-[var(--shadow)]">
                  <FiUser size={18} />
                </button>
                <ProfileDropdown open={showProfile} onClose={() => setShowProfile(false)} />
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className="rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-blue-600/20">Login</NavLink>
              <NavLink to="/register" className="rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(37,99,235,0.15)] transition hover:translate-y-[-1px]">Register</NavLink>
            </>
          )}
          <button className="rounded-full border border-[color:var(--border)] bg-[var(--surface)] p-2.5 text-[var(--text)] lg:hidden" aria-label="Open menu">
            <FiMenu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
