import { motion } from 'framer-motion';
import { BarChart, Bar, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { BellRing, CheckCircle2, ClipboardList, FileText, Sparkles, Star, MessageCircle, UploadCloud, Radio, Bell, History, MessageSquareQuote, Clock3, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedStatsSection from '../components/AnimatedStatsSection';
import Card from '../components/Card';
import { ActivityFeed, DashboardWidgets, ProgressCard, StatusBadge } from '../components/ModernComponents';
import { complaintRows } from '../utils/data';

const lineData = [
  { name: 'Jan', complaints: 120 },
  { name: 'Feb', complaints: 145 },
  { name: 'Mar', complaints: 168 },
  { name: 'Apr', complaints: 190 },
  { name: 'May', complaints: 176 },
  { name: 'Jun', complaints: 210 },
];

const deptData = [
  { name: 'Public Works', value: 42 },
  { name: 'Water', value: 24 },
  { name: 'Electricity', value: 18 },
  { name: 'Sanitation', value: 16 },
];

const pieColors = ['#2563eb', '#16a34a', '#f59e0b', '#64748b'];

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

export default function DashboardPage() {

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

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Complaint trend</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">Monthly filing volume</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#f8fafc' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#f8fafc' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#475569', color: '#f8fafc' }} />
                <Line type="monotone" dataKey="complaints" stroke="#60a5fa" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Department distribution</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deptData} dataKey="value" nameKey="name" outerRadius={90} innerRadius={60}>
                  {deptData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
