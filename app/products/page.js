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
         <div className="hidden md:block space-y-2 text-left">
  {/* md:block කියන්නේ desktop එකේ පේනවා, hidden කියන්නේ mobile එකේ හංගනවා */}
  <h1 className="text-4xl lg:text-5xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
    {/* මෙතන text-4xl සහ text-5xl දාලා font size එක කලින්ට වඩා අඩු කළා */}
    GEAR <span className="text-blue-600">HUB</span>
  </h1>
  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
    Inventory Status: Online
  </p>
</div>

          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
  type="text" 
  placeholder="SEARCH SKU OR NAME..." 
  /* මෙතන text-[16px] අනිවාර්යයෙන්ම දාන්න auto-zoom නැති කරන්න */
  /* md:text-[10px] දාලා desktop එකේදී ආයෙත් කුඩා කරන්න */
  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-[16px] md:text-[10px] font-bold uppercase tracking-widest focus:border-blue-600 focus:bg-white transition-all outline-none"
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
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
  {filteredProducts.map((p) => {
    const hasOffer = p.offers > 0;
    const originalPrice = hasOffer ? p.Price / (1 - p.offers / 100) : null;

    return (
      <div key={p.id} className="group flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-50 p-2 md:p-5 hover:border-blue-100 hover:shadow-xl transition-all duration-500 relative">
        
        {/* OFFERS BADGE - Mobile එකේදී පොඩ්ඩක් කුඩා කළා */}
        {hasOffer && (
          <div className="absolute top-3 left-3 md:top-6 md:left-6 z-10 bg-red-500 text-white text-[7px] md:text-[9px] font-black px-2 py-1 md:px-3 md:py-1.5 rounded-full uppercase italic shadow-lg">
            -{p.offers}%
          </div>
        )}

        {/* Product Image Area - Aspect ratio එකෙන් height එක control කරනවා */}
        <Link href={`/products/${p.id}`} className="block relative aspect-square bg-slate-50 rounded-[1.2rem] md:rounded-[2rem] overflow-hidden mb-3">
          <img 
            src={p.image_url} 
            className="w-full h-full object-contain p-4 md:p-8 group-hover:scale-105 transition-transform duration-500" 
            alt={p.Name} 
          />
        </Link>
{/* Product Info Section */}
<div className="flex flex-col flex-1 px-1">
  <div className="flex justify-between items-start mb-1">
    <span className="text-[7px] md:text-[8px] font-black text-blue-600 uppercase tracking-wider">
      {p.category}
    </span>
    <div className="flex items-center gap-0.5 bg-slate-50 px-1.5 py-0.5 rounded-md">
      <Star size={8} fill="#EAB308" className="text-yellow-500" />
      <span className="text-[9px] font-black text-slate-700">{p.rating || "5.0"}</span>
    </div>
  </div>
  
  <Link href={`/products/${p.id}`}>
    <h3 className="text-[10px] md:text-sm font-bold text-slate-900 uppercase italic line-clamp-2 h-7 md:h-10 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
      {p.Name}
    </h3>
  </Link>

  {/* --- SKU DISPLAY --- */}
  <div className="mb-2">
    <span className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
      SKU: {p.SKU || "000"}
    </span>
  </div>
  
  <div className="mt-auto">
    <div className="flex flex-wrap items-baseline gap-1">
      <p className="text-sm md:text-xl font-black text-slate-900 italic leading-none">
        LKR {p.Price?.toLocaleString()}
      </p>
      {hasOffer && (
        <p className="text-[8px] md:text-[10px] font-bold text-slate-400 line-through">
          {originalPrice?.toLocaleString()}
        </p>
      )}
    </div>
  </div>
</div>

        {/* Action Buttons - Mobile වලදී Height එක හොඳටම අඩු කළා */}
        <div className="mt-3 flex flex-col gap-1.5">
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(p); router.push("/cart"); }} 
            className="w-full bg-blue-600 text-white py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[8px] md:text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all active:scale-95 shadow-md"
          >
            <Zap size={12} className="md:w-3.5" fill="currentColor" /> Buy Now
          </button>
          
          <button 
            onClick={(e) => { e.preventDefault(); addToCart(p); }} 
            className="w-full bg-slate-50 text-slate-900 py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[8px] md:text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all border border-slate-100"
          >
            <ShoppingBag size={12} className="md:w-3.5" /> Add To Cart
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