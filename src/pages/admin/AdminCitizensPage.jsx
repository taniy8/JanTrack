import { useEffect, useState } from 'react';
import { getUsers } from '../../services/jantrackApi';

export default function AdminCitizensPage() {
  const [citizens, setCitizens] = useState([]);

  useEffect(() => {
    getUsers().then(({ data }) => setCitizens((data.users || []).filter((user) => user.role === 'Citizen'))).catch(() => setCitizens([]));
  }, []);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Citizens</h1>
      <div className="mt-6 space-y-3">
        {citizens.map((citizen) => (
          <div key={citizen.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="font-semibold">{citizen.name}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{citizen.email} • {citizen.citizenId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
