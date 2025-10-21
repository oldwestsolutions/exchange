/**
 * Wikipedia-inspired company details page
 * Shows company bio, recent news, and options chain
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Users, MapPin, Globe, ExternalLink, Activity, Zap } from 'lucide-react';

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
  const [activeGreek, setActiveGreek] = useState<'theta' | 'gamma' | 'delta'>('theta');

  // Greeks calculation functions
  const calculateGreeks = (option: OptionContract, currentPrice: number) => {
    const timeToExp = (new Date(option.expiration).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 365);
    const moneyness = option.strike / currentPrice;
    
    if (timeToExp <= 0) {
      return { theta: 0, gamma: 0, delta: option.type === 'CALL' ? 1 : -1 };
    }

    // Simplified Greeks calculation
    const theta = -Math.exp(-timeToExp * 2) * (1 - Math.abs(moneyness - 1)) * 0.1;
    const gamma = Math.random() * 0.05 + 0.01;
    const delta = option.type === 'CALL' ? Math.random() * 0.8 + 0.1 : Math.random() * 0.8 - 0.9;
    
    return { theta, gamma, delta };
  };

  const getGreekValue = (option: OptionContract, currentPrice: number) => {
    const greeks = calculateGreeks(option, currentPrice);
    return activeGreek === 'theta' ? greeks.theta : 
           activeGreek === 'gamma' ? greeks.gamma : 
           greeks.delta;
  };

  const getDotProperties = (option: OptionContract, currentPrice: number) => {
    const greekValue = getGreekValue(option, currentPrice);
    const moneyness = option.strike / currentPrice;
    const isATM = Math.abs(moneyness - 1) < 0.05;
    const intensity = Math.abs(greekValue);
    
    let dotSize, dotColor;
    
    if (activeGreek === 'theta') {
      dotSize = Math.max(4, Math.min(20, intensity * 200));
      dotColor = isATM ? '#ef4444' : intensity > 0.05 ? '#f59e0b' : '#10b981';
    } else if (activeGreek === 'gamma') {
      dotSize = Math.max(4, Math.min(20, intensity * 1000));
      dotColor = intensity > 0.03 ? '#f59e0b' : intensity > 0.01 ? '#eab308' : '#10b981';
    } else { // delta
      dotSize = Math.max(4, Math.min(20, intensity * 25));
      dotColor = intensity > 0.7 ? '#3b82f6' : intensity > 0.3 ? '#60a5fa' : '#93c5fd';
    }
    
    return { dotSize, dotColor, greekValue };
  };

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
          <div className="space-y-6">
            {/* Greeks Analysis Header */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Greeks Analysis</h3>
                    <p className="text-sm text-gray-400">Options risk visualization for {companyData.symbol} at ${companyData.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Current Price</div>
                  <div className="text-lg font-bold text-white">${companyData.price.toFixed(2)}</div>
                </div>
              </div>
              
              {/* Greek Toggle Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveGreek('theta')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeGreek === 'theta'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Theta (Time Decay)
                  </div>
                </button>
                <button
                  onClick={() => setActiveGreek('gamma')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeGreek === 'gamma'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Gamma (Acceleration)
                  </div>
                </button>
                <button
                  onClick={() => setActiveGreek('delta')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeGreek === 'delta'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#3a3a3a]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Delta (Price Sensitivity)
                  </div>
                </button>
              </div>
            </div>

            {/* Greeks Dot Plot Visualization */}
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <div className="grid grid-cols-4 gap-6">
                {['2024-01-19', '2024-02-16', '2024-03-15', '2024-04-19'].map(exp => {
                  const expOptions = optionsChain.filter(opt => opt.expiration === exp);
                  const daysToExp = Math.ceil((new Date(exp).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={exp} className="space-y-3">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-white">
                          {new Date(exp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-gray-400">{daysToExp} days</div>
                      </div>
                      
                      {/* Dot Plot */}
                      <div className="space-y-2">
                        {expOptions
                          .sort((a, b) => a.strike - b.strike)
                          .map(option => {
                            const { dotSize, dotColor, greekValue } = getDotProperties(option, companyData.price);
                            
                            return (
                              <div key={`${option.strike}-${exp}`} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="rounded-full"
                                    style={{
                                      width: `${dotSize}px`,
                                      height: `${dotSize}px`,
                                      backgroundColor: dotColor
                                    }}
                                  ></div>
                                  <div className="text-xs text-gray-300">
                                    ${option.strike}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {greekValue.toFixed(3)}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Legend and Formula */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <h5 className="text-sm font-semibold text-white mb-3">
                  {activeGreek === 'theta' ? 'Time Decay Intensity' : 
                   activeGreek === 'gamma' ? 'Price Acceleration' : 
                   'Price Sensitivity'}
                </h5>
                <div className="space-y-2">
                  {activeGreek === 'theta' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">ATM Options (Fastest Decay)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">High Decay</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Low Decay</span>
                      </div>
                    </>
                  ) : activeGreek === 'gamma' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">High Acceleration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                        <span className="text-xs text-gray-300">Medium Acceleration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Low Acceleration</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">High Sensitivity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-gray-300">Medium Sensitivity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                        <span className="text-xs text-gray-300">Low Sensitivity</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
                <h5 className="text-sm font-semibold text-white mb-3">
                  {activeGreek === 'theta' ? 'Theta Formula' : 
                   activeGreek === 'gamma' ? 'Gamma Formula' : 
                   'Delta Formula'}
                </h5>
                <div className="text-xs text-gray-300 space-y-1">
                  {activeGreek === 'theta' ? (
                    <>
                      <div><span className="text-blue-400">θ</span> = -e^(-2t) × (1 - |K/S - 1|) × 0.1</div>
                      <div><span className="text-blue-400">t</span> = Time to expiration</div>
                      <div><span className="text-blue-400">K</span> = Strike price</div>
                      <div><span className="text-blue-400">S</span> = Current price (${companyData.price.toFixed(2)})</div>
                      <div className="text-yellow-400 mt-2">Larger dots = Faster decay</div>
                    </>
                  ) : activeGreek === 'gamma' ? (
                    <>
                      <div><span className="text-blue-400">γ</span> = N'(d1) / (S × σ × √T)</div>
                      <div><span className="text-blue-400">S</span> = Current price (${companyData.price.toFixed(2)})</div>
                      <div><span className="text-blue-400">σ</span> = Implied volatility</div>
                      <div><span className="text-blue-400">T</span> = Time to expiration</div>
                      <div className="text-yellow-400 mt-2">Larger dots = Higher acceleration</div>
                    </>
                  ) : (
                    <>
                      <div><span className="text-blue-400">Δ</span> = N(d1) for calls, N(d1) - 1 for puts</div>
                      <div><span className="text-blue-400">d1</span> = (ln(S/K) + (r + σ²/2)T) / (σ√T)</div>
                      <div><span className="text-blue-400">S</span> = Current price (${companyData.price.toFixed(2)})</div>
                      <div><span className="text-blue-400">K</span> = Strike price</div>
                      <div className="text-yellow-400 mt-2">Larger dots = Higher sensitivity</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
