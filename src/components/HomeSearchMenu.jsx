import SearchMenuCard from './SearchMenuCard';
import { homeSearchMenuItems } from '../data/homeSearchMenu';

export default function HomeSearchMenu() {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-[24px] border border-slate-200 bg-white/90 p-4 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">Quick Services</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Complaint Services</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          {homeSearchMenuItems.map((item) => (
            <div key={item.id} className="min-w-[140px] flex-1 lg:min-w-0">
              <SearchMenuCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
