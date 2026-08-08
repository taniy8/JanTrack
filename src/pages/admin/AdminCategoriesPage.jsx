import { useEffect, useState } from 'react';
import { getCategories } from '../../services/jantrackApi';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.categories || [])).catch(() => setCategories([]));
  }, []);

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Complaint Categories</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <div key={category.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="font-semibold">{category.name}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
