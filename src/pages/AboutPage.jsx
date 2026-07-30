import Card from '../components/Card';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">About JanTrack</p>
        <h1 className="mt-3 text-5xl font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">A trusted digital layer for public accountability</span>
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-slate-300">JanTrack brings the citizen, the department, and the administration onto one transparent platform for faster resolution and better public trust.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Our mission</h2>
          <p className="mt-3 text-base leading-8 text-slate-700 dark:text-slate-300">To make government grievance handling simple, visible, and accountable by turning every complaint into a measurable service outcome.</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Why it matters</h2>
          <p className="mt-3 text-base leading-8 text-slate-700 dark:text-slate-300">Transparency reduces duplicate complaints, speeds up feedback loops, and helps departments focus on their most urgent service failures.</p>
        </Card>
      </div>
    </div>
  );
}
