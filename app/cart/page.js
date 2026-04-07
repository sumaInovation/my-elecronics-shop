"use client";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft, Lock, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckoutClick = () => {
    if (!session) signIn("google");
    else router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag size={60} className="text-slate-200 mb-4" />
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 mb-6">Your Cart is Empty</h2>
        <Link href="/products" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-6 md:py-12">
        
        {/* Header - Font size reduced for Mobile */}
        <div className="mb-8 md:mb-12 border-b border-slate-50 pb-6">
          <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[8px] mb-1">Review Items</p>
          <h1 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter text-slate-900">
            MY <span className="text-blue-600">BAG</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
          
          {/* --- CART ITEMS (Single Row Layout for Mobile) --- */}
          <div className="lg:col-span-7 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="group bg-white p-3 md:p-6 rounded-[1.5rem] border border-slate-100 flex items-center gap-3 md:gap-8 hover:border-blue-100 transition-all">
                
                {/* Product Image - Scaled down for Mobile */}
                <div className="w-16 h-16 md:w-32 md:h-32 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image_url} alt={item.Name} className="w-full h-full object-contain p-2 md:p-6" />
                </div>

                {/* Info & Quantity - All in one row on Mobile */}
                <div className="flex flex-1 items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[10px] md:text-sm font-black text-slate-900 uppercase italic truncate leading-tight">
                      {item.Name}
                    </h3>
                    <p className="text-blue-600 font-black text-[10px] md:text-sm italic tracking-tighter">
                      LKR {item.Price?.toLocaleString()}
                    </p>
                  </div>

                  {/* Compact Quantity Controls */}
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-slate-900 hover:text-white transition-all"><Minus size={10} /></button>
                    <span className="w-5 text-center font-black text-[10px] md:text-xs text-slate-900">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-slate-900 hover:text-white transition-all"><Plus size={10} /></button>
                  </div>

                  {/* Remove Button */}
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors ml-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* --- ORDER SUMMARY (Professional & Creative) --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-slate-900 text-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent opacity-50"></div>
              
              <div className="flex items-center gap-3 mb-8">
                <CreditCard size={18} className="text-blue-500" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                  <span className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">Total Items</span>
                  <span className="text-xs font-black uppercase">{cart.length} Units</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-slate-800/50">
                  <span className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">Taxes & Fees</span>
                  <span className="text-[9px] font-black text-green-500 uppercase italic">Included</span>
                </div>

                <div className="pt-4 flex justify-between items-end">
                   <div>
                      <p className="text-[8px] font-black uppercase text-blue-500 mb-1 tracking-[0.2em]">Payable Amount</p>
                      <span className="text-3xl md:text-5xl font-black italic tracking-tighter">LKR {subtotal.toLocaleString()}</span>
                   </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={handleCheckoutClick}
                className="w-full bg-blue-600 text-white py-5 md:py-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95 group shadow-lg shadow-blue-900/40"
              >
                {session ? "Initialize Checkout" : "Auth Required"}
                {session ? <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /> : <Lock size={14} />}
              </button>

              <div className="mt-6 flex items-center justify-center gap-4 border-t border-slate-800 pt-6">
                <div className="flex items-center gap-1.5 opacity-40">
                  <ShieldCheck size={12} className="text-blue-400" />
                  <span className="text-[7px] font-black uppercase tracking-widest">Secured by Stripe</span>
                </div>
              </div>
            </div>
            
            <Link href="/products" className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 mt-6 hover:text-blue-600 transition-colors">
               <ChevronLeft size={12}/> Back to Shopping
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}