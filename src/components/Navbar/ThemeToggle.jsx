import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="rounded-full border border-slate-200 bg-slate-50 p-2.5 text-slate-700 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
    >
      {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
    </motion.button>
  );
}
