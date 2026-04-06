"use client";
import { useState } from "react";
import { ShoppingBag, Truck, ShieldCheck, RotateCcw, Star, CreditCard } from "lucide-react";

// Mock Data
const productData = {
  id: "1",
  name: "iPhone 15 Pro Max",
  price: "LKR 345,000",
  description: "The ultimate iPhone. Featuring a strong and light aerospace-grade titanium design with new contoured edges. The most powerful camera system ever on iPhone.",
  features: ["A17 Pro Chip", "48MP Main Camera", "USB-C with USB 3", "Action Button"],
  image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800",
  rating: 4.9,
  reviews: 124
};

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Product Image Section */}
          <div className="bg-[#f9f9f9] rounded-[3rem] p-8 aspect-square flex items-center justify-center overflow-hidden border border-gray-50">
            <img 
              src={productData.image} 
              alt={productData.name} 
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold text-slate-900">{productData.rating}</span>
                <span className="text-sm text-slate-400 font-medium">({productData.reviews} reviews)</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">{productData.name}</h1>
              <p className="text-3xl font-black text-blue-600">{productData.price}</p>
            </div>

            <p className="text-slate-500 leading-relaxed font-medium">
              {productData.description}
            </p>

            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-[0.2em]">Key Features</h4>
              <ul className="grid grid-cols-2 gap-3">
                {productData.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4 py-6 border-y border-gray-100">
              <div className="flex flex-wrap items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-200 rounded-2xl px-5 py-3 gap-8 bg-slate-50">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="text-xl font-bold text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    −
                  </button>
                  <span className="font-black text-slate-900 w-4 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="text-xl font-bold text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button className="flex-1 flex items-center justify-center gap-3 border-2 border-slate-900 text-slate-900 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95">
                  <ShoppingBag size={18} strokeWidth={2.5} /> Add to Cart
                </button>
              </div>

              {/* Buy Now Button - Full Width & High Contrast */}
              <button className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
                <CreditCard size={20} /> Buy It Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center gap-2 text-center p-4 rounded-[2rem] bg-slate-50 border border-gray-50">
                <Truck size={20} className="text-blue-600" />
                <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center p-4 rounded-[2rem] bg-slate-50 border border-gray-50">
                <ShieldCheck size={20} className="text-blue-600" />
                <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center p-4 rounded-[2rem] bg-slate-50 border border-gray-50">
                <RotateCcw size={20} className="text-blue-600" />
                <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500">7 Day Return</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}