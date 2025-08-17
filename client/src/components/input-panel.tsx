import { Edit, Link, AlignLeft, Mail, Phone, Wand2, X, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { QRConfig } from "./qr-generator";

interface InputPanelProps {
  config: QRConfig;
  updateConfig: (updates: Partial<QRConfig>) => void;
  onGenerate: () => void;
  onClear: () => void;
  isGenerating: boolean;
  error: string;
}

export default function InputPanel({
  config,
  updateConfig,
  onGenerate,
  onClear,
  isGenerating,
  error,
}: InputPanelProps) {
  const contentTypes = [
    { value: "url", label: "URL", icon: Link },
    { value: "text", label: "Text", icon: AlignLeft },
    { value: "email", label: "Email", icon: Mail },
    { value: "phone", label: "Phone", icon: Phone },
  ] as const;

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-gray-200 p-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Enter Your Content</h3>

      <div className="space-y-6">
        {/* Text Input */}
        <div>
          <Label htmlFor="qr-content" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Edit className="mr-2 h-4 w-4 text-primary" />
            Content to Encode
          </Label>
          <Textarea
            id="qr-content"
            placeholder="Enter URL, text, or any content you want to encode..."
            value={config.content}
            onChange={(e) => updateConfig({ content: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
            rows={4}
            data-testid="input-content"
          />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-500" data-testid="text-character-count">
              {config.content.length} characters
            </span>
            {error && (
              <span className="text-xs text-error" data-testid="text-error-message">
                {error}
              </span>
            )}
          </div>
        </div>

        {/* QR Code Type Selection */}
        <div>
          <Label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Palette className="mr-2 h-4 w-4 text-primary" />
            Content Type
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {contentTypes.map(({ value, label, icon: Icon }) => (
              <Button
                key={value}
                type="button"
                variant={config.contentType === value ? "default" : "outline"}
                className={`p-3 h-auto flex-col space-y-1 ${
                  config.contentType === value
                    ? "border-2 border-primary bg-primary/5 text-primary hover:bg-primary/10"
                    : "border-2 border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
                }`}
                onClick={() => updateConfig({ contentType: value })}
                data-testid={`button-type-${value}`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <Label htmlFor="qr-size" className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <svg className="mr-2 h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            QR Code Size
          </Label>
          <Select value={config.size} onValueChange={(value: QRConfig["size"]) => updateConfig({ size: value })}>
            <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" data-testid="select-size">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (200x200px)</SelectItem>
              <SelectItem value="medium">Medium (400x400px)</SelectItem>
              <SelectItem value="large">Large (600x600px)</SelectItem>
              <SelectItem value="xlarge">Extra Large (800x800px)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Color Options */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Foreground Color</Label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.foregroundColor}
                onChange={(e) => updateConfig({ foregroundColor: e.target.value })}
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                data-testid="input-foreground-color"
              />
              <span className="text-sm text-gray-600">{config.foregroundColor.toUpperCase()}</span>
            </div>
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">Background Color</Label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                data-testid="input-background-color"
              />
              <span className="text-sm text-gray-600">{config.backgroundColor.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button
            onClick={onGenerate}
            disabled={isGenerating || !config.content.trim()}
            className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-primary-dark transition-all focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-generate"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate QR Code"}
          </Button>
          <Button
            onClick={onClear}
            variant="outline"
            className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-medium hover:border-primary hover:text-primary transition-all"
            data-testid="button-clear"
          >
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
