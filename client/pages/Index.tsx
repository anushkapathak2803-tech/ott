import { Link } from "react-router-dom";
import { ChevronDown, MessageCircle, Lock, CheckCircle, Shield, RefreshCw, Grid, List } from "lucide-react";
import Layout from "@/components/Layout";
import { products, categories, brands } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "8128127711";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addItem } = useCart();

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category.toLowerCase().includes(selectedCategory));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-gradient-to-br from-background via-background to-primary/10 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-block mb-4 px-4 py-2 rounded-full border border-primary/50 bg-primary/10">
            <span className="text-xs font-semibold text-primary">⚡ INSTANT DIGITAL DELIVERY - WORLDWIDE</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Premium Digital</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Subscriptions & Licenses
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            OTT Plans • MS Office • Windows Keys • Adobe • AI Tools • Antivirus • SMM Services
          </p>
          
          <p className="text-md text-muted-foreground mb-8 max-w-2xl mx-auto">
            at India's lowest prices, delivered instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/shop"
              className="px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition transform hover:scale-105"
            >
              BROWSE ALL PRODUCTS
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-secondary text-background font-bold rounded-lg hover:bg-secondary/90 transition"
            >
              WHATSAPP US
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/20 border border-accent/50">
            <span className="text-xs font-semibold text-accent">🔥 HOT DEALS</span>
          </div>
          <h2 className="text-4xl font-bold mb-3">
            Our Most Popular <span className="text-primary">Products</span>
          </h2>
          <p className="text-muted-foreground">
            Handpicked bestsellers – all available, all genuine, all instantly delivered.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-lg font-semibold transition text-sm",
                selectedCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-lg transition",
              viewMode === "grid" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            )}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-lg transition",
              viewMode === "list" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
            )}
          >
            <List className="w-5 h-5" />
          </button>
        </div>

        {/* Products Grid */}
        <div className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            : "space-y-4"
        )}>
          {filteredProducts.slice(0, 8).map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className={cn(
                "group relative glass-card overflow-hidden hover:bg-white/40 transition",
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
                  viewMode === "list" && "w-32 h-32 flex-shrink-0 rounded-lg"
                )}
              />

              {/* Content */}
              <div className={cn(
                "p-4 flex flex-col",
                viewMode === "list" && "flex-1"
              )}>
                <div className="mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    {product.category}
                  </span>
                </div>

                <h3 className={cn(
                  "font-bold text-white mb-2 line-clamp-2 text-sm",
                  viewMode === "list" && "line-clamp-none"
                )}>
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
                  <span className="text-lg font-bold text-primary">₹{product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                </div>

                {!product.inStock && (
                  <div className="text-xs text-red-400 font-semibold mb-2">OUT OF STOCK</div>
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-block px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition"
          >
            View All 160+ Products →
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/50">
            <span className="text-xs font-semibold text-secondary">⭐ CATEGORIES</span>
          </div>
          <h2 className="text-4xl font-bold mb-3">
            Shop by <span className="text-accent">Category</span>
          </h2>
          <p className="text-muted-foreground">
            Browse our wide range of genuine digital subscriptions and software licenses.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 hover:bg-card/80 transition cursor-pointer"
            >
              <p className="font-semibold text-sm">{brand}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/20 border border-accent/50">
            <span className="text-xs font-semibold text-accent">❓ FAQ</span>
          </div>
          <h2 className="text-4xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Everything you need to know about OTT24x7. Still have questions? Chat with us!
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How fast will I receive my subscription after ordering?",
              a: "Most orders are delivered instantly – within 1 to 10 minutes after payment confirmation. For some products requiring manual processing, delivery may take a few hours. Our WhatsApp support team is always ready to assist."
            },
            {
              q: "Are the subscriptions genuine and safe to use?",
              a: "Yes! All our subscriptions are 100% genuine. We work directly with authorized resellers and maintain the highest quality standards. Your account and data security is our top priority."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept multiple payment methods including USDT Crypto, PayPal, UPI/GPay, PhonePe, Paytm, and International payment options."
            },
            {
              q: "What if my subscription stops working before the validity ends?",
              a: "We offer complete replacement warranty. If your subscription stops working within the validity period, we'll replace it for free."
            }
          ].map((item, idx) => (
            <details key={idx} className="group bg-card border border-border rounded-lg p-4 cursor-pointer">
              <summary className="flex items-center justify-between font-bold text-white">
                {item.q}
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition" />
              </summary>
              <p className="mt-3 text-muted-foreground text-sm">{item.a}</p>
            </details>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-12 bg-secondary/20 border border-secondary/50 rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">Still have questions? Our team replies within minutes on WhatsApp 24/7 🚀</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-secondary text-background font-bold rounded-lg hover:bg-secondary/90 transition"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-block mb-3 px-3 py-1 rounded-full bg-accent/20 border border-accent/50">
            <span className="text-xs font-semibold text-accent">🔒 SECURE & TRUSTED</span>
          </div>
          <h2 className="text-4xl font-bold">Your Security Is Our Priority</h2>
          <p className="text-muted-foreground mt-3">
            We are India's most trusted digital subscription marketplace, verified by 10,000+ customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Lock, title: "SSL Secured", desc: "All transactions protected with 256-bit SSL encryption for complete security" },
            { icon: CheckCircle, title: "Verified Seller", desc: "Registered authorized reseller with 10,000+ happy customers across India" },
            { icon: RefreshCw, title: "Replacement Warranty", desc: "We replace if free within validity period." },
            { icon: Shield, title: "Works on All Devices", desc: "Compatible with Windows, desktops, laptops, and smart TVs" }
          ].map((item, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <item.icon className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-primary/20 to-accent/20 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Start Saving on
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Premium Subscriptions Today
            </span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Join 10,000+ happy customers who save up to 90% on genuine digital subscriptions every month.
          </p>
          <Link
            to="/shop"
            className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </Layout>
  );
}
