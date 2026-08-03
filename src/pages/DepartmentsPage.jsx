import { ArrowRight, Building2, CheckCircle2, Clock3, Landmark, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DepartmentCardsGrid } from '../components/ModernComponents';

const departments = [
  { name: 'Public Works', description: 'Roads, drains, and civic maintenance operations.', status: 'Online', icon: Building2, activeComplaints: 1248, resolvedComplaints: 5942, responseTime: 2.5, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80' },
  { name: 'Water Supply', description: 'Leakage reporting, pressure management, and pipeline inspection.', status: 'Active', icon: Building2, activeComplaints: 742, resolvedComplaints: 2281, responseTime: 2.2, image: 'https://images.unsplash.com/photo-1581578731548-c846a9b6772b?auto=format&fit=crop&w=900&q=80' },
  { name: 'Electricity', description: 'Streetlight, grid, and public utility fault restoration.', status: 'Priority', icon: Building2, activeComplaints: 612, resolvedComplaints: 4812, responseTime: 1.9, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80' },
  { name: 'Sanitation', description: 'Waste collection, sewer care, and neighborhood cleanliness.', status: 'Active', icon: Building2, activeComplaints: 935, resolvedComplaints: 3214, responseTime: 2.8, image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80' },
];

const highlights = [
  { label: 'Specialized units', value: '24', icon: ShieldCheck },
  { label: 'Average response', value: '2.3 hrs', icon: Clock3 },
  { label: 'Resolution rate', value: '96%', icon: CheckCircle2 },
];

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen bg-[var(--page)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="overflow-hidden rounded-[32px] border border-blue-100/80 bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-6 shadow-[0_24px_80px_-36px_rgba(37,99,235,0.32)] dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-[0_24px_80px_-36px_rgba(2,6,23,0.7)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-cyan-300">
                <Landmark className="h-4 w-4" />
                Government service network
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20">
                  <Building2 className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                  Government Departments
                </h1>
              </div>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
                Collaborate with specialized government departments to ensure every citizen complaint is assigned, tracked, and resolved efficiently.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="#departments-grid" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
                  Explore Departments <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-cyan-300 dark:hover:bg-slate-700">
                  View Statistics
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-[20px] border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-300">
                        <Icon className="h-4 w-4" />
                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{item.label}</p>
                      </div>
                      <p className="mt-3 text-2xl font-black text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-blue-200/70 bg-white/80 p-4 shadow-[0_20px_50px_-28px_rgba(37,99,235,0.3)] dark:border-slate-700 dark:bg-slate-800/80">
              <div className="rounded-[24px] bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Department hub</p>
                    <p className="mt-2 text-2xl font-bold">Connected civic operations</p>
                  </div>
                  <div className="rounded-2xl bg-white/20 p-3">
                    <Building2 className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 rounded-[22px] border border-white/20 bg-slate-900/20 p-4 backdrop-blur">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-cyan-100">Live coordination</p>
                      <p className="mt-1 text-3xl font-black">89.2%</p>
                    </div>
                    <div className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">Active</div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[72, 86, 94].map((width, index) => (
                      <div key={width} className="h-2.5 overflow-hidden rounded-full bg-white/20">
                        <div className="h-full rounded-full bg-white" style={{ width: `${width}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="departments-grid" className="mt-10">
          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Department dashboard</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Every department is visible, accountable, and ready to respond.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Browse the connected government units, review their workload, and see how JanTrack supports faster resolution at every stage.</p>
          </div>
          <DepartmentCardsGrid departments={departments} />
        </div>
      </div>
    </div>
  );
}
