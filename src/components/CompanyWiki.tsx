/**
 * Company Wiki Component - Detailed company information display
 */

import React, { useState } from 'react';
import { X, ExternalLink, TrendingUp, TrendingDown, DollarSign, Users, Calendar, MapPin, Globe, Star } from 'lucide-react';
import { CompanyInfo } from '../data/companyData';

interface CompanyWikiProps {
  company: CompanyInfo;
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyWiki: React.FC<CompanyWikiProps> = ({ company, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'analysis'>('overview');

  if (!isOpen) return null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'High': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case 'Conservative': return 'text-blue-500';
      case 'Moderate': return 'text-yellow-500';
      case 'Aggressive': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Buy': return 'text-green-500';
      case 'Hold': return 'text-yellow-500';
      case 'Sell': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">{company.symbol.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{company.symbol}</h2>
              <p className="text-gray-400">{company.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#2a2a2a]">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'financials', label: 'Financials' },
            { id: 'analysis', label: 'Analysis' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Company Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Company Description</h3>
                <p className="text-gray-300 leading-relaxed">{company.description}</p>
              </div>

              {/* Key Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-400">Website</p>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-400 flex items-center gap-1"
                      >
                        {company.website}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-400">Founded</p>
                      <p className="text-white">{company.founded}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-400">Headquarters</p>
                      <p className="text-white">{company.headquarters}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-400">Employees</p>
                      <p className="text-white">{company.employees}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-400">CEO</p>
                      <p className="text-white">{company.ceo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-400">Market Cap</p>
                      <p className="text-white">{company.marketCap}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sector & Industry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Sector</h4>
                  <p className="text-white font-semibold">{company.sector}</p>
                </div>
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Industry</h4>
                  <p className="text-white font-semibold">{company.industry}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-6">
              {/* Key Financial Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Revenue</h4>
                  <p className="text-white font-semibold text-lg">{company.revenue}</p>
                </div>
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Net Income</h4>
                  <p className="text-white font-semibold text-lg">{company.netIncome}</p>
                </div>
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">P/E Ratio</h4>
                  <p className="text-white font-semibold text-lg">{company.peRatio}</p>
                </div>
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Dividend Yield</h4>
                  <p className="text-white font-semibold text-lg">{company.dividendYield}%</p>
                </div>
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Beta</h4>
                  <p className="text-white font-semibold text-lg">{company.beta}</p>
                </div>
                <div className="bg-[#0f0f0f] p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Price Target</h4>
                  <p className="text-white font-semibold text-lg">${company.priceTarget}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* Analyst Rating */}
              <div className="bg-[#0f0f0f] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Analyst Rating</h3>
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold ${getRatingColor(company.analystRating)}`}>
                    {company.analystRating}
                  </span>
                  <span className="text-gray-400">Price Target: ${company.priceTarget}</span>
                </div>
              </div>

              {/* Risk & Growth Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f0f0f] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Risk Level</span>
                      <span className={`font-semibold ${getRiskColor(company.riskLevel)}`}>
                        {company.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Beta</span>
                      <span className="text-white font-semibold">{company.beta}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0f0f0f] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Growth Potential</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Growth Profile</span>
                      <span className={`font-semibold ${getGrowthColor(company.growthPotential)}`}>
                        {company.growthPotential}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">P/E Ratio</span>
                      <span className="text-white font-semibold">{company.peRatio}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Summary */}
              <div className="bg-[#0f0f0f] p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Investment Summary</h3>
                <div className="space-y-2 text-gray-300">
                  <p>• <strong>Market Cap:</strong> {company.marketCap}</p>
                  <p>• <strong>Sector:</strong> {company.sector}</p>
                  <p>• <strong>Industry:</strong> {company.industry}</p>
                  <p>• <strong>Dividend Yield:</strong> {company.dividendYield}%</p>
                  <p>• <strong>Analyst Rating:</strong> {company.analystRating}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
