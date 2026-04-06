"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CreditCard, Landmark, Send, ChevronRight, CheckCircle2, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // User Details State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);

    const whatsappNumber = "94762183549"; 
    
    let message = `*NEW ORDER - SUMA AUTOMATION*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${formData.name}%0A`;
    message += `Phone: ${formData.phone}%0A`;
    message += `Address: ${formData.address}, ${formData.city}%0A%0A`;
    
    message += `*Order Items:*%0A`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.Name} (x${item.quantity}) - LKR ${item.Price * item.quantity}%0A`;
    });

    message += `%0A*Total Amount: LKR ${subtotal.toLocaleString()}*%0A%0A`;
    message += `_I will send the bank slip shortly._`;

    // මෙතනදී api.whatsapp.com පාවිච්චි කිරීම වඩාත් සාර්ථකයි App එක open වෙන්න
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    
    // වැදගත්: window.open වෙනුවට window.location.href පාවිච්චි කරන්න
    setTimeout(() => {
      clearCart(); 
      window.location.href = whatsappUrl; 
    }, 500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black uppercase italic italic tracking-tighter">No items to checkout</h2>
        <button onClick={() => router.push("/products")} className="mt-4 text-blue-600 font-bold uppercase text-xs tracking-widest">Go Back to Store</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* 1. Shipping Form */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black uppercase italic tracking-widest mb-8 flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white"><Send size={18} /></div> Shipping Details
            </h2>
            
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                <input required name="name" onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Enter your name" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                <input required name="phone" type="tel" onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="07x xxx xxxx" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Address</label>
                  <input required name="address" onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Street name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">City</label>
                  <input required name="city" onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Your City" />
                </div>
              </div>
            </form>

            {/* Bank Details Card */}
            <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-600 rotate-12"><Landmark size={120} /></div>
               <h3 className="text-blue-600 font-black uppercase italic tracking-widest text-sm mb-6 flex items-center gap-2">
                 <QrCode size={18} /> Bank Transfer Info
               </h3>
               <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest">Bank Name</p>
                    <p className="font-black text-slate-900 text-lg uppercase">Commercial Bank</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest">Account Number</p>
                    <p className="font-black text-slate-900 text-lg">8000XXXXXX</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest">Branch</p>
                    <p className="font-black text-slate-900 text-lg uppercase">Colombo Fort</p>
                  </div>
               </div>
            </div>
          </div>

          {/* 2. Order Summary */}
          <div className="lg:sticky lg:top-10 space-y-6">
            <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl">
              <h2 className="text-xl font-black uppercase italic tracking-widest mb-10 border-b border-slate-800 pb-6">Your Order</h2>
              
              <div className="max-h-60 overflow-y-auto mb-10 space-y-6 pr-4 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs">{item.quantity}x</div>
                      <div>
                        <p className="font-black text-xs uppercase italic line-clamp-1">{item.Name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">LKR {item.Price?.toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="font-black text-blue-400 text-xs">LKR {(item.Price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-8 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Total Payable</span>
                  <span className="text-4xl font-black text-white tracking-tighter">LKR {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button 
                form="checkout-form"
                type="submit"
                disabled={loading}
                className="w-full mt-10 bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Processing..." : (
                  <>Confirm Order & Send Slip <Send size={16} /></>
                )}
              </button>
              
              <p className="text-center mt-6 text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
                <CheckCircle2 size={12} className="text-blue-600" /> Secure Order Processing
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}