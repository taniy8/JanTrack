import { useQuery } from '@tanstack/react-query';
import SidebarCard from './SidebarCard';
import { fetchCategories } from '../services/api';

export default function HomeSidebar() {
  const { data } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });
  const categories = data?.data || [];

  return (
    <aside className="w-full">
      <div className="rounded-[18px] border border-slate-200 bg-white/95 p-1.5 shadow-[0_14px_32px_-22px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80 sm:p-2 lg:p-2.5">
        <div className="mb-1.5 px-1 sm:mb-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-600">Quick Services</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Complaint Services</h3>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-2 lg:overflow-visible">
          {categories.map((item) => (
            <div key={item.id} className="min-w-[168px] flex-1 lg:min-w-0">
              <SidebarCard item={{ ...item, image: item.image, title: item.name, description: item.description, route: `/register?category=${item.slug || item.name}` }} />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
