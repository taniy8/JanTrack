import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { ComplaintTimeline, EmptyState, SearchFilterBar } from '../components/ModernComponents';
import { timelineEvents } from '../utils/data';

export default function TrackingPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTimeline = timelineEvents.filter((event) => {
    const text = `${event.title} ${event.remark} ${event.officer}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'resolved' ? event.title.toLowerCase().includes('resolved') : true);
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Complaint Tracking</p>
        <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Track every milestone in one place</span>
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">Follow your service request from submission to resolution with clear status updates and evidence history.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Complaint ID</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">JNT-1042</p>
            </div>
            <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Resolved</div>
          </div>

          <div className="mt-6">
            <SearchFilterBar query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} filters={[{ label: 'All', value: 'all' }, { label: 'Resolved', value: 'resolved' }]} />
          </div>

          <div className="mt-8">
            {filteredTimeline.length > 0 ? <ComplaintTimeline items={filteredTimeline.map((event, index) => ({ title: event.title, description: `${event.officer} • ${event.remark}`, done: index < 5 }))} /> : <EmptyState title="No timeline entries found" description="Try a different filter or search term to view complaint milestones." />}
          </div>
        </div>
      </Card>
    </div>
  );
}
