export default function AdminSettingsPage() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {['Portal Settings', 'Complaint Statuses', 'Notification Settings', 'Password Policy'].map((section) => (
          <div key={section} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="font-semibold">{section}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Configured through the shared backend service.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
