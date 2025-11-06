'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SearchBar from '@/components/ui/SearchBar';
import NewsCard from '@/components/ui/NewsCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useNews } from '@/hooks/useNews';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { articles, loading, error, searchArticles } = useNews();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      searchArticles(query);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search News
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find news articles by keywords
          </p>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Enter keywords to search news..."
            />
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Search Results for &quot;{searchQuery}&quot;
            </h2>

            {error && (
              <div className="text-center text-red-600 mb-6">
                <p>Error: {error}</p>
              </div>
            )}

            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <NewsCard key={`${article.url}-${index}`} article={article} />
                ))}
              </div>
            )}

            {!loading && articles.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No articles found for &quot;{searchQuery}&quot;
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Enter a search term to find news articles
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}