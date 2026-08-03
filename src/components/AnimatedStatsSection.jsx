import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const formatStatValue = (value, suffix) => {
  const safeValue = Number.isFinite(value) ? value : 0;

  if (suffix === '%') return `${safeValue.toFixed(safeValue % 1 === 0 ? 0 : 1)}%`;
  if (suffix === ' hrs') return `${safeValue.toFixed(safeValue % 1 === 0 ? 0 : 1)} hrs`;
  if (suffix === '★') return `${safeValue.toFixed(safeValue % 1 === 0 ? 0 : 1)}★`;
  if (suffix === '×7') return `${safeValue.toLocaleString()}×7`;
  if (suffix === '+') return `${safeValue.toLocaleString()}+`;

  if (suffix) return `${safeValue.toLocaleString()}${suffix}`;
  return safeValue.toLocaleString();
};

export default function AnimatedStatsSection({
  items,
  eyebrow,
  title,
  description,
  badge,
  cardClassName = '',
}) {
  const [statsAnimationActive, setStatsAnimationActive] = useState(false);
  const [statsResetKey, setStatsResetKey] = useState(0);
  const { ref: statsRef, entry } = useInView({ threshold: 0.25, triggerOnce: false });

  useEffect(() => {
    if (!entry || typeof window === 'undefined') return undefined;

    const { isIntersecting, boundingClientRect } = entry;
    const isFullyOut = !isIntersecting && (boundingClientRect.bottom <= 0 || boundingClientRect.top >= window.innerHeight);

    if (isFullyOut) {
      setStatsAnimationActive(false);
      setStatsResetKey((prev) => prev + 1);
      return undefined;
    }

    if (isIntersecting && !statsAnimationActive) {
      setStatsAnimationActive(true);
    }

    return undefined;
  }, [entry, statsAnimationActive]);

  return (
    <section ref={statsRef} className="overflow-hidden rounded-[36px] border border-[color:var(--border)] bg-[var(--surface-strong)] p-4 shadow-[var(--shadow)] sm:p-6 lg:p-8">
      <div className="relative isolate mx-auto w-full max-w-[1400px] overflow-hidden rounded-[30px] border border-[color:var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow)] sm:p-8 lg:p-10">
        <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">{title}</h2>
            {description ? <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">{description}</p> : null}
          </div>
          {badge ? (
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-sky-400 shadow-[var(--shadow)] lg:self-auto">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]" />
              {badge}
            </div>
          ) : null}
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            const trendClasses = item.positive
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300';

            return (
              <motion.article
                key={`${item.title}-${statsResetKey}`}
                initial={{ opacity: 0, y: 20 }}
                animate={statsAnimationActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3, ease: 'easeOut' } }}
                className={`group flex h-full min-h-[250px] flex-col justify-between rounded-[24px] border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition hover:-translate-y-1 ${cardClassName}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`inline-flex rounded-2xl bg-gradient-to-br ${item.accent} p-3 text-white shadow-[0_20px_45px_rgba(0,0,0,0.35)]`}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  {item.trend ? (
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${trendClasses}`}>
                      {item.trend}
                    </span>
                  ) : null}
                </div>

                <div className="mt-6">
                  <p className="text-4xl font-black tracking-tight text-[var(--text)]">
                    {statsAnimationActive ? (
                      <CountUp
                        start={0}
                        end={item.value}
                        duration={2.2}
                        separator=","
                        suffix=""
                        formattingFn={(value) => formatStatValue(value, item.suffix)}
                        redraw={false}
                      />
                    ) : (
                      '0'
                    )}
                  </p>
                  <p className="mt-3 text-base font-semibold text-[var(--text)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={statsAnimationActive ? { width: '100%' } : { width: '0%' }}
                    transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.accent}`}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
