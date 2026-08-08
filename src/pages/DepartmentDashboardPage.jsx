import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, BarChart3, BellRing, Building2, FileText, LogOut, ShieldCheck, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getComplaints, updateComplaintRemote } from '../services/jantrackApi';
import { showToast } from '../utils/toast';

export default function DepartmentDashboardPage() {
  const { user, logout } = useAuth();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getComplaints().then(({ data }) => {
      const departmentComplaints = (data.complaints || []).filter((item) => item.department === user?.profile?.department || item.department === 'Water Supply');
      setComplaints(departmentComplaints);
    });
  }, [user]);

  const escalateComplaint = async (complaintId) => {
    try {
      await updateComplaintRemote(complaintId, { escalated: true, status: 'Escalated', message: 'Department escalated the complaint.' });
      const { data } = await getComplaints();
      const departmentComplaints = (data.complaints || []).filter((item) => item.department === user?.profile?.department || item.department === 'Water Supply');
      setComplaints(departmentComplaints);
      showToast.success('Complaint escalated', 'The case has been escalated to the next level.');
    } catch (error) {
      showToast.error('Escalation failed', 'We could not update the complaint.');
    }
  };

  const assignComplaint = async (complaintId) => {
    try {
      await updateComplaintRemote(complaintId, { assignedOfficer: user?.name || 'Department Head', message: 'Complaint assigned to department lead.' });
      const { data } = await getComplaints();
      const departmentComplaints = (data.complaints || []).filter((item) => item.department === user?.profile?.department || item.department === 'Water Supply');
      setComplaints(departmentComplaints);
      showToast.success('Complaint assigned', 'The complaint is now assigned to your team.');
    } catch (error) {
      showToast.error('Assignment failed', 'We could not update the complaint.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-white lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Department Head Dashboard</p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.03em] text-slate-900 dark:text-white sm:text-4xl">{user?.profile?.department || 'Department'} Oversight</h1>
              <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">Review department complaints, assign work, and monitor team performance.</p>
            </div>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </motion.section>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Open complaints', value: complaints.filter((item) => item.status !== 'Resolved').length, icon: FileText, tone: 'from-blue-600 to-cyan-500' },
            { title: 'Escalated', value: complaints.filter((item) => item.escalated).length, icon: AlertTriangle, tone: 'from-amber-500 to-orange-500' },
            { title: 'Active officers', value: '4', icon: Users, tone: 'from-emerald-500 to-green-500' },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${stat.tone} p-3 text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{stat.title}</p>
              </div>
            );
          })}
        </div>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Department Queue</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Complaints needing action</h2>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{complaints.length} cases</div>
          </div>
          <div className="mt-6 space-y-4">
            {complaints.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.category} • {item.location} • {item.priority} priority</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => assignComplaint(item.id)} className="rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Assign to team</button>
                    <button onClick={() => escalateComplaint(item.id)} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">Escalate</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
