"use client";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-slate-50 p-10 rounded-[3rem] mb-6">
            <ShoppingBag size={64} className="text-slate-200" />
        </div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Your cart is empty</h2>
        <p className="text-slate-400 font-bold mt-2 uppercase text-[10px] tracking-widest">Add some tech to get started</p>
        <Link href="/products" className="mt-8 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-900 transition-all">
            Browse Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12">My Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List of Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <img src={item.image_url} className="w-20 h-20 md:w-32 md:h-32 object-contain bg-white rounded-2xl p-2" />
                
                <div className="flex-1 min-w-0">
                  <p className="text-[8px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.category}</p>
                  <h3 className="text-sm md:text-xl font-black text-slate-900 truncate">{item.Name}</h3>
                  <p className="text-blue-600 font-black text-sm md:text-lg mt-1">LKR {item.Price?.toLocaleString()}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center bg-white rounded-xl border border-slate-200">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:text-blue-600 transition-colors"><Minus size={14} /></button>
                        <span className="font-black text-xs w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:text-blue-600 transition-colors"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[3rem] sticky top-12 shadow-2xl shadow-slate-200">
              <h2 className="text-xl font-black uppercase italic tracking-widest mb-8 border-b border-slate-800 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-green-400 italic">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-6 mb-10">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Amount</span>
                  <span className="text-3xl font-black text-blue-400 tracking-tighter">LKR {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-3">
                Checkout Now <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}