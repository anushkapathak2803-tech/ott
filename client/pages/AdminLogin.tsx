import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Layout from "@/components/Layout";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Admin credentials (in production, this would be verified by a backend)
    const ADMIN_EMAIL = "admin@ott24x7.com";
    const ADMIN_PASSWORD = "admin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Store admin session in localStorage
      localStorage.setItem("adminToken", "admin_session_" + Date.now());
      localStorage.setItem("adminEmail", email);
      navigate("/admin");
    } else {
      setError("Invalid admin credentials. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="min-h-[600px] bg-gradient-to-b from-primary/5 to-background py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold">Admin Login</h1>
              <p className="text-muted-foreground mt-2">Manage your products and orders</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@ott24x7.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition"
              >
                LOGIN
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-center text-sm text-muted-foreground mb-4">
                Demo credentials:
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>Email: <span className="text-primary font-semibold">admin@ott24x7.com</span></p>
                <p>Password: <span className="text-primary font-semibold">admin123</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
