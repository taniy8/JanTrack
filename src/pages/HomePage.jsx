import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCheckCircle,
  FiCpu,
  FiFileText,
  FiMessageSquare,
  FiMonitor,
  FiUsers,
} from 'react-icons/fi';
import { BarChart3, Building2, CheckCircle2, LifeBuoy, Shield, ShieldCheck, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedStatsSection from '../components/AnimatedStatsSection';
import Button from '../components/Button';
import HomeCategoryPanel from '../components/HomeCategoryPanel';
import HomeHeroSlider from '../components/HomeHeroSlider';
import { complaintCategories, heroSlides } from '../data/homePageData';
import governmentOffices from '../assets/images/government offices.jpg';

const processSteps = [
  { title: 'Register Complaint', description: 'File a complaint with supporting details and evidence.', icon: FiFileText, route: '/complaint/new' },
  { title: 'AI Classifies Complaint', description: 'The platform routes each issue to the right department instantly.', icon: FiCpu, route: '/features/ai-classification' },
  { title: 'Assigned to Department', description: 'Officials receive the case with clear ownership and urgency.', icon: FiUsers, route: '/departments' },
  { title: 'Track Status Live', description: 'Citizens receive real-time updates on progress and next steps.', icon: FiMonitor, route: '/tracking' },
  { title: 'Complaint Resolved', description: 'The issue is addressed with complete accountability and closure.', icon: FiCheckCircle, route: '/dashboard' },
  { title: 'Citizen Feedback', description: 'Feedback confirms satisfaction and helps improve civic service.', icon: FiMessageSquare, route: '/contact' },
];

const statItems = [
  {
    value: 25000,
    label: 'Complaints Registered',
    suffix: '+',
    icon: BarChart3,
    tone: 'from-blue-600 to-sky-500',
    description: 'A growing record of civic action.',
  },
  {
    value: 18500,
    label: 'Complaints Resolved',
    suffix: '+',
    icon: CheckCircle2,
    tone: 'from-emerald-500 to-teal-500',
    description: 'Fast closure through clear accountability.',
  },
  {
    value: 96,
    label: 'Resolution Rate',
    suffix: '%',
    icon: ShieldCheck,
    tone: 'from-blue-600 to-sky-500',
    description: 'Performance citizens can rely on.',
  },
  {
    value: 45,
    label: 'Government Departments',
    suffix: '',
    icon: Building2,
    tone: 'from-slate-500 to-slate-400',
    description: 'Connected public agencies working together.',
  },
  {
    value: 24,
    label: 'Citizen Support',
    suffix: '×7',
    icon: LifeBuoy,
    tone: 'from-sky-500 to-blue-500',
    description: 'Help and guidance available around the clock.',
  },
  {
    value: 1200000,
    label: 'Citizens Served',
    suffix: '+',
    icon: Users2,
    tone: 'from-blue-600 to-sky-500',
    description: 'Trusted by a broad civic community.',
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--page)] pb-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-12 top-16 h-56 w-56 rounded-full bg-slate-100 blur-3xl" />
        <div className="absolute right-0 top-28 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-slate-100 blur-3xl" />
      </div>

      <div className="relative mx-0 flex w-full flex-col gap-5 px-4 py-4 sm:px-6 lg:px-6 lg:py-6 xl:py-8">
        <div className="w-full lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-7 xl:gap-8">
          <aside className="mb-6 w-full lg:mb-0 lg:sticky lg:top-24 lg:self-start lg:min-h-[calc(100vh-7rem)]">
            <div className="h-full rounded-[24px] border border-[color:var(--border)] bg-[var(--sidebar)] p-2.5 shadow-[var(--shadow)] sm:p-3 lg:overflow-visible">
              <HomeCategoryPanel categories={complaintCategories} />
            </div>
          </aside>

          <div className="flex w-full min-w-0 flex-1 flex-col gap-6">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-7"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="home-section-title text-sm">Latest Updates</p>
                  <h2 className="home-subheading mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Measured outcomes that show how <span className="home-highlight">service</span> delivery improves every month.</h2>
                </div>
                <button type="button" onClick={() => navigate('/updates')} className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-sky-400/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#111827]">View Updates</button>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  { title: 'Streetlight repairs', metric: '92% faster', description: 'Resolved with clearer routing and priority handling.' },
                  { title: 'Drainage response', metric: '3x visibility', description: 'Residents now receive live updates from dispatch to closeout.' },
                  { title: 'Waste pickup', metric: '18k cases', description: 'Tracked through one reliable citizen-facing dashboard.' },
                ].map((item) => (
                  <motion.button
                    key={item.title}
                    type="button"
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => navigate('/updates')}
                    aria-label={`Read about ${item.title}`}
                    className="cursor-pointer rounded-[16px] border border-[color:var(--border)] bg-[var(--surface)] p-5 text-left shadow-[var(--shadow)] transition hover:-translate-y-1 hover:bg-[var(--surface-soft)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-sky-600">{item.metric}</div>
                      <BarChart3 className="h-5 w-5 text-[#0F766E] dark:text-[#38BDF8]" />
                    </div>
                    <h3 className="home-subheading mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="home-body-copy mt-2 text-sm leading-7">{item.description}</p>
                  </motion.button>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-7"
            >
              <div className="max-w-3xl">
                <p className="home-section-title text-sm">Quick Actions</p>
                <h2 className="home-subheading mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">A simple pathway from citizen report to <span className="home-highlight">transparent</span> resolution.</h2>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {processSteps.slice(0, 4).map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.button
                      key={step.title}
                      type="button"
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => navigate(step.route)}
                      aria-label={`Open ${step.title}`}
                      className="relative cursor-pointer rounded-[16px] border border-[color:var(--border)] bg-[var(--surface)] p-5 text-left shadow-[var(--shadow)] transition hover:-translate-y-1 hover:bg-[var(--surface-soft)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--sidebar)]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="home-icon-shell flex h-11 w-11 items-center justify-center">
                          <Icon size={18} />
                        </div>
                        <span className="text-sm font-semibold text-[var(--text-secondary)]">0{index + 1}</span>
                      </div>
                      <h3 className="home-subheading mt-4 text-lg font-semibold">{step.title}</h3>
                      <p className="home-body-copy mt-2 text-sm leading-7">{step.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="rounded-[32px] border border-[color:var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-7"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="home-section-title text-sm">Government Information</p>
                  <h2 className="home-subheading mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Modern capabilities designed to support <span className="home-highlight">secure</span>, <span className="home-highlight">transparent</span> civic service delivery.</h2>
                </div>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: 'Secure complaint tracking', description: 'Every stage remains visible to citizens and departments.', icon: Shield, route: '/tracking' },
                  { title: 'AI-powered categorization', description: 'Issues are routed quickly with intelligent classification.', icon: FiCpu, route: '/features/ai-classification' },
                  { title: 'Transparent status updates', description: 'Real-time progress keeps everyone informed and aligned.', icon: FiMonitor, route: '/updates' },
                  { title: 'Multi-department coordination', description: 'Cross-functional work stays organized and accountable.', icon: FiUsers, route: '/departments' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.title}
                      type="button"
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => navigate(item.route)}
                      aria-label={`Open ${item.title}`}
                      className="cursor-pointer rounded-[16px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-5 text-left shadow-[var(--shadow)] transition hover:-translate-y-1 hover:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
                    >
                      <div className="home-icon-shell flex h-12 w-12 items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <h3 className="home-subheading mt-4 text-lg font-semibold">{item.title}</h3>
                      <p className="home-body-copy mt-2 text-sm leading-7">{item.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>

            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
              <AnimatedStatsSection
                eyebrow="Trusted impact"
                title="A high-performing digital civic service that delivers measurable progress."
                description="Operational performance, citizen engagement, and public service reach are tracked through one connected analytics view."
                badge="Live civic performance"
                items={statItems.map((item) => ({
                  ...item,
                  accent: item.tone,
                  title: item.label,
                  description: item.description,
                }))}
              />
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[var(--page)] p-6 shadow-[var(--shadow)] sm:p-7 lg:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
                <div className="space-y-6">
                  <div className="max-w-3xl">
                    <p className="home-section-title text-sm">Platform Overview</p>
                    <h2 className="home-subheading mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Real-time insights into JanTrack's <span className="home-highlight">complaint</span> management and <span className="home-highlight">government</span> performance.</h2>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {[
                      { title: 'Total Complaints', value: 25000, suffix: '+', description: 'Citizen submissions tracked', icon: BarChart3, accent: 'from-blue-600 to-cyan-500', route: '/dashboard' },
                      { title: 'Resolved Today', value: 184, suffix: '', description: 'Cases closed this day', icon: CheckCircle2, accent: 'from-emerald-500 to-green-500', route: '/dashboard' },
                      { title: 'Pending Review', value: 312, suffix: '', description: 'Awaiting action', icon: Shield, accent: 'from-violet-600 to-indigo-500', route: '/dashboard' },
                      { title: 'Active Departments', value: 45, suffix: '', description: 'Connected agencies', icon: Building2, accent: 'from-slate-700 to-slate-500', route: '/departments' },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          type="button"
                          key={item.title}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.4, delay: index * 0.08 }}
                          whileHover={{ y: -6, scale: 1.01 }}
                          onClick={() => navigate(item.route)}
                          aria-label={`Open ${item.title}`}
                          className="flex h-full cursor-pointer flex-col rounded-[16px] border border-[color:var(--border)] bg-[var(--surface)] p-4 text-left shadow-[var(--shadow)] transition hover:-translate-y-1 hover:bg-[var(--surface-soft)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--sidebar)]"
                        >
                          <div className="home-icon-shell inline-flex p-2.5">
                            <Icon className="h-4 w-4" />
                          </div>
                          <p className="home-stat-number mt-4 text-2xl tracking-tight">{item.value.toLocaleString()}{item.suffix}</p>
                          <p className="home-subheading mt-2 text-sm font-semibold">{item.title}</p>
                          <p className="home-body-copy mt-1 text-sm leading-6">{item.description}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[20px] border border-[color:var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="home-section-title text-sm">Platform Status</p>
                      <h3 className="home-subheading mt-2 text-2xl font-semibold">Operational</h3>
                    </div>
                    <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-400">24/7 Live</div>
                  </div>

                  <div className="mt-6 rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-strong)] p-4">
                    <p className="home-section-title text-sm">Today's Activity</p>
                    <div className="home-body-copy mt-4 space-y-3 text-sm">
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                        <span>New complaints</span>
                        <span className="font-semibold text-[var(--text)]">128</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                        <span>Resolved today</span>
                        <span className="font-semibold text-[var(--text)]">84</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                        <span>Active officers</span>
                        <span className="font-semibold text-[var(--text)]">26</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="home-section-title text-sm">Quick Highlights</p>
                    <div className="home-body-copy mt-3 space-y-2 text-sm">
                      {[
                        { label: '24×7 citizen support', route: '/contact' },
                        { label: 'Secure complaint tracking', route: '/tracking' },
                        { label: 'Multi-department coordination', route: '/departments' },
                        { label: 'Transparent resolution process', route: '/dashboard' },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => navigate(item.route)}
                          aria-label={`Open ${item.label}`}
                          className="w-full rounded-2xl border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-left transition hover:-translate-y-0.5 hover:border-[color:var(--border)] hover:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--surface)]"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-6 text-[var(--text)] shadow-[var(--shadow)] sm:p-8 lg:p-9"
            >
              <div className="absolute inset-0 bg-transparent" />
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="home-section-title text-sm">Welcome to JanTrack</p>
                  <h1 className="home-hero-title mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">A trusted digital civic platform for <span className="home-highlight">transparent</span> public service delivery.</h1>
                  <p className="home-body-copy mt-4 max-w-2xl text-base leading-7 sm:text-lg">Submit, monitor, and resolve public complaints through a secure, official service experience designed for <span className="home-highlight">citizens</span> and <span className="home-highlight">departments</span>.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" onClick={() => navigate('/complaint/new')} aria-label="Register a new complaint">Register Complaint</Button>
                  <Button type="button" variant="secondary" onClick={() => navigate('/tracking')} aria-label="Track an existing complaint">Track Complaint</Button>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: 0.1 }} className="w-full overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[var(--page)] p-3 shadow-[var(--shadow)] sm:p-4">
              <HomeHeroSlider slides={heroSlides} />
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-6 text-[var(--text)] shadow-[var(--shadow)] sm:p-7"
            >
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <div>
                  <p className="home-section-title text-sm">Building transparent governance together</p>
                  <h2 className="home-subheading mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Empowering <span className="home-highlight">citizens</span> and <span className="home-highlight">government</span> <span className="home-highlight">departments</span> through secure, efficient, and transparent <span className="home-highlight">complaint</span> management.</h2>
                  <p className="home-body-copy mt-4 max-w-2xl text-base leading-7">A modern public service experience built for trust, accountability, and faster resolutions at every stage.</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button type="button" onClick={() => navigate('/complaint/new')} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(37,99,235,0.15)] transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--surface)]">
                      Register Complaint <FiArrowRight size={15} className="ml-2" />
                    </button>
                    <button type="button" onClick={() => navigate('/about')} className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--surface)]">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-3 shadow-[var(--shadow)]">
                  <img src={governmentOffices} alt="Government office representation" className="h-full min-h-[220px] w-full rounded-[20px] object-cover" />
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
