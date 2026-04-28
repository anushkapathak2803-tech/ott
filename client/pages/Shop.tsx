import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Grid, List, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "8128127711";

export default function Shop() {
  const { addItem } = useCart();
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => {
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      const stockMatch = !inStockOnly || p.inStock;
      const categoryMatch = selectedCategory === "all" || p.category === selectedCategory;
      return priceMatch && stockMatch && categoryMatch;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case "newest":
        filtered.reverse();
        break;
      default:
        break;
    }

    return filtered;
  }, [priceRange, inStockOnly, sortBy, selectedCategory]);

  return (
    <Layout>
      <div className="bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/" className="hover:text-primary transition">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-bold">Shop</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Filter by Price</h3>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-primary"
                />
                <div className="flex items-center justify-between mt-3 text-sm">
                  <span>Price: ₹0</span>
                  <span className="font-bold text-primary">₹{priceRange[1]}</span>
                </div>
                <button className="w-full mt-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition text-sm">
                  FILTER
                </button>
              </div>

              {/* Stock Status */}
              <div className="mb-8 pb-8 border-b border-border">
                <h3 className="font-bold text-lg mb-4">Stock Status</h3>
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 cursor-pointer accent-primary"
                  />
                  <span className="text-sm">On sale</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer accent-primary"
                  />
                  <span className="text-sm">In stock</span>
                </label>
              </div>

              {/* Top Rated Products */}
              <div>
                <h3 className="font-bold text-lg mb-4">Top Rated Products</h3>
                <div className="space-y-3">
                  {products
                    .filter((p) => p.rating && p.rating >= 4)
                    .slice(0, 3)
                    .map((product) => (
                      <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        className="text-sm bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition cursor-pointer block"
                      >
                        <p className="font-semibold line-clamp-2 text-xs mb-2">
                          {product.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-yellow-400">
                            ★ {product.rating}
                          </span>
                          <span className="font-bold text-primary">
                            ₹{product.price}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Sorting and View Options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-bold text-white">{filteredProducts.length}</span> of{" "}
                <span className="font-bold text-white">{products.length}</span> products
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-8 text-white cursor-pointer"
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Highest Discount</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-2.5 w-5 h-5 pointer-events-none text-muted-foreground" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-lg transition",
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-lg transition",
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4">FILTER BY CATEGORY</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", name: "All Products" },
                  { id: "OTT Store", name: "OTT Store" },
                  { id: "PREMIUM", name: "Premium" },
                  { id: "MS OFFICE", name: "MS Office" },
                  { id: "WINDOWS", name: "Windows" },
                  { id: "AI TOOLS", name: "AI Tools" },
                  { id: "OFFICE", name: "Office" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-lg font-semibold text-sm transition",
                      selectedCategory === cat.id
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setPriceRange([0, 5000]);
                    setInStockOnly(false);
                    setSelectedCategory("all");
                  }}
                  className="text-primary hover:text-primary/80 font-semibold transition"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                )}
              >
                {filteredProducts.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    className={cn(
                      "group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition",
                      viewMode === "list" && "flex gap-4 p-4"
                    )}
                  >
                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-primary text-white text-xs font-bold px-3 py-1 rounded">
                        -{product.discount}%
                      </div>
                    </div>

                    {/* Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className={cn(
                        "w-full h-48 object-cover bg-muted",
                        viewMode === "list" &&
                          "w-40 h-40 flex-shrink-0 rounded-lg"
                      )}
                    />

                    {/* Content */}
                    <div
                      className={cn(
                        "p-4 flex flex-col",
                        viewMode === "list" && "flex-1"
                      )}
                    >
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase">
                          {product.category}
                        </span>
                      </div>

                      <h3
                        className={cn(
                          "font-bold text-white mb-2 line-clamp-2 text-sm",
                          viewMode === "list" && "line-clamp-none"
                        )}
                      >
                        {product.name}
                      </h3>

                      {product.rating && (
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-xs text-yellow-400">★</span>
                          <span className="text-xs text-muted-foreground">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                      )}

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-lg font-bold text-primary">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      </div>

                      {!product.inStock && (
                        <div className="text-xs text-red-400 font-semibold mb-2">
                          OUT OF STOCK
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (product.inStock) {
                            addItem(product, 1);
                          }
                        }}
                        className={cn(
                          "w-full py-2 font-bold rounded-lg transition mt-auto",
                          product.inStock
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                        disabled={!product.inStock}
                      >
                        BUY NOW
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
