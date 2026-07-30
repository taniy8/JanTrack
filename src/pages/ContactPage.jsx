import Card from '../components/Card';
import Button from '../components/Button';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Contact</p>
        <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Reach the JanTrack support team</span>
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">For assistance, public feedback, or service requests, our support desk is ready to help.</p>
      </div>

      <Card className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Contact Information</h2>
          <div className="mt-5 space-y-4 text-base text-slate-700 dark:text-slate-300">
            <p><span className="font-semibold text-slate-900 dark:text-white">Email:</span> support@jtrack.gov.in</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Phone:</span> +91 1800 123 4567</p>
            <p><span className="font-semibold text-slate-900 dark:text-white">Address:</span> 5th Floor, Civic Services Center, New Delhi</p>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <label className="block text-sm font-semibold text-slate-800">Name</label>
          <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" placeholder="Your name" />
          <label className="mt-5 block text-sm font-semibold text-slate-800">Message</label>
          <textarea rows="4" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3" placeholder="How can we help?" />
          <div className="mt-5">
            <Button>Send Message</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
