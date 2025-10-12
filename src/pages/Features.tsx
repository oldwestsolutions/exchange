/**
 * Features page - comprehensive overview of platform features
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { SEO } from '../components/SEO';
import { 
  Brain, 
  Shield, 
  Globe, 
  Zap, 
  BarChart3, 
  Bell,
  TrendingUp,
  Activity,
  Lock,
  Smartphone,
  Database,
  Users,
  CheckCircle
} from 'lucide-react';

export const Features: React.FC = () => {
  const coreFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Risk Analysis',
      description: 'Advanced machine learning algorithms analyze market conditions in real-time, identifying potential risks and opportunities before they impact your positions.',
      features: [
        'Real-time market sentiment analysis',
        'Predictive risk modeling',
        'Pattern recognition and anomaly detection',
        'Machine learning-based forecasting'
      ]
    },
    {
      icon: Shield,
      title: 'Real-Time Risk Management',
      description: 'Automated portfolio monitoring with instant alerts when your positions approach predefined risk thresholds, helping you protect capital.',
      features: [
        'Customizable risk thresholds',
        'Portfolio volatility monitoring',
        'Position concentration alerts',
        'Stop-loss recommendations'
      ]
    },
    {
      icon: Globe,
      title: 'Global News Integration',
      description: 'Curated financial news from Thomson Reuters, Bloomberg, and premium sources, filtered and ranked by relevance to your portfolio.',
      features: [
        'Real-time news aggregation',
        'AI-powered relevance filtering',
        'Sentiment analysis',
        'Breaking news alerts'
      ]
    },
    {
      icon: Zap,
      title: 'Near-Term Trade Optimization',
      description: 'Specialized algorithms designed for short-term trading strategies, optimizing entry and exit points based on technical and fundamental analysis.',
      features: [
        'Entry/exit point optimization',
        'Technical indicator analysis',
        'Market timing signals',
        'Short-term trend identification'
      ]
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics Dashboard',
      description: 'Professional-grade charts and analytics tools with customizable indicators, allowing you to make data-driven decisions with confidence.',
      features: [
        'Customizable charts and indicators',
        'Portfolio performance metrics',
        'Historical backtesting',
        'Real-time data visualization'
      ]
    },
    {
      icon: Bell,
      title: 'Smart Alerts & Notifications',
      description: 'Customizable alerts for price movements, news events, and risk thresholds delivered instantly via web, mobile, and email.',
      features: [
        'Multi-channel notifications',
        'Price and volume alerts',
        'News-based triggers',
        'Custom alert conditions'
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: TrendingUp,
      title: 'Portfolio Optimization',
      description: 'AI-driven suggestions for portfolio rebalancing and position sizing'
    },
    {
      icon: Activity,
      title: 'Live Market Data',
      description: 'Real-time quotes, level 2 data, and market depth information'
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and SOC 2 compliance for your data'
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Full-featured iOS and Android apps for trading on the go'
    },
    {
      icon: Database,
      title: 'Historical Data',
      description: '10+ years of historical market data for backtesting'
    },
    {
      icon: Users,
      title: 'Multi-Account Support',
      description: 'Manage multiple trading accounts from a single dashboard'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SEO 
        title="Features - Professional Trading Tools"
        description="Discover Bridge Observer's comprehensive features: AI-powered risk analysis, real-time alerts, near-term trade optimization, advanced analytics, and Interactive Brokers integration."
        keywords="trading features, AI risk analysis, trading alerts, portfolio analytics, options trading tools, risk management features, trade optimization"
        canonical="https://bridgeobserver.com/features"
      />
      <Navbar showSearch={false} />
      
      <div className="pt-14 sm:pt-16">
        {/* Hero Section */}
        <section className="py-20 sm:py-32 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Everything You Need to Trade Smarter
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Professional-grade tools and AI-powered insights designed to help you manage risk and maximize returns on near-term trades
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-blue-600/30"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 bg-[#0a0a0a] border-t border-[#2a2a2a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Core Features</h2>
              <p className="text-xl text-gray-400">The foundation of intelligent trading</p>
            </div>

            <div className="space-y-20">
              {coreFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-lg text-gray-400 mb-6">{feature.description}</p>
                      <ul className="space-y-3">
                        {feature.features.map((item) => (
                          <li key={item} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 h-64 flex items-center justify-center">
                        <Icon className="w-32 h-32 text-blue-400/20" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-20 bg-[#0a0a0a] border-t border-[#2a2a2a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                And Much More
              </h2>
              <p className="text-xl text-gray-400">
                Additional features to enhance your trading experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="p-6 bg-[#1a1a1a] border border-white/10 rounded-xl hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-10 py-4 bg-transparent text-white font-bold rounded-lg border-2 border-white hover:bg-white/10 transition-all duration-200"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#2a2a2a] bg-[#0a0a0a] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Bridge Observer. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

