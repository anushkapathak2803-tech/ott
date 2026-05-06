import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[500px] flex flex-col items-center justify-center max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <svg
              className="w-24 h-24 mx-auto text-muted-foreground mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-bold mb-3">No products in the cart.</h2>
            <p className="text-muted-foreground mb-8">
              Your shopping cart is empty. Start shopping to add items!
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition"
            >
              RETURN TO SHOP
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 pb-6 mb-6 border-b border-border last:border-0 last:mb-0 last:pb-0"
                >
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg bg-muted flex-shrink-0"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.product.category}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="p-1 hover:bg-muted rounded-lg transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.product.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-12 text-center bg-input border border-border rounded-lg py-1 text-white"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-muted rounded-lg transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          ₹{item.product.price * item.quantity}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ₹{item.product.price} each
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 hover:text-red-400 transition p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}

              <div className="text-right text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-400 transition font-semibold"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/shop"
                className="text-primary hover:text-primary/80 transition font-semibold"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-white">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="text-secondary">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes:</span>
                  <span className="text-white">₹0</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">₹{total}</span>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center bg-gradient-to-r from-primary to-accent text-white font-bold py-3 rounded-lg hover:opacity-90 transition mb-3"
              >
                PROCEED TO CHECKOUT
              </Link>

              <a
                href="https://wa.me"
                className="w-full block bg-secondary text-background font-bold py-3 rounded-lg hover:bg-secondary/90 transition text-center"
              >
                💬 ORDER ON WHATSAPP
              </a>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  <span>100% Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
