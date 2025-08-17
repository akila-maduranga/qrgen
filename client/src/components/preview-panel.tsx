import { Download, QrCode, FileImage, FileText, Image, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QRConfig } from "./qr-generator";

interface PreviewPanelProps {
  qrDataUrl: string;
  config: QRConfig;
  isGenerating: boolean;
}

export default function PreviewPanel({ qrDataUrl, config, isGenerating }: PreviewPanelProps) {
  const sizeMap = {
    small: "200x200",
    medium: "400x400",
    large: "600x600",
    xlarge: "800x800",
  };

  const downloadQR = async (format: "png" | "jpg" | "svg" | "pdf") => {
    if (!qrDataUrl) return;

    try {
      if (format === "png" || format === "jpg") {
        // Create a temporary link to download the image
        const link = document.createElement("a");
        
        if (format === "jpg") {
          // Convert PNG to JPG
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;
          const img = document.createElement('img');
          
          img.onload = () => {
            const sizeValue = parseInt(sizeMap[config.size].split("x")[0]);
            canvas.width = sizeValue;
            canvas.height = sizeValue;
            
            // Fill with white background for JPG
            ctx.fillStyle = config.backgroundColor;
            ctx.fillRect(0, 0, sizeValue, sizeValue);
            ctx.drawImage(img, 0, 0);
            
            link.download = `qrcode.${format}`;
            link.href = canvas.toDataURL(`image/${format}`, 0.9);
            link.click();
          };
          img.src = qrDataUrl;
        } else {
          link.download = `qrcode.${format}`;
          link.href = qrDataUrl;
          link.click();
        }
      } else if (format === "svg") {
        // Generate SVG version
        const QRCode = (await import("qrcode")).default;
        const sizeValue = parseInt(sizeMap[config.size].split("x")[0]);
        
        const svgString = await QRCode.toString(config.content, {
          type: "svg",
          width: sizeValue,
          color: {
            dark: config.foregroundColor,
            light: config.backgroundColor,
          },
        });
        
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "qrcode.svg";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === "pdf") {
        // For PDF, we'll use the canvas approach and convert to PDF-like format
        // This is a simplified approach - in a real app you might want to use jsPDF
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const img = document.createElement('img');
        
        img.onload = () => {
          const sizeValue = parseInt(sizeMap[config.size].split("x")[0]);
          canvas.width = sizeValue;
          canvas.height = sizeValue;
          
          ctx.fillStyle = config.backgroundColor;
          ctx.fillRect(0, 0, sizeValue, sizeValue);
          ctx.drawImage(img, 0, 0);
          
          // Create a simple "PDF" (actually a high-quality PNG)
          const link = document.createElement("a");
          link.download = "qrcode.pdf";
          link.href = canvas.toDataURL("image/png", 1.0);
          link.click();
        };
        img.src = qrDataUrl;
      }
    } catch (error) {
      console.error(`Error downloading ${format}:`, error);
    }
  };

  const downloadAll = async () => {
    if (!qrDataUrl) return;
    
    await downloadQR("png");
    setTimeout(() => downloadQR("jpg"), 100);
    setTimeout(() => downloadQR("svg"), 200);
    setTimeout(() => downloadQR("pdf"), 300);
  };

  const hasQR = !!qrDataUrl;

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-gray-200 p-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Generated QR Code</h3>

      {/* QR Code Display Area */}
      <div className="bg-gray-50 rounded-xl p-8 mb-6 text-center min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300">
        {!hasQR && !isGenerating && (
          <div className="text-center" data-testid="qr-empty-state">
            <div className="w-20 h-20 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-600 mb-2">No QR Code Generated</h4>
            <p className="text-gray-500">Enter content and click "Generate QR Code" to create your QR code</p>
          </div>
        )}

        {isGenerating && (
          <div className="text-center" data-testid="qr-loading-state">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Generating QR code...</p>
          </div>
        )}

        {hasQR && !isGenerating && (
          <div className="" data-testid="qr-display">
            <div className="w-80 h-80 mx-auto bg-white p-4 rounded-lg shadow-sm border">
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                className="w-full h-full object-contain"
                data-testid="qr-image"
              />
            </div>
          </div>
        )}
      </div>

      {/* Download Options */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 mb-3">
          <Download className="inline mr-2 h-4 w-4 text-primary" />
          Download Options
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => downloadQR("png")}
            disabled={!hasQR}
            variant="outline"
            className="flex items-center justify-center py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            data-testid="button-download-png"
          >
            <FileImage className="mr-2 h-4 w-4" />
            PNG
          </Button>
          <Button
            onClick={() => downloadQR("jpg")}
            disabled={!hasQR}
            variant="outline"
            className="flex items-center justify-center py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            data-testid="button-download-jpg"
          >
            <Image className="mr-2 h-4 w-4" />
            JPG
          </Button>
          <Button
            onClick={() => downloadQR("svg")}
            disabled={!hasQR}
            variant="outline"
            className="flex items-center justify-center py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            data-testid="button-download-svg"
          >
            <FileText className="mr-2 h-4 w-4" />
            SVG
          </Button>
          <Button
            onClick={() => downloadQR("pdf")}
            disabled={!hasQR}
            variant="outline"
            className="flex items-center justify-center py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            data-testid="button-download-pdf"
          >
            <FileDown className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>

        {/* Bulk Download */}
        <Button
          onClick={downloadAll}
          disabled={!hasQR}
          className="w-full py-3 px-4 bg-success text-white rounded-lg hover:bg-green-600 transition-all font-medium disabled:opacity-50"
          data-testid="button-download-all"
        >
          <Download className="mr-2 h-4 w-4" />
          Download All Formats
        </Button>
      </div>

      {/* QR Code Info */}
      {hasQR && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg" data-testid="qr-info">
          <h5 className="font-medium text-gray-900 mb-2">QR Code Information</h5>
          <div className="text-sm text-gray-600 space-y-1">
            <div>
              Size: <span className="font-medium" data-testid="info-size">{sizeMap[config.size]} pixels</span>
            </div>
            <div>
              Format: <span className="font-medium">PNG</span>
            </div>
            <div>
              Content Length: <span className="font-medium" data-testid="info-length">{config.content.length} characters</span>
            </div>
            <div>
              Error Correction: <span className="font-medium">Medium (15%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
