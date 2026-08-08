import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useEffect } from 'react';
import { createComplaintRemote, getComplaints, updateComplaintRemote } from '../services/jantrackApi';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BellRing,
  CheckCircle2,
  Clock3,
  ClipboardList,
  FileText,
  History,
  MessageCircle,
  MessageSquareQuote,
  Radio,
  Sparkles,
  Star,
  TrendingUp,
  UploadCloud,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedStatsSection from '../components/AnimatedStatsSection';
import Card from '../components/Card';
import { ActivityFeed, DashboardWidgets, ProgressCard, StatusBadge } from '../components/ModernComponents';
import { complaintRows } from '../utils/data';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toast';

const monthlySeries = {
  '2024': [
    { name: 'Jan', complaints: 98 },
    { name: 'Feb', complaints: 112 },
    { name: 'Mar', complaints: 128 },
    { name: 'Apr', complaints: 141 },
    { name: 'May', complaints: 132 },
    { name: 'Jun', complaints: 156 },
    { name: 'Jul', complaints: 167 },
    { name: 'Aug', complaints: 149 },
    { name: 'Sep', complaints: 174 },
    { name: 'Oct', complaints: 188 },
    { name: 'Nov', complaints: 196 },
    { name: 'Dec', complaints: 205 },
  ],
  '2025': [
    { name: 'Jan', complaints: 118 },
    { name: 'Feb', complaints: 134 },
    { name: 'Mar', complaints: 151 },
    { name: 'Apr', complaints: 173 },
    { name: 'May', complaints: 164 },
    { name: 'Jun', complaints: 189 },
    { name: 'Jul', complaints: 204 },
    { name: 'Aug', complaints: 196 },
    { name: 'Sep', complaints: 221 },
    { name: 'Oct', complaints: 238 },
    { name: 'Nov', complaints: 252 },
    { name: 'Dec', complaints: 267 },
  ],
};

const weeklyActivity = [
  { day: 'Mon', complaints: 26 },
  { day: 'Tue', complaints: 34 },
  { day: 'Wed', complaints: 29 },
  { day: 'Thu', complaints: 41 },
  { day: 'Fri', complaints: 37 },
  { day: 'Sat', complaints: 49 },
  { day: 'Sun', complaints: 33 },
];

const categoryData = [
  { name: 'Road Damage', complaints: 84 },
  { name: 'Street Light', complaints: 71 },
  { name: 'Water Supply', complaints: 66 },
  { name: 'Garbage', complaints: 58 },
  { name: 'Electricity', complaints: 54 },
  { name: 'Illegal Construction', complaints: 47 },
  { name: 'Transport', complaints: 39 },
  { name: 'Drainage', complaints: 32 },
].sort((a, b) => b.complaints - a.complaints);

const timelineEvents = [
  { title: 'Complaint #1002 Registered', time: '09:12', date: 'Apr 02', status: 'Submitted', icon: FileText },
  { title: 'Assigned to Roads Department', time: '11:05', date: 'Apr 03', status: 'Assigned', icon: ClipboardList },
  { title: 'Officer Inspection Completed', time: '14:30', date: 'Apr 04', status: 'Reviewed', icon: Activity },
  { title: 'Work Started', time: '08:40', date: 'Apr 05', status: 'In Progress', icon: TrendingUp },
  { title: 'Complaint Resolved', time: '16:10', date: 'Apr 06', status: 'Resolved', icon: CheckCircle2 },
  { title: 'Citizen Feedback Submitted', time: '18:20', date: 'Apr 06', status: 'Feedback', icon: MessageSquareQuote },
];

const departmentBreakdown = [
  { name: 'Roads', value: 32, complaints: 128, color: '#2563eb' },
  { name: 'Water', value: 22, complaints: 88, color: '#14b8a6' },
  { name: 'Electricity', value: 18, complaints: 72, color: '#f59e0b' },
  { name: 'Garbage', value: 16, complaints: 64, color: '#8b5cf6' },
  { name: 'Drainage', value: 12, complaints: 48, color: '#f97316' },
];

const statusData = [
  { name: 'Current cycle', Pending: 24, InProgress: 18, Assigned: 16, Resolved: 27, Closed: 15 },
];

const statusColors = {
  Pending: '#f59e0b',
  InProgress: '#3b82f6',
  Assigned: '#8b5cf6',
  Resolved: '#10b981',
  Closed: '#64748b',
};

const insights = [
  { title: 'Total Complaints', value: 1240, suffix: '', comparison: '+14% vs last month', trend: '+14%', positive: true, icon: FileText, accent: 'from-blue-600 to-cyan-500' },
  { title: 'Active Complaints', value: 186, suffix: '', comparison: '+8% vs last month', trend: '+8%', positive: true, icon: AlertCircle, accent: 'from-amber-500 to-orange-500' },
  { title: 'Resolved Today', value: 34, suffix: '', comparison: '-4% vs yesterday', trend: '-4%', positive: false, icon: CheckCircle2, accent: 'from-emerald-500 to-green-500' },
  { title: 'Average Resolution Time', value: 3.6, suffix: ' hrs', comparison: '-11% vs last month', trend: '-11%', positive: true, icon: Clock3, accent: 'from-slate-700 to-slate-500' },
  { title: 'Satisfaction Rate', value: 92, suffix: '%', comparison: '+6% vs last month', trend: '+6%', positive: true, icon: Star, accent: 'from-cyan-600 to-blue-500' },
  { title: 'Active Departments', value: 18, suffix: '', comparison: '+2 vs last month', trend: '+2%', positive: true, icon: Users, accent: 'from-violet-600 to-indigo-500' },
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    location: 'Delhi',
    category: 'Road Damage',
    quote: 'My road repair complaint was resolved within three days. The tracking system kept me informed at every stage. Excellent service!',
    rating: 5,
    resolved: '3 days ago',
    status: 'Resolved',
    initials: 'RS',
  },
  {
    name: 'Neha Verma',
    location: 'Mumbai',
    category: 'Water Supply',
    quote: 'The updates were clear and the response time felt genuinely accountable. I felt heard throughout the process.',
    rating: 5,
    resolved: '1 week ago',
    status: 'Verified',
    initials: 'NV',
  },
  {
    name: 'Arjun R.',
    location: 'Bengaluru',
    category: 'Street Lighting',
    quote: 'Submitting the complaint was simple, and the department followed up quickly. The experience felt trustworthy.',
    rating: 5,
    resolved: '2 weeks ago',
    status: 'Completed',
    initials: 'AR',
  },
];

const statsData = [
  { title: 'Total Complaints Submitted', value: 128, suffix: '', description: 'Civic requests created across the platform', icon: FileText, trend: '+14%', positive: true, accent: 'from-blue-600 to-cyan-500' },
  { title: 'Active Complaints', value: 46, suffix: '', description: 'Cases currently under review or progress', icon: AlertCircle, trend: '+6%', positive: true, accent: 'from-amber-500 to-orange-500' },
  { title: 'Resolved Complaints', value: 95, suffix: '', description: 'Successfully closed and verified requests', icon: CheckCircle2, trend: '+12%', positive: true, accent: 'from-emerald-500 to-green-500' },
  { title: 'Pending Complaints', value: 18, suffix: '', description: 'Awaiting department review or follow-up', icon: ClipboardList, trend: '-3%', positive: false, accent: 'from-violet-600 to-indigo-500' },
  { title: 'Average Resolution Time', value: 4.8, suffix: ' hrs', description: 'Average time needed to reach closure', icon: Clock3, trend: '-18%', positive: true, accent: 'from-slate-700 to-slate-500' },
  { title: 'Feedback Given', value: 92, suffix: '%', description: 'Citizens who shared post-resolution feedback', icon: MessageSquareQuote, trend: '+9%', positive: true, accent: 'from-cyan-600 to-blue-500' },
];

function InsightCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="rounded-[20px] border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/90"
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`rounded-2xl bg-gradient-to-r ${item.accent} p-2.5 text-white shadow-lg`}>
          <Icon className="h-4 w-4" />
        </div>
        <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.positive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'}`}>
          {item.positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {item.trend}
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">{item.title}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
        <CountUp end={item.value} duration={1.2} />{item.suffix}
      </p>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.comparison}</p>
    </motion.div>
  );
}

function ProgressRing({ value, label, unit, color, icon: Icon }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35 }}
      className="rounded-[24px] border border-slate-200 bg-slate-50/90 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
    >
      <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
          <circle cx="60" cy="60" r={radius} stroke="rgba(148, 163, 184, 0.25)" strokeWidth="10" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            {Icon ? <Icon className="h-4 w-4" /> : null}
            <span className="text-2xl font-semibold">{value}%</span>
          </div>
          <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{label}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{unit}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CustomTooltip({ active, payload, total }) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  const label = entry?.name || entry?.dataKey || 'Value';
  const complaints = entry?.value ?? entry?.payload?.[entry?.dataKey] ?? 0;
  const percentage = total ? Math.round((complaints / total) * 100) : null;

  return (
    <div className="rounded-2xl border border-slate-700/70 bg-slate-950/95 px-3 py-2 text-sm shadow-xl">
      <p className="font-semibold text-white">{label}</p>
      <p className="mt-1 text-slate-200">
        Complaints: <span className="font-semibold text-white">{complaints}</span>
      </p>
      {percentage !== null ? (
        <p className="mt-1 text-slate-200">
          Percentage: <span className="font-semibold text-white">{percentage}%</span>
        </p>
      ) : null}
    </div>
  );
}

const RADIAN = Math.PI / 180;

function renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, payload }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const showInside = percent >= 0.12;
  const formattedPercent = `${Math.round(percent * 100)}%`;
  const labelColor = payload?.fill || payload?.color || '#0f172a';

  if (showInside) {
    return (
      <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize={11} fontWeight={700}>
        <tspan x={x} dy="-0.35em">{payload?.name}</tspan>
        <tspan x={x} dy="1.4em">{formattedPercent}</tspan>
      </text>
    );
  }

  const offsetRadius = outerRadius + 26;
  const outerX = cx + offsetRadius * Math.cos(-midAngle * RADIAN);
  const outerY = cy + offsetRadius * Math.sin(-midAngle * RADIAN);
  const textAnchor = outerX > cx ? 'start' : 'end';

  return (
    <text x={outerX} y={outerY} textAnchor={textAnchor} dominantBaseline="central" fill={labelColor} fontSize={11} fontWeight={700}>
      <tspan x={outerX} dy="0">{payload?.name}</tspan>
      <tspan x={outerX} dy="1.4em">{formattedPercent}</tspan>
    </text>
  );
}

function renderCenterLabel({ viewBox }) {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text x={cx} y={cy - 18} textAnchor="middle" dominantBaseline="central" fill="#0f172a" fontSize={14} fontWeight={700}>
        Total
      </text>
      <text x={cx} y={cy + 8} textAnchor="middle" dominantBaseline="central" fill="#0f172a" fontSize={32} fontWeight={800}>
        400
      </text>
      <text x={cx} y={cy + 34} textAnchor="middle" dominantBaseline="central" fill="#475569" fontSize={13} fontWeight={600}>
        Complaints
      </text>
    </g>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('All');
  const [department, setDepartment] = useState('All');
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: '', category: '', description: '', priority: 'Medium' });
  const [feedbackMap, setFeedbackMap] = useState({});

  useEffect(() => {
    getComplaints().then(({ data }) => {
      const filtered = (data.complaints || []).filter((item) => item.citizenId === user?.citizenId || item.citizenName === user?.name);
      setComplaints(filtered);
    });
  }, [user]);

  const handleCreateComplaint = async () => {
    if (!form.title || !form.description) {
      showToast.warning('Incomplete form', 'Please add a complaint title and description.');
      return;
    }

    try {
      const { data } = await createComplaintRemote({
        citizenId: user?.citizenId || 'CTZ1001',
        citizenName: user?.name || 'Citizen User',
        title: form.title,
        category: form.category || 'Other',
        description: form.description,
        priority: form.priority,
        status: 'Pending',
        department: 'Pending Assignment',
        assignedOfficer: 'Unassigned',
        userId: user?.id,
      });

      setComplaints((current) => [data.complaint, ...current]);
      setForm({ title: '', category: '', description: '', priority: 'Medium' });
      showToast.success('Complaint created', `Your case ${data.complaint.id} has been added to your dashboard.`);
    } catch (error) {
      showToast.error('Submission failed', 'We could not save the complaint.');
    }
  };

  const handleFeedback = async (complaintId) => {
    const feedback = feedbackMap[complaintId] || '';
    if (!feedback.trim()) {
      showToast.warning('Feedback required', 'Please add feedback before submitting.');
      return;
    }

    try {
      await updateComplaintRemote(complaintId, { feedback, status: 'Resolved', message: 'Citizen submitted feedback.' });
      const { data } = await getComplaints();
      const filtered = (data.complaints || []).filter((item) => item.citizenId === user?.citizenId || item.citizenName === user?.name);
      setComplaints(filtered);
      setFeedbackMap((current) => ({ ...current, [complaintId]: '' }));
      showToast.success('Feedback submitted', 'Thank you for sharing your experience.');
    } catch (error) {
      showToast.error('Feedback failed', 'We could not save your feedback.');
    }
  };

  const trendData = monthlySeries[year] || monthlySeries['2025'];
  const filteredTrendData = useMemo(() => {
    if (month === 'All') {
      return trendData;
    }
    return trendData.filter((item) => item.name === month);
  }, [month, trendData]);

  const visibleDepartmentData = useMemo(() => {
    if (department === 'All') {
      return departmentBreakdown;
    }
    return departmentBreakdown.filter((item) => item.name === department);
  }, [department]);

  const visibleDepartmentTotal = useMemo(
    () => visibleDepartmentData.reduce((sum, item) => sum + item.complaints, 0),
    [visibleDepartmentData]
  );

  const statusTotal = useMemo(
    () => statusData.reduce((sum, item) => sum + item.Pending + item.InProgress + item.Assigned + item.Resolved + item.Closed, 0),
    []
  );

  const totalComplaints = filteredTrendData.reduce((sum, item) => sum + item.complaints, 0);
  const lastValue = filteredTrendData[filteredTrendData.length - 1]?.complaints ?? 0;
  const previousValue = filteredTrendData[filteredTrendData.length - 2]?.complaints ?? lastValue;
  const growthPercent = previousValue === 0 ? 0 : Math.round(((lastValue - previousValue) / previousValue) * 100);

  const visibleCategories = useMemo(() => {
    if (department === 'All') {
      return categoryData;
    }
    const multiplier = departmentBreakdown.find((item) => item.name === department)?.value ?? 100;
    return categoryData.map((item) => ({ ...item, complaints: Math.round(item.complaints * (multiplier / 100)) }));
  }, [department]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Citizen Dashboard</p>
        <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Your complaints, organized and transparent</span>
        </h1>
      </div>

      <DashboardWidgets items={[
        { title: 'My Complaints', value: '24', caption: 'Active and historical requests', icon: ClipboardList },
        { title: 'Pending Tasks', value: '6', caption: 'Awaiting review or evidence', icon: BellRing },
        { title: 'Notifications', value: '3', caption: 'New updates and official notes', icon: Sparkles },
        { title: 'Profile Completion', value: '87%', caption: 'Your profile is almost complete', icon: FileText },
      ]} />

      <div className="mt-8">
        <AnimatedStatsSection
          eyebrow="Performance Snapshot"
          title="Live civic activity, presented with crisp animated insight."
          description="A polished snapshot of complaint volume, progress, resolution time, and public feedback."
          badge="Updated in real time"
          items={statsData}
        />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-800 sm:p-7"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Analytics Overview</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">A polished government-style dashboard for complaint trends, department performance, and service efficiency.</h2>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 dark:border-slate-600 dark:bg-slate-700 dark:text-cyan-300 dark:hover:bg-slate-600"
          >
            <FileText className="h-4 w-4" /> Export Snapshot
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 rounded-[20px] border border-slate-200 bg-slate-50/90 p-3 dark:border-slate-700 dark:bg-slate-900/70">
          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
            <span className="text-slate-500">Year</span>
            <select value={year} onChange={(event) => setYear(event.target.value)} className="bg-transparent outline-none">
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
            <span className="text-slate-500">Month</span>
            <select value={month} onChange={(event) => setMonth(event.target.value)} className="bg-transparent outline-none">
              <option value="All">All</option>
              <option value="Jan">Jan</option>
              <option value="Feb">Feb</option>
              <option value="Mar">Mar</option>
              <option value="Apr">Apr</option>
              <option value="May">May</option>
              <option value="Jun">Jun</option>
              <option value="Jul">Jul</option>
              <option value="Aug">Aug</option>
              <option value="Sep">Sep</option>
              <option value="Oct">Oct</option>
              <option value="Nov">Nov</option>
              <option value="Dec">Dec</option>
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200">
            <span className="text-slate-500">Department</span>
            <select value={department} onChange={(event) => setDepartment(event.target.value)} className="bg-transparent outline-none">
              <option value="All">All</option>
              {departmentBreakdown.map((item) => (
                <option key={item.name} value={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insights.map((item, index) => (
            <InsightCard key={item.title} item={item} index={index} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <Card className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Monthly Complaint Trend</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Monthly Complaint Registration Trend</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Interactive view of complaint volume with smooth highlights and responsive tooltips.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/70">
                <p className="font-semibold text-slate-900 dark:text-white">{totalComplaints} complaints</p>
                <p className={`mt-1 flex items-center gap-1 text-sm ${growthPercent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {growthPercent >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {growthPercent}% vs previous month
                </p>
              </div>
            </div>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={filteredTrendData}>
                  <defs>
                    <linearGradient id="complaintFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.38} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#94a3b8" strokeDasharray="3 3" strokeOpacity={0.28} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="complaints" stroke="#2563eb" fill="url(#complaintFill)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-600" /> Complaint volume</span>
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Peak period highlighted</span>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Department Distribution</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Service Load by Department</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">A clearer breakdown of complaint concentration across departments.</p>
              </div>
            </div>
            <div className="mt-6 h-[460px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 14, right: 14, bottom: 14, left: 14 }}>
                  <Pie
                    data={visibleDepartmentData}
                    dataKey="complaints"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="90%"
                    paddingAngle={2}
                    cornerRadius={18}
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {visibleDepartmentData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                    <Label position="center" content={renderCenterLabel} />
                  </Pie>
                  <Tooltip content={<CustomTooltip total={visibleDepartmentTotal} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Complaint Status</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Service Status Distribution</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">A clear horizontal view of pending, in-progress, assigned, resolved and closed cases.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/70">
                <p className="font-semibold text-slate-900 dark:text-white">Current Cycle</p>
                <p className="text-emerald-600 dark:text-emerald-400">92% completed</p>
              </div>
            </div>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} layout="vertical" margin={{ top: 6, right: 16, left: 12, bottom: 6 }}>
                  <CartesianGrid stroke="#94a3b8" strokeDasharray="3 3" strokeOpacity={0.22} />
                  <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip shared={false} content={<CustomTooltip total={statusTotal} />} />
                  {Object.entries(statusColors).map(([key, color]) => (
                    <Bar key={key} dataKey={key} stackId="a" fill={color} radius={[0, 10, 10, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
              {Object.entries(statusColors).map(([key, color]) => (
                <span key={key} className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 dark:bg-slate-900/70">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                  {key}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Complaint Categories</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Top Service Requests</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Highest-volume civic issues identified across the municipal network.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900/70">
                <p className="font-semibold text-slate-900 dark:text-white">Sorted</p>
                <p className="text-blue-600 dark:text-cyan-400">Highest to lowest</p>
              </div>
            </div>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visibleCategories} layout="vertical" margin={{ top: 6, right: 16, left: 12, bottom: 6 }}>
                  <CartesianGrid stroke="#94a3b8" strokeDasharray="3 3" strokeOpacity={0.22} />
                  <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={120} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="complaints" fill="#2563eb" radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Weekly Complaint Activity</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Complaints Registered Each Day</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">A responsive bar chart that highlights peak activity across the week.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/70">
                <p className="font-semibold text-slate-900 dark:text-white">Peak day</p>
                <p className="text-blue-600 dark:text-cyan-400">Saturday</p>
              </div>
            </div>
            <div className="mt-6 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid stroke="#94a3b8" strokeDasharray="3 3" strokeOpacity={0.22} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="complaints" fill="#0f766e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Resolution Performance</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Service Efficiency Indicators</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Animated circular metrics for response quality and resolution reliability.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-900/70">
                <p className="font-semibold text-slate-900 dark:text-white">Live</p>
                <p className="text-emerald-600 dark:text-emerald-400">Updated now</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ProgressRing value={86} label="Resolution Rate" unit="effective closure" color="#2563eb" icon={CheckCircle2} />
              <ProgressRing value={92} label="Citizen Satisfaction" unit="positive reviews" color="#10b981" icon={Star} />
              <ProgressRing value={74} label="Average Response Time" unit="hours to first action" color="#f59e0b" icon={Clock3} />
              <ProgressRing value={89} label="Department Efficiency" unit="service delivery" color="#8b5cf6" icon={Activity} />
            </div>
          </Card>
        </div>

        <Card className="mt-6 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Recent Activity Timeline</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Latest complaint lifecycle updates</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">A structured view of the latest actions and milestones in the complaint journey.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/70">
              <p className="font-semibold text-slate-900 dark:text-white">Latest milestone</p>
              <p className="text-blue-600 dark:text-cyan-400">Citizen feedback submitted</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
                  className="flex flex-col gap-3 rounded-[20px] border border-slate-200 bg-slate-50/90 p-4 md:flex-row md:items-center md:justify-between dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{event.title}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{event.date} • {event.time}</p>
                    </div>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    {event.status}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-800 sm:p-7"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Citizen Testimonials</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Real experiences shared by citizens who have successfully used JanTrack to report and resolve civic issues.</h2>
          </div>
          <Link to="/register" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 dark:border-slate-600 dark:bg-slate-700 dark:text-cyan-300 dark:hover:bg-slate-600">
            <MessageCircle className="h-4 w-4" /> Share Your Experience
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.article
              key={testimonial.name}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 shadow-sm transition dark:border-slate-700 dark:bg-slate-900/70"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-semibold text-white">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{testimonial.location}</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{testimonial.status}</span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-amber-500">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-white px-2.5 py-1 dark:bg-slate-800">{testimonial.category}</span>
                <span className="rounded-full bg-white px-2.5 py-1 dark:bg-slate-800">Resolved {testimonial.resolved}</span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">“{testimonial.quote}”</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-800 sm:p-7"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Citizen Benefits</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Everything you need to report, track, and manage your civic complaints from one personalized dashboard.</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[
            { title: 'Easy Complaint Registration', description: 'Submit complaints in just a few steps with photo and location support.', icon: FileText },
            { title: 'Live Complaint Tracking', description: 'Track every stage of your complaint in real time.', icon: Radio },
            { title: 'Secure Document Upload', description: 'Attach evidence securely with photos, videos, and documents.', icon: UploadCloud },
            { title: 'Instant Notifications', description: 'Receive updates whenever your complaint status changes.', icon: Bell },
            { title: 'Complaint History', description: 'Access all previously submitted complaints from one place.', icon: History },
            { title: 'Feedback & Ratings', description: 'Rate the resolution process and help improve public services.', icon: MessageSquareQuote },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-slate-50/80 p-5 shadow-sm transition hover:border-blue-200 hover:shadow-[0_20px_40px_-22px_rgba(37,99,235,0.35)] dark:border-slate-700 dark:bg-slate-900/70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ProgressCard percent={82} label="Work In Progress" />
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Recent activity</h2>
            <span className="text-sm font-semibold text-blue-600 dark:text-cyan-400">Live</span>
          </div>
          <ActivityFeed items={[
            { title: 'Complaint #1024 submitted', description: 'Your complaint was captured successfully and assigned for review.', time: '2 mins ago', icon: FileText },
            { title: 'Officer assigned', description: 'A civic officer is now reviewing the case.', time: '10 mins ago', icon: CheckCircle2 },
            { title: 'Complaint resolved', description: 'The issue was resolved and is awaiting your feedback.', time: '1 hour ago', icon: Sparkles },
          ]} />
        </Card>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Recent complaints</h2>
            <a href="/details" className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">View details</a>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Complaint ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {complaintRows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.id}</td>
                    <td className="px-4 py-3 text-slate-600">{row.title}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Notifications</h2>
          <div className="mt-6 space-y-4">
            {[
              ['Success', 'Your evidence was verified.', 'bg-emerald-100 text-emerald-700'],
              ['Warning', 'Deadline is approaching for 3 complaints.', 'bg-amber-100 text-amber-700'],
              ['Pending', 'Awaiting officer review for JNT-1051.', 'bg-slate-100 text-slate-700'],
            ].map(([label, message, tone]) => (
              <div key={message} className="rounded-2xl border border-slate-200 p-4">
                <p className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{label}</p>
                <p className="mt-2 text-sm text-slate-700">{message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
