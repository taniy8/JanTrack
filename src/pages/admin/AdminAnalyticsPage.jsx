import { useEffect, useState } from 'react';
import { getAnalytics } from '../../services/jantrackApi';

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState({ totalComplaints: 0, pending: 0, resolved: 0, totalCitizens: 0, totalOfficers: 0, totalDepartments: 0 });

  useEffect(() => {
    getAnalytics().then(({ data }) => setSummary(data.summary || summary)).catch(() => {});
  }, []);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(summary).map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">{label.replace(/([A-Z])/g, ' $1')}</p>
            <p className="mt-3 text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
