import { NewsArticle } from '@/types/news';
import { formatDate, truncateText } from '@/lib/utils';
import Image from 'next/image';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.urlToImage && (
        <div className="relative h-48 w-full">
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500 font-medium">
            {article.source.name}
          </span>
          <time className="text-sm text-gray-400">
            {formatDate(article.publishedAt)}
          </time>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {article.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateText(article.description || article.content, 150)}
        </p>
        
        {article.author && (
          <p className="text-sm text-gray-500 mb-4">
            By {article.author}
          </p>
        )}
        
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Read full article
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </article>
  );
}