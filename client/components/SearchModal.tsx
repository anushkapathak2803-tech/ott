import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

export default function SearchModal() {
  const { query, setQuery, isOpen, setIsOpen } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, setIsOpen]);

  const filteredProducts = query.trim() === "" 
    ? []
    : products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <>
      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Search Modal */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="glass w-full shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-6">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products, categories, brands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-white/50 border border-white/60 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/30 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Results */}
            {query.trim() !== "" && (
              <div>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-3">
                      No products found for "<span className="font-semibold text-foreground">{query}</span>"
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try searching with different keywords or browse our categories
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredProducts.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="glass-card p-4 hover:bg-white/40 transition group"
                      >
                        <div className="relative bg-muted h-32 rounded-lg overflow-hidden mb-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition"
                          />
                          {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-bold">
                              -{product.discount}%
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground uppercase mb-2">
                          {product.category}
                        </p>
                        <h3 className="font-bold text-sm line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-primary">
                            ₹{product.price}
                          </span>
                          <span className="text-xs text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Search Tips */}
            {query.trim() === "" && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-6">
                  💡 Start typing to search for products
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                  {["OTT Store", "Premium", "MS Office", "Windows", "AI Tools", "Adobe", "Amazon Prime", "Apple TV"].map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className="glass-card py-2 px-3 text-sm font-semibold hover:bg-white/40 transition"
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
