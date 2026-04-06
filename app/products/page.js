import { ShoppingBag, Search, Filter, CreditCard } from "lucide-react";
import Link from "next/link";

const allProducts = [
  { id: 1, name: "iPhone 15 Pro", price: "LKR 345,000", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500", category: "Mobile" },
  { id: 2, name: "Sony WH-1000XM5", price: "LKR 115,000", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=500", category: "Audio" },
  { id: 3, name: "MacBook Air M3", price: "LKR 425,000", image: "https://images.unsplash.com/photo-1517336712461-48114d884b76?q=80&w=500", category: "Laptops" },
  { id: 4, name: "Galaxy Watch 6", price: "LKR 85,000", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500", category: "Wearables" },
  { id: 5, name: "iPad Pro M2", price: "LKR 295,000", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=500", category: "Tablets" },
  { id: 6, name: "PlayStation 5", price: "LKR 185,000", image: "https://images.unsplash.com/photo-1606813907291-d86ebb9c74ad?q=80&w=500", category: "Gaming" },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-slate-50 border-b border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">
            Store / <span className="text-blue-600">All Products</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Browse our full collection of premium electronics.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="w-full lg:w-64 space-y-8 shrink-0">
            <div>
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-4">Search</h4>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                <input type="text" placeholder="Search tech..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20" />
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-4">Categories</h4>
              <div className="space-y-2">
                {["All", "Mobile", "Laptops", "Audio", "Gaming", "Tablets"].map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                    <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 bg-white">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{allProducts.length} items found</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900 uppercase">Sort By:</span>
                <select className="bg-transparent text-sm font-bold text-blue-600 outline-none cursor-pointer">
                  <option>Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {allProducts.map((p) => (
                <div key={p.id} className="group flex flex-col bg-white rounded-[2.5rem] p-3 border border-gray-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500">
                  
                  {/* Image wrapper - Click to go to details */}
                  <Link href={`/products/${p.id}`} className="relative aspect-square bg-[#f9f9f9] rounded-[2rem] overflow-hidden block">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.name} />
                  </Link>

                  <div className="px-3 py-6 space-y-4">
                    <div>
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{p.category}</p>
                      <Link href={`/products/${p.id}`}>
                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                      </Link>
                      <p className="text-xl font-black text-slate-900 tracking-tighter mt-2">{p.price}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {/* Buy Now Button - Main Action */}
                      <button className="flex-1 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2">
                         Buy Now
                      </button>
                      
                      {/* Add to Cart - Secondary Action */}
                      <button className="bg-slate-100 text-slate-900 p-4 rounded-2xl hover:bg-slate-200 transition-all active:scale-95" title="Add to Cart">
                        <ShoppingBag size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}