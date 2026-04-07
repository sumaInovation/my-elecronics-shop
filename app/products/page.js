"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
// මෙතන ShoppingBag import එක හරියටම තියෙනවා දැන්
import { Zap, Star, Search, ChevronDown, SlidersHorizontal, X, Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const supabase = createClient(
  "https://frqidzdqomybnninqurz.supabase.co",
  "sb_publishable_Asfcdq3OWd1yRsHRYGub1Q_iGRH7UvR"
);

export default function ProductsPage() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [categories, setCategories] = useState(["All"]); 
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (!error && data) {
        setProducts(data);
        setFilteredProducts(data);
        const rawCategories = data.map(item => item.category);
        const uniqueCategories = ["All", ...new Set(rawCategories.filter(c => c && c.trim() !== ""))];
        setCategories(uniqueCategories);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.Name?.toLowerCase().includes(q) || 
        p.SKU?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }
    if (sortBy === "price-low") result.sort((a, b) => a.Price - b.Price);
    else if (sortBy === "price-high") result.sort((a, b) => b.Price - a.Price);
    setFilteredProducts(result);
  }, [searchQuery, activeCategory, sortBy, products]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-slate-300 italic animate-pulse tracking-widest">SUMA AUTO GEAR LOADING...</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              GEAR <span className="text-blue-600">HUB</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Inventory Status: Online</p>
          </div>

          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH SKU OR NAME..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-[10px] font-bold uppercase tracking-widest focus:border-blue-600 focus:bg-white transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop Categories */}
        <div className="hidden md:flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat 
                  ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100" 
                  : "bg-white border-slate-100 text-slate-400 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden flex items-center justify-between mb-8">
           <button 
             onClick={() => setIsFilterOpen(true)}
             className="flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl"
           >
             <SlidersHorizontal size={16} /> Filters
           </button>
        </div>

      {/* Product Grid */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
  {filteredProducts.map((p) => {
    // Discount එකක් තියෙනවා නම් පරණ මිල (Compare Price) ගණනය කිරීම
    const hasOffer = p.offers > 0;
    const originalPrice = hasOffer ? p.Price / (1 - p.offers / 100) : null;

    return (
      <div key={p.id} className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-50 p-3 md:p-5 hover:border-blue-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative">
        
        {/* --- OFFERS BADGE --- */}
        {hasOffer && (
          <div className="absolute top-6 left-6 z-10 bg-red-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase italic shadow-lg shadow-red-200 animate-bounce-short">
            SAVE {p.offers}%
          </div>
        )}

        {/* Product Image Area */}
        <Link href={`/products/${p.id}`} className="block relative aspect-square bg-slate-50 rounded-[2rem] overflow-hidden mb-4">
          <img 
            src={p.image_url} 
            className="w-full h-full object-contain p-6 md:p-10 group-hover:scale-110 transition-transform duration-700" 
            alt={p.Name} 
          />
        </Link>

        {/* Product Info */}
        <div className="space-y-2 px-2 flex-1">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em]">{p.category}</span>
            
            {/* --- REVIEW RATING --- */}
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
              <Star size={10} fill="#EAB308" className="text-yellow-500" />
              <span className="text-[10px] font-black text-slate-700">{p.rating || "5.0"}</span>
              <span className="text-[8px] text-slate-400 font-bold">(12)</span>
            </div>
          </div>
          
          <Link href={`/products/${p.id}`}>
            <h3 className="text-[11px] md:text-sm font-black text-slate-900 uppercase italic line-clamp-2 h-10 leading-tight group-hover:text-blue-600 transition-colors">
              {p.Name}
            </h3>
          </Link>
          
          {/* --- PRICE SECTION (With Compare Price) --- */}
          <div className="pt-2">
            <div className="flex items-center gap-2">
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter italic leading-none">
                LKR {p.Price?.toLocaleString()}
              </p>
            </div>
            {hasOffer && (
              <p className="text-[10px] font-bold text-slate-400 line-through mt-1">
                LKR {originalPrice?.toLocaleString()}
              </p>
            )}
          </div>
          
          <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-2 border-t pt-2 italic">
            SKU: {p.SKU || "N/A"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2">
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(p); router.push("/cart"); }} 
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all active:scale-95 shadow-lg shadow-blue-100"
          >
            <Zap size={14} fill="currentColor" /> Buy Now
          </button>
          
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(p); }} 
            className="w-full bg-slate-50 text-slate-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all active:scale-95 border border-slate-100"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
        </div>
      </div>
    );
  })}
</div>

        {/* Mobile Overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-[100] md:hidden flex items-end">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
            <div className="relative w-full bg-white rounded-t-[3rem] p-8 shadow-2xl">
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
              <div className="grid grid-cols-2 gap-3 mb-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }}
                    className={`px-4 py-4 rounded-2xl text-[10px] font-black uppercase border transition-all ${
                      activeCategory === cat ? "bg-blue-50 border-blue-600 text-blue-600" : "bg-white border-slate-100 text-slate-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}