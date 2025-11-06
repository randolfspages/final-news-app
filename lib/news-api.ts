interface NewsArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export async function getTopHeadlines(
  country: string = 'us',
  category?: string
): Promise<NewsApiResponse> {
  const API_KEY = process.env.NEWS_API_KEY;
  const params = new URLSearchParams({
    apiKey: API_KEY!,
    country,
    ...(category && { category }),
  });

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?${params}`
  );
  return response.json();
}

export async function searchNews(query: string): Promise<NewsApiResponse> {
  const API_KEY = process.env.NEWS_API_KEY;
  const params = new URLSearchParams({
    apiKey: API_KEY!,
    q: query,
    sortBy: 'publishedAt',
  });

  const response = await fetch(
    `https://newsapi.org/v2/everything?${params}`
  );
  return response.json();
}