"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { ShoppingBag, Search, CreditCard } from "lucide-react";
import Link from "next/link";

// Supabase Client එක setup කරගන්න
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
        .select("*");

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-20 font-bold">Loading tech store...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* ... Header කොටස වෙනසක් නෑ ... */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.id} className="group flex flex-col bg-white rounded-[2.5rem] p-3 border border-gray-100 hover:shadow-xl transition-all duration-500">
              <Link href={`/product/${p.id}`} className="relative aspect-square bg-[#f9f9f9] rounded-[2rem] overflow-hidden block">
                <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.Name} />
              </Link>

              <div className="px-3 py-6 space-y-4">
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{p.category}</p>
                  <Link href={`/product/${p.id}`}>
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{p.Name}</h3>
                  </Link>
                  {/* Price එක Format කරලා පෙන්වන්න */}
                  <p className="text-xl font-black text-slate-900 tracking-tighter mt-2">
                    LKR {p.Price?.toLocaleString()}
                  </p>
                </div>
                {/* ... Buttons කොටස ... */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}