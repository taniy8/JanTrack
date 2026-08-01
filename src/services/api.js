import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const mockData = {
  home: {
    announcement: { message: 'Planned maintenance is scheduled for Sunday from 2 AM to 4 AM for service upgrades.' },
    platformLabel: 'Government Complaint Transparency Platform',
    heroTitle: 'JanTrack – Smart Citizen Complaint Management System',
    heroSubtitle: 'Report civic issues, track complaint status in real time, and contribute towards transparent, accountable, and efficient public governance.',
    heroSummaryCards: [
      { label: 'Live complaint intake', icon: 'ShieldCheck' },
      { label: 'Real-time updates', icon: 'Layers3' },
      { label: 'Transparent routing', icon: 'ShieldCheck' },
      { label: 'Faster resolutions', icon: 'Layers3' },
    ],
  },
  categories: [
    { id: 1, name: 'Road and Traffic', description: 'Potholes, signage, and traffic issues', slug: 'road-and-traffic', image: '/src/assets/images/water supply.avif' },
    { id: 2, name: 'Water Supply', description: 'Leakages and service interruptions', slug: 'water-supply', image: '/src/assets/images/water supply.avif' },
    { id: 3, name: 'Waste Management', description: 'Overflowing bins and missed pickups', slug: 'waste-management', image: '/src/assets/images/water supply.avif' },
  ],
  features: [
    { title: 'Transparent tracking', description: 'Watch each complaint move through the pipeline with full visibility.', route: '/features/transparent-tracking', icon: 'ShieldCheck' },
    { title: 'Real-time updates', description: 'Receive alerts whenever a department changes the status.', route: '/features/real-time-updates', icon: 'Zap' },
    { title: 'Secure complaint filing', description: 'Protect every case with verified citizen and department records.', route: '/features/secure-complaints', icon: 'Shield' },
    { title: 'Live status visibility', description: 'See response timing, officer assignments, and evidence logs.', route: '/features/live-status', icon: 'Activity' },
  ],
  departments: [
    { name: 'Public Works', service: 'Roads, drains, and civic maintenance', status: 'High Availability', total: 142, pending: 24, resolved: 118, icon: 'Building2' },
    { name: 'Water Supply', service: 'Leakage reporting and pipeline inspection', status: 'Responsive', total: 86, pending: 11, resolved: 75, icon: 'Droplets' },
    { name: 'Electricity', service: 'Street lights and infrastructure faults', status: 'Priority Queue', total: 67, pending: 7, resolved: 60, icon: 'Zap' },
    { name: 'Sanitation', service: 'Garbage, waste, and public hygiene', status: 'Online', total: 94, pending: 19, resolved: 75, icon: 'Trash2' },
  ],
  complaints: [
    {
      id: 'JNT-1042',
      title: 'Streetlight outage near main market',
      status: 'Resolved',
      priority: 'High',
      timeline: [
        { title: 'Complaint filed', officer: 'Citizen portal', remark: 'Issue captured successfully.', done: true },
        { title: 'Assigned to field team', officer: 'Officer Priya', remark: 'Escalated to the electrical division.', done: true },
        { title: 'Inspection completed', officer: 'Inspector Ramesh', remark: 'Faulty lamp replaced and verified.', done: true },
        { title: 'Resolved', officer: 'Supervisor Nair', remark: 'Citizen notified with proof of completion.', done: true },
      ],
    },
  ],
  dashboard: {
    stats: [
      { title: 'My Complaints', value: '24', caption: 'Active and historical requests', icon: 'ClipboardList' },
      { title: 'Pending Tasks', value: '6', caption: 'Awaiting review or evidence', icon: 'BellRing' },
      { title: 'Notifications', value: '3', caption: 'New updates and official notes', icon: 'Sparkles' },
      { title: 'Profile Completion', value: '87%', caption: 'Your profile is almost complete', icon: 'FileText' },
    ],
    lineData: [
      { name: 'Jan', complaints: 120 },
      { name: 'Feb', complaints: 145 },
      { name: 'Mar', complaints: 168 },
      { name: 'Apr', complaints: 190 },
      { name: 'May', complaints: 176 },
      { name: 'Jun', complaints: 210 },
    ],
    deptData: [
      { name: 'Public Works', value: 42 },
      { name: 'Water', value: 24 },
      { name: 'Electricity', value: 18 },
      { name: 'Sanitation', value: 16 },
    ],
    complaints: [
      { id: 'JNT-1024', title: 'Water leakage at park road', status: 'In Review', priority: 'Medium' },
      { id: 'JNT-1042', title: 'Streetlight outage near main market', status: 'Resolved', priority: 'High' },
      { id: 'JNT-1051', title: 'Garbage overflow near bus stand', status: 'Pending', priority: 'Low' },
    ],
    notifications: [
      { title: 'Success', message: 'Your evidence was verified.', tone: 'bg-emerald-100 text-emerald-700' },
      { title: 'Warning', message: 'Deadline is approaching for 3 complaints.', tone: 'bg-amber-100 text-amber-700' },
      { title: 'Pending', message: 'Awaiting officer review for JNT-1051.', tone: 'bg-slate-100 text-slate-700' },
    ],
    activityFeed: [
      { title: 'Complaint #1024 submitted', description: 'Your complaint was captured successfully and assigned for review.', time: '2 mins ago', icon: 'FileText' },
      { title: 'Officer assigned', description: 'A civic officer is now reviewing the case.', time: '10 mins ago', icon: 'CheckCircle2' },
      { title: 'Complaint resolved', description: 'The issue was resolved and is awaiting your feedback.', time: '1 hour ago', icon: 'Sparkles' },
    ],
  },
  about: {
    title: 'A trusted digital layer for public accountability',
    description: 'JanTrack brings the citizen, the department, and the administration onto one transparent platform for faster resolution and better public trust.',
    mission: 'To make government grievance handling simple, visible, and accountable by turning every complaint into a measurable service outcome.',
    reason: 'Transparency reduces duplicate complaints, speeds up feedback loops, and helps departments focus on their most urgent service failures.',
  },
  contact: {
    title: 'Reach the JanTrack support team',
    description: 'For assistance, public feedback, or service requests, our support desk is ready to help.',
    email: 'support@jtrack.gov.in',
    phone: '+91 1800 123 4567',
    address: '5th Floor, Civic Services Center, New Delhi',
  },
  faqs: [],
  notifications: [
    { id: 1, title: 'Complaint Submitted', description: 'Your complaint JT202600145 has been successfully registered.', time: '2 hours ago', unread: true, complaint: 'JT202600145', type: 'success' },
    { id: 2, title: 'Officer Assigned', description: 'An officer has been assigned to your complaint.', time: '5 hours ago', unread: true, complaint: 'JT202600145', type: 'info' },
    { id: 3, title: 'Complaint Resolved', description: 'The issue was resolved and is awaiting your feedback.', time: '1 day ago', unread: false, complaint: 'JT202600148', type: 'warning' },
  ],
  statistics: [
    { label: 'Complaints Filed', value: '94.8K', suffix: '+', tint: 'bg-cyan-100', caption: 'Since launch' },
    { label: 'Resolved Cases', value: '76.2K', suffix: '+', tint: 'bg-emerald-100', caption: 'Across departments' },
    { label: 'Avg. Resolution', value: '4.8', suffix: ' days', tint: 'bg-amber-100', caption: 'Response efficiency' },
    { label: 'Citizen Satisfaction', value: '92%', suffix: '', tint: 'bg-violet-100', caption: 'Public trust score' },
  ],
};

const fallbackResponse = (data) => ({ data, status: 200, statusText: 'OK', config: {}, fromFallback: true });

const requestWithFallback = async (key, fallbackValue) => {
  try {
    return await api.get(`/${key}`);
  } catch (error) {
    console.warn(`Falling back to local data for ${key}:`, error.message);
    return fallbackResponse(fallbackValue);
  }
};

export const fetchHomeData = () => requestWithFallback('home', mockData.home);
export const fetchCategories = () => requestWithFallback('categories', mockData.categories);
export const fetchFeatures = () => requestWithFallback('features', mockData.features);
export const fetchDepartments = () => requestWithFallback('departments', mockData.departments);
export const fetchComplaints = (params = {}) => requestWithFallback('complaints', mockData.complaints);
export const fetchComplaintById = (id) => requestWithFallback(`complaints/${id}`, mockData.complaints.find((item) => item.id === id) || null);
export const fetchDashboardData = () => requestWithFallback('dashboard', mockData.dashboard);
export const fetchAboutData = () => requestWithFallback('about', mockData.about);
export const fetchContactData = () => requestWithFallback('contact', mockData.contact);
export const fetchFaqs = () => requestWithFallback('faqs', mockData.faqs);
export const fetchNotifications = () => requestWithFallback('notifications', mockData.notifications);
export const fetchStatistics = () => requestWithFallback('statistics', mockData.statistics);

export default api;
