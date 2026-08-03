import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', className = '', disabled = false, isLoading = false, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold tracking-[0.02em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'border border-[var(--btn-primary-border)] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-[0_4px_12px_rgba(15,118,110,0.15)] hover:-translate-y-0.5 hover:border-[var(--btn-primary-bg-hover)] hover:bg-[var(--btn-primary-bg-hover)] hover:shadow-[0_4px_12px_rgba(15,118,110,0.15)] active:bg-[var(--btn-primary-bg-active)] focus:ring-sky-400',
    secondary: 'border border-[var(--btn-secondary-border)] bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] hover:-translate-y-0.5 hover:bg-[var(--btn-secondary-hover-bg)]',
    ghost: 'bg-[var(--surface-soft)] text-[var(--text)] hover:bg-[var(--surface)]',
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
