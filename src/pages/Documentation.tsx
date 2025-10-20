/**
 * Documentation page - comprehensive guides and API documentation
 */

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Book, Code, Settings, Shield, Zap, ChevronRight } from 'lucide-react';

export const Documentation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: Book },
    { id: 'api', name: 'API Reference', icon: Code },
    { id: 'risk-management', name: 'Risk Management', icon: Shield },
    { id: 'algorithms', name: 'Algorithms', icon: Zap },
    { id: 'configuration', name: 'Configuration', icon: Settings }
  ];

  const docs = {
    'getting-started': [
      { title: 'Quick Start Guide', description: 'Get up and running in 5 minutes' },
      { title: 'Creating Your First Portfolio', description: 'Learn how to set up and monitor your portfolio' },
      { title: 'Understanding Risk Metrics', description: 'Key metrics and what they mean' },
      { title: 'Setting Up Alerts', description: 'Configure notifications for your positions' }
    ],
    'api': [
      { title: 'Authentication', description: 'API keys and authentication methods' },
      { title: 'REST API Endpoints', description: 'Complete REST API reference' },
      { title: 'WebSocket Streams', description: 'Real-time data streaming' },
      { title: 'Rate Limits', description: 'API usage limits and best practices' }
    ],
    'risk-management': [
      { title: 'Risk Scoring System', description: 'How we calculate risk scores' },
      { title: 'Portfolio Analysis', description: 'Understanding portfolio metrics' },
      { title: 'Custom Risk Thresholds', description: 'Setting up custom alerts' },
      { title: 'Risk Mitigation Strategies', description: 'Best practices for managing risk' }
    ],
    'algorithms': [
      { title: 'AI-Powered Analysis', description: 'How our machine learning models work' },
      { title: 'Near-Term Trade Optimization', description: 'Short-term trading algorithms' },
      { title: 'Pattern Recognition', description: 'Technical analysis automation' },
      { title: 'Backtesting', description: 'Test strategies with historical data' }
    ],
    'configuration': [
      { title: 'Account Settings', description: 'Manage your account preferences' },
      { title: 'Integration Setup', description: 'Connect to brokerages and data sources' },
      { title: 'Notification Preferences', description: 'Customize your alerts' },
      { title: 'Security Settings', description: 'Two-factor authentication and more' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar showSearch={false} />
      
      <div className="pt-14 sm:pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-[#0a0a0a] border-b border-[#2a2a2a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Documentation</h1>
            <p className="text-xl text-gray-400">
              Everything you need to know about using General Exchange
            </p>
          </div>
        </section>

        {/* Documentation Content */}
        <section className="py-12 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <nav className="space-y-2 sticky top-20">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                          selectedCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{category.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <div className="space-y-4">
                  {docs[selectedCategory as keyof typeof docs].map((doc) => (
                    <a
                      key={doc.title}
                      href="#"
                      className="block p-6 bg-[#1a1a1a] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {doc.title}
                          </h3>
                          <p className="text-gray-400">{doc.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a] py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} General Exchange. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

