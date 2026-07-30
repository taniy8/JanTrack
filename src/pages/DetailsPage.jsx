import Card from '../components/Card';
import Button from '../components/Button';
import { FiDownload, FiMessageSquare, FiFileText } from 'react-icons/fi';

export default function DetailsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Complaint Details</p>
          <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">JNT-1042 • Road Pothole</span>
          </h1>
        </div>
        <Button><FiDownload className="mr-2" /> Download PDF</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Resolved</div>
            <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">High Priority</div>
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-slate-900">Description</h2>
          <p className="mt-3 text-base leading-8 text-slate-700">A large pothole near the market road has caused repeated traffic disruption and risk to pedestrians. The issue was inspected and repaired within the planned resolution window.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-500">Category</p>
              <p className="mt-2 font-semibold text-slate-900">Road Infrastructure</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-500">Department</p>
              <p className="mt-2 font-semibold text-slate-900">Public Works</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-500">Before Image</p>
              <div className="mt-3 h-40 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100" />
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-500">After Image</p>
              <div className="mt-3 h-40 rounded-2xl bg-gradient-to-br from-emerald-100 to-blue-100" />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-slate-900">Officer Notes</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            Site inspection completed on 15 July 2026. Temporary barricades were installed and pothole was filled with durable asphalt mix.
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
              <FiFileText className="text-brand-600" />
              <div>
                <p className="font-semibold text-slate-900">Inspection Report</p>
                <p className="text-sm text-slate-600">PDF • 1.2 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
              <FiMessageSquare className="text-brand-600" />
              <div>
                <p className="font-semibold text-slate-900">Citizen Feedback</p>
                <p className="text-sm text-slate-600">The issue was resolved promptly and professionally.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
