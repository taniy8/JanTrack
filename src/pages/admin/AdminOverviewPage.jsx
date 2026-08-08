import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, BellRing, Briefcase, Building2, FileText, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAnalytics } from '../../services/jantrackApi';

const baseStats = [
  { title: 'Registered Citizens', icon: Users, tone: 'from-blue-600 to-cyan-500' },
  { title: 'Department Officers', icon: Briefcase, tone: 'from-violet-600 to-indigo-500' },
  { title: 'Government Departments', icon: Building2, tone: 'from-emerald-600 to-teal-500' },
  { title: 'Complaints Today', icon: FileText, tone: 'from-slate-700 to-slate-500' },
  { title: 'Pending Complaints', icon: AlertTriangle, tone: 'from-amber-500 to-orange-500' },
  { title: 'Resolved Complaints', icon: ShieldCheck, tone: 'from-emerald-500 to-green-500' },
];

export default function AdminOverviewPage() {
  const [summary, setSummary] = useState({ totalComplaints: 0, pending: 0, resolved: 0, totalCitizens: 0, totalOfficers: 0, totalDepartments: 0 });

  useEffect(() => {
    getAnalytics().then(({ data }) => setSummary(data.summary || summary)).catch(() => {});
  }, []);

  const stats = baseStats.map((stat) => {
    if (stat.title === 'Registered Citizens') return { ...stat, value: summary.totalCitizens };
    if (stat.title === 'Department Officers') return { ...stat, value: summary.totalOfficers };
    if (stat.title === 'Government Departments') return { ...stat, value: summary.totalDepartments };
    if (stat.title === 'Complaints Today') return { ...stat, value: summary.totalComplaints };
    if (stat.title === 'Pending Complaints') return { ...stat, value: summary.pending };
    if (stat.title === 'Resolved Complaints') return { ...stat, value: summary.resolved };
    return stat;
  });

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-900 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Administrator Dashboard</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.03em] text-slate-900 dark:text-white sm:text-5xl">Welcome back, Administrator</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">Monitor complaints, departments, and platform performance from one place.</p>
          </div>
          <Link to="/notifications" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-cyan-300">
            <BellRing className="h-4 w-4" /> View Notifications
          </Link>
        </div>
      </motion.section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.article key={stat.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.08 }} whileHover={{ y: -6, scale: 1.01 }} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-[0_20px_40px_-22px_rgba(37,99,235,0.35)] dark:border-slate-700 dark:bg-slate-800">
              <div className={`inline-flex rounded-2xl bg-gradient-to-br ${stat.tone} p-3 text-white`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{stat.title}</p>
              <div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                <div className={`h-2 rounded-full bg-gradient-to-r ${stat.tone}`} style={{ width: `${index % 2 === 0 ? 82 : 68}%` }} />
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Complaint Management</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Recent platform activity</h2>
          </div>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">View all</button>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {[
            { title: 'Escalated road repair complaint', detail: 'Assigned to Public Works • Priority High', status: 'Escalated' },
            { title: 'Officer verification pending', detail: 'Department review required • 4 items waiting', status: 'Pending' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between gap-3">
                <p className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</p>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700 dark:bg-slate-700 dark:text-cyan-300">{item.status}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
