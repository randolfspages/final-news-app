'use client';

import { useState, useEffect } from 'react';
import { NewsArticle, NewsCategory } from '@/types/news';
import { getTopHeadlines, searchNews } from '@/lib/news-api';

interface UseNewsProps {
  initialCategory?: NewsCategory;
  initialCountry?: string;
}

export function useNews({ initialCategory, initialCountry = 'us' }: UseNewsProps = {}) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<NewsCategory | undefined>(initialCategory);
  const [country, setCountry] = useState(initialCountry);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTopHeadlines(country, category);
      
      if (response.status === 'ok') {
        setArticles(response.articles);
      } else {
        setError('Failed to fetch news');
      }
    } catch (err) {
      setError('An error occurred while fetching news');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchArticles = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchNews(query);
      
      if (response.status === 'ok') {
        setArticles(response.articles);
      } else {
        setError('Failed to search news');
      }
    } catch (err) {
      setError('An error occurred while searching news');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, country]);

  return {
    articles,
    loading,
    error,
    category,
    setCategory,
    country,
    setCountry,
    fetchNews,
    searchArticles
  };
}