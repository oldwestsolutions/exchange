import React, { useState, useEffect, useRef } from 'react';
import { X, Send, TrendingUp, AlertTriangle, Zap, Brain, MessageSquare, Eye, DollarSign, Activity } from 'lucide-react';
import { GreeksHeatmapModal } from './GreeksHeatmapModal';

interface OptionsScannerProps {
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
  isTyping?: boolean;
}

interface VolatileStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  volatility: number;
  options: {
    calls: number;
    puts: number;
    totalVolume: string;
    avgIV: number;
  };
}

export const OptionsScanner: React.FC<OptionsScannerProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Here are the stocks with the highest absolute Delta values - these are the most sensitive to underlying price movements:',
      timestamp: new Date(),
      data: { type: 'high_delta_options', stocks: volatileStocks.sort((a, b) => b.options.avgIV - a.options.avgIV) }
    }
  ]);

  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [heatmapModal, setHeatmapModal] = useState<{isOpen: boolean, symbol: string, companyName: string}>({
    isOpen: false,
    symbol: '',
    companyName: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock volatile stocks data
  const volatileStocks: VolatileStock[] = [
    {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 258.67,
      change: 8.92,
      changePercent: 3.57,
      volume: '102.5M',
      volatility: 0.68,
      options: { calls: 1250, puts: 890, totalVolume: '2.1M', avgIV: 0.45 }
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 456.23,
      change: 12.45,
      changePercent: 2.81,
      volume: '45.2M',
      volatility: 0.52,
      options: { calls: 2100, puts: 1200, totalVolume: '3.3M', avgIV: 0.38 }
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 142.38,
      change: -1.24,
      changePercent: -0.86,
      volume: '28.7M',
      volatility: 0.41,
      options: { calls: 1800, puts: 1500, totalVolume: '3.3M', avgIV: 0.32 }
    },
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 178.45,
      change: -1.23,
      changePercent: -0.68,
      volume: '58.3M',
      volatility: 0.35,
      options: { calls: 3200, puts: 2100, totalVolume: '5.3M', avgIV: 0.28 }
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 312.45,
      change: 8.92,
      changePercent: 2.94,
      volume: '18.3M',
      volatility: 0.48,
      options: { calls: 950, puts: 750, totalVolume: '1.7M', avgIV: 0.42 }
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateAIResponse(currentInput);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        data: response.data,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('volatile') || lowerInput.includes('volatility')) {
      return {
        content: `Here are the most volatile stocks today with high options activity:`,
        data: { type: 'volatile_stocks', stocks: volatileStocks }
      };
    }

    if (lowerInput.includes('high volume') || lowerInput.includes('volume')) {
      return {
        content: `These stocks have the highest options volume today:`,
        data: { type: 'high_volume', stocks: volatileStocks.sort((a, b) => parseInt(b.options.totalVolume) - parseInt(a.options.totalVolume)) }
      };
    }

    if (lowerInput.includes('calls') || lowerInput.includes('call')) {
      return {
        content: `Here are the best call options opportunities based on volume and IV:`,
        data: { type: 'call_options', stocks: volatileStocks.filter(s => s.options.calls > s.options.puts) }
      };
    }

    if (lowerInput.includes('puts') || lowerInput.includes('put')) {
      return {
        content: `Here are the best put options for hedging and bearish plays:`,
        data: { type: 'put_options', stocks: volatileStocks.filter(s => s.options.puts > s.options.calls) }
      };
    }

    if (lowerInput.includes('tesla') || lowerInput.includes('tsla')) {
      const tesla = volatileStocks.find(s => s.symbol === 'TSLA');
      return {
        content: `Tesla (TSLA) Analysis:\n\n• Current Price: $${tesla?.price}\n• Change: ${tesla?.changePercent > 0 ? '+' : ''}${tesla?.changePercent}%\n• Volatility: ${tesla?.volatility * 100}%\n• Options Volume: ${tesla?.options.totalVolume}\n• Average IV: ${tesla?.options.avgIV * 100}%\n\nHigh volatility makes TSLA great for options trading!`,
        data: { type: 'stock_analysis', stock: tesla }
      };
    }

    return {
      content: `I understand you're looking for "${input}". Let me help you find the best options opportunities. Try asking me about:\n\n• Most volatile stocks\n• High-volume options\n• Call or put opportunities\n• Specific stocks like Tesla, Apple, or NVIDIA`
    };
  };

  const renderMessage = (message: ChatMessage) => {
    if (message.type === 'user') {
      return (
        <div className="flex justify-end mb-4">
          <div className="bg-blue-600 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs lg:max-w-md">
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-start mb-4">
        <div className="bg-[#2a2a2a] text-white rounded-2xl rounded-bl-md px-4 py-3 max-w-xs lg:max-w-2xl">
          <div className="flex items-start gap-2 mb-2">
            <Brain className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              
              {message.data && (message.data.type === 'volatile_stocks' || message.data.type === 'high_delta_options') && (
                <div className="mt-4 space-y-3">
                  {message.data.stocks.map((stock: VolatileStock) => (
                    <div 
                      key={stock.symbol} 
                      className="bg-[#1a1a1a] rounded-lg p-3 border border-[#3a3a3a] cursor-pointer hover:border-blue-500/50 transition-colors"
                      onClick={() => setHeatmapModal({
                        isOpen: true,
                        symbol: stock.symbol,
                        companyName: stock.name
                      })}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{stock.symbol}</span>
                          <span className="text-xs text-gray-400">{stock.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-semibold text-green-500">
                            {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-400">Price:</span>
                          <span className="text-white ml-1">${stock.price.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Volatility:</span>
                          <span className="text-yellow-400 ml-1">{(stock.volatility * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Options:</span>
                          <span className="text-blue-400 ml-1">{stock.options.totalVolume}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">IV:</span>
                          <span className="text-purple-400 ml-1">{(stock.options.avgIV * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                      {message.data.type === 'high_delta_options' && (
                        <div className="mt-2 pt-2 border-t border-[#3a3a3a]">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Delta Sensitivity:</span>
                            <span className="text-orange-400 font-semibold">High</span>
                          </div>
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className="text-gray-400">Calls vs Puts:</span>
                            <span className="text-green-400">{stock.options.calls} / {stock.options.puts}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {message.data && message.data.type === 'stock_analysis' && (
                <div className="mt-4 bg-[#1a1a1a] rounded-lg p-3 border border-[#3a3a3a]">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-white">{message.data.stock.symbol} Analysis</span>
                  </div>
                  <div className="text-xs text-gray-300">
                    Real-time data • Updated just now
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">AI Options Scanner</h3>
              <p className="text-xs text-gray-400">Powered by General Exchange AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Input Area - Moved to Top */}
        <div className="p-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me about volatile stocks, options volume, or specific strategies..."
                className="w-full bg-[#2a2a2a] text-white rounded-xl px-4 py-3 pr-12 border border-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentInput.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              'Most volatile stocks',
              'High volume options',
              'Best call options',
              'Tesla analysis',
              'Put options for hedging'
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setCurrentInput(suggestion)}
                className="px-3 py-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 text-xs rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {renderMessage(message)}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-[#2a2a2a] text-white rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Greeks Heatmap Modal */}
        <GreeksHeatmapModal
          isOpen={heatmapModal.isOpen}
          onClose={() => setHeatmapModal({ isOpen: false, symbol: '', companyName: '' })}
          symbol={heatmapModal.symbol}
          companyName={heatmapModal.companyName}
        />
      </div>
    </div>
  );
};