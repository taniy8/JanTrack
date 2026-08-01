import CategoryCard from './CategoryCard';

export default function CategoryGrid({ categories, selectedValue, onSelect }) {
  return (
    <div className="mt-3 grid gap-4 sm:grid-cols-2">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          isSelected={selectedValue === category.value}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
