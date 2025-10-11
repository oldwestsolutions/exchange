/**
 * Wikipedia-inspired company details page
 * Shows company bio, recent news, and options chain
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Users, MapPin, Globe, ExternalLink } from 'lucide-react';

interface CompanyDetails {
  symbol: string;
  name: string;
  fullName: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  description: string;
  founded: string;
  headquarters: string;
  website: string;
  employees: string;
  sector: string;
  industry: string;
  ceo: string;
}

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: string;
}

interface OptionContract {
  id: number;
  symbol: string;
  type: 'CALL' | 'PUT';
  strike: number;
  expiration: string;
  bid: number;
  ask: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
}

export const CompanyDetails: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'options'>('overview');

  // Mock data for IBM
  const companyData: CompanyDetails = {
    symbol: 'IBM',
    name: 'IBM',
    fullName: 'International Business Machines Corporation',
    price: 142.35,
    change: 2.47,
    changePercent: 1.77,
    volume: '4.2M',
    marketCap: '$131.2B',
    description: `International Business Machines Corporation (IBM) is an American multinational technology corporation headquartered in Armonk, New York. Founded in 1911, IBM is one of the world's oldest and largest technology companies. The company operates in over 175 countries and employs approximately 282,000 people worldwide.

IBM is a leader in cloud computing, artificial intelligence, quantum computing, and enterprise software. The company provides a wide range of technology services including cloud platforms, data analytics, cybersecurity, and consulting services. IBM's main business segments include Cloud & Cognitive Software, Global Business Services, Global Technology Services, and Systems.

The company is known for its research and development efforts, holding thousands of patents and operating several research laboratories around the world. IBM has been at the forefront of technological innovation, from early computing machines to modern artificial intelligence systems like Watson.`,
    founded: 'June 16, 1911',
    headquarters: 'Armonk, New York, United States',
    website: 'https://www.ibm.com',
    employees: '282,000 (2023)',
    sector: 'Technology',
    industry: 'Information Technology Services',
    ceo: 'Arvind Krishna'
  };

  const recentNews: NewsArticle[] = [
    {
      id: 1,
      title: 'IBM Reports Strong Q4 2023 Earnings, AI Revenue Grows 20%',
      summary: 'International Business Machines Corporation reported better-than-expected fourth quarter earnings, with AI and cloud revenue showing significant growth.',
      source: 'Reuters',
      date: '2024-01-24',
      category: 'Earnings'
    },
    {
      id: 2,
      title: 'IBM Partners with Major Cloud Providers for Hybrid AI Solutions',
      summary: 'IBM announces strategic partnerships with leading cloud providers to enhance hybrid AI capabilities for enterprise customers.',
      source: 'TechCrunch',
      date: '2024-01-22',
      category: 'Partnerships'
    },
    {
      id: 3,
      title: 'IBM Watson AI Platform Sees Record Adoption in Healthcare Sector',
      summary: 'Healthcare organizations are increasingly adopting IBM Watson AI solutions for diagnostic and treatment planning applications.',
      source: 'Healthcare IT News',
      date: '2024-01-20',
      category: 'Healthcare'
    },
    {
      id: 4,
      title: 'IBM Quantum Computing Breakthrough Achieves 1,000-Qubit Milestone',
      summary: 'IBM researchers achieve a significant milestone in quantum computing with their latest 1,000-qubit quantum processor.',
      source: 'Nature',
      date: '2024-01-18',
      category: 'Research'
    }
  ];

  const optionsChain: OptionContract[] = [
    { id: 1, symbol: 'IBM', type: 'CALL', strike: 140, expiration: '2024-02-16', bid: 4.50, ask: 4.80, volume: 1250, openInterest: 8920, impliedVolatility: 0.28 },
    { id: 2, symbol: 'IBM', type: 'CALL', strike: 145, expiration: '2024-02-16', bid: 2.10, ask: 2.30, volume: 890, openInterest: 5430, impliedVolatility: 0.26 },
    { id: 3, symbol: 'IBM', type: 'CALL', strike: 150, expiration: '2024-02-16', bid: 0.85, ask: 1.05, volume: 420, openInterest: 3210, impliedVolatility: 0.24 },
    { id: 4, symbol: 'IBM', type: 'PUT', strike: 140, expiration: '2024-02-16', bid: 2.20, ask: 2.50, volume: 680, openInterest: 4560, impliedVolatility: 0.30 },
    { id: 5, symbol: 'IBM', type: 'PUT', strike: 135, expiration: '2024-02-16', bid: 1.10, ask: 1.30, volume: 320, openInterest: 2890, impliedVolatility: 0.32 },
    { id: 6, symbol: 'IBM', type: 'PUT', strike: 130, expiration: '2024-02-16', bid: 0.45, ask: 0.65, volume: 180, openInterest: 1870, impliedVolatility: 0.34 },
    { id: 7, symbol: 'IBM', type: 'CALL', strike: 140, expiration: '2024-03-15', bid: 6.80, ask: 7.10, volume: 2100, openInterest: 12560, impliedVolatility: 0.31 },
    { id: 8, symbol: 'IBM', type: 'PUT', strike: 140, expiration: '2024-03-15', bid: 4.20, ask: 4.50, volume: 1450, openInterest: 8920, impliedVolatility: 0.33 }
  ];

  const isPositive = companyData.change >= 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-14 sm:pt-16">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{companyData.symbol}</h1>
              <div className="flex items-center space-x-2">
                {isPositive ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
                <span className={`text-lg font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  ${companyData.price.toFixed(2)} ({isPositive ? '+' : ''}{companyData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
        {/* Company Info Card */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{companyData.fullName}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">{companyData.description}</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Market Cap</p>
                  <p className="text-lg font-bold text-white">{companyData.marketCap}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Volume</p>
                  <p className="text-lg font-bold text-white">{companyData.volume}</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-[#2a2a2a]">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Founded: {companyData.founded}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{companyData.headquarters}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">{companyData.employees} employees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300">
                    <span>Official Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a]'
            }`}
          >
            Overview & News
          </button>
          <button
            onClick={() => setActiveTab('options')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'options'
                ? 'bg-blue-600 text-white'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a]'
            }`}
          >
            Options Chain
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Recent News */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent News</h3>
              <div className="space-y-4">
                {recentNews.map((article) => (
                  <div key={article.id} className="border-b border-[#2a2a2a] pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold text-white hover:text-blue-400 cursor-pointer transition-colors">
                        {article.title}
                      </h4>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{article.summary}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{article.source}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Details */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Sector</p>
                  <p className="text-white">{companyData.sector}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Industry</p>
                  <p className="text-white">{companyData.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">CEO</p>
                  <p className="text-white">{companyData.ceo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Headquarters</p>
                  <p className="text-white">{companyData.headquarters}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'options' && (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Options Chain</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2a2a2a]">
                    <th className="text-left py-3 px-2 text-gray-400">Type</th>
                    <th className="text-left py-3 px-2 text-gray-400">Strike</th>
                    <th className="text-left py-3 px-2 text-gray-400">Expiration</th>
                    <th className="text-right py-3 px-2 text-gray-400">Bid</th>
                    <th className="text-right py-3 px-2 text-gray-400">Ask</th>
                    <th className="text-right py-3 px-2 text-gray-400">Volume</th>
                    <th className="text-right py-3 px-2 text-gray-400">OI</th>
                    <th className="text-right py-3 px-2 text-gray-400">IV</th>
                  </tr>
                </thead>
                <tbody>
                  {optionsChain.map((option) => (
                    <tr key={option.id} className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a]/50 transition-colors">
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          option.type === 'CALL' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {option.type}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-white font-medium">${option.strike}</td>
                      <td className="py-3 px-2 text-gray-300">{option.expiration}</td>
                      <td className="py-3 px-2 text-right text-white">${option.bid.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right text-white">${option.ask.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right text-gray-300">{option.volume.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-gray-300">{option.openInterest.toLocaleString()}</td>
                      <td className="py-3 px-2 text-right text-gray-300">{(option.impliedVolatility * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
