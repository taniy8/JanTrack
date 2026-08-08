import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16">
      <div className="w-full rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-[0_24px_70px_-36px_rgba(15,23,42,0.2)] dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-black tracking-[-0.03em] text-slate-900 dark:text-white">Access denied</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">You do not have permission to view this dashboard. Please return to your assigned workspace.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white">Go home</Link>
          <Link to="/login" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">Login again</Link>
        </div>
      </div>
    </div>
  );
}
