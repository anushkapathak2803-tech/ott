import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Eye, EyeOff, Check } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Validation
    if (!formData.email || !formData.password) {
      setLoginError("Please fill in all fields");
      return;
    }

    if (!validateEmail(formData.email)) {
      setLoginError("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      setLoginError("Password must be at least 6 characters");
      return;
    }

    // Store user session
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userToken", "user_" + Date.now());
    if (formData.rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }

    // Redirect to shop
    navigate("/shop");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    // Validation
    if (!registerData.email || !registerData.password || !registerData.confirmPassword) {
      setRegisterError("Please fill in all fields");
      return;
    }

    if (!validateEmail(registerData.email)) {
      setRegisterError("Please enter a valid email address");
      return;
    }

    if (registerData.password.length < 6) {
      setRegisterError("Password must be at least 6 characters");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match!");
      return;
    }

    // Store user in localStorage (in production, this would be a backend call)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u: any) => u.email === registerData.email)) {
      setRegisterError("Email already registered");
      return;
    }

    users.push({ email: registerData.email, password: registerData.password });
    localStorage.setItem("users", JSON.stringify(users));

    setRegisterSuccess("Account created successfully! Redirecting to login...");
    setTimeout(() => {
      setIsLogin(true);
      setRegisterData({ email: "", password: "", confirmPassword: "" });
      setRegisterSuccess("");
      setFormData({ email: registerData.email, password: "", rememberMe: false });
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Link to="/" className="text-muted-foreground hover:text-primary transition">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-white font-semibold">My account</span>
          </div>

          <h1 className="text-4xl font-bold mb-12">My account</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Login Section */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-8">LOGIN</h2>

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                {loginError && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Username or email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
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

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        setFormData({ ...formData, rememberMe: e.target.checked })
                      }
                      className="w-4 h-4 cursor-pointer accent-primary"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-red-500 hover:text-red-400 transition">
                    Lost your password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition"
                >
                  LOG IN
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">OR</span>
                </div>
              </div>

              <a
                href="https://wa.me"
                className="w-full block bg-secondary text-background font-bold py-3 rounded-lg hover:bg-secondary/90 transition text-center"
              >
                💚 LOGIN WITH WHATSAPP
              </a>
            </div>

            {/* Register Section */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">REGISTER</h2>

              <p className="text-sm text-muted-foreground mb-8">
                Registering for this site allows you to access your order status and history. Just fill in the fields below, and we'll get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.
              </p>

              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                {registerError && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                    {registerError}
                  </div>
                )}

                {registerSuccess && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-400 text-sm flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {registerSuccess}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
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
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
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

                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Confirm password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full bg-input border border-border rounded-lg px-4 py-3 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition"
                >
                  REGISTER
                </button>
              </form>

              <p className="text-xs text-muted-foreground mt-6">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:text-primary/80 transition"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
