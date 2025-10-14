import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Check, AlertCircle } from 'lucide-react';

interface ScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({ onScan, onClose }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize camera
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment', // Use back camera on mobile
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

  // Simple barcode/QR code detection simulation
  useEffect(() => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;

    const scanForCodes = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      // Simulate scanning by checking for patterns
      // In a real implementation, you'd use a library like jsQR or QuaggaJS
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Simple pattern detection simulation
      if (Math.random() < 0.01) { // 1% chance per scan
        const mockResults = [
          'AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'AMZN', 'META', 'NFLX',
          'SPY', 'QQQ', 'IWM', 'VTI', 'ARKK', 'TQQQ', 'SQQQ',
          'https://example.com/stock/AAPL',
          'STOCK:AAPL:180:2025-12-15',
          '{"symbol":"AAPL","strike":180,"expiry":"2025-12-15"}'
        ];
        
        const result = mockResults[Math.floor(Math.random() * mockResults.length)];
        setScanResult(result);
        setIsScanning(false);
        
        // Auto-close after 2 seconds
        setTimeout(() => {
          onScan(result);
          onClose();
        }, 2000);
      }
    };

    scanIntervalRef.current = setInterval(scanForCodes, 100);
  }, [isScanning, onScan, onClose]);

  const handleManualInput = () => {
    const input = prompt('Enter stock symbol or scan result:');
    if (input && input.trim()) {
      onScan(input.trim().toUpperCase());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          <h3 className="text-lg font-semibold text-white">Scanner</h3>
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
                Enter Manually
              </button>
            </div>
          ) : scanResult ? (
            <div className="text-center py-8">
              <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-white text-lg font-semibold mb-2">Scanned Successfully!</p>
              <p className="text-blue-400 font-mono text-sm bg-[#0f0f0f] p-3 rounded-lg">
                {scanResult}
              </p>
              <p className="text-gray-400 text-sm mt-4">Processing...</p>
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
                <p className="text-white font-medium">Point camera at QR code or barcode</p>
                <p className="text-gray-400 text-sm">
                  Position the code within the frame to scan
                </p>
              </div>

              {/* Manual Input Button */}
              <button
                onClick={handleManualInput}
                className="w-full py-3 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors flex items-center justify-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Enter Manually
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
