import { useEffect, useState } from 'react';
import { getDepartments } from '../../services/jantrackApi';

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments().then(({ data }) => setDepartments(data.departments || [])).catch(() => setDepartments([]));
  }, []);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Departments</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {departments.map((department) => (
          <div key={department.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="font-semibold">{department.name}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{department.description}</p>
            <p className="mt-3 text-sm">Officers: {department.totalOfficers} • Complaints: {department.totalComplaints} • Pending: {department.pending} • Resolved: {department.resolved}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
