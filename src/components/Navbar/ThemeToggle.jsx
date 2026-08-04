import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      aria-label="Toggle Theme"
      onClick={toggleTheme}
      className="group inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--surface)] p-2.5 text-[var(--text)] shadow-[var(--shadow)] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[var(--navbar)] hover:shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
    >
      <motion.span
        key={theme}
        initial={{ rotate: 0, scale: 0.9 }}
        animate={{ rotate: isDark ? 180 : 360, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="inline-flex items-center justify-center"
      >
        {isDark ? <FiMoon size={18} /> : <FiSun size={18} />}
      </motion.span>
    </motion.button>
  );
}
