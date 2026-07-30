import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35 }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800/90 dark:shadow-slate-950/30 ${className}`}
    >
      {children}
    </motion.div>
  );
}
