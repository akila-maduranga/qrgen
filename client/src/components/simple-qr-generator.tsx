import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";

export default function SimpleQRGenerator() {
  const [content, setContent] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQR = async () => {
    if (!content.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const QRCode = (await import("qrcode")).default;
      const dataUrl = await QRCode.toDataURL(content, {
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
          <p className="text-gray-600">Enter text to generate a QR code</p>
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

          {/* Generate Button */}
          <Button
            onClick={generateQR}
            disabled={!content.trim() || isGenerating}
            className="w-full"
            data-testid="button-generate"
          >
            {isGenerating ? "Generating..." : "Generate QR Code"}
          </Button>

          {/* QR Code Display */}
          {qrDataUrl && (
            <div className="text-center space-y-4">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}