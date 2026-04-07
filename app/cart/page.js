"use client";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react"; // Authentication සඳහා මේ ටික ඕනෑ

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const { data: session } = useSession(); // User ලොග් වෙලාද බලන්න
  const router = useRouter();

  const handleCheckoutClick = () => {
    if (!session) {
      // User ලොග් වෙලා නැත්නම් Alert එකක් දීලා Login කරවමු
      alert("Please login with Google to proceed with your order.");
      signIn("google"); // කෙලින්ම Google Login එකට යනවා
    } else {
      // ලොග් වෙලා නම් විතරක් Checkout page එකට යවනවා
      router.push("/checkout");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 mb-8">
          <ShoppingBag size={80} className="text-slate-200 mx-auto mb-6" />
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">Your Cart is Empty</h2>
        </div>
        <Link href="/products" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3">
          <ChevronLeft size={18} /> Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-slate-900 mb-12">
          Your <span className="text-blue-600">Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-6">
                <img src={item.image_url} alt={item.Name} className="w-20 h-20 object-contain bg-slate-50 rounded-xl" />
                <div className="flex-1">
                  <h3 className="font-black text-slate-900 uppercase italic tracking-tighter">{item.Name}</h3>
                  <p className="text-blue-600 font-black text-xs">LKR {item.Price?.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 bg-slate-100 rounded-lg"><Minus size={14} /></button>
                  <span className="font-black text-xs">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 bg-slate-100 rounded-lg"><Plus size={14} /></button>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl">
            <h2 className="text-xl font-black uppercase italic tracking-widest mb-8 border-b border-slate-800 pb-6">Summary</h2>
            <div className="flex justify-between items-end mb-10">
               <span className="text-[10px] font-black uppercase text-slate-500">Total</span>
               <span className="text-3xl font-black text-white tracking-tighter">LKR {subtotal.toLocaleString()}</span>
            </div>

            {/* --- Updated Checkout Button --- */}
            <button 
              onClick={handleCheckoutClick}
              className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95 group"
            >
              {session ? "Proceed to Checkout" : "Login to Checkout"}
              {!session ? <Lock size={16} /> : <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>

            {!session && (
              <p className="text-[9px] text-center mt-4 text-slate-500 font-black uppercase tracking-widest">
                Login Required for Secure Checkout
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}