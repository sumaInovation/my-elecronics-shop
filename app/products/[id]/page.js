"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ShoppingBag, Star, CheckCircle2, ChevronRight, Package, Tag, ArrowDownCircle } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  "https://frqidzdqomybnninqurz.supabase.co",
  "sb_publishable_Asfcdq3OWd1yRsHRYGub1Q_iGRH7UvR"
);

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    async function fetchData() {
      const { data: mainProduct, error } = await supabase
        .from("products")
        .select(`*, Reviews (*)`)
        .eq("id", id)
        .single();

      if (mainProduct) {
        setProduct(mainProduct);
        const { data: related } = await supabase
          .from("products")
          .select("*")
          .eq("category", mainProduct.category)
          .not("id", "eq", id)
          .limit(4);
        setRelatedProducts(related || []);
      }
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black animate-pulse text-slate-400 uppercase tracking-widest">Loading Tech...</div>;
  if (!product) return <div className="text-center py-20 font-black italic">PRODUCT NOT FOUND</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        
        {/* Breadcrumb - Mobile Friendly */}
        <nav className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 md:mb-10 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/products" className="hover:text-blue-600">Store</Link>
          <ChevronRight size={10} />
          <span className="text-blue-600">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* 1. Image Section - Responsive Aspect Ratio */}
          <div className="relative bg-slate-50 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 aspect-square flex items-center justify-center border border-slate-100 overflow-hidden group">
            {product.offers > 0 && (
              <div className="absolute top-6 left-6 z-10 bg-blue-600 text-white text-xs font-black px-4 py-2 rounded-full uppercase italic flex items-center gap-2 shadow-lg">
                <Tag size={14} /> Save {product.offers}%
              </div>
            )}
            <img 
              src={product.image_url} 
              alt={product.Name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
            />
          </div>

          {/* 2. Content Section */}
          <div className="space-y-6 md:space-y-10 px-2 md:px-0">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none italic uppercase">
                {product.Name}
              </h1>
              
              <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl md:text-4xl font-black text-blue-600">LKR {product.Price?.toLocaleString()}</p>
                  {product.compare_price > 0 && (
                    <p className="text-lg md:text-xl text-slate-300 line-through font-bold decoration-2">
                      LKR {product.compare_price?.toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="hidden md:block h-8 w-[2px] bg-slate-100"></div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                   <Star size={14} fill="#EAB308" className="text-yellow-500" />
                   <span className="text-sm font-black text-yellow-700">{product.rating}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed text-center md:text-left">
              {product.description}
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-3">
               {["Premium Quality", "Secure Checkout"].map((item) => (
                 <div key={item} className="flex items-center gap-2 text-[9px] md:text-xs font-bold text-slate-700 uppercase tracking-wide bg-slate-50 p-3 rounded-2xl border border-slate-100">
                   <CheckCircle2 size={14} className="text-blue-600 shrink-0" /> {item}
                 </div>
               ))}
            </div>

            <div className="pt-4">
              <button className="w-full bg-slate-900 text-white py-5 md:py-6 rounded-3xl font-black uppercase text-xs md:text-sm tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3">
                <ShoppingBag size={18} /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* 3. Detailed Tabs Section */}
        <div className="mt-20 md:mt-32">
           <div className="flex justify-center md:justify-start gap-8 md:gap-12 border-b border-slate-100 mb-10 overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setActiveTab("specs")}
                className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === "specs" ? "border-b-4 border-blue-600 text-blue-600" : "text-slate-400 hover:text-slate-900"}`}
              >
                Specifications
              </button>
              <button 
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === "reviews" ? "border-b-4 border-blue-600 text-blue-600" : "text-slate-400 hover:text-slate-900"}`}
              >
                Reviews ({product.Reviews?.length || 0})
              </button>
           </div>

           <div className="min-h-[200px]">
              {activeTab === "specs" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-0 md:gap-x-20">
                   {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                       <div key={key} className="flex justify-between items-center py-4 border-b border-slate-50">
                          <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{key}</span>
                          <span className="text-xs md:text-sm font-black text-slate-900">{value}</span>
                       </div>
                   ))}
                   <div className="flex justify-between items-center py-4 border-b border-slate-50">
                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Model SKU</span>
                        <span className="text-xs md:text-sm font-black text-slate-900">{product.sku}</span>
                   </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {product.Reviews?.length > 0 ? product.Reviews.map((rev) => (
                     <div key={rev.id} className="p-6 md:p-8 rounded-[2rem] bg-slate-50 border border-slate-100 italic">
                        <div className="flex gap-1 mb-4">
                          {[...Array(rev.rating)].map((_, i) => <Star key={i} size={10} fill="#EAB308" className="text-yellow-500" />)}
                        </div>
                        <p className="text-slate-700 font-medium mb-4 leading-relaxed text-xs md:text-sm">"{rev.comment}"</p>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">— {rev.user_name}</span>
                     </div>
                   )) : <p className="text-slate-400 font-bold italic text-center md:text-left">No reviews yet.</p>}
                </div>
              )}
           </div>
        </div>

        {/* 4. Related Products - Grid 2 columns for Mobile */}
        <div className="mt-20 md:mt-32">
           <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase italic mb-8 md:mb-12 tracking-tighter text-center md:text-left">You May Also Like</h3>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map((rel) => (
                <Link href={`/products/${rel.id}`} key={rel.id} className="group">
                  <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2.5rem] aspect-square p-4 md:p-6 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors overflow-hidden relative">
                    <img src={rel.image_url} alt={rel.Name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="mt-4 px-1">
                    <h4 className="font-black text-slate-900 text-xs md:text-sm group-hover:text-blue-600 transition-colors line-clamp-1 uppercase">{rel.Name}</h4>
                    <p className="text-blue-600 font-black text-[10px] md:text-xs mt-1">LKR {rel.Price?.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}