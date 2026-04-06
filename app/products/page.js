"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ShoppingBag, Search, CreditCard, Star, Tag } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  "https://frqidzdqomybnninqurz.supabase.co",
  "sb_publishable_Asfcdq3OWd1yRsHRYGub1Q_iGRH7UvR"
);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center font-black uppercase tracking-[0.3em] animate-pulse text-slate-400">Loading Tech...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
           <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-slate-900">
             Our Collection
           </h1>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Premium Automation & Electronics</p>
        </div>

        {/* Grid System - Mobile: 2 cols, Desktop: 4 cols */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {products.map((p) => (
            <div key={p.id} className="group flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-2 md:p-3 border border-slate-50 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 relative overflow-hidden">
              
              {/* Offer Tag (Mobile එකටත් පේන්න) */}
              {p.offers > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white text-[8px] md:text-[10px] font-black px-2 py-1 rounded-full uppercase italic tracking-tighter">
                  {p.offers}% OFF
                </div>
              )}

              {/* Product Image */}
              <Link href={`/products/${p.id}`} className="relative aspect-square bg-[#f8f9fa] rounded-[1.2rem] md:rounded-[2rem] overflow-hidden block">
                <img 
                  src={p.image_url} 
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" 
                  alt={p.Name} 
                />
              </Link>

              {/* Product Info */}
              <div className="px-1 md:px-3 py-4 md:py-6 space-y-2 md:space-y-4">
                <div>
                  <p className="text-[8px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 truncate">
                    {p.category}
                  </p>
                  <Link href={`/products/${p.id}`}>
                    <h3 className="text-sm md:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2 h-10 md:h-auto">
                      {p.Name}
                    </h3>
                  </Link>
                  
                  <div className="mt-2 flex flex-col md:flex-row md:items-center gap-1">
                    <p className="text-sm md:text-xl font-black text-slate-900 tracking-tighter">
                      LKR {p.Price?.toLocaleString()}
                    </p>
                    {p.compare_price > 0 && (
                        <p className="text-[10px] md:text-xs text-slate-400 line-through font-bold">
                            LKR {p.compare_price?.toLocaleString()}
                        </p>
                    )}
                  </div>
                </div>

                {/* Desktop වලට විතරක් පේන "Buy" button එක (Mobile වලදී card එක click කරලා යන එක ලේසියි) */}
                <button className="hidden md:flex w-full items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all">
                  <ShoppingBag size={14} /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}