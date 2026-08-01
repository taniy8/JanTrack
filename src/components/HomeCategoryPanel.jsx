import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HomeCategoryPanel({ categories }) {
  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-[28px] border border-slate-200/80 bg-white/95 p-2.5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.2)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 sm:p-3">
        <div className="mb-2.5 px-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-blue-600">Service Directory</p>
          <h2 className="mt-1.5 text-base font-semibold text-slate-900 dark:text-white">Complaint categories</h2>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="min-w-[220px] flex-1 sm:min-w-0"
            >
              <Link
                to={category.route}
                state={category.defaultComplaintCategory ? { defaultComplaintCategory: category.defaultComplaintCategory } : undefined}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_14px_32px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:border-blue-300 hover:shadow-[0_18px_42px_-24px_rgba(37,99,235,0.22)] dark:border-slate-700 dark:bg-slate-900"
                aria-label={category.title}
              >
                <div className="overflow-hidden bg-slate-100 transition-all duration-300 group-hover:brightness-105 dark:bg-slate-800">
                  <img src={category.image} alt={category.title} loading="lazy" className="h-40 w-full rounded-t-[20px] object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-white">{category.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </aside>
  );
}
