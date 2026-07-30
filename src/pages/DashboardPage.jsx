import { BarChart, Bar, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { BellRing, CheckCircle2, ClipboardList, FileText, Sparkles } from 'lucide-react';
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

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['My Complaints', '24'],
          ['Resolved', '18'],
          ['Pending', '6'],
          ['Avg. Resolution', '4.8 days'],
        ].map(([label, value]) => (
          <Card key={label}>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">{label}</p>
            <p className={`mt-3 text-4xl font-bold tracking-tight ${label === 'Complaints' ? 'text-blue-600' : label === 'Resolved' ? 'text-emerald-600' : label === 'Pending' ? 'text-orange-500' : label === 'Departments' ? 'text-violet-600' : label === 'Avg. Resolution' ? 'text-cyan-600' : 'text-slate-900 dark:text-white'}`}>{value}</p>
          </Card>
        ))}
      </div>

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
