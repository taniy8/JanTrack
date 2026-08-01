import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import HomeCategoryPanel from '../components/HomeCategoryPanel';
import HomeHeroSlider from '../components/HomeHeroSlider';
import HomeFeatureCard from '../components/HomeFeatureCard';
import { complaintCategories, heroSlides, homeStats, homeFeatureCards } from '../data/homePageData';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [serviceIndex, setServiceIndex] = useState(0);

  useEffect(() => {
    let frameId;
    const duration = 1400;
    const startTime = performance.now();
    const endValue = 94.8;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setServiceIndex(Number((endValue * eased).toFixed(1)));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="pb-8">
      <div className="mx-auto max-w-[1600px] px-4 pt-4 sm:px-6 lg:px-6 lg:pt-6">
        <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-slate-950 via-blue-950/95 to-slate-900 p-6 text-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.5)] sm:p-8 lg:p-9">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_26%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/90">Welcome to JanTrack</p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">A modern digital civic platform for trusted public service resolution.</h1>
              <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">Submit, monitor, and resolve public complaints with a polished government-grade experience that keeps citizens informed at every step.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/register">
                <Button>Register Complaint</Button>
              </Link>
              <Link to="/tracking">
                <Button variant="secondary">Track Complaint</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:px-6 lg:py-8">
        <aside className="hidden w-[330px] flex-shrink-0 lg:block">
          <HomeCategoryPanel categories={complaintCategories} />
        </aside>

        <div className="flex-1 space-y-6">
          <HomeHeroSlider slides={heroSlides} />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {homeStats.map((item) => (
              <Card key={item.label} className="rounded-[24px] border border-slate-200/80 bg-white/95 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.22)] dark:border-slate-700 dark:bg-slate-900/90">
                <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.tone}`}>{item.value}</p>
                <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">{item.label}</p>
              </Card>
            ))}
          </div>

          <section className="space-y-6 rounded-[32px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900/90 sm:p-6 lg:p-7">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Core Features</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Powerful civic services for every complaint.</h2>
              <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">Explore the JanTrack capabilities that make complaint tracking transparent, accountable, and easy to use.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {homeFeatureCards.map((feature) => (
                <HomeFeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 pb-4 sm:px-6 lg:px-6">
        <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.15)] dark:border-slate-700 dark:bg-slate-900/90 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Modern government platform</p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-900 dark:text-white sm:text-4xl">The JanTrack experience is built for transparency, trust, and fast citizen service.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">Every complaint is tracked, every department is accountable, and every citizen gets real-time updates from submission through resolution.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button>Register Complaint</Button>
                </Link>
                <Link to="/tracking">
                  <Button variant="secondary">Track Complaint</Button>
                </Link>
              </div>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-inner shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-900/40">
              <div className="space-y-4">
                <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-slate-700 p-6 text-white shadow-lg">
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">Live service index</p>
                  <p className="mt-3 text-4xl font-black">{serviceIndex.toFixed(1)}%</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-cyan-100/80">Current citizen satisfaction and resolution tracking in real time.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">120K+</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Complaints logged</p>
                  </div>
                  <div className="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">98%</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Citizen satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
