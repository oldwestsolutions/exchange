/**
 * Homepage component with MSN-style staggered layout
 * Features: carousel, search in header, staggered grid
 */

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { NewsCarousel } from '../components/NewsCarousel';
import { mockNewsArticles } from '../data/newsData';

export const Homepage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter news articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockNewsArticles;
    }

    const query = searchQuery.toLowerCase();
    return mockNewsArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.source.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Get top 5 articles for carousel (breaking news)
  const carouselArticles = mockNewsArticles.slice(0, 5);
  
  // Get remaining articles for the grid
  const gridArticles = searchQuery ? filteredArticles : mockNewsArticles.slice(5);

  return (
    <div className="min-h-screen bg-[#0a0a0a] dark:bg-[#0a0a0a]">
      {/* Navbar with Search */}
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} showSearch={true} />
      
      {/* Add padding for fixed navbar */}
      <div className="pt-14 sm:pt-16">
        {/* Breaking News Carousel */}
        {!searchQuery && <NewsCarousel articles={carouselArticles} />}

        {/* NY Times-Style Layout */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 py-6 sm:py-10 pb-8">
          {gridArticles.length > 0 ? (
            <>
              {/* Section Header with Divider */}
              <div className="border-b border-[#2a2a2a] pb-3 sm:pb-4 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {searchQuery ? 'Search Results' : 'Latest Stories'}
                </h2>
              </div>

              {/* 3-Column Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
                {gridArticles.slice(0, 3).map((article) => (
                  <article
                    key={article.id}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden mb-3 sm:mb-4">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1 sm:mb-2">
                      {article.category}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white mb-2 sm:mb-3 leading-tight group-hover:text-gray-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-none">
                      {article.summary}
                    </p>
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-400">{article.source}</span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Additional Stories Grid */}
              {gridArticles.length > 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8 border-t border-[#2a2a2a]">
                  {gridArticles.slice(3, 6).map((article) => (
                  <article
                    key={article.id}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden mb-3 sm:mb-4">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1 sm:mb-2">
                      {article.category}
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-gray-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-400">{article.source}</span>
                    </div>
                  </article>
                  ))}
                </div>
              )}

              {/* More Headlines - Immersive Newspaper Style */}
              {gridArticles.length > 6 && (
                <div className="mt-10 sm:mt-16 pt-8 sm:pt-12 border-t-2 border-[#2a2a2a]">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white">More Headlines</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#2a2a2a] to-transparent ml-4 sm:ml-8"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-12 gap-y-1">
                    {gridArticles.slice(6, 21).map((article, index) => (
                      <a
                        key={article.id}
                        href={`#article-${article.id}`}
                        className="group cursor-pointer relative block"
                      >
                        <div className="py-4 sm:py-6 border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-all duration-300 px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-sm">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                              <span className="text-xs font-bold text-blue-500">
                                {(index + 1).toString().padStart(2, '0')}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors">
                                {article.category}
                              </div>
                              <h4 className="text-base sm:text-lg font-serif font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
                                {article.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1 sm:mt-2 group-hover:text-gray-400 transition-colors">
                                {article.source}
                              </p>
                            </div>
                          </div>
                          {/* Hover indicator line */}
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a1a1a] rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search query to find what you're looking for
              </p>
            </div>
          )}
        </div>

        {/* Professional Footer */}
        <footer className="border-t-2 border-[#2a2a2a] mt-12 sm:mt-20 pt-8 sm:pt-12 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 sm:mb-3">BridgeObserver</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  Your trusted source for news, insights, and analysis from around the world.
                </p>
              </div>

              {/* Sections */}
              <div>
                <h4 className="text-white font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Sections</h4>
                <ul className="space-y-2">
                  <li><a href="#technology" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Technology</a></li>
                  <li><a href="#business" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Business</a></li>
                  <li><a href="#politics" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Politics</a></li>
                  <li><a href="#science" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Science</a></li>
                  <li><a href="#culture" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Culture</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">About Us</a></li>
                  <li><a href="#contact" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Contact</a></li>
                  <li><a href="#careers" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Careers</a></li>
                  <li><a href="#advertise" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Advertise</a></li>
                  <li><a href="#press" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Press</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-white font-semibold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#terms" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Terms of Service</a></li>
                  <li><a href="#privacy" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="#cookies" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Cookie Policy</a></li>
                  <li><a href="#guidelines" className="text-gray-500 hover:text-blue-500 transition-colors text-sm">Community Guidelines</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[#2a2a2a] pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-xs sm:text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} BridgeObserver. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

