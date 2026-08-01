import { motion } from 'framer-motion';

export default function CategoryCard({ category, isSelected, onSelect }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03, y: -2, boxShadow: '0 16px 40px -18px rgba(59, 130, 246, 0.35)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(category.value)}
      className={`group flex w-full flex-col overflow-hidden rounded-[12px] border bg-white text-left shadow-[0_8px_24px_-12px_rgba(15,23,42,0.18)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:bg-slate-900 dark:shadow-[0_12px_30px_-16px_rgba(2,6,23,0.8)] ${isSelected ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-slate-200 hover:border-brand-400 dark:border-slate-700'}`}
      aria-pressed={isSelected}
      aria-label={`Select ${category.title} category`}
    >
      <div className="overflow-hidden bg-slate-50 p-3 dark:bg-slate-800/70">
        <img
          src={category.image}
          alt={category.title}
          className={`h-28 w-full rounded-[10px] object-cover transition-transform duration-200 group-hover:scale-105 ${isSelected ? 'scale-105' : ''}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-slate-900 transition-colors duration-200 group-hover:text-brand-600 dark:text-slate-100 dark:group-hover:text-brand-400">{category.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{category.description}</p>
      </div>
    </motion.button>
  );
}
