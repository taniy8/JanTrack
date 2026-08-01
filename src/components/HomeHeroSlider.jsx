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
      className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950/95 p-3 text-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.45)] dark:border-slate-700"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.18),transparent_24%)]" />
      <motion.div
        className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ y: [0, -12, 0], x: [0, 18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl"
        animate={{ y: [0, 16, 0], x: [0, -12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl sm:p-8">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_36%,rgba(255,255,255,0.05))]" />
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100">
              {activeSlide.badge}
            </span>
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-200">
              {activeIndex + 1}/{slides.length}
            </span>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-slate-900/60 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300 sm:block">
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
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Priority civic request</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{activeSlide.headline}</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">{activeSlide.subtitle}</p>
              <div className="flex flex-wrap gap-3">
                <Link to={activeSlide.routePrimary}>
                  <Button>Register Complaint</Button>
                </Link>
                <Link to={activeSlide.routeSecondary}>
                  <Button variant="secondary">Track Complaint</Button>
                </Link>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.4, ease: 'easeInOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                </div>
                <span className="text-sm font-medium text-slate-300">Live routing</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/10 p-4 shadow-[0_18px_50px_-24px_rgba(2,6,23,0.6)] backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-cyan-400/10 to-transparent" />
            <div className="relative flex min-h-[260px] flex-col justify-between rounded-[20px] border border-white/10 bg-slate-950/45 p-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100">Live case routing</p>
                <p className="mt-3 text-2xl font-semibold text-white">{activeSlide.headline}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">Priority</p>
                  <p className="mt-1 text-sm font-semibold text-white">Rapid review</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-300">Status</p>
                  <p className="mt-1 text-sm font-semibold text-white">Escalation ready</p>
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
              className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? 'bg-white shadow-[0_0_0_5px_rgba(255,255,255,0.18)]' : 'bg-white/30 hover:bg-white/70'}`}
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
