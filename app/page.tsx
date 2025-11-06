'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CategoryFilter from '@/components/ui/CategoryFilter';
import NewsCard from '@/components/ui/NewsCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useNews } from '@/hooks/useNews';
import { NewsCategory } from '@/types/news';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>();
  
  const { articles, loading, error } = useNews({
    initialCategory: selectedCategory
  });

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-red-600">
            <p>Error: {error}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest News
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the most recent news from around the world
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* News Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={`${article.url}-${index}`} article={article} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}