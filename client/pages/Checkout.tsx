import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "8128127711";

interface OrderData {
  id: string;
  timestamp: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  userEmail: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [userEmail, setUserEmail] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-[500px] flex flex-col items-center justify-center max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
            <Link
              to="/shop"
              className="inline-block text-primary hover:text-primary/80 font-semibold transition"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `PS-${timestamp}-${random}`;
  };

  const formatOrderMessage = (order: OrderData) => {
    let message = `🛍️ *ORDER DETAILS*\n\n`;
    message += `📦 Order ID: ${order.id}\n`;
    message += `📅 Date/Time: ${order.timestamp}\n`;
    message += `-----------------------------------\n\n`;

    order.items.forEach((item) => {
      message += `📱 *Product:* ${item.name}\n`;
      message += `💰 *Unit Price:* ₹${item.price}\n`;
      message += `📊 *Quantity:* ${item.quantity}\n`;
      message += `💵 *Line Total:* ₹${item.total}\n`;
      message += `-----------------------------------\n\n`;
    });

    message += `💰 *Total Amount:* ₹${order.total}\n`;
    message += `👤 *Email:* ${order.userEmail}\n\n`;
    message += `✅ Thank you for your order!\n`;
    message += `🔄 We'll confirm delivery soon.`;

    return message;
  };

  const handlePlaceOrder = () => {
    if (!userEmail) {
      setShowLoginModal(true);
      return;
    }

    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    const now = new Date();
    const dateTime = now.toLocaleDateString() + " " + now.toLocaleTimeString();

    const orderData: OrderData = {
      id: newOrderId,
      timestamp: dateTime,
      items: items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity,
      })),
      subtotal: total,
      discount: 0,
      total: total,
      userEmail: userEmail,
    };

    const message = formatOrderMessage(orderData);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    // Store order in localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    setOrderPlaced(true);

    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      clearCart();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        {!orderPlaced ? (
          <>
            <div className="flex items-center gap-3 mb-8">
              <Link
                to="/cart"
                className="hover:text-primary transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-4xl font-bold">Checkout</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="md:col-span-2">
                <div className="glass-card p-8 mb-8">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between pb-4 border-b border-white/20"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-bold">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            ₹{item.product.price * item.quantity}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.product.price} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Email */}
                <div className="glass-card p-8">
                  <h2 className="text-2xl font-bold mb-6">Delivery Email</h2>
                  {userEmail ? (
                    <div className="flex items-center justify-between p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                      <span className="font-semibold">{userEmail}</span>
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                  ) : (
                    <p className="text-muted-foreground mb-4">
                      Please log in to proceed with your order
                    </p>
                  )}
                </div>
              </div>

              {/* Order Total */}
              <div className="md:col-span-1">
                <div className="glass-card p-8 sticky top-20">
                  <h2 className="text-2xl font-bold mb-6">Order Total</h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-white/20">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span className="font-bold">₹{total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span className="text-secondary font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax:</span>
                      <span className="font-bold">₹0</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6 text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">₹{total}</span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 rounded-lg hover:opacity-90 transition"
                  >
                    {userEmail ? "Place Order" : "Login to Order"}
                  </button>

                  {!userEmail && (
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      You'll be asked to log in on the next step
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Order Success Message */
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-12 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Order Placed!</h2>
              <p className="text-muted-foreground mb-6">
                Your order has been created with ID:
              </p>
              <div className="bg-white/10 border border-white/30 rounded-lg p-4 mb-8">
                <p className="font-mono text-lg font-bold text-primary">
                  {orderId}
                </p>
              </div>
              <p className="text-muted-foreground mb-8">
                Redirecting to WhatsApp to share your order details...
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="inline-block px-8 py-3 bg-secondary text-foreground font-bold rounded-lg hover:opacity-90 transition"
              >
                💬 Open WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-6">Login to Complete Order</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as any).email.value;
                if (email) {
                  localStorage.setItem("userEmail", email);
                  setUserEmail(email);
                  setShowLoginModal(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-3 rounded-lg hover:opacity-90 transition"
              >
                Continue Order
              </button>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="w-full bg-white/10 border border-white/30 text-white font-bold py-3 rounded-lg hover:bg-white/20 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
