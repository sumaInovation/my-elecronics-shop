"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Landmark, Send, CheckCircle2, QrCode, ShoppingBag, MessageCircle,ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; 
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://frqidzdqomybnninqurz.supabase.co",
  "sb_publishable_Asfcdq3OWd1yRsHRYGub1Q_iGRH7UvR"
);

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { data: session } = useSession(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastOrderId, setLastOrderId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            user_name: session?.user?.name || formData.name,
            user_email: session?.user?.email,
            user_image: session?.user?.image,
            items: cart, 
            total_amount: subtotal,
            address: formData.address,
            city: formData.city,
            phone: formData.phone,
            status: "Pending"
          }
        ])
        .select();

      if (error) throw error;

      setLastOrderId(data[0].id);
      setOrderSuccess(true);
      clearCart();

    } catch (error) {
      console.error("Error saving order:", error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsApp = () => {
    const whatsappNumber = "94762183549";
    let message = `*NEW ORDER - SUMA AUTOMATION*%0A%0A`;
    message += `Order ID: #${lastOrderId.slice(0, 8)}%0A`;
    message += `Customer: ${formData.name}%0A`;
    message += `Total: LKR ${subtotal.toLocaleString()}%0A%0A`;
    message += `_I will send the bank slip shortly._`;

    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`, "_blank");
  };

    // Order Success Screen (Full Screen & Clear Instructions)
if (orderSuccess) {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4 md:p-10 overflow-y-auto">
      <div className="max-w-3xl w-full bg-slate-50 p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 text-center shadow-2xl relative">
        
        {/* Success Header - Hidden on Mobile */}
        <div className="hidden md:flex w-20 h-20 bg-green-500 text-white rounded-full items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100 animate-bounce-short">
          <CheckCircle2 size={40} />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-slate-900 mb-1">
          Order <span className="text-green-600">Confirmed!</span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
          Reference ID: <span className="text-slate-900">#{lastOrderId.slice(0, 8)}</span>
        </p>

        {/* --- CENTRAL BANK DETAILS CARD --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {/* Bank Info Box */}
          <div className="bg-white p-6 rounded-[2rem] border border-blue-50 shadow-sm text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-blue-600 -rotate-12 group-hover:rotate-0 transition-transform">
              <Landmark size={80} />
            </div>
            <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Payment Destination</span>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Commercial Bank</p>
              <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter">8000XXXXXX</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Suma Automation | Colombo Fort</p>
            </div>
          </div>

          {/* Submission Info Box */}
         <div className="bg-blue-600 p-6 rounded-[2rem] shadow-lg shadow-blue-100 text-left flex flex-col justify-center">
  <h4 className="text-white font-black uppercase italic tracking-widest text-sm mb-2 flex items-center gap-2">
    <QrCode size={18} /> Final Step
  </h4>
  <p className="text-blue-50 text-[12px] font-bold leading-tight">
    Please transfer the total amount and send your <span className="text-white underline underline-offset-4 font-black">Bank Slip, PDF or Screenshot</span> to us via:
  </p>
  
  <div className="mt-4 space-y-2">
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
      <p className="text-white text-[10px] font-black uppercase tracking-widest">WhatsApp: 076 218 3549</p>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full"></div>
      <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest italic">Email: sumaautomation@gmail.com</p>
    </div>
  </div>
</div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center mb-8">
          <button 
            onClick={sendWhatsApp}
            className="w-full md:w-auto min-w-[260px] bg-[#25D366] text-white py-5 px-8 rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-green-100/50"
          >
            <MessageCircle size={20} fill="currentColor" /> Submit via WhatsApp
          </button>
          
          <button 
            onClick={() => router.push("/account")}
            className="w-full md:w-auto min-w-[260px] bg-slate-900 text-white py-5 px-8 rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
          >
            <ShoppingBag size={18} /> Order History
          </button>
        </div>

        <div className="pt-6 border-t border-slate-100">
           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 italic">
              <ShieldCheck size={14} className="text-blue-500"/> Verification & shipping within 24 hours of slip submission.
           </p>
        </div>
      </div>
    </div>
  );
}

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
           <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">No items to checkout</h2>
           <button onClick={() => router.push("/products")} className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all">
             Go Back to Store
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12">
          Check<span className="text-blue-600">out</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Shipping Form */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black uppercase italic tracking-widest mb-8 flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white"><Send size={18} /></div> Shipping Details
            </h2>
            
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="John Doe" />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                <input required name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="07x xxx xxxx" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Address</label>
                  <input required name="address" value={formData.address} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Street Name / House No" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">City</label>
                  <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Your City" />
                </div>
              </div>
            </form>

            {/* Bank Details Card */}
            <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-600 rotate-12"><Landmark size={120} /></div>
               <h3 className="text-blue-600 font-black uppercase italic tracking-widest text-sm mb-6 flex items-center gap-2 relative z-10">
                 <QrCode size={18} /> Bank Transfer Info
               </h3>
               <div className="space-y-4 relative z-10 font-black text-slate-900">
                 <p className="text-[9px] uppercase text-blue-400">Commercial Bank</p>
                 <p className="text-lg">8000XXXXXX</p>
                 <p className="text-[10px] uppercase">Colombo Fort Branch</p>
               </div>
            </div>
          </div>
{/* Order Summary */}
<div className="lg:sticky lg:top-24 space-y-6">
  <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[100px] opacity-20 pointer-events-none"></div>

    <h2 className="text-xl font-black uppercase italic tracking-widest mb-10 border-b border-slate-800 pb-6 flex items-center justify-between">
      Your Order <span className="text-[10px] text-slate-500 not-italic">{cart.length} Items</span>
    </h2>
    
    {/* Product List - Better spacing */}
    <div className="max-h-64 overflow-y-auto mb-10 space-y-4 pr-2 custom-scrollbar">
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase italic leading-tight text-slate-300">
              {item.quantity}x {item.Name}
            </p>
          </div>
          <span className="text-[10px] font-black text-blue-400 whitespace-nowrap">
            LKR {(item.Price * item.quantity).toLocaleString()}
          </span>
        </div>
      ))}
    </div>

    {/* Price Section - Fixed Line Issue */}
    <div className="border-t border-slate-800 pt-8">
      <p className="text-[9px] font-black uppercase text-slate-500 mb-1 tracking-widest">Total Payable Amount</p>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-black text-blue-500 italic">LKR</span>
        <span className="text-3xl md:text-5xl font-black tracking-[ -0.05em] italic leading-none">
          {subtotal.toLocaleString()}
        </span>
      </div>
    </div>

    <button 
      form="checkout-form"
      type="submit"
      disabled={loading}
      className="w-full mt-10 bg-blue-600 text-white py-6 rounded-2xl md:rounded-[2rem] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-blue-900/20"
    >
      {loading ? "Processing..." : "Complete Checkout"}
    </button>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}