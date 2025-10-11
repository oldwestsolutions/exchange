/**
 * News article card component
 */

import React from 'react';
import { NewsArticle } from '../types';
import { Clock, ExternalLink } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <article className="bg-[#1a1a1a] dark:bg-[#1a1a1a] rounded-xl shadow-sm hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden group cursor-pointer border border-[#2a2a2a] dark:border-[#2a2a2a] hover:border-blue-600">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white dark:text-white mb-2 line-clamp-2 group-hover:text-blue-500 dark:group-hover:text-blue-500 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-400 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {article.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white dark:text-white">
              {article.source}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-500">
            <Clock size={14} />
            <span>{formatDate(article.publishedAt)}</span>
            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </article>
  );
};

