import { useEffect, useMemo, useState } from 'react';
import { getUsers } from '../../services/jantrackApi';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers().then(({ data }) => setUsers(data.users || [])).catch(() => setUsers([]));
  }, []);

  const filteredUsers = useMemo(() => users.filter((user) => [user.name, user.email, user.role].join(' ').toLowerCase().includes(search.toLowerCase())), [search, users]);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Users</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Manage citizen and officer accounts from this section.</p>
        </div>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search users" className="w-full rounded-2xl border border-slate-200 px-4 py-3 md:w-72 dark:border-slate-700 dark:bg-slate-800" />
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Role</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.status || 'Active'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
