import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSearch } from "@/contexts/SearchContext";

const WHATSAPP_NUMBER = "8128127711";

export default function Header() {
  const { itemCount } = useCart();
  const { setIsOpen } = useSearch();

  return (
    <header className="glass sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="font-bold text-xl">OTT24x7</span>
            </div>
          </Link>

          {/* Right items */}
          <div className="flex items-center gap-4 lg:gap-6">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-sm font-medium bg-secondary text-background px-4 py-2 rounded-lg hover:bg-secondary/90 transition"
            >
              💬 WhatsApp
            </a>
            <Link to="/auth" className="text-sm font-medium hover:text-primary transition">
              LOGIN
            </Link>
            <Link to="/admin-login" className="text-sm font-medium hover:text-primary transition text-accent">
              ADMIN
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 hover:bg-muted rounded-lg transition"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/cart"
              className="relative p-2 hover:bg-muted rounded-lg transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
