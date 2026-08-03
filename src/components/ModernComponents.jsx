import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BellRing, CheckCircle2, ChevronDown, Circle, CircleDashed, Clock3, Compass, FileText, Home, Info, Layers3, MessageSquareText, PanelsTopLeft, ShieldCheck, Sparkles, X, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-cyan-200 bg-cyan-50/90 px-4 py-3 text-sm text-cyan-800 shadow-sm dark:border-cyan-900/40 dark:bg-cyan-950/40 dark:text-cyan-200">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4" />
        <span>System maintenance is scheduled on Sunday from 2 AM to 4 AM for planned service improvements.</span>
      </div>
      <button onClick={() => setVisible(false)} className="rounded-full p-1 transition hover:bg-cyan-100 dark:hover:bg-cyan-900/40" aria-label="Dismiss announcement">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function AnimatedStatsSection({ items }) {
  const [values, setValues] = useState(items.map(() => 0));

  useEffect(() => {
    let frameId;
    const start = performance.now();
    const duration = 1200;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValues(items.map((item) => Math.round(item.value * eased)));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [items]);

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <motion.div key={item.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.35 }} className="rounded-[24px] border border-slate-200/80 bg-white/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800/90">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{item.label}</p>
            <div className={`rounded-2xl p-2 ${item.tint}`}>
              <item.icon className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{item.suffix ? `${values[index]}${item.suffix}` : values[index]}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.caption}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function ComplaintTimeline({ items }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((step, index) => (
        <motion.div key={step.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'}`}>
              {step.done ? <CheckCircle2 className="h-5 w-5" /> : <CircleDashed className="h-5 w-5" />}
            </div>
            {index < items.length - 1 && <div className="mt-2 h-full w-px bg-slate-300 dark:bg-slate-600" />}
          </div>
          <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-slate-900 dark:text-white">{step.title}</p>
              {step.done ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Completed</span> : <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">In progress</span>}
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function DepartmentCardsGrid({ departments }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {departments.map((department, index) => (
        <motion.div
          key={department.name}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
          whileHover={{ y: -6, scale: 1.01 }}
          className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_18px_45px_-20px_rgba(34,211,238,0.5)] dark:border-slate-700 dark:bg-slate-800"
        >
          <img src={department.image} alt={department.name} className="h-44 w-full object-cover" />
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300">
                <department.icon className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-700 dark:text-slate-300">{department.status}</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{department.name}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{department.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-700/80">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Active</p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{department.activeComplaints.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-700/80">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Resolved</p>
                <p className="mt-1 text-lg font-semibold text-emerald-600 dark:text-emerald-300">{department.resolvedComplaints.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-700/80">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Response</p>
                <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{department.responseTime.toFixed(1)} hrs</p>
              </div>
            </div>
            <Link to="#departments-grid" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:translate-x-1 dark:text-cyan-400">
              View Department <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ActivityFeed({ items }) {
  return (
    <div className="mt-6 space-y-4">
      {items.map((item, index) => (
        <motion.div key={item.title} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="rounded-2xl bg-cyan-100 p-2 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300">
            <item.icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
              <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ProgressCard({ percent, label, tone = 'from-cyan-500 to-blue-600' }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Current status</p>
          <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{label}</p>
        </div>
        <div className={`rounded-2xl bg-gradient-to-br ${tone} px-3 py-2 text-sm font-semibold text-white`}>{percent}%</div>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 0.8 }} className={`h-full rounded-full bg-gradient-to-r ${tone}`} />
      </div>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Work is progressing steadily with regular updates and evidence review.</p>
    </div>
  );
}

export function FeaturedServicesGrid({ services }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => (
        <motion.div key={service.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-start justify-between">
            <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              <service.icon className="h-5 w-5" />
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">{service.title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const items = [
    { question: 'How do I register a complaint?', answer: 'Open the complaint form, provide details, attach evidence if available, and submit it securely.' },
    { question: 'How do I track my complaint?', answer: 'Use the tracking page with your complaint ID to follow every milestone and officer update.' },
    { question: 'How long does resolution take?', answer: 'Resolution time depends on the department and priority, but JanTrack keeps every step transparent.' },
    { question: 'Can I reopen a complaint?', answer: 'Yes. If the issue is not fully resolved, you can continue the case from your dashboard.' },
  ];

  return (
    <div className="mt-8 space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <button className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left" onClick={() => setOpenIndex(isOpen ? -1 : index)}>
              <span className="font-semibold text-slate-900 dark:text-white">{item.question}</span>
              <ChevronDown className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-4 pb-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function DashboardWidgets({ items }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: index * 0.05 }} whileHover={{ y: -4, scale: 1.01 }} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">{item.title}</p>
            <div className="rounded-2xl bg-slate-100 p-2 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              <item.icon className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{item.value}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.caption}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    Submitted: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
    Verified: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    'In Progress': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    Resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    Closed: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  };

  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${map[status] || map.Submitted}`}><Circle className="h-3.5 w-3.5" />{status}</span>;
}

export function SearchFilterBar({ query, setQuery, filter, setFilter, filters }) {
  return (
    <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:flex-row md:items-center">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by complaint ID, category, department, or location" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200" />
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button key={item.value} onClick={() => setFilter(item.value)} className={`rounded-full px-3 py-2 text-sm font-medium transition ${filter === item.value ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
        <PanelsTopLeft className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function SkeletonCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="mt-4 h-8 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="mt-3 h-3 w-3/4 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="mt-6 animate-pulse overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
      <div className="h-12 bg-slate-100 dark:bg-slate-800" />
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="flex gap-3 border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      ))}
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} className="w-full max-w-2xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </motion.div>
    </div>
  );
}

export function FloatingQuickActions() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex flex-col gap-2 rounded-[24px] border border-slate-200 bg-white/90 p-3 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <Link to="/complaint/new" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
              <FileText className="h-4 w-4" /> Register Complaint
            </Link>
            <Link to="/tracking" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
              <Compass className="h-4 w-4" /> Track Complaint
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
              <MessageSquareText className="h-4 w-4" /> Contact Support
            </Link>
            <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
              <Home className="h-4 w-4" /> Dashboard
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button type="button" onClick={() => setOpen((prev) => !prev)} className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-600/25 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
        {open ? <X className="h-6 w-6" /> : <PlusIcon />}
      </button>
    </div>
  );
}

function PlusIcon() {
  return <span className="text-2xl font-semibold">+</span>;
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const value = height > 0 ? (scrollTop / height) * 100 : 0;
      setProgress(value);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="fixed inset-x-0 top-0 z-[998] h-1 bg-transparent"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-150" style={{ width: `${progress}%` }} /></div>;
}

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-24 right-6 z-[999] flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
