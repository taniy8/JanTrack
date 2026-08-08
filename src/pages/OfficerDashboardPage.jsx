import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, BellRing, ClipboardList, FileText, LogOut, Search, ShieldCheck, TrendingUp, UploadCloud, UserRound } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getComplaints, updateComplaintRemote } from '../services/jantrackApi';
import { showToast } from '../utils/toast';

export default function OfficerDashboardPage() {
  const { user, logout } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaintId, setSelectedComplaintId] = useState('');
  const [statusDraft, setStatusDraft] = useState('In Progress');
  const [noteDraft, setNoteDraft] = useState('');
  const [proofDraft, setProofDraft] = useState('');

  useEffect(() => {
    getComplaints().then(({ data }) => {
      const assigned = (data.complaints || []).filter((item) => item.assignedOfficer === user?.name || item.assignedOfficer === 'Unassigned');
      setComplaints(assigned);
      if (assigned.length) {
        setSelectedComplaintId(assigned[0].id);
      }
    });
  }, [user]);

  const filteredComplaints = complaints.filter((item) => {
    const searchValue = searchTerm.toLowerCase();
    return [item.id, item.title, item.category, item.status].some((value) => String(value).toLowerCase().includes(searchValue));
  });

  const selectedComplaint = filteredComplaints.find((item) => item.id === selectedComplaintId) || filteredComplaints[0] || complaints[0] || null;

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

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-white lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Officer Dashboard</p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-900 dark:text-white sm:text-4xl">Assigned Complaints for {user?.name || 'Officer'}</h1>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">Manage work queues, update progress, and attach proof of completion for your department.</p>
            </div>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </motion.section>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Work Queue</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Search & filter complaints</h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
                <Search className="h-4 w-4" />
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search complaints" className="w-36 bg-transparent outline-none" />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {filteredComplaints.map((item) => (
                <button key={item.id} onClick={() => setSelectedComplaintId(item.id)} className={`w-full rounded-2xl border p-4 text-left transition ${selectedComplaint?.id === item.id ? 'border-blue-300 bg-blue-50 dark:border-cyan-500/40 dark:bg-slate-800' : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/70'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.id} • {item.title}</p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.category} • {item.priority} priority</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{item.status}</span>
                  </div>
                </button>
              ))}
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
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">No assigned complaints are available yet.</div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}
