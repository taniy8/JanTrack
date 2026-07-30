import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full">
        <Card className="p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">404</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">Page not found</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            The page you are looking for may have moved or does not exist. You can return home or explore the public complaint workflow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button><FiHome className="mr-2" /> Go Home</Button>
            </Link>
            <Link to="/tracking">
              <Button variant="secondary"><FiArrowLeft className="mr-2" /> Track Complaint</Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
