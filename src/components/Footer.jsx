import { Github, Instagram, Linkedin } from 'lucide-react';

const footerLinks = [
  ['Government Links', ['About JanTrack', 'Departments', 'Public Dashboard']],
  ['Privacy', ['Privacy Policy', 'Terms of Service', 'Accessibility']],
  ['Help', ['FAQs', 'Contact Support', 'Status']],
];

const socialLinks = [
  { label: 'LinkedIn', icon: Linkedin },
  { label: 'GitHub', icon: Github },
  { label: 'Instagram', icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <p className="text-2xl font-semibold text-white">JanTrack</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
              A trusted digital platform for transparent, accountable citizen complaint resolution.
            </p>
          </div>
          {footerLinks.map(([title, items]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">{title}</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {items.map((item) => (
                  <li key={item} className="hover:text-white">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center">
          <p>© 2026 JanTrack. All rights reserved.</p>
          <div className="mt-3 flex gap-3 sm:mt-0">
            {socialLinks.map((link) => (
              <div key={link.label} className="flex items-center gap-2 rounded-full border border-slate-800 px-3 py-2 text-slate-300">
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
