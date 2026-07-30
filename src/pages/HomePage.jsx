import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import { FileText, Layers3, BellRing, Compass, ShieldCheck, Briefcase } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { AnnouncementBanner, AnimatedStatsSection, FeaturedServicesGrid, FaqAccordion } from '../components/ModernComponents';
import { features, stats } from '../utils/data';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    let frameId;
    const duration = 1400;
    const startTime = performance.now();
    const endValue = 94.8;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setServiceIndex(Number((endValue * eased).toFixed(1)));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const animatedStats = [
    { label: 'Total Complaints', value: 12840, suffix: '+', caption: 'Public service requests logged', tint: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300', icon: FileText },
    { label: 'Resolved Complaints', value: 11240, suffix: '+', caption: 'Cases closed with clear updates', tint: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', icon: ShieldCheck },
    { label: 'Pending Complaints', value: 1600, suffix: '+', caption: 'Awaiting owner action', tint: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', icon: BellRing },
    { label: 'Departments', value: 24, caption: 'Connected civic departments', tint: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300', icon: Layers3 },
    { label: 'Active Citizens', value: 8640, suffix: '+', caption: 'Users tracking progress daily', tint: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300', icon: Briefcase },
    { label: 'Resolution Rate', value: 92, suffix: '%', caption: 'Transparent case closure rate', tint: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', icon: Compass },
  ];

  const featuredServices = [
    { title: 'Register Complaint', description: 'Create and submit a complaint with evidence and priority.', icon: FileText },
    { title: 'Track Complaint', description: 'Follow your request from submission to closure.', icon: Compass },
    { title: 'Departments', description: 'Browse civic departments and ownership details.', icon: Layers3 },
    { title: 'Citizen Dashboard', description: 'Review complaints, updates, and progress in one place.', icon: Briefcase },
    { title: 'Emergency Contacts', description: 'Quick access to urgent civic support channels.', icon: BellRing },
    { title: 'Public Notices', description: 'Stay informed with service updates and announcements.', icon: ShieldCheck },
  ];

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <AnnouncementBanner />
      </div>
      <section className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 rounded-full bg-gradient-to-r from-cyan-200/40 via-blue-200/30 to-emerald-200/40 blur-3xl" />
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <FiShield size={16} /> Government Complaint Transparency Platform
          </div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span className="hero-shine inline-block bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              Transparent Complaint Tracking for Every Citizen
            </span>
          </motion.h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 font-medium text-slate-700 dark:text-slate-300 sm:text-xl">
            Register, track, and resolve public service complaints with complete transparency, faster response, and clear accountability.
          </p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
            <Link to="/register">
              <Button>Register Complaint</Button>
            </Link>
            <Link to="/tracking">
              <Button variant="secondary">Track Complaint</Button>
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="relative mt-8 flex flex-wrap gap-6 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-400/10" />
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-2 text-emerald-700"><FiCheckCircle /></div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">24/7 Access</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Public dashboard available anytime</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-2 text-amber-700"><FiTrendingUp /></div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Real-time Updates</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Live status and escalations</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-900 p-6 text-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.55)]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_40%)]" />
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="rounded-[28px] bg-gradient-to-br from-blue-600 via-cyan-500 to-slate-700 p-8">
            <div className="flex items-center justify-between rounded-2xl bg-white/10 p-4 backdrop-blur">
              <div>
                <p className="text-sm font-medium text-blue-100">Live Service Index</p>
                <p className="mt-1 text-3xl font-semibold">{serviceIndex.toFixed(1)}%</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-3 text-3xl font-semibold">⚖️</div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {stats.slice(0, 2).map((item, index) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-200">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.35, delay: index * 0.05 }}>
              <Card className="text-center">
                <p className={`bg-gradient-to-r ${stat.tone} bg-clip-text text-4xl font-bold text-transparent`}>{stat.value}</p>
                <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        <AnimatedStatsSection items={animatedStats} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Core Features</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Built for modern, transparent governance</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">Every feature is designed to reduce friction, improve transparency, and give citizens confidence in public service delivery.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.06 }}>
              <Link to={feature.route} className="block h-full">
                <Card className="group h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_16px_40px_-20px_rgba(37,99,235,0.4)]">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.accent} text-2xl text-white shadow-lg`}>{feature.icon}</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{feature.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-cyan-400">
                    Learn more <FiArrowRight className="transition group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-6 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Featured Services</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Quick access to the civic journey</h2>
          </div>
          <FeaturedServicesGrid services={featuredServices} />
        </div>

        <div className="mt-16 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Common questions, answered clearly</h2>
          </div>
          <FaqAccordion />
        </div>
      </section>
    </div>
  );
}
