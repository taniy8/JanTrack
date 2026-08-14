import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FiBarChart2, FiCheckCircle, FiClock, FiFileText, FiMapPin, FiMonitor, FiShield, FiUserCheck, FiUsers, FiZap } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AnimatedCounter from '../components/AnimatedCounter';
import Button from '../components/Button';
import HomeCategoryPanel from '../components/HomeCategoryPanel';
import heroBackground from '../assets/complaint tracking.webp';
import { complaintCategories, recentActivityMock } from '../data/homePageData';
import { getComplaints } from '../services/jantrackApi';
import { getStoredComplaints } from '../utils/dashboardData';

const statusGroups = [
  { name: 'Registered', values: ['Submitted', 'Pending'], color: '#38bdf8' },
  { name: 'Under Review', values: ['In Review', 'Under review'], color: '#818cf8' },
  { name: 'Assigned', values: ['Assigned'], color: '#22d3ee' },
  { name: 'In Progress', values: ['In Progress', 'Escalated'], color: '#fb923c' },
  { name: 'Resolved', values: ['Resolved', 'Completed', 'Verified', 'Closed'], color: '#34d399' },
];

const categoryLabelMap = {
  'Road Damage': 'Roads & Infrastructure',
  'Water Supply': 'Water Supply',
  Electricity: 'Electricity',
  'Garbage Collection': 'Garbage & Sanitation',
  Garbage: 'Garbage & Sanitation',
  Drainage: 'Garbage & Sanitation',
  'Street Light': 'Street Lights',
  Transport: 'Traffic & Transport',
  'Illegal Construction': 'Public Health',
  'Government Offices': 'Public Health',
  Other: 'Public Health',
};

const dashboardCategories = [
  'Roads & Infrastructure',
  'Water Supply',
  'Electricity',
  'Garbage & Sanitation',
  'Street Lights',
  'Traffic & Transport',
  'Public Health',
  'Parks & Environment',
];

const platformStats = [
  { id: 'total-complaints', label: 'Total Complaints', value: 128450, suffix: '+', description: 'Complaints registered through JanTrack', icon: FiFileText, accent: 'from-blue-600 to-cyan-500' },
  { id: 'resolved-complaints', label: 'Resolved Complaints', value: 98720, suffix: '+', description: 'Resolved efficiently across departments', icon: FiCheckCircle, accent: 'from-emerald-500 to-teal-500' },
  { id: 'active-complaints', label: 'Active Complaints', value: 18630, suffix: '+', description: 'Live service requests currently under review', icon: FiBarChart2, accent: 'from-violet-500 to-fuchsia-500' },
  { id: 'citizens', label: 'Registered Citizens', value: 245800, suffix: '+', description: 'Residents actively engaging with civic services', icon: FiUsers, accent: 'from-sky-500 to-blue-500' },
  { id: 'departments', label: 'Government Departments', value: 45, suffix: '+', description: 'Departments connected to the civic platform', icon: FiShield, accent: 'from-cyan-500 to-sky-500' },
  { id: 'resolution-rate', label: 'Resolution Rate', value: 76.8, suffix: '%', decimals: 1, description: 'Average case completion across departments', icon: FiZap, accent: 'from-amber-500 to-orange-500' },
];

const impactMetrics = [
  { label: 'Average Resolution Time', value: 3.2, suffix: ' Days', decimals: 1, description: 'Faster turnaround than previous years' },
  { label: 'Citizen Satisfaction', value: 92.4, suffix: '%', decimals: 1, description: 'Public trust remains strong across services' },
  { label: 'Complaints This Month', value: 12840, suffix: '', description: 'New service requests filed this month' },
];

const departmentOverview = [
  { name: 'Public Works', value: 89 },
  { name: 'Sanitation', value: 84 },
  { name: 'Electricity', value: 81 },
  { name: 'Water Supply', value: 78 },
];

const quickActions = [
  { id: 'register', label: 'Register Complaint', route: '/complaint/new', icon: FiFileText },
  { id: 'track', label: 'Track Complaint', route: '/tracking', icon: FiClock },
  { id: 'departments', label: 'Departments', route: '/departments', icon: FiShield },
  { id: 'analytics', label: 'View Analytics', action: 'analytics', icon: FiBarChart2 },
];

const categoryBreakdown = [
  { name: 'Road Damage', value: 32 },
  { name: 'Garbage Collection', value: 24 },
  { name: 'Street Light', value: 18 },
  { name: 'Water Supply', value: 14 },
  { name: 'Other', value: 12 },
];

const progressByStatus = {
  Submitted: 10,
  Pending: 20,
  'In Review': 40,
  'Under review': 40,
  Assigned: 55,
  'In Progress': 70,
  Escalated: 65,
  Resolved: 100,
  Completed: 100,
  Verified: 100,
  Closed: 100,
};

function getProgressValue(status) {
  return progressByStatus[status] || 30;
}

function getDateValue(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function countRecentComplaints(complaints, days) {
  const now = new Date().getTime();
  const threshold = now - (days || 0) * 24 * 60 * 60 * 1000;
  return complaints.filter((item) => {
    const date = getDateValue(item.createdAt);
    return date && date.getTime() >= threshold;
  }).length;
}

function getRangeCount(complaints, start, end) {
  return complaints.filter((item) => {
    const date = getDateValue(item.createdAt);
    return date && date >= start && date < end;
  }).length;
}

function getTrendValue(current, previous) {
  if (previous === 0) return { direction: 'New', value: current ? '100' : '0', label: 'New period' };
  const diff = current - previous;
  const pct = Math.round((Math.abs(diff) / previous) * 100);
  return { direction: diff >= 0 ? '↑' : '↓', value: pct || 0, label: `${diff >= 0 ? 'Up' : 'Down'} ${pct}% from prior period` };
}


function buildStatusChartData(complaints) {
  return statusGroups.map((group) => ({ name: group.name, value: complaints.filter((item) => group.values.includes(item.status)).length, color: group.color }));
}

function buildCategoryChartData(complaints) {
  const counts = complaints.reduce((acc, complaint) => {
    const label = categoryLabelMap[complaint.category] || 'Public Health';
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  return dashboardCategories.map((name) => ({ name, value: counts[name] || 0 }));
}

function buildResolutionPerformance(complaints) {
  const total = complaints.length || 1;
  const resolved = complaints.filter((item) => ['Resolved', 'Completed', 'Verified', 'Closed'].includes(item.status)).length;
  const pending = complaints.filter((item) => ['Submitted', 'Pending', 'In Review', 'Under review', 'Assigned'].includes(item.status)).length;
  const overdue = complaints.filter((item) => {
    const date = getDateValue(item.createdAt);
    return date && !['Resolved', 'Completed', 'Verified', 'Closed'].includes(item.status) && (new Date().getTime() - date.getTime() > 14 * 24 * 60 * 60 * 1000);
  }).length;
  const progressSum = complaints.reduce((sum, complaint) => sum + getProgressValue(complaint.status), 0);
  const average = Math.round(progressSum / total);

  return {
    resolutionRate: Math.round((resolved / total) * 100),
    averageProgress: average,
    pending,
    overdue,
    resolved,
    total,
  };
}

function buildRecentActivity(complaints) {
  return [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6)
    .map((item) => ({
      id: item.id,
      category: item.category || 'Other',
      status: item.status,
      progress: getProgressValue(item.status),
      location: item.location || 'Unknown location',
      createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '-',
    }));
}

function buildDepartmentPerformance(complaints) {
  const departments = complaints.reduce((acc, complaint) => {
    const name = complaint.department || 'Unassigned';
    const department = acc[name] || { name, total: 0, resolved: 0, scoreSum: 0 };
    department.total += 1;
    if (['Resolved', 'Completed', 'Verified', 'Closed'].includes(complaint.status)) {
      department.resolved += 1;
    }
    department.scoreSum += getProgressValue(complaint.status);
    acc[name] = department;
    return acc;
  }, {});

  return Object.values(departments)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      completionRate: item.total ? Math.round((item.resolved / item.total) * 100) : 0,
      averageProgress: item.total ? Math.round(item.scoreSum / item.total) : 0,
    }));
}

function getActivityTitle(status, category) {
  if (['Resolved', 'Completed', 'Verified', 'Closed'].includes(status)) {
    return `${category} complaint marked as Resolved`;
  }

  if (['Assigned'].includes(status)) {
    return `${category} complaint assigned to Public Works`;
  }

  if (['Submitted', 'Pending'].includes(status)) {
    return `${category} complaint registered`;
  }

  return `${category} complaint status updated`;
}

function getActivityIcon(status) {
  if (['Resolved', 'Completed', 'Verified', 'Closed'].includes(status)) {
    return FiCheckCircle;
  }

  if (['Assigned'].includes(status)) {
    return FiUserCheck;
  }

  if (['Submitted', 'Pending', 'In Review', 'Under review'].includes(status)) {
    return FiMapPin;
  }

  return FiClock;
}

function formatRelativeTime(createdAt, index) {
  const date = getDateValue(createdAt);
  if (!date) return recentActivityMock[index]?.time ?? 'Just now';
  const diffMinutes = Math.max(1, Math.round((new Date().getTime() - date.getTime()) / 60000));
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  return `${Math.round(diffMinutes / 60)} hr ago`;
}

function buildRecentComplaints(complaints) {
  return [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map((item) => ({
      id: item.id,
      category: item.category || 'Other',
      location: item.location || 'Unknown location',
      status: item.status,
      createdAt: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '-',
      progress: getProgressValue(item.status),
    }));
}


export default function HomePage() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState(() => getStoredComplaints());
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  const recentActivity = useMemo(() => {
    if (!complaints || !complaints.length) {
      return recentActivityMock;
    }

    const activity = [...complaints]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((item, index) => ({
        id: item.id || `activity-${index}`,
        title: getActivityTitle(item.status || 'Pending', item.category || 'Complaint'),
        time: formatRelativeTime(item.createdAt, index),
        icon: getActivityIcon(item.status || 'Pending'),
      }));

    return activity.length ? activity : recentActivityMock;
  }, [complaints]);

  const scrollToAnalytics = () => {
    const target = document.getElementById('home-analytics');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate('/#analytics');
  };

  const handleQuickAction = (action) => {
    if (action.action === 'analytics') {
      scrollToAnalytics();
      return;
    }

    if (action.route) {
      navigate(action.route);
    }
  };

  useEffect(() => {
    getComplaints()
      .then(({ data }) => {
        if (Array.isArray(data?.complaints) && data.complaints.length) {
          setComplaints(data.complaints);
        }
      })
      .catch(() => {})
      .finally(() => setAnalyticsLoading(false));
  }, []);

  const statusChartData = useMemo(() => buildStatusChartData(complaints), [complaints]);
  const categoryChartData = useMemo(() => buildCategoryChartData(complaints), [complaints]);
  const resolutionPerformance = useMemo(() => buildResolutionPerformance(complaints), [complaints]);
  const departmentPerformance = useMemo(() => buildDepartmentPerformance(complaints), [complaints]);
  const complaintsThisWeek = useMemo(() => countRecentComplaints(complaints, 7), [complaints]);
  const activeDepartments = useMemo(() => new Set(complaints.map((item) => item.department || 'Unassigned')).size, [complaints]);
  const resolvedCount = useMemo(() => complaints.filter((item) => ['Resolved', 'Completed', 'Verified', 'Closed'].includes(item.status)).length, [complaints]);
  const recentComplaints = useMemo(() => buildRecentComplaints(complaints), [complaints]);

  function CustomTooltip({ active, payload }) {
    if (!active || !payload || !payload.length) return null;
    const entry = payload[0];
    return (
      <div className="rounded-[20px] border border-[color:var(--border)] bg-[var(--surface)] p-3 text-sm shadow-[var(--shadow)]">
        <p className="font-semibold text-[var(--text)]">{entry?.name || entry?.payload?.name}</p>
        <p className="mt-1 text-[var(--text-secondary)]">Complaints: <span className="font-semibold text-[var(--text)]">{entry?.value ?? entry?.payload?.value ?? 0}</span></p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-visible bg-[var(--page)] pb-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-12 top-16 h-56 w-56 rounded-full bg-slate-100 blur-3xl" />
        <div className="absolute right-0 top-28 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-slate-100 blur-3xl" />
      </div>

      <div className="relative mx-0 flex w-full flex-col gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:px-6 lg:py-4 xl:py-5">
        <div className="w-full lg:grid lg:grid-cols-[minmax(260px,28%)_minmax(0,72%)] lg:items-start lg:gap-5 xl:gap-6">
          <aside className="mb-4 w-full lg:mb-0 lg:sticky lg:top-24 lg:self-start">
            <div className="h-full rounded-[24px] border border-[color:var(--border)] bg-[var(--sidebar)] p-2.5 shadow-[var(--shadow)] sm:p-3 lg:overflow-visible">
              <HomeCategoryPanel categories={complaintCategories} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-4 overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[var(--sidebar)] p-4 shadow-[var(--shadow)] sm:p-5"
            >
              <div className="flex items-center justify-between">
                <p className="home-section-title text-sm">Quick Actions</p>
              </div>
              <div className="mt-4 grid gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => handleQuickAction(action)}
                      className="group flex items-center justify-between rounded-[18px] border border-[color:var(--border)] bg-[var(--surface)] px-4 py-3 text-left text-sm font-semibold text-[var(--text)] transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--border)] hover:bg-[var(--surface-strong)] focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    >
                      <span>{action.label}</span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-soft)] text-[var(--text-secondary)] transition duration-200 group-hover:bg-[var(--surface)]">
                        <Icon className="h-5 w-5" />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-[color:var(--border)] pt-5">
                <p className="home-section-title text-sm">Recent Activity</p>
                <div className="mt-4 space-y-3">
                  {recentActivity.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                        className="flex items-start justify-between gap-3 rounded-[18px] border border-[color:var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow)]"
                      >
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-cyan-500/10 dark:text-cyan-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[var(--text)]">{item.title}</p>
                          <p className="mt-1 text-xs text-[var(--text-secondary)]">{item.time}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </aside>

          <div className="flex w-full min-w-0 flex-1 flex-col gap-6 lg:row-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="relative isolate w-full overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-transparent p-0 text-[var(--text)] shadow-none sm:p-0"
              style={{ minHeight: 'clamp(320px, 60vh, 440px)' }}
            >
              <div
                className="absolute inset-0 z-0 rounded-[24px] home-hero-bg"
                style={{
                  backgroundImage: `url(${heroBackground})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/8 via-transparent to-black/6 dark:from-black/30 dark:via-transparent dark:to-black/20 pointer-events-none" />
              <div className="relative z-20 flex h-full max-w-2xl flex-col justify-start gap-4 px-5 pb-6 pt-5 sm:px-8 sm:pb-7 sm:pt-6 lg:px-9 lg:pb-8 lg:pt-7 xl:pt-8">
                <div className="max-w-2xl border-none bg-transparent p-0 shadow-none backdrop-blur-none">
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <p className="home-section-title text-sm">Welcome to JanTrack</p>
                      <h1 className="home-hero-title mt-2 text-2xl font-semibold tracking-[-0.03em] sm:mt-3 sm:text-3xl lg:text-4xl drop-shadow-md">Your Voice. Your Complaint. Your Community.</h1>
                      <p className="home-body-copy mt-3 text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7 lg:text-lg drop-shadow-sm">JanTrack makes it easier to report public issues, track complaints, and stay informed about their resolution.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button type="button" onClick={() => navigate('/complaint/new')} aria-label="Register a new complaint">Register Complaint</Button>
                      <Button type="button" variant="secondary" onClick={() => navigate('/tracking')} aria-label="Track an existing complaint">Track Complaint</Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.section
              id="home-analytics"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-7"
            >
              <div className="rounded-[28px] border border-[color:var(--border)] bg-[var(--surface-strong)] p-5 shadow-[var(--shadow)] sm:p-7 lg:p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="home-section-title text-sm">JanTrack at a Glance</p>
                    <h2 className="home-subheading mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Real-time civic engagement and complaint resolution insights.</h2>
                    <p className="home-body-copy mt-4 text-base leading-7">A professional analytics snapshot that highlights service demand, resolution efficiency, and citizen participation across the platform.</p>
                  </div>
                  <span className="inline-flex rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]">Live civic metrics</span>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {platformStats.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.article
                          key={item.id}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.25 }}
                          transition={{ duration: 0.45, delay: index * 0.08 }}
                          whileHover={{ y: -4, scale: 1.01 }}
                          className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]"
                        >
                        <div className="flex items-start justify-between gap-4">
                          <div className={`rounded-2xl bg-gradient-to-r ${item.accent} p-3 text-white`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)]">Snapshot</span>
                        </div>
                        <div className="mt-6">
                          <p className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
                            <AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.decimals || 0} />
                          </p>
                          <p className="mt-3 text-lg font-semibold text-[var(--text)]">{item.label}</p>
                          <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)]">Impact overview</p>
                        <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">Performance indicators</h3>
                      </div>
                      <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm font-semibold text-[var(--text-secondary)]">Quarterly outlook</span>
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      {impactMetrics.map((item) => (
                        <div key={item.label} className="rounded-[20px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-4">
                          <p className="text-2xl font-semibold text-[var(--text)]">
                            <AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.decimals || 0} />
                          </p>
                          <p className="mt-2 text-sm font-semibold text-[var(--text)]">{item.label}</p>
                          <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)]">Department performance</p>
                        <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">Service efficiency by unit</h3>
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      {departmentOverview.map((item) => (
                        <div key={item.name}>
                          <div className="flex items-center justify-between text-sm font-semibold text-[var(--text)]">
                            <span>{item.name}</span>
                            <span>{item.value}%</span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                            <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" style={{ width: `${item.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-secondary)]">Complaint categories</p>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">Most common issue types</h3>
                    </div>
                    <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm font-semibold text-[var(--text-secondary)]">Updated monthly</span>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                    {categoryBreakdown.map((item) => (
                      <div key={item.name} className="rounded-[20px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-4">
                        <p className="text-2xl font-semibold text-[var(--text)]">{item.value}%</p>
                        <p className="mt-2 text-sm font-semibold text-[var(--text)]">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="w-full">
                  <p className="home-section-title text-sm">Complaint Overview</p>
                  <h2 className="home-subheading mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Analytics-driven insights across JanTrack complaint operations.</h2>
                </div>
                <span className="inline-flex rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]">{analyticsLoading ? 'Loading...' : `${complaints.length} complaints tracked`}</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">Total complaints</p>
                  <p className="mt-3 text-3xl font-semibold text-[var(--text)]">{complaints.length.toLocaleString()}</p>
                  <p className="home-body-copy mt-3 text-sm leading-6 text-[var(--text-secondary)]">Total cases in the JanTrack system.</p>
                </div>
                <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">This week</p>
                  <p className="mt-3 text-3xl font-semibold text-[var(--text)]">{complaintsThisWeek.toLocaleString()}</p>
                  <p className="home-body-copy mt-3 text-sm leading-6 text-[var(--text-secondary)]">Complaints created in the last 7 days.</p>
                </div>
                <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">Resolved rate</p>
                  <p className="mt-3 text-3xl font-semibold text-[var(--text)]">{resolvedCount ? `${Math.round((resolvedCount / complaints.length) * 100)}%` : '0%'}</p>
                  <p className="home-body-copy mt-3 text-sm leading-6 text-[var(--text-secondary)]">Share of complaints marked resolved.</p>
                </div>
                <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-5">
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">Departments active</p>
                  <p className="mt-3 text-3xl font-semibold text-[var(--text)]">{activeDepartments}</p>
                  <p className="home-body-copy mt-3 text-sm leading-6 text-[var(--text-secondary)]">Distinct departments handling cases.</p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="home-section-title text-sm">Complaint Status</p>
                      <h3 className="home-subheading mt-2 text-xl font-semibold">Status breakdown</h3>
                    </div>
                    <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm font-semibold text-[var(--text-secondary)]">Live state counts</span>
                  </div>
                  <div className="mt-6 h-[340px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusChartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={68}
                          outerRadius={100}
                          paddingAngle={4}
                          stroke="transparent"
                        >
                          {statusChartData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {statusChartData.map((entry) => (
                      <div key={entry.name} className="rounded-2xl border border-[color:var(--border)] bg-[var(--surface-soft)] p-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-semibold text-[var(--text)]">{entry.name}</span>
                          <span className="text-sm font-semibold text-[var(--text-secondary)]">{entry.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="home-section-title text-sm">Department performance</p>
                      <h3 className="home-subheading mt-2 text-xl font-semibold">Top scoring teams</h3>
                    </div>
                    <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm font-semibold text-[var(--text-secondary)]">Top 5 by volume</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {departmentPerformance.map((item) => (
                      <div key={item.name} className="rounded-[20px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[var(--text)]">{item.name}</p>
                            <p className="mt-1 text-xs text-[var(--text-secondary)]">{item.total} complaints · {item.averageProgress}% avg progress</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-[var(--text)]">{item.completionRate}% closed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="home-section-title text-sm">Category distribution</p>
                      <h3 className="home-subheading mt-2 text-xl font-semibold">Volume by category</h3>
                    </div>
                    <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm font-semibold text-[var(--text-secondary)]">Real case counts</span>
                  </div>
                  <div className="mt-6 h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryChartData} layout="vertical" margin={{ top: 0, right: 4, left: 0, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={120} style={{ fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" radius={[10, 10, 10, 10]} fill="#2563eb">
                          {categoryChartData.map((entry) => (
                            <Cell key={entry.name} fill="#2563eb" />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)]">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="home-section-title text-sm">Recent complaint activity</p>
                      <h3 className="home-subheading mt-2 text-xl font-semibold">Latest case updates</h3>
                    </div>
                    <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-sm font-semibold text-[var(--text-secondary)]">Most recent 5 cases</span>
                  </div>
                  <div className="mt-6 space-y-3">
                    {recentComplaints.length ? recentComplaints.map((item) => (
                      <div key={item.id} className="rounded-[20px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-[var(--text)]">{item.id}</p>
                            <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.category} • {item.createdAt}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-[var(--text)]">{item.status}</span>
                        </div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-500" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-[var(--text-secondary)]">No recent complaint activity is available yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
