import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function HomeCategoryPanel({ categories }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-[22px] border border-[color:var(--border)] bg-[var(--sidebar)] p-2.5 shadow-[var(--shadow)] sm:p-3">
      <div className="mb-3 rounded-[18px] border border-[color:var(--border)] bg-[var(--surface)] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-400">Service Directory</p>
        <h2 className="mt-2 text-lg font-semibold text-[var(--text)]">Complaint categories</h2>
        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">Select a civic service to begin a complaint or review the latest public updates.</p>
      </div>

      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <button
              type="button"
              onClick={() => navigate(category.route, { state: category.defaultComplaintCategory ? { defaultComplaintCategory: category.defaultComplaintCategory } : undefined })}
              className="group flex h-full w-full flex-col overflow-hidden rounded-[16px] border border-[color:var(--border)] bg-[var(--surface)] text-left shadow-[var(--shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:var(--border)] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--sidebar)]"
              aria-label={category.title}
            >
              <div className="overflow-hidden bg-[var(--surface-strong)]">
                <img src={category.image} alt={category.title} loading="lazy" className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="text-sm font-semibold text-[var(--text)] transition-colors duration-200 group-hover:text-sky-400">{category.title}</h3>
                <p className="mt-1 text-sm leading-5 text-[var(--text-secondary)]">{category.description}</p>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
