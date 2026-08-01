import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHome } from 'react-icons/fi';
import Button from '../../components/Button';

export default function FeaturePageTemplate({
  title,
  tagline,
  icon: Icon,
  badge = 'Feature Spotlight',
  overview,
  howItWorks,
  benefits,
  highlights,
  useCases,
  faqs,
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        <Link to="/" className="flex items-center gap-2 transition hover:text-blue-600">
          <FiHome /> Home
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-slate-900 dark:text-white">{title}</span>
      </motion.nav>

      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/90">
        <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-blue-50">
                {badge}
              </p>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-50">
                {tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register">
                  <Button className="bg-white text-blue-700 hover:bg-slate-100">Register Complaint</Button>
                </Link>
                <Link to="/tracking">
                  <Button variant="secondary" className="border-white/40 bg-white/10 text-white hover:bg-white/20">Track Complaint</Button>
                </Link>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: 0.08 }} className="rounded-[28px] border border-white/20 bg-white/10 p-8 text-white shadow-lg backdrop-blur">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-5xl shadow-lg">
                <Icon className="h-10 w-10" />
              </div>
              <div className="mt-8 rounded-[24px] border border-white/20 bg-slate-950/20 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Operational view</p>
                <p className="mt-3 text-2xl font-semibold">Connected, accountable, and transparent</p>
                <p className="mt-3 text-sm leading-7 text-slate-100">
                  Designed to keep citizens informed while helping departments respond faster with confidence.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-[28px] border border-slate-200/80 bg-white/85 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Overview</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">What this capability delivers</h2>
          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">{overview}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-50 to-blue-50/70 p-8 shadow-sm dark:border-slate-700 dark:from-slate-800/80 dark:to-slate-900/70">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">How it works</p>
          <div className="mt-6 space-y-3">
            {howItWorks.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/70">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{step}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mt-10 rounded-[28px] border border-slate-200/80 bg-white/85 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Key benefits</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item, index) => (
            <motion.div key={item} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.05 }} className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-700/60">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">✓ {item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="rounded-[28px] border border-slate-200/80 bg-white/85 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Feature highlights</p>
          <div className="mt-6 space-y-3">
            {highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-700/60 dark:text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, delay: 0.05 }} className="rounded-[28px] border border-slate-200/80 bg-white/85 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Government use cases</p>
          <div className="mt-6 space-y-3">
            {useCases.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-700/60 dark:text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mt-10 rounded-[28px] border border-slate-200/80 bg-white/85 p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800/80">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Frequently asked questions</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-[20px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-700/60">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.question}</p>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.08 }} className="mt-10 rounded-[32px] border border-slate-200/80 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 p-8 text-white shadow-lg sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Ready to experience this capability?</h2>
            <p className="mt-2 text-sm leading-7 text-blue-50">Bring the same transparency and accountability to your next civic request.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/register">
              <Button className="bg-white text-blue-700 hover:bg-slate-100">Register Complaint</Button>
            </Link>
            <Link to="/tracking">
              <Button variant="secondary" className="border-white/50 bg-white/10 text-white hover:bg-white/20">Track Complaint</Button>
            </Link>
            <Link to="/">
              <Button variant="secondary" className="border-white/50 bg-white/10 text-white hover:bg-white/20">
                <span className="flex items-center gap-2">
                  Back to Home <FiArrowRight />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
