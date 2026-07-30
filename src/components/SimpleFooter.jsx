import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Privacy Policy', to: '/about' },
  { label: 'Terms of Service', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQs', to: '/about' },
];

export default function SimpleFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              JanTrack
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Transparent, reliable complaint resolution for citizens and public services.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="rounded-full border border-slate-200 px-3 py-2 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-800 dark:hover:border-slate-600 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 JanTrack. All rights reserved.</p>
          <p>Built for responsive public service engagement.</p>
        </div>
      </div>
    </footer>
  );
}
