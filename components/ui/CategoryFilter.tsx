'use client';

import { NewsCategory } from '@/types/news';
import { CATEGORIES, CATEGORY_NAMES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory?: NewsCategory;
  onCategoryChange: (category?: NewsCategory) => void;
}

export default function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(undefined)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          !selectedCategory 
            ? "bg-blue-600 text-white" 
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        )}
      >
        All
      </button>
      
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          )}
        >
          {CATEGORY_NAMES[category]}
        </button>
      ))}
    </div>
  );
}