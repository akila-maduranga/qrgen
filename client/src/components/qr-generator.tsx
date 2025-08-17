import { useState } from "react";
import InputPanel from "./input-panel";
import PreviewPanel from "./preview-panel";

export interface QRConfig {
  content: string;
  contentType: "url" | "text" | "email" | "phone";
  size: "small" | "medium" | "large" | "xlarge";
  foregroundColor: string;
  backgroundColor: string;
}

export default function QRGenerator() {
  const [qrConfig, setQrConfig] = useState<QRConfig>({
    content: "",
    contentType: "url",
    size: "medium",
    foregroundColor: "#000000",
    backgroundColor: "#ffffff",
  });

  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");

  const updateConfig = (updates: Partial<QRConfig>) => {
    setQrConfig(prev => ({ ...prev, ...updates }));
  };

  const generateQR = async () => {
    if (!qrConfig.content.trim()) {
      setError("Please enter content to generate QR code");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      // Import qrcode dynamically to avoid SSR issues
      const QRCode = (await import("qrcode")).default;
      
      const sizeMap = {
        small: 200,
        medium: 400,
        large: 600,
        xlarge: 800,
      };

      const options = {
        width: sizeMap[qrConfig.size],
        color: {
          dark: qrConfig.foregroundColor,
          light: qrConfig.backgroundColor,
        },
        errorCorrectionLevel: 'M' as const,
      };

      const dataUrl = await QRCode.toDataURL(qrConfig.content, options);
      setQrDataUrl(dataUrl);
    } catch (err) {
      setError("Failed to generate QR code. Please try again.");
      console.error("QR generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearForm = () => {
    setQrConfig({
      content: "",
      contentType: "url",
      size: "medium",
      foregroundColor: "#000000",
      backgroundColor: "#ffffff",
    });
    setQrDataUrl("");
    setError("");
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <InputPanel
        config={qrConfig}
        updateConfig={updateConfig}
        onGenerate={generateQR}
        onClear={clearForm}
        isGenerating={isGenerating}
        error={error}
      />
      <PreviewPanel
        qrDataUrl={qrDataUrl}
        config={qrConfig}
        isGenerating={isGenerating}
      />
    </div>
  );
}
