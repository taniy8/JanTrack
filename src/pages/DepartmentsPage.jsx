import { Building2, Droplets, Trash2, Zap } from 'lucide-react';
import Card from '../components/Card';
import { DepartmentCardsGrid } from '../components/ModernComponents';

const departments = [
  { name: 'Public Works', service: 'Roads, drains, and civic maintenance', status: 'High Availability', icon: Building2, total: 142, pending: 24, resolved: 118 },
  { name: 'Water Supply', service: 'Leakage reporting and pipeline inspection', status: 'Responsive', icon: Droplets, total: 86, pending: 11, resolved: 75 },
  { name: 'Electricity', service: 'Street lights and infrastructure faults', status: 'Priority Queue', icon: Zap, total: 67, pending: 7, resolved: 60 },
  { name: 'Sanitation', service: 'Garbage, waste, and public hygiene', status: 'Online', icon: Trash2, total: 94, pending: 19, resolved: 75 },
];

export default function DepartmentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Departments</p>
        <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Connected departments for fast service delivery</span>
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">Every public department is linked to JanTrack so citizens can see ownership, timing, and resolution progress.</p>
      </div>

      <DepartmentCardsGrid departments={departments} />
    </div>
  );
}
