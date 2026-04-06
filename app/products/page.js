"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ShoppingBag, Zap, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

const supabase = createClient(
  "https://frqidzdqomybnninqurz.supabase.co",
  "sb_publishable_Asfcdq3OWd1yRsHRYGub1Q_iGRH7UvR"
);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (!error) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (e, p) => {
    e.preventDefault();
    addToCart(p);
    alert(`${p.Name} added to cart!`);
  };

  const handleBuyNow = (e, p) => {
    e.preventDefault();
    addToCart(p);
    router.push("/cart");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white font-black text-slate-400 uppercase tracking-widest animate-pulse">
      Loading Products...
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        
        {/* Header */}
        <div className="mb-12">
           <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
             Tech <span className="text-blue-600">Store</span>
           </h1>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3">High-Performance Automation Gear</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((p) => (
            <div key={p.id} className="group flex flex-col bg-white rounded-[2.5rem] border border-slate-100 p-4 hover:shadow-2xl transition-all duration-500 overflow-hidden">
              
              {/* Product Image Link */}
              <Link href={`/products/${p.id}`} className="block relative aspect-square bg-slate-50 rounded-[1.8rem] overflow-hidden mb-4">
                <img 
                  src={p.image_url} 
                  className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700" 
                  alt={p.Name} 
                />
                {p.offers > 0 && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase italic shadow-lg">
                    -{p.offers}%
                  </div>
                )}
              </Link>

              {/* Product Info */}
              <div className="flex-1 space-y-2 mb-6">
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{p.category}</p>
                <Link href={`/products/${p.id}`}>
                  <h3 className="text-lg font-black text-slate-900 leading-tight uppercase italic tracking-tighter line-clamp-2 h-12">
                    {p.Name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between pt-2">
                   <p className="text-2xl font-black text-slate-900 tracking-tighter">LKR {p.Price?.toLocaleString()}</p>
                   <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                      <Star size={12} fill="#EAB308" className="text-yellow-500" />
                      <span className="text-xs font-black text-yellow-700">{p.rating || "5.0"}</span>
                   </div>
                </div>
              </div>

              {/* Action Buttons - 2 Dedicated Rows */}
              <div className="space-y-3">
                {/* Row 1: Buy Now (Blue) */}
                <button 
                  onClick={(e) => handleBuyNow(e, p)}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-lg shadow-blue-100 active:scale-95"
                >
                  <Zap size={14} fill="currentColor" /> Buy Now
                </button>

                {/* Row 2: Add to Cart (Black) */}
                <button 
                  onClick={(e) => handleAddToCart(e, p)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95"
                >
                  <ShoppingBag size={14} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}