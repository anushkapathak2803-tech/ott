import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, Plus, LogOut } from "lucide-react";
import Layout from "@/components/Layout";
import { products as initialProducts, Product } from "@/lib/products";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    category: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    image: "",
    inStock: true,
  });

  // Check if admin is logged in
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  const handleAddProduct = () => {
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      category: "",
      price: 0,
      originalPrice: 0,
      discount: 0,
      image: "",
      inStock: true,
    });
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...p, ...formData } : p
        )
      );
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name || "",
        description: formData.description || "",
        category: formData.category || "",
        price: formData.price || 0,
        originalPrice: formData.originalPrice || 0,
        discount: formData.discount || 0,
        image: formData.image || "https://via.placeholder.com/400x300",
        inStock: formData.inStock ?? true,
      };
      setProducts([...products, newProduct]);
    }

    setIsFormOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const adminEmail = localStorage.getItem("adminEmail");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Logged in as: {adminEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Add Product Button */}
        <div className="mb-8">
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

        {/* Product Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 glass-card border-b p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-muted-foreground hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-white resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-input border border-border rounded-lg px-4 py-2 text-white"
                    >
                      <option value="">Select Category</option>
                      <option value="OTT Store">OTT Store</option>
                      <option value="PREMIUM">Premium</option>
                      <option value="MS OFFICE">MS Office</option>
                      <option value="WINDOWS">Windows</option>
                      <option value="AI TOOLS">AI Tools</option>
                      <option value="OFFICE">Office</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      value={formData.price || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
                      }
                      className="w-full bg-input border border-border rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Original Price
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice || 0}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-input border border-border rounded-lg px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Discount %
                    </label>
                    <input
                      type="number"
                      value={formData.discount || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, discount: parseInt(e.target.value) || 0 })
                      }
                      className="w-full bg-input border border-border rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={formData.inStock ?? true}
                    onChange={(e) =>
                      setFormData({ ...formData, inStock: e.target.checked })
                    }
                    className="w-4 h-4 cursor-pointer accent-primary"
                  />
                  <label htmlFor="inStock" className="text-sm font-semibold cursor-pointer">
                    In Stock
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition"
                  >
                    {editingId ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 bg-muted text-white font-bold py-3 rounded-lg hover:bg-muted/80 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-bold">Product Name</th>
                  <th className="text-left p-4 font-bold">Category</th>
                  <th className="text-left p-4 font-bold">Price</th>
                  <th className="text-left p-4 font-bold">Discount</th>
                  <th className="text-left p-4 font-bold">Stock</th>
                  <th className="text-center p-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/30">
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4 font-bold text-primary">₹{product.price}</td>
                    <td className="p-4">{product.discount}%</td>
                    <td className="p-4">
                      <span
                        className={
                          product.inStock
                            ? "text-green-400 font-semibold"
                            : "text-red-400 font-semibold"
                        }
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-400 hover:text-blue-300 transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="glass-card p-6">
            <p className="text-muted-foreground text-sm mb-2">Total Products</p>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-muted-foreground text-sm mb-2">In Stock</p>
            <p className="text-3xl font-bold text-green-400">
              {products.filter((p) => p.inStock).length}
            </p>
          </div>
          <div className="glass-card p-6">
            <p className="text-muted-foreground text-sm mb-2">Out of Stock</p>
            <p className="text-3xl font-bold text-red-400">
              {products.filter((p) => !p.inStock).length}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
