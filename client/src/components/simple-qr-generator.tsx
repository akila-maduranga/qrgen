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
                <div className="flex justify-center">
                  <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              )}
              
              {qrDataUrl && !isGenerating && (
                <>
                  <div className="inline-block p-4 bg-white border rounded-lg">
                    <img
                      src={qrDataUrl}
                      alt="Generated QR Code"
                      className="w-48 h-48"
                      data-testid="qr-image"
                    />
                  </div>
                  
                  <Button
                    onClick={downloadQR}
                    variant="outline"
                    className="w-full"
                    data-testid="button-download"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}