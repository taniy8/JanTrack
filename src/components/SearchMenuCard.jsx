import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SearchMenuCard({ item }) {
  return (
    <motion.div whileHover={{ scale: 1.03, y: -2, boxShadow: '0 16px 38px -18px rgba(37, 99, 235, 0.35)' }} transition={{ duration: 0.2 }}>
      <Link
        to={item.route}
        state={item.defaultComplaintCategory ? { defaultComplaintCategory: item.defaultComplaintCategory } : undefined}
        className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-slate-200 bg-white text-left shadow-[0_10px_24px_-16px_rgba(15,23,42,0.22)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900"
        aria-label={item.title}
      >
        <div className="overflow-hidden bg-slate-50 p-3 dark:bg-slate-800/70">
          <img src={item.image} alt={item.title} className="h-24 w-full rounded-[10px] object-cover transition-transform duration-200 group-hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-3">
          <h3 className="text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">{item.title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">{item.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
