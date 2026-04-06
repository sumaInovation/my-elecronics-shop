"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ShoppingBag, Star, CheckCircle2, ChevronRight, Package, ShieldCheck } from "lucide-react";
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

  if (loading) return <div className="text-center py-20 font-black animate-pulse">LOADING TECH...</div>;
  if (!product) return <div className="text-center py-20 font-black">PRODUCT NOT FOUND</div>;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
          <Link href="/" className="hover:text-blue-600">Store</Link>
          <ChevronRight size={12} />
          <span className="text-blue-600">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="sticky top-12 bg-slate-50 rounded-[4rem] p-12 aspect-square flex items-center justify-center border border-slate-100 overflow-hidden group">
            <img 
              src={product.image_url} 
              alt={product.Name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" 
            />
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none italic uppercase">
                {product.Name}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-4xl font-black text-blue-600">LKR {product.Price?.toLocaleString()}</p>
                <div className="h-8 w-[2px] bg-slate-100"></div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                   <Star size={14} fill="#EAB308" className="text-yellow-500" />
                   <span className="text-sm font-black text-yellow-700">{product.rating}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {["Premium Quality", "Authorized Dealer", "Best Price Guarantee", "Secure Checkout"].map((item) => (
                 <div key={item} className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                   <CheckCircle2 size={16} className="text-blue-600" /> {item}
                 </div>
               ))}
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <button className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase text-sm tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 active:scale-95">
                Add to Cart — LKR {product.Price?.toLocaleString()}
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Tabs Section */}
        <div className="mt-32">
           <div className="flex gap-12 border-b border-slate-100 mb-12">
              <button 
                onClick={() => setActiveTab("specs")}
                className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === "specs" ? "border-b-4 border-blue-600 text-blue-600" : "text-slate-400 hover:text-slate-900"}`}
              >
                Specifications
              </button>
              <button 
                onClick={() => setActiveTab("reviews")}
                className={`pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all ${activeTab === "reviews" ? "border-b-4 border-blue-600 text-blue-600" : "text-slate-400 hover:text-slate-900"}`}
              >
                Reviews ({product.Reviews?.length || 0})
              </button>
           </div>

           <div className="min-h-[300px]">
              {activeTab === "specs" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-20">
                   {/* 1. Dynamic Attributes (Voltage, Frequency, etc.) */}
                   {product.specifications && Object.entries(product.specifications).length > 0 ? (
                     Object.entries(product.specifications).map(([key, value]) => (
                       <div key={key} className="flex justify-between items-center py-5 border-b border-slate-50">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{key}</span>
                          <span className="text-sm font-black text-slate-900">{value}</span>
                       </div>
                     ))
                   ) : null}

                   {/* 2. Standard Attributes */}
                   {[
                     { label: "Model SKU", value: product.sku },
                     { label: "Category", value: product.category },
                     { label: "Stock Status", value: product.stock_quantity > 0 ? "In Stock" : "Out of Stock" },
                     { label: "Brand", value: product.brand || "Industrial Grade" }
                   ].map((spec) => (
                     <div key={spec.label} className="flex justify-between items-center py-5 border-b border-slate-50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{spec.label}</span>
                        <span className="text-sm font-black text-slate-900">{spec.value}</span>
                     </div>
                   ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {product.Reviews?.length > 0 ? product.Reviews.map((rev) => (
                     <div key={rev.id} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 italic">
                        <div className="flex gap-1 mb-4">
                          {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} fill="#EAB308" className="text-yellow-500" />)}
                        </div>
                        <p className="text-slate-700 font-medium mb-4 leading-relaxed text-sm">"{rev.comment}"</p>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">— {rev.user_name}</span>
                     </div>
                   )) : <p className="text-slate-400 font-bold italic">No reviews yet.</p>}
                </div>
              )}
           </div>
        </div>

        {/* Related Products */}
        <div className="mt-32">
           <h3 className="text-2xl font-black text-slate-900 uppercase italic mb-12 tracking-tighter">You May Also Like</h3>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((rel) => (
                <Link href={`/product/${rel.id}`} key={rel.id} className="group flex flex-col gap-4">
                  <div className="bg-slate-50 rounded-[2.5rem] aspect-square p-6 flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors overflow-hidden">
                    <img src={rel.image_url} alt={rel.Name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{rel.Name}</h4>
                    <p className="text-blue-600 font-black text-xs mt-1">LKR {rel.Price?.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}