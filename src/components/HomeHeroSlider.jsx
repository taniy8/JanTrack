import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function HomeHeroSlider({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPaused, slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <div
      className="relative overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[var(--surface-strong)] p-3 text-[var(--text)] shadow-[var(--shadow)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-transparent" />
      <motion.div
        className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-slate-100 blur-3xl"
        animate={{ y: [0, -12, 0], x: [0, 18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-slate-100 blur-3xl"
        animate={{ y: [0, 16, 0], x: [0, -12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="absolute inset-0 bg-transparent" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-500">
              {activeSlide.badge}
            </span>
            <span className="rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-secondary)]">
              {activeIndex + 1}/{slides.length}
            </span>
          </div>
          <div className="hidden rounded-full border border-[color:var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-secondary)] sm:block">
            {activeSlide.id.replace('-', ' ')}
          </div>
        </div>

        <div className="relative mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Priority civic request</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-[var(--text)] sm:text-4xl">{activeSlide.headline}</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">{activeSlide.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Link to={activeSlide.routePrimary}>
                  <Button>Register Complaint</Button>
                </Link>
                <Link to={activeSlide.routeSecondary}>
                  <Button variant="secondary">Track Complaint</Button>
                </Link>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-soft)]">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.4, ease: 'easeInOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                  />
                </div>
                <span className="text-sm font-medium text-[var(--text-secondary)]">Live routing</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow)]"
          >
            <div className="absolute inset-0 bg-[var(--surface-soft)]" />
            <div className="relative flex min-h-[260px] flex-col justify-between rounded-[20px] border border-[color:var(--border)] bg-[var(--surface-soft)] p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">Live case routing</p>
                <p className="mt-3 text-2xl font-semibold text-[var(--text)]">{activeSlide.headline}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--border)] bg-[var(--surface)] p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-secondary)]">Priority</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text)]">Rapid review</p>
                </div>
                <div className="rounded-2xl border border-[color:var(--border)] bg-[var(--surface)] p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-secondary)]">Status</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text)]">Escalation ready</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? 'bg-sky-500 shadow-[0_0_0_5px_rgba(37,99,235,0.15)]' : 'bg-slate-300 hover:bg-slate-400'}`}
              aria-label={`Go to ${slide.headline}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
          >
            <FiChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
