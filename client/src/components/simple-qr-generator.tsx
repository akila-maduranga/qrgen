import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";

export default function SimpleQRGenerator() {
  const [content, setContent] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQR = async (text: string) => {
    if (!text.trim()) {
      setQrDataUrl("");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const QRCode = (await import("qrcode")).default;
      const dataUrl = await QRCode.toDataURL(text, {
        width: 256,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        errorCorrectionLevel: 'M',
      });
      setQrDataUrl(dataUrl);
    } catch (error) {
      console.error("QR generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Real-time generation with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQR(content);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [content]);

  const downloadQR = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
          <p className="text-gray-600">Enter text to generate a QR code in real-time</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
          {/* Text Input */}
          <div>
            <Textarea
              placeholder="Enter text, URL, or any content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full resize-none"
              rows={3}
              data-testid="input-content"
            />
          </div>



          {/* QR Code Display */}
          {(content.trim() || qrDataUrl) && (
            <div className="text-center space-y-4">
              {isGenerating && (
                <div className="flex flex-col items-center space-y-6 py-8">
                  {/* Animated QR Code Grid */}
                  <div className="relative bg-white p-6 rounded-xl shadow-lg">
                    <div className="grid grid-cols-5 gap-1 w-32 h-32">
                      {[...Array(25)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-5 h-5 rounded-sm qr-pixel-animate ${
                            [0, 1, 2, 3, 5, 10, 15, 20, 21, 22, 23, 24, 4, 9, 14, 19].includes(i) 
                              ? 'bg-gray-900' 
                              : 'bg-gray-200'
                          }`}
                          style={{
                            animationDelay: `${i * 50}ms`
                          }}
                        />
                      ))}
                    </div>
                    {/* Multiple Scanning Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent scan-line-animate"></div>
                      <div 
                        className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-green-500 to-transparent scan-line-animate"
                        style={{ animationDelay: '0.5s', left: '50%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-center space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 200}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-lg font-medium text-gray-700 animate-pulse">
                      ✨ Generating QR Code...
                    </p>
                  </div>
                </div>
              )}
              
              {qrDataUrl && !isGenerating && (
                <div className="fade-in-scale">
                  <div className="inline-block p-6 bg-white border-2 border-gray-100 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-200">
                    <img
                      src={qrDataUrl}
                      alt="Generated QR Code"
                      className="w-48 h-48 rounded-lg"
                      data-testid="qr-image"
                    />
                  </div>
                  
                  <Button
                    onClick={downloadQR}
                    variant="outline"
                    className="w-full mt-6 py-3 text-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 hover:shadow-lg"
                    data-testid="button-download"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PNG
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}