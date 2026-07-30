import { Link } from 'react-router-dom';
import { FiCheckCircle, FiDownload } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';

export default function SuccessPage({ complaintId = 'JT202600145' }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Card className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-700">
          <FiCheckCircle />
        </div>
        <h1 className="mt-6 text-4xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-5xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Complaint Submitted Successfully</span>
        </h1>
        <p className="mt-3 text-base leading-8 text-slate-700 dark:text-slate-300">Your complaint has been registered and assigned for review. A receipt has been prepared for your records.</p>

        <div className="mx-auto mt-8 max-w-2xl rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">Complaint ID</span>
            <span className="text-lg font-semibold text-slate-900">{complaintId}</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Current Status</p>
              <p className="mt-1 font-semibold text-slate-900">Submitted</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Expected Resolution</p>
              <p className="mt-1 font-semibold text-slate-900">Within 48 hours</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/tracking">
            <Button>Track Complaint</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary">Dashboard</Button>
          </Link>
          <Button variant="ghost"><FiDownload className="mr-2" /> Download Receipt</Button>
        </div>
      </Card>
    </div>
  );
}
