export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating?: number;
  reviews?: number;
  inStock: boolean;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Amazon Prime All Benefits 1 Year Redeem Code",
    description: "Get access to Prime Video, shopping benefits, and more",
    category: "OTT Store",
    price: 999,
    originalPrice: 1299,
    discount: 23,
    image: "https://images.unsplash.com/photo-1611339555312-e607c25352ba?w=400&h=300&fit=crop",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    badge: "SALE",
  },
  {
    id: "2",
    name: "Apple TV+ 1 Year Subscription",
    description: "Access premium Apple TV+ content for a full year",
    category: "OTT Store",
    price: 4999,
    originalPrice: 5999,
    discount: 17,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop",
    inStock: true,
  },
  {
    id: "3",
    name: "Apple Music 1 Year Redeem Voucher",
    description: "Unlimited music streaming on Apple Music",
    category: "OTT Store",
    price: 899,
    originalPrice: 999,
    discount: 10,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
    inStock: true,
  },
  {
    id: "4",
    name: "ZeeS Premium HD 1 Year",
    description: "Access premium content on ZEE5",
    category: "OTT Store",
    price: 499,
    originalPrice: 799,
    discount: 38,
    image: "https://images.unsplash.com/photo-1522869635100-ce06755c4fa6?w=400&h=300&fit=crop",
    inStock: true,
  },
  {
    id: "5",
    name: "Adobe CC 3 Month Pro Plan Account",
    description: "Creative Cloud subscription for 3 months",
    category: "PREMIUM",
    price: 999,
    originalPrice: 1599,
    discount: 38,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    inStock: true,
  },
  {
    id: "6",
    name: "Perpetually AI Pro 1 Year Account",
    description: "AI tools and features for a full year",
    category: "AI TOOLS",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: "https://images.unsplash.com/photo-1677442d019cecf025f387f3e4d3b952b360cbb50?w=400&h=300&fit=crop",
    inStock: true,
  },
  {
    id: "7",
    name: "LinkedIn 3 Month Premium Career Plan",
    description: "Professional networking tools for 3 months",
    category: "PREMIUM",
    price: 499,
    originalPrice: 799,
    discount: 38,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    inStock: true,
  },
  {
    id: "8",
    name: "Office 2024 Pro Plus LTSC IPC",
    description: "Microsoft Office with perpetual license",
    category: "MS OFFICE",
    price: 260,
    originalPrice: 599,
    discount: 57,
    image: "https://images.unsplash.com/photo-1633356122544-f134ef2944f6?w=400&h=300&fit=crop",
    inStock: true,
  },
  {
    id: "9",
    name: "Ads Free Prime Video 6 Month Account private",
    description: "Ad-free Prime Video for 6 months",
    category: "OTT Store",
    price: 299,
    originalPrice: 399,
    discount: 25,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop",
    inStock: true,
    badge: "SALE",
  },
  {
    id: "10",
    name: "100GB Google Drive Storage 6 Month Redeem Link",
    description: "100GB cloud storage for 6 months",
    category: "OFFICE",
    price: 229,
    originalPrice: 349,
    discount: 34,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    inStock: true,
  },
  {
    id: "11",
    name: "500gb Google drive Storage via Family invite on mail",
    description: "500GB shared storage via family plan",
    category: "OFFICE",
    price: 799,
    originalPrice: 999,
    discount: 20,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop",
    inStock: true,
  },
  {
    id: "12",
    name: "MS Access 2016 2PC [Retail Online]",
    description: "Microsoft Access for 2 PCs",
    category: "MS OFFICE",
    price: 120,
    originalPrice: 299,
    discount: 60,
    image: "https://images.unsplash.com/photo-1633356122544-f134ef2944f6?w=400&h=300&fit=crop",
    inStock: true,
  },
];

export const categories = [
  { id: "all", name: "ALL PRODUCTS", icon: "🛍️" },
  { id: "ott", name: "OTT STORE", icon: "🎬" },
  { id: "premium", name: "PREMIUM", icon: "⭐" },
  { id: "office", name: "OFFICE", icon: "📁" },
  { id: "windows", name: "WINDOWS", icon: "🪟" },
  { id: "aitools", name: "AI TOOLS", icon: "🤖" },
];

export const brands = [
  "Amazon Prime",
  "Apple TVs",
  "Apple Music",
  "ZeeS",
  "Sony LIV",
  "Canva Pro",
  "Adobe CC",
  "Perpetually AI",
  "LinkedIn",
  "MS Office",
  "Windows",
  "HMA VPN",
  "Coursera",
  "CapCut Pro",
];
