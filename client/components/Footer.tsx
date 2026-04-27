export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="font-bold">OTT24x7</span>
            </div>
            <p className="text-sm text-muted-foreground">
              One Stop Indian Digital Marketplace For All Your Needs!
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Gurugram, HR, 122001
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Email: ott24x7@gmail.com
            </p>
          </div>

          {/* Our Stores */}
          <div>
            <h3 className="font-semibold mb-4">OUR STORES</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition">
                  How to Activate windows 7
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Activate MS Office
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Type of Windows Key!
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Transfer Windows License
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold mb-4">USEFUL LINKS</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Refund & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Latest News
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Delivery Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-border pt-8 mb-8">
          <p className="text-sm font-semibold mb-4">ACCEPTED PAYMENT METHODS</p>
          <div className="flex flex-wrap gap-4">
            <span className="text-xs bg-muted px-3 py-1 rounded">USDT Crypto</span>
            <span className="text-xs bg-muted px-3 py-1 rounded">PayPal</span>
            <span className="text-xs bg-muted px-3 py-1 rounded">UPI/GPay</span>
            <span className="text-xs bg-muted px-3 py-1 rounded">PhonePe</span>
            <span className="text-xs bg-muted px-3 py-1 rounded">Paytm</span>
            <span className="text-xs bg-muted px-3 py-1 rounded">International</span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 002.856-3.51 10.02 10.02 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891h-.02c-.678 0-1.116-.452-1.116-1.019 0-.578.44-1.02 1.14-1.02s1.115.442 1.135 1.02c0 .567-.436 1.019-1.115 1.019zm8 6.891h-1.969v-3.313c0-.835-.298-1.405-.971-1.405-.529 0-.844.356-1.012.699-.052.126-.065.303-.065.48v3.539h-1.969s.026-5.741 0-6.336h1.969v.898c.281-.433.783-1.055 1.902-1.055 1.386 0 2.426.906 2.426 2.869v3.624z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              EnosFiller Solutions © 2025 By - Diwaskar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
