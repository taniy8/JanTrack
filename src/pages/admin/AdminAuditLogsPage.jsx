import { useEffect, useState } from 'react';
import { getAuditLogs } from '../../services/jantrackApi';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAuditLogs().then(({ data }) => setLogs(data.auditLogs || [])).catch(() => setLogs([]));
  }, []);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Audit Logs</h1>
      <div className="mt-6 space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="font-semibold">{log.action}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{log.actor} • {log.module}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
