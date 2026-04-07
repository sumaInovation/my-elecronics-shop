"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { Package, Clock, CheckCircle2, ChevronLeft, LogOut, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const supabase = createClient(
  "https://frqidzdqomybnninqurz.supabase.co",
  "sb_publishable_Asfcdq3OWd1yRsHRYGub1Q_iGRH7UvR"
);

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (session?.user?.email) {
      fetchOrders();
    }
  }, [session, status]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_email", session.user.email)
      .order("created_at", { ascending: false });

    if (!error) setOrders(data);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Shipped": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Delivered": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default: return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
  };

  if (status === "loading" || loading) {
    return <div className="min-h-screen flex items-center justify-center font-black uppercase italic tracking-tighter text-slate-400">Loading Account...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <Link href="/products" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 hover:text-blue-600 transition-all">
              <ChevronLeft size={14} /> Back to Store
            </Link>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
              My <span className="text-blue-600">Account</span>
            </h1>
          </div>

        
        </div>

        {/* Orders Section */}
        <div className="space-y-8">
          <h2 className="text-xl font-black uppercase italic tracking-widest flex items-center gap-3">
            <ShoppingBag size={20} className="text-blue-600" /> Order History
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white p-16 rounded-[3.5rem] text-center border border-slate-100">
              <Package size={60} className="mx-auto text-slate-100 mb-6" />
              <p className="font-black uppercase italic text-slate-400 tracking-tight">No orders placed yet</p>
              <Link href="/products" className="mt-6 inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Start Shopping</Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  
                  {/* Status Badge */}
                  <div className={`absolute top-8 right-8 px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-[0.15em] flex items-center gap-2 ${getStatusColor(order.status)}`}>
                    {order.status === "Paid" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {order.status}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Order Date</p>
                      <p className="font-black text-slate-900 text-sm uppercase italic tracking-tighter">
                        {new Date(order.created_at).toLocaleDateString('en-GB')}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 mt-2">ID: #{order.id.slice(0, 8)}</p>
                    </div>

                    <div className="md:col-span-2">
                      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-3">Purchased Items</p>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="bg-slate-50 px-2 py-1 rounded-md text-[10px] font-black text-blue-600">{item.quantity}x</span>
                            <span className="text-[11px] font-black uppercase text-slate-800 italic truncate">{item.Name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-1 text-left md:text-right flex flex-col justify-between items-start md:items-end">
                      <div>
                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Total Paid</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tighter italic">LKR {order.total_amount.toLocaleString()}</p>
                      </div>
                      
                      {order.status === "Shipped" && (
                        <div className="mt-4 flex items-center gap-2 text-blue-600">
                          <Truck size={14} />
                          <span className="text-[9px] font-black uppercase">Out for delivery</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}