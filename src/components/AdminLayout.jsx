import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Activity, AlertTriangle, BarChart3, BellRing, Briefcase, Building2, ClipboardList, FileText, LayoutDashboard, LifeBuoy, LogOut, MessageSquareQuote, Settings, ShieldCheck, TrendingUp, UserRound, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Users', icon: Users, to: '/admin/users' },
  { label: 'Citizens', icon: UserRound, to: '/admin/citizens' },
  { label: 'Department Officers', icon: Briefcase, to: '/admin/officers' },
  { label: 'Departments', icon: Building2, to: '/admin/departments' },
  { label: 'Complaints', icon: FileText, to: '/admin/complaints' },
  { label: 'Complaint Categories', icon: ClipboardList, to: '/admin/categories' },
  { label: 'Analytics', icon: BarChart3, to: '/admin/analytics' },
  { label: 'Reports', icon: TrendingUp, to: '/admin/reports' },
  { label: 'Announcements', icon: BellRing, to: '/admin/announcements' },
  { label: 'Feedback', icon: MessageSquareQuote, to: '/admin/feedback' },
  { label: 'Notifications', icon: BellRing, to: '/admin/notifications' },
  { label: 'System Settings', icon: Settings, to: '/admin/settings' },
  { label: 'Audit Logs', icon: Activity, to: '/admin/audit-logs' },
  { label: 'Profile', icon: ShieldCheck, to: '/admin/profile' },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6 lg:py-8">
        <aside className="w-full self-start rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-900 lg:sticky lg:top-6 lg:w-72 lg:p-5">
          <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white">
            <ShieldCheck className="h-6 w-6" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em]">Admin</p>
              <p className="text-lg font-semibold">JanTrack Portal</p>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.to === '/admin/dashboard'
                ? location.pathname === '/admin' || location.pathname === '/admin/dashboard'
                : location.pathname.startsWith(item.to);

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive: linkActive }) => `flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${isActive || linkActive ? 'bg-blue-50 text-blue-700 dark:bg-slate-800 dark:text-cyan-300' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <button onClick={logout} className="mt-6 flex w-full items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
