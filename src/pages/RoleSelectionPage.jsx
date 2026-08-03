import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, ShieldCheck, UserRound } from 'lucide-react';

const roles = [
  {
    title: 'Citizen',
    description: 'Register complaints, track progress, receive notifications, and provide feedback.',
    icon: UserRound,
    accent: 'from-blue-600 to-cyan-500',
    buttonLabel: 'Continue as Citizen',
    path: '/register',
    state: { selectedRole: 'citizen' },
  },
  {
    title: 'Department Officer',
    description: 'Manage assigned complaints, update status, verify evidence, and communicate with citizens.',
    icon: Briefcase,
    accent: 'from-violet-600 to-indigo-500',
    buttonLabel: 'Continue as Department Officer',
    path: '/login',
    state: { selectedRole: 'department officer' },
  },
  {
    title: 'Administrator',
    description: 'Manage users, departments, complaints, analytics, reports, announcements, and system settings.',
    icon: ShieldCheck,
    accent: 'from-emerald-600 to-teal-500',
    buttonLabel: 'Continue as Administrator',
    path: '/login',
    state: { selectedRole: 'administrator' },
  },
];

export default function RoleSelectionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Access JanTrack</p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.03em] text-slate-900 dark:text-white sm:text-5xl">
          Choose Your Role
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">
          Select how you want to access JanTrack and begin your government service experience.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role, index) => {
          const Icon = role.icon;

          return (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="flex h-full flex-col rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.2)] dark:border-slate-700 dark:bg-slate-800"
            >
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${role.accent} text-white shadow-lg`}>
                <Icon className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">{role.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{role.description}</p>
              <Link
                to={role.path}
                state={role.state}
                className="mt-8 inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-500/30 dark:hover:bg-slate-700"
              >
                {role.buttonLabel}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
