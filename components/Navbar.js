"use client";
import Link from "next/link";
import { ShoppingBag, User, Search, Smartphone, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext"; // Cart Context එක import කරන්න

export default function Navbar() {
  const { cart } = useCart(); // Cart එකේ data ගන්න

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter text-slate-900">
          <div className="bg-blue-600 p-1.5 rounded-xl text-white shadow-lg shadow-blue-200">
            <Smartphone size={20} />
          </div>
          <span>SUMA<span className="text-blue-600">AUTOMATION</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-[0.1em] text-slate-500">
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Contact</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="#" className="hover:text-blue-600 transition-colors">Deals</Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <Search size={20} />
          </button>
          
          {/* Cart Icon with Dynamic Count */}
          <Link href="/cart" className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors">
            <ShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] text-white font-bold ring-2 ring-white animate-in zoom-in">
                {cart.length}
              </span>
            )}
          </Link>

          <button className="hidden sm:flex p-2 text-slate-700 hover:text-blue-600 transition-colors border border-gray-100 rounded-full">
            <User size={18} />
          </button>
          <button className="md:hidden p-2 text-slate-700">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}