import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function HomeFeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--border)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] ${feature.cardClass || ''}`}
    >
      <div className="relative flex items-start justify-between gap-2">
        <div className="home-icon-shell flex h-12 w-12 items-center justify-center transition-all duration-300 group-hover:-translate-y-0.5">
          <Icon size={18} />
        </div>
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${feature.badgeClass}`}>{feature.badge}</span>
      </div>
      <div className="relative mt-5">
        <h3 className="text-lg font-semibold leading-6 text-slate-900">{feature.title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
      </div>
      <div className="relative mt-6 flex items-center justify-between gap-2">
        <Link to={feature.route} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition hover:text-blue-800">
          Explore <FiArrowRight size={14} />
        </Link>
        <div className="h-2.5 w-2.5 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-blue-500" />
      </div>
    </motion.article>
  );
}
