import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Check, AlertCircle, Search, TrendingUp, BarChart3 } from 'lucide-react';

interface StockScannerProps {
  onClose: () => void;
}

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
}

export const StockScanner: React.FC<StockScannerProps> = ({ onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock stock data for demonstration
  const mockStockData: { [key: string]: StockData } = {
    'AAPL': {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 189.95,
      change: 2.45,
      changePercent: 1.31,
      volume: 45678900,
      marketCap: '$2.9T',
      sector: 'Technology'
    },
    'MSFT': {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 378.85,
      change: -1.25,
      changePercent: -0.33,
      volume: 23456700,
      marketCap: '$2.8T',
      sector: 'Technology'
    },
    'GOOGL': {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 142.56,
      change: 3.21,
      changePercent: 2.31,
      volume: 12345600,
      marketCap: '$1.8T',
      sector: 'Technology'
    },
    'TSLA': {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 248.50,
      change: 12.75,
      changePercent: 5.41,
      volume: 67890100,
      marketCap: '$789B',
      sector: 'Automotive'
    },
    'NVDA': {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 875.28,
      change: 45.32,
      changePercent: 5.46,
      volume: 34567800,
      marketCap: '$2.1T',
      sector: 'Technology'
    },
    'AMZN': {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 145.86,
      change: -2.14,
      changePercent: -1.45,
      volume: 23456700,
      marketCap: '$1.5T',
      sector: 'Consumer Cyclical'
    }
  };

  // Initialize camera
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setIsScanning(true);
          setError(null);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera. Please check permissions.');
      }
    };

    initializeCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);

  // Simulate stock scanning
  useEffect(() => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;

    const scanForStocks = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      // Simulate stock symbol detection
      if (Math.random() < 0.008) { // 0.8% chance per scan
        const symbols = Object.keys(mockStockData);
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const stockData = mockStockData[randomSymbol];
        
        setScanResult(stockData);
        setIsScanning(false);
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    scanIntervalRef.current = setInterval(scanForStocks, 100);
  }, [isScanning]);

  const handleManualInput = () => {
    const input = prompt('Enter stock symbol (e.g., AAPL, MSFT, TSLA):');
    if (input && input.trim()) {
      const symbol = input.trim().toUpperCase();
      const stockData = mockStockData[symbol];
      
      if (stockData) {
        setScanResult(stockData);
        setIsScanning(false);
        setIsLoading(true);
        
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } else {
        alert(`Stock symbol "${symbol}" not found in our database.`);
      }
    }
  };

  const handleAddToWatchlist = () => {
    if (scanResult) {
      // In a real app, this would add to watchlist
      console.log('Adding to watchlist:', scanResult.symbol);
      alert(`${scanResult.symbol} added to watchlist!`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Stock Scanner</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Scanner Content */}
        <div className="p-4">
          {error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={handleManualInput}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enter Symbol Manually
              </button>
            </div>
          ) : isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-white text-lg font-semibold mb-2">Analyzing Stock...</p>
              <p className="text-gray-400 text-sm">Fetching real-time data</p>
            </div>
          ) : scanResult ? (
            <div className="space-y-4">
              <div className="text-center">
                <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-white text-lg font-semibold mb-2">Stock Found!</p>
              </div>
              
              {/* Stock Information */}
              <div className="bg-[#0f0f0f] rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-white">{scanResult.symbol}</h4>
                    <p className="text-gray-400 text-sm">{scanResult.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">${scanResult.price.toFixed(2)}</p>
                    <p className={`text-sm font-medium ${
                      scanResult.change >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {scanResult.change >= 0 ? '+' : ''}{scanResult.change.toFixed(2)} ({scanResult.changePercent >= 0 ? '+' : ''}{scanResult.changePercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#2a2a2a]">
                  <div>
                    <p className="text-gray-400 text-xs">Volume</p>
                    <p className="text-white font-medium">{scanResult.volume.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Market Cap</p>
                    <p className="text-white font-medium">{scanResult.marketCap}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-400 text-xs">Sector</p>
                    <p className="text-white font-medium">{scanResult.sector}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToWatchlist}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Add to Watchlist
                </button>
                <button
                  onClick={() => {
                    setScanResult(null);
                    setIsScanning(true);
                  }}
                  className="flex-1 py-3 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors flex items-center justify-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Scan Again
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Camera View */}
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-blue-500 rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500"></div>
                    
                    {/* Scanning Line */}
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-blue-500 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center space-y-2">
                <p className="text-white font-medium">Point camera at stock symbol or QR code</p>
                <p className="text-gray-400 text-sm">
                  Scanning for stock symbols, tickers, or financial QR codes
                </p>
              </div>

              {/* Manual Input Button */}
              <button
                onClick={handleManualInput}
                className="w-full py-3 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                Enter Symbol Manually
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
