import { useEffect, useMemo, useState } from 'react';
import { getComplaints, updateComplaintRemote } from '../../services/jantrackApi';

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getComplaints().then(({ data }) => setComplaints(data.complaints || [])).catch(() => setComplaints([]));
  }, []);

  const filteredComplaints = useMemo(() => complaints.filter((complaint) => [complaint.id, complaint.title, complaint.status, complaint.priority].join(' ').toLowerCase().includes(search.toLowerCase())), [complaints, search]);

  const updateStatus = async (complaintId, status) => {
    await updateComplaintRemote(complaintId, { status, message: `Admin updated status to ${status}.` });
    const { data } = await getComplaints();
    setComplaints(data.complaints || []);
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Complaints</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Track and moderate complaint activity.</p>
        </div>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search complaints" className="w-full rounded-2xl border border-slate-200 px-4 py-3 md:w-72 dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="mt-6 space-y-3">
        {filteredComplaints.map((complaint) => (
          <div key={complaint.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-semibold">{complaint.id} • {complaint.title}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{complaint.category} • {complaint.department} • {complaint.priority}</p>
              </div>
              <div className="flex items-center gap-2">
                <select defaultValue={complaint.status} onChange={(event) => updateStatus(complaint.id, event.target.value)} className="rounded-2xl border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
