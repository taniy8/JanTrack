import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function HomeFeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`group relative aspect-[1/1] overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_14px_40px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 hover:border-blue-300 hover:shadow-[0_20px_50px_-28px_rgba(37,99,235,0.2)] dark:border-slate-700 dark:bg-slate-900/90 ${feature.cardClass || ''}`}
    >
      <div className={`absolute inset-x-0 top-0 h-14 bg-gradient-to-r ${feature.accent}`} />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 shadow-sm transition-transform duration-300 group-hover:scale-110 ${feature.iconBg}`}>
            <Icon size={18} />
          </div>
          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${feature.badgeClass}`}>{feature.badge}</span>
        </div>
        <div>
          <h3 className="text-base font-semibold leading-6 text-slate-900 dark:text-white">{feature.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.description}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Link to={feature.route} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-800 dark:text-cyan-400 dark:hover:text-cyan-300">
            Explore <FiArrowRight size={14} />
          </Link>
          <div className="h-2 w-2 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-blue-500" />
        </div>
      </div>
    </motion.div>
  );
}
