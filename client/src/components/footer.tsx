import { QrCode } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <QrCode className="text-white text-sm w-4 h-4" />
              </div>
              <h3 className="text-xl font-semibold">QR Generator</h3>
            </div>
            <p className="text-gray-400 max-w-md">
              Create professional QR codes for your business, personal use, or marketing campaigns. Fast, secure, and completely free.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-url-qr">URL QR Codes</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-text-qr">Text QR Codes</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-contact-qr">Contact Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-wifi-qr">WiFi QR Codes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-help">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-api">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-contact">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 QR Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
