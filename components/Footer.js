import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-gray-100 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h3 className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            ELECTRO<span className="text-blue-600">HUB</span>
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            Sri Lanka's premium tech destination. Official warranty and island-wide delivery.
          </p>
          <div className="flex gap-4">
             {/* Icons fix කරා */}
             <div className="p-2 bg-white rounded-lg border border-gray-200 text-slate-400 hover:text-blue-600 transition cursor-pointer"><Share2 size={18} /></div>
             <div className="p-2 bg-white rounded-lg border border-gray-200 text-slate-400 hover:text-blue-600 transition cursor-pointer"><Globe size={18} /></div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Shop</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link href="/products" className="hover:text-blue-600 transition">All Products</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Smartphones</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Laptops</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li><Link href="#" className="hover:text-blue-600 transition">Warranty Info</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Shipping Policy</Link></li>
            <li><Link href="#" className="hover:text-blue-600 transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Contact</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-500 font-medium"><Phone size={18} className="text-blue-600" /><span>+94 77 123 4567</span></div>
            <div className="flex items-center gap-3 text-sm text-slate-500 font-medium"><Mail size={18} className="text-blue-600" /><span>hello@electrohub.lk</span></div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-gray-200 text-center text-[11px] font-black uppercase tracking-widest text-slate-400">
        © 2026 ElectroHub Sri Lanka.
      </div>
    </footer>
  );
}