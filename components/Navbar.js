"use client";
import { useState } from "react"; // State එක එකතු කළා
import Link from "next/link";
import { ShoppingBag, Smartphone, Menu, LogOut, User as UserIcon, Settings, LayoutDashboard, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { cart } = useCart();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu එක open/close කරන්න state එක

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter text-slate-900 group">
          <div className="bg-blue-600 p-1.5 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <Smartphone size={20} />
          </div>
          <span className="block italic">SUMA<span className="text-blue-600 font-outline-1">AUTO</span></span>
        </Link>

        {/* Desktop Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">About</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-5">
          
          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2.5 text-slate-700 bg-slate-50 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all">
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-black ring-2 ring-white shadow-lg">
                {cart.length}
              </span>
            )}
          </Link>

          {/* User Profile - Hidden on very small screens, integrated in Mobile Menu below */}
          <div className="hidden sm:block">
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1.5 pr-4 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-all border-2 border-slate-100 shadow-md">
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-7 h-7 rounded-full border border-white/20"
                  />
                  <span className="hidden lg:block text-[9px] font-black uppercase italic tracking-widest">{session.user.name.split(' ')[0]}</span>
                </button>

                {/* Desktop Dropdown */}
                <div className="absolute right-0 mt-3 w-60 bg-white border border-slate-100 rounded-[2.2rem] shadow-2xl opacity-0 group-hover:opacity-100 transition-all invisible group-hover:visible p-3 z-[60]">
                  <div className="px-5 py-4 border-b border-slate-50 mb-2">
                    <p className="text-[10px] font-black text-slate-900 uppercase italic truncate">{session.user.name}</p>
                    <p className="text-[8px] font-bold text-slate-400 truncate tracking-tight">{session.user.email}</p>
                  </div>
                  <div className="space-y-1">
                    {session?.user?.email === "sumanga0000@gmail.com" && (
                      <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3.5 text-[10px] font-black text-blue-600 hover:bg-blue-50 rounded-2xl transition-all uppercase tracking-widest">
                        <LayoutDashboard size={14} /> Admin Panel
                      </Link>
                    )}
                    <Link href="/account" className="flex items-center gap-3 px-4 py-3.5 text-[10px] font-black text-slate-700 hover:bg-slate-50 rounded-2xl transition-all uppercase tracking-widest">
                      <ShoppingBag size={14} /> My Orders
                    </Link>
                    <div className="pt-2 mt-2 border-t border-slate-50">
                      <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3.5 text-[10px] font-black text-red-500 hover:bg-red-50 rounded-2xl transition-all uppercase tracking-widest">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => signIn("google")}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
              >
                <UserIcon size={15} /> Login
              </button>
            )}
          </div>

          {/* Hamburger Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Click කළාම state එක මාරු වෙනවා
            className="md:hidden p-2.5 bg-slate-900 text-white hover:bg-blue-600 rounded-xl transition-all shadow-lg"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

    {/* --- MOBILE MENU OVERLAY --- */}
{isMenuOpen && (
  <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 z-50">
    
    {/* Navigation Links */}
    <div className="flex flex-col gap-1">
      <Link onClick={() => setIsMenuOpen(false)} href="/products" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 py-4 border-b border-slate-50 flex justify-between items-center italic hover:text-blue-600 transition-colors">
        Products <span className="text-blue-600 opacity-30">→</span>
      </Link>
      <Link onClick={() => setIsMenuOpen(false)} href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 py-4 border-b border-slate-50 flex justify-between items-center italic hover:text-blue-600 transition-colors">
        Contact <span className="text-blue-600 opacity-30">→</span>
      </Link>
      <Link onClick={() => setIsMenuOpen(false)} href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 py-4 border-b border-slate-50 flex justify-between items-center italic hover:text-blue-600 transition-colors">
        About <span className="text-blue-600 opacity-30">→</span>
      </Link>
    </div>

    {/* Profile & Orders Section */}
    <div className="bg-slate-50 rounded-[2.5rem] p-6">
      {session ? (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <img src={session.user.image} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
            <div className="overflow-hidden">
              <p className="text-[10px] font-black uppercase italic tracking-tighter truncate text-slate-900">{session.user.name}</p>
              <p className="text-[8px] font-bold text-slate-400 truncate tracking-tight">{session.user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {/* MY ORDERS - එකතු කළා */}
            <Link 
              onClick={() => setIsMenuOpen(false)} 
              href="/account" 
              className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm border border-slate-100 active:scale-95 transition-all"
            >
              <ShoppingBag size={14} className="text-blue-600" /> My Orders
            </Link>

            {/* SETTINGS */}
            <Link 
              onClick={() => setIsMenuOpen(false)} 
              href="/settings" 
              className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-sm border border-slate-100 active:scale-95 transition-all"
            >
              <Settings size={14} className="text-slate-400" /> Settings
            </Link>

            {/* ADMIN DASHBOARD (පරිශීලකයා Admin නම් පමණි) */}
            {session?.user?.email === "sumanga0000@gmail.com" && (
              <Link 
                onClick={() => setIsMenuOpen(false)} 
                href="/admin/products" 
                className="flex items-center gap-3 bg-blue-50 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-blue-600 border border-blue-100 active:scale-95 transition-all"
              >
                <LayoutDashboard size={14} /> Admin Dashboard
              </Link>
            )}
          </div>

          <button 
            onClick={() => signOut()}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-slate-200 active:scale-95 transition-all mt-2"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      ) : (
        <button 
          onClick={() => signIn("google")}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-blue-100 active:scale-95 transition-all"
        >
          <UserIcon size={14} /> Login with Google
        </button>
      )}
    </div>
  </div>
)}
    </nav>
  );
}