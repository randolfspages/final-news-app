import { NewsCategory } from '@/types/news';

export const CATEGORIES: NewsCategory[] = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

export const CATEGORY_NAMES: Record<NewsCategory, string> = {
  business: 'Business',
  entertainment: 'Entertainment',
  general: 'General',
  health: 'Health',
  science: 'Science',
  sports: 'Sports',
  technology: 'Technology'
};

export const COUNTRIES = {
  us: 'United States',
  gb: 'United Kingdom',
  ca: 'Canada',
  au: 'Australia',
  // Add more as needed
};