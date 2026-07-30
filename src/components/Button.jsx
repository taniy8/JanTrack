import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', disabled = false, isLoading = false, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold tracking-[0.02em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-600/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/25 focus:ring-cyan-500',
    secondary: 'border border-slate-200 bg-white/90 text-slate-800 hover:-translate-y-1 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { y: -3, scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
      className={`${base} ${variants[variant]} ${disabled || isLoading ? 'cursor-not-allowed opacity-70' : ''} ${className}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" /> : null}
      {children}
    </motion.button>
  );
}
