import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Star, Share2, Heart, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { products } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "8128127711";

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[500px] flex items-center justify-center max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">Product Not Found</h2>
            <Link
              to="/shop"
              className="inline-block text-primary hover:text-primary/80 font-semibold transition"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const whatsappMessage = `Hi! I'm interested in ${product.name}. Can you help me with the purchase?`;
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const paymentMethods = [
    { name: "PayTm", icon: "💳" },
    { name: "PayPal", icon: "🅿️" },
    { name: "Google Pay", icon: "🔵" },
    { name: "Apple Pay", icon: "🍎" },
    { name: "Stripe", icon: "💰" },
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "Crypto", icon: "₿" },
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/shop"
              className="hover:text-primary transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-primary transition">
                Shop
              </Link>
              <span>/</span>
              <span className="text-white">{product.category}</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative">
            <div className="relative bg-muted rounded-xl overflow-hidden aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-lg font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="text-sm font-semibold text-muted-foreground uppercase mb-3">
                {product.category}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>

              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-5 h-5",
                          i < Math.round(product.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-border">
              <div className="flex items-baseline gap-4 mb-3">
                <div className="text-4xl font-bold text-primary">
                  ₹{product.price}
                </div>
                <div className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </div>
                <div className="text-lg font-bold text-secondary">
                  Save ₹{product.originalPrice - product.price}
                </div>
              </div>
              {product.inStock ? (
                <div className="text-green-400 font-semibold flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  In Stock
                </div>
              ) : (
                <div className="text-red-400 font-semibold">Out of Stock</div>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-border hover:bg-muted transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 text-center bg-input border border-border rounded-lg py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-border hover:bg-muted transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-accent text-white font-bold py-4 rounded-lg hover:bg-accent/90 transition text-lg"
              >
                ADD TO CART
              </button>
              <Link
                to="/checkout"
                className="w-full block text-center bg-gradient-to-r from-primary to-accent text-white font-bold py-4 rounded-lg hover:opacity-90 transition text-lg"
              >
                BUY NOW
              </Link>
              <div className="flex gap-3">
                <button className="flex-1 bg-muted text-white font-bold py-3 rounded-lg hover:bg-muted/80 transition flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Compare
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    "flex-1 font-bold py-3 rounded-lg transition flex items-center justify-center gap-2",
                    isWishlisted
                      ? "bg-primary text-white"
                      : "bg-muted text-white hover:bg-muted/80"
                  )}
                >
                  <Heart className="w-5 h-5" />
                  Wishlist
                </button>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-secondary text-background font-bold py-3 rounded-lg hover:bg-secondary/90 transition text-center"
            >
              💬 Post it on WhatsApp
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Features Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Instant Delivery",
              "Works on Old Android too",
              "Use with Google Drive, Gmail & Google Photos",
              "Share Photos, Videos & Important Files",
              "Secure & Reliable Google Storage",
              "Easy & Safe Redemption",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="glass-card p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Guaranteed Safe Checkout</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {paymentMethods.map((method, idx) => (
              <div
                key={idx}
                className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-muted/80 transition"
              >
                <span className="text-2xl mb-2">{method.icon}</span>
                <span className="text-xs font-semibold">{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="glass-card overflow-hidden hover:bg-white/40 transition group"
                >
                  <div className="relative bg-muted h-48 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                    {p.discount > 0 && (
                      <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded text-sm font-bold">
                        -{p.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase mb-2">
                      {p.category}
                    </p>
                    <h3 className="font-bold text-sm mb-3 line-clamp-2 min-h-10">
                      {p.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">
                        ₹{p.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ₹{p.originalPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
