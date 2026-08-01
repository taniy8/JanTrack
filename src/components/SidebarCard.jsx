import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SidebarCard({ item }) {
  return (
    <motion.div whileHover={{ scale: 1.01, y: -1, boxShadow: '0 16px 34px -20px rgba(37, 99, 235, 0.35)' }} transition={{ duration: 0.2 }}>
      <Link
        to={item.route}
        state={item.defaultComplaintCategory ? { defaultComplaintCategory: item.defaultComplaintCategory } : undefined}
        className="group flex h-full flex-col rounded-[12px] border border-slate-200 bg-white p-2 text-left shadow-[0_8px_20px_-14px_rgba(15,23,42,0.2)] transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 hover:shadow-[0_14px_30px_-16px_rgba(37,99,235,0.35)] focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900"
        aria-label={item.title}
      >
        <div className="mb-2 overflow-hidden rounded-[10px] bg-slate-50 p-1 dark:bg-slate-800/70">
          <img src={item.image} alt={item.title} className="h-28 w-full rounded-[8px] object-cover transition-transform duration-200 group-hover:scale-105 sm:h-32" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">{item.title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{item.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
