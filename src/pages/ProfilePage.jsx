import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">My Profile</p>
        <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Citizen profile overview</span>
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-xl font-semibold text-white">{user?.name?.charAt(0) || 'U'}</div>
            <div>
              <p className="text-xl font-semibold text-slate-900">{user?.name || 'Citizen User'}</p>
              <p className="text-sm text-slate-600">{user?.email || 'citizen@example.com'}</p>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm text-slate-700">
            <p><span className="font-semibold">Mobile:</span> +91 98765 43210</p>
            <p><span className="font-semibold">Government ID:</span> AADHAAR 1234 5678 9101</p>
            <p><span className="font-semibold">Address:</span> Sector 12, Gurgaon, Haryana</p>
          </div>
          <div className="mt-6"><Button variant="secondary">Edit Profile</Button></div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Registered Complaints</h2>
          <div className="mt-4 space-y-3">
            {['JT202600145', 'JT202600148'].map((complaint) => (
              <div key={complaint} className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{complaint}</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Resolved</span>
                </div>
                <p className="mt-2">Street light issue reported and resolved successfully.</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
