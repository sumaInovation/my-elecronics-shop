"use client";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 mb-8">
          <ShoppingBag size={80} className="text-slate-200 mx-auto mb-6" />
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">Your Cart is Empty</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Add some tech gear to get started</p>
        </div>
        <Link href="/products" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 flex items-center gap-3">
          <ChevronLeft size={18} /> Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="flex items-end justify-between mb-12">
           <div>
              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                Your <span className="text-blue-600">Cart</span>
              </h1>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3">{cart.length} Items Selected</p>
           </div>
           <Link href="/products" className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
              <ChevronLeft size={14} /> Continue Shopping
           </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* 1. Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 md:p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4 md:gap-8 shadow-sm group">
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-[1.5rem] p-4 flex-shrink-0">
                  <img src={item.image_url} alt={item.Name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-black text-slate-900 uppercase italic tracking-tighter text-sm md:text-lg leading-tight line-clamp-1">{item.Name}</h3>
                    <p className="text-blue-600 font-black text-xs">LKR {item.Price?.toLocaleString()}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-50 rounded-xl border border-slate-100 p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-blue-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-black text-xs text-slate-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-blue-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. Summary & Checkout Button */}
          <div className="lg:sticky lg:top-10">
            <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-blue-100/20">
              <h2 className="text-xl font-black uppercase italic tracking-widest mb-8 border-b border-slate-800 pb-6">Summary</h2>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subtotal</span>
                  <span className="font-black text-sm">LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Delivery</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Calculated at Checkout</span>
                </div>
                <div className="pt-6 border-t border-slate-800 flex justify-between items-end">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Total</span>
                   <span className="text-3xl font-black text-white tracking-tighter">LKR {subtotal.toLocaleString()}</span>
                </div>
              </div>

              {/* අලුත් Checkout Button එක */}
              <button 
                onClick={() => router.push("/checkout")}
                className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-blue-900/20 group"
              >
                Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 space-y-4">
                 <div className="flex items-center gap-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div> Bank Transfer Accepted
                 </div>
                 <div className="flex items-center gap-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div> WhatsApp Support Available
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}