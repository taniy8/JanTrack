import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function formatNumber(value, decimals = 0) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1600,
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.25 });

  const numericValue = useMemo(() => Number(value) || 0, [value]);

  useEffect(() => {
    if (!inView) return undefined;

    let frameId = 0;
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericValue * eased;
      setDisplayValue(current);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setDisplayValue(numericValue);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [duration, inView, numericValue]);

  const formattedValue = useMemo(() => {
    if (decimals > 0) {
      return `${prefix}${formatNumber(displayValue, decimals)}${suffix}`;
    }

    const rounded = Math.round(displayValue);
    return `${prefix}${formatNumber(rounded, 0)}${suffix}`;
  }, [decimals, displayValue, prefix, suffix]);

  return <span ref={ref} className={className}>{formattedValue}</span>;
}
