import { Menu, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-surface shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <QrCode className="text-white text-sm w-4 h-4" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">QR Generator</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors" data-testid="nav-home">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors" data-testid="nav-about">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors" data-testid="nav-help">
              Help
            </a>
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden" data-testid="mobile-menu-button">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
