import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiChevronRight, FiHome, FiLoader } from 'react-icons/fi';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../contexts/AuthContext';

export default function FeatureDetailPage({ feature }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  if (!feature) {
    navigate('/404', { replace: true });
    return null;
  }

  if (feature.requiresAuth && !isAuthenticated) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Card className="p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-3xl text-white shadow-lg">
            {feature.icon}
          </div>
          <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">{feature.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            Please login to access this feature and explore the full experience for your citizen account.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/login" state={{ from: { pathname: feature.route || '/dashboard' }, message: 'Please login to access this feature.' }}>
              <Button>Login to Continue</Button>
            </Link>
            <Link to="/">
              <Button variant="secondary">Back Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200/80 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            <FiLoader className="animate-spin" /> Loading experience
          </div>
          <div className="mt-6 h-8 w-3/4 rounded-2xl bg-slate-200 dark:bg-slate-700" />
          <div className="mt-4 h-4 w-1/2 rounded-xl bg-slate-200 dark:bg-slate-700" />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-32 rounded-3xl bg-slate-100 dark:bg-slate-700" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        <Link to="/" className="flex items-center gap-2 transition hover:text-blue-600">
          <FiHome /> Home
        </Link>
        <FiChevronRight />
        <span>Features</span>
        <FiChevronRight />
        <span className="text-slate-900 dark:text-white">{feature.title}</span>
      </motion.nav>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 p-8 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-800/90 sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">{feature.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              {feature.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">{feature.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={feature.routePrimary || '/register'}>
                <Button>{feature.ctaPrimary}</Button>
              </Link>
              <Link to={feature.routeSecondary || '/tracking'}>
                <Button variant="secondary">{feature.ctaSecondary}</Button>
              </Link>
            </div>
          </div>
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="rounded-[28px] bg-gradient-to-br from-blue-600 via-cyan-500 to-slate-700 p-8 text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-5xl shadow-lg backdrop-blur">
              {feature.icon}
            </div>
            <div className="mt-8 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Feature preview</p>
              <p className="mt-3 text-2xl font-semibold">{feature.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-200">A modern civic-tech experience designed to keep citizens and departments aligned.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Overview</h2>
          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">{feature.overview}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-700/60">
              <p className="text-sm font-semibold text-blue-600">Citizen Benefit</p>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{feature.citizenBenefit}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-700/60">
              <p className="text-sm font-semibold text-emerald-600">Government Benefit</p>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">{feature.governmentBenefit}</p>
            </div>
          </div>
        </Card>
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">How it works</h2>
          <div className="mt-6 space-y-3">
            {feature.howItWorks.map((step, index) => (
              <motion.div key={step} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: index * 0.06 }} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/60">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-semibold text-white">{index + 1}</div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{step}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-10">
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Key benefits</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {feature.benefits.map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.05 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/60">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">✓ {item}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Workflow illustration</h2>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {feature.workflow.map((step, index) => (
              <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: index * 0.05 }} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-700/60 dark:text-slate-200">
                {step}
              </motion.div>
            ))}
          </div>
        </Card>
        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Mock dashboard</h2>
          <div className="mt-6 space-y-3">
            {feature.mockItems.map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: index * 0.05 }} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/60">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-10 rounded-[32px] border border-slate-200/80 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 p-8 text-white shadow-lg sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Ready to experience this feature?</h2>
            <p className="mt-2 text-sm leading-7 text-blue-50">Bring the same clarity and confidence to your next citizen service request.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/register">
              <Button className="bg-white text-blue-700 hover:bg-slate-100">Register Complaint</Button>
            </Link>
            <Link to="/tracking">
              <Button variant="secondary" className="border-white/50 bg-white/10 text-white hover:bg-white/20">Track Complaint</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
