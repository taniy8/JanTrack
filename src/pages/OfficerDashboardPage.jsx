import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, BellRing, ClipboardList, FileText, LogOut, Search, ShieldCheck, TrendingUp, UploadCloud, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { officerActivityStats, officerActivityTimeline, officerComplaintActivityData, officerComplaintHistory, officerOverviewStats, officerPerformanceMetrics, officerRecentUpdates, officerStatusDistribution } from '../data/officerDashboardData';
import { getComplaints, updateComplaintRemote } from '../services/jantrackApi';
import { showToast } from '../utils/toast';
import AnimatedCounter from '../components/AnimatedCounter';

export default function OfficerDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [historySearchTerm, setHistorySearchTerm] = useState('');
  const [historyStatusFilter, setHistoryStatusFilter] = useState('All');
  const [historyTypeFilter, setHistoryTypeFilter] = useState('All');
  const [historyDateFilter, setHistoryDateFilter] = useState('All');
  const [activitySearchTerm, setActivitySearchTerm] = useState('');
  const [activityStatusFilter, setActivityStatusFilter] = useState('All');
  const [activityPriorityFilter, setActivityPriorityFilter] = useState('All');
  const [activityDepartmentFilter, setActivityDepartmentFilter] = useState('All');
  const [activityDateFilter, setActivityDateFilter] = useState('All');
  const [activityPage, setActivityPage] = useState(1);
  const [selectedComplaintId, setSelectedComplaintId] = useState('');
  const [statusDraft, setStatusDraft] = useState('In Progress');
  const [noteDraft, setNoteDraft] = useState('');
  const [proofDraft, setProofDraft] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadComplaints = async () => {
      try {
        const { data } = await getComplaints();
        if (!isActive) return;
        const assigned = (data.complaints || []).filter((item) => item.assignedOfficer === user?.name || item.assignedOfficer === 'Unassigned');
        setComplaints(assigned);
        if (assigned.length) {
          setSelectedComplaintId(assigned[0].id);
        }
      } catch (error) {
        if (!isActive) return;
        const fallbackComplaints = officerComplaintActivityData.slice(0, 4).map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          description: item.description,
          department: item.department,
          priority: item.priority,
          status: item.status,
          assignedOfficer: item.assignedOfficer,
          createdAt: item.createdAt,
        }));
        setComplaints(fallbackComplaints);
        if (fallbackComplaints.length) {
          setSelectedComplaintId(fallbackComplaints[0].id);
        }
      }
    };

    loadComplaints();
    return () => {
      isActive = false;
    };
  }, [user]);

  const filteredComplaints = useMemo(() => complaints.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    const matchesSearch = [item.id, item.title, item.category, item.status].some((value) => String(value).toLowerCase().includes(searchValue));
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    const matchesType = typeFilter === 'All' || item.category === typeFilter;
    const matchesDate = dateFilter === 'All' || item.createdAt?.includes(dateFilter);
    return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesDate;
  }), [complaints, dateFilter, priorityFilter, searchTerm, statusFilter, typeFilter]);

  const selectedComplaint = filteredComplaints.find((item) => item.id === selectedComplaintId) || filteredComplaints[0] || complaints[0] || null;

  const filteredHistory = useMemo(() => officerComplaintHistory.filter((item) => {
    const matchesSearch = [item.id, item.type, item.location, item.status].some((value) => String(value).toLowerCase().includes(historySearchTerm.toLowerCase()));
    const matchesStatus = historyStatusFilter === 'All' || item.status === historyStatusFilter;
    const matchesType = historyTypeFilter === 'All' || item.type === historyTypeFilter;
    const matchesDate = historyDateFilter === 'All' || item.reportedDate.includes(historyDateFilter);
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  }), [historyDateFilter, historySearchTerm, historyStatusFilter, historyTypeFilter]);

  const filteredActivityComplaints = useMemo(() => officerComplaintActivityData.filter((item) => {
    const matchesSearch = [item.id, item.title, item.category, item.location, item.department].some((value) => String(value).toLowerCase().includes(activitySearchTerm.toLowerCase()));
    const matchesStatus = activityStatusFilter === 'All' || item.status === activityStatusFilter;
    const matchesPriority = activityPriorityFilter === 'All' || item.priority === activityPriorityFilter;
    const matchesDepartment = activityDepartmentFilter === 'All' || item.department === activityDepartmentFilter;
    const matchesDate = activityDateFilter === 'All' || item.submittedDate.includes(activityDateFilter);
    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment && matchesDate;
  }), [activityDateFilter, activityDepartmentFilter, activityPriorityFilter, activitySearchTerm, activityStatusFilter]);

  const pagedActivityComplaints = useMemo(() => {
    const pageSize = 5;
    const startIndex = (activityPage - 1) * pageSize;
    return filteredActivityComplaints.slice(startIndex, startIndex + pageSize);
  }, [activityPage, filteredActivityComplaints]);

  const handleSave = async () => {
    if (!selectedComplaint) return;
    try {
      await updateComplaintRemote(selectedComplaint.id, { status: statusDraft, message: noteDraft || 'Officer updated the complaint.', evidence: proofDraft || selectedComplaint.evidence });
      const { data } = await getComplaints();
      const assigned = (data.complaints || []).filter((item) => item.assignedOfficer === user?.name || item.assignedOfficer === 'Unassigned');
      setComplaints(assigned);
      showToast.success('Complaint updated', 'The complaint status and notes have been updated.');
    } catch (error) {
      showToast.error('Update failed', 'We could not save the officer update.');
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300';
      case 'Assigned':
        return 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300';
      case 'Pending':
      case 'Awaiting Action':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'Rejected':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'Low':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-white lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Officer Dashboard</p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-900 dark:text-white sm:text-4xl">Assigned Complaints for {user?.name || 'Officer'}</h1>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">Manage current assignments, monitor past cases, and keep service delivery moving.</p>
            </div>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {officerOverviewStats.map((item, index) => (
            <motion.article key={item.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.06 }} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="inline-flex rounded-2xl p-3 text-slate-900 dark:text-white bg-transparent shadow-none border-none">
                <ClipboardList className="h-5 w-5 text-current" />
              </div>
              <p className="mt-5 text-3xl font-semibold text-slate-900 dark:text-white">
                <AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.decimals || 0} />
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{item.label}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
            </motion.article>
          ))}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Current Work Queue</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Search & filter complaints</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <Search className="h-4 w-4" />
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search complaints" className="w-36 bg-transparent outline-none" />
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option value="All">All statuses</option>
                <option value="New">New</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
                <option value="Overdue">Overdue</option>
              </select>
              <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option value="All">All priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option value="All">All types</option>
                {Array.from(new Set(complaints.map((item) => item.category).filter(Boolean))).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option value="All">All dates</option>
                <option value="2026-07">Jul 2026</option>
                <option value="2026-08">Aug 2026</option>
              </select>
            </div>

            <div className="mt-6 space-y-3">
              {filteredComplaints.length ? filteredComplaints.map((item) => (
                <button key={item.id} onClick={() => setSelectedComplaintId(item.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selectedComplaint?.id === item.id ? 'border-blue-300 bg-blue-50 dark:border-cyan-500/40 dark:bg-slate-800' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70'}`}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.id} • {item.title}</p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.category} • {item.priority} priority</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Reported {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{item.status}</span>
                      <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">{item.department}</span>
                    </div>
                  </div>
                </button>
              )) : (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">No new complaints assigned today.</div>
              )}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            {selectedComplaint ? (
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Complaint Details</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{selectedComplaint.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{selectedComplaint.description}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Department</p>
                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">{selectedComplaint.department}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Assigned Officer</p>
                    <p className="mt-2 font-semibold text-slate-900 dark:text-white">{selectedComplaint.assignedOfficer}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Update Status</label>
                  <select value={statusDraft} onChange={(event) => setStatusDraft(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                    <option>Submitted</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Escalated</option>
                  </select>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Progress Notes</label>
                  <textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="Add a note for the citizen or supervisor" rows="3" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900" />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Resolution Proof</label>
                  <textarea value={proofDraft} onChange={(event) => setProofDraft(event.target.value)} placeholder="Share evidence, photos, or completion notes" rows="3" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900" />
                </div>

                <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  <UploadCloud className="h-4 w-4" /> Save update
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">No new complaints assigned today.</div>
            )}
          </motion.section>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Today's Activity</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Service delivery snapshot</h2>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">Live operations pulse</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {officerActivityStats.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.05 }} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-2xl font-semibold text-slate-900 dark:text-white"><AnimatedCounter value={item.value} suffix={item.suffix} /></p>
                  <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Performance Overview</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Team delivery metrics</h2>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <TrendingUp className="mr-2 inline h-4 w-4" /> Monthly
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {officerPerformanceMetrics.map((item) => (
                <div key={item.id} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-2xl font-semibold text-slate-900 dark:text-white"><AnimatedCounter value={item.value} suffix={item.suffix} decimals={item.decimals || 0} /></p>
                  <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Complaint Activity & Work Queue</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Monitor recent, ongoing, and previously handled complaints.</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">Keep a professional view of active service requests, their status, and recent updates in one place.</p>
            </div>
            <button onClick={() => navigate('/tracking')} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              View All Complaints
            </button>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
              <input value={activitySearchTerm} onChange={(event) => setActivitySearchTerm(event.target.value)} placeholder="Search complaints" className="w-full bg-transparent text-sm outline-none" />
            </div>
            <select value={activityStatusFilter} onChange={(event) => setActivityStatusFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
              <option value="All">All statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Assigned">Assigned</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select value={activityPriorityFilter} onChange={(event) => setActivityPriorityFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
              <option value="All">All priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select value={activityDepartmentFilter} onChange={(event) => setActivityDepartmentFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
              <option value="All">All departments</option>
              {Array.from(new Set(officerComplaintActivityData.map((item) => item.department))).map((department) => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
            <select value={activityDateFilter} onChange={(event) => setActivityDateFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 md:col-span-2 xl:col-span-1">
              <option value="All">All dates</option>
              <option value="Aug">Aug 2026</option>
              <option value="Jul">Jul 2026</option>
            </select>
          </div>

          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[960px]">
              <div className="grid grid-cols-[0.85fr_1.1fr_1fr_1fr_0.7fr_0.8fr_0.85fr_0.7fr_0.6fr] gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <div>Complaint ID</div>
                <div>Complaint Type</div>
                <div>Location</div>
                <div>Department</div>
                <div>Priority</div>
                <div>Status</div>
                <div>Submitted Date</div>
                <div>Last Updated</div>
                <div>Action</div>
              </div>
              <div className="mt-3 space-y-2">
                {pagedActivityComplaints.map((item, index) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.04 }} className="grid grid-cols-[0.85fr_1.1fr_1fr_1fr_0.7fr_0.8fr_0.85fr_0.7fr_0.6fr] gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    <div className="font-semibold text-slate-900 dark:text-white">{item.id}</div>
                    <div>{item.category}</div>
                    <div>{item.location}</div>
                    <div>{item.department}</div>
                    <div><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getPriorityClasses(item.priority)}`}>{item.priority}</span></div>
                    <div><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold transition ${getStatusClasses(item.status)}`}>{item.status}</span></div>
                    <div>{item.submittedDate}</div>
                    <div>{item.lastUpdated}</div>
                    <div><button onClick={() => navigate(`/tracking?id=${item.id}`)} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300">View</button></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-slate-600 dark:text-slate-300">Showing {pagedActivityComplaints.length} of {filteredActivityComplaints.length} complaints</div>
            <div className="flex gap-2">
              <button disabled={activityPage === 1} onClick={() => setActivityPage((prev) => Math.max(prev - 1, 1))} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300">Previous</button>
              <button disabled={activityPage * 5 >= filteredActivityComplaints.length} onClick={() => setActivityPage((prev) => prev + 1)} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300">Next</button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Updates</h3>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">Live</span>
              </div>
              <div className="mt-4 space-y-4">
                {officerRecentUpdates.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="flex gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Help</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Use the filters to narrow the queue and review assignments. Select any complaint to update its status notes or attach evidence.</p>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Complaint History</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Past handled complaints</h2>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">Historical view</span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                <input value={historySearchTerm} onChange={(event) => setHistorySearchTerm(event.target.value)} placeholder="Search history" className="w-full bg-transparent text-sm outline-none" />
              </div>
              <select value={historyStatusFilter} onChange={(event) => setHistoryStatusFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option value="All">All statuses</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
              <select value={historyTypeFilter} onChange={(event) => setHistoryTypeFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option value="All">All types</option>
                {Array.from(new Set(officerComplaintHistory.map((item) => item.type))).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select value={historyDateFilter} onChange={(event) => setHistoryDateFilter(event.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800">
                <option value="All">All dates</option>
                <option value="Aug">Aug</option>
                <option value="Jul">Jul</option>
              </select>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    <th className="px-3 py-3">Complaint ID</th>
                    <th className="px-3 py-3">Type</th>
                    <th className="px-3 py-3">Location</th>
                    <th className="px-3 py-3">Reported</th>
                    <th className="px-3 py-3">Resolved</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Priority</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className="border-b border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300">
                      <td className="px-3 py-3 font-semibold">{item.id}</td>
                      <td className="px-3 py-3">{item.type}</td>
                      <td className="px-3 py-3">{item.location}</td>
                      <td className="px-3 py-3">{item.reportedDate}</td>
                      <td className="px-3 py-3">{item.resolvedDate}</td>
                      <td className="px-3 py-3"><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">{item.status}</span></td>
                      <td className="px-3 py-3">{item.priority}</td>
                      <td className="px-3 py-3"><button className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">View Details</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Status Analytics</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Complaint status distribution</h2>
            </div>
            <div className="space-y-4">
              {officerStatusDistribution.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Recent Activity</p>
              <div className="mt-4 space-y-4">
                {officerActivityTimeline.map((item, index) => (
                  <div key={`${item.time}-${index}`} className="flex gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.time}</p>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
