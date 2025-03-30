import React from 'react';
import { Smartphone, Laptop, Tablet, Watch, Cpu, Cable } from 'lucide-react';

const categories = [
  { name: 'Phones', icon: Smartphone },
  { name: 'Laptops', icon: Laptop },
  { name: 'Tablets', icon: Tablet },
  { name: 'Wearables', icon: Watch },
  { name: 'Gadgets', icon: Cpu },
  { name: 'Accessories', icon: Cable },
];

interface CategoryGridProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => setSelectedCategory(category.name === selectedCategory ? 'all' : category.name)}
          className={`p-4 rounded-xl shadow-lg transition duration-300 ring-2 ring-red-600 hover:ring-2 hover:ring-white hover:bg-black ${
            selectedCategory === category.name
              ? 'bg-purple-600 text-white'
              : 'bg-black text-white'
          }`}
        >
          <category.icon className={`h-6 w-6 mx-auto mb-2 ${
            selectedCategory === category.name ? 'text-white' : 'text-red-600'
          }`} />
          <h2 className="text-sm font-semibold text-center">{category.name}</h2>
        </button>
      ))}
    </div>
  );
};

export default CategoryGrid;