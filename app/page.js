import { ShoppingBag, ArrowRight } from "lucide-react";

export default function Home() {
  const products = [
    { id: 1, name: "iPhone 15 Pro", price: "LKR 345,000", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500", category: "Smartphones", tag: "Hot" },
    { id: 2, name: "Sony WH-1000XM5", price: "LKR 115,000", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=500", category: "Audio", tag: "New" },
    { id: 3, name: "MacBook Air M3", price: "LKR 425,000", image: "https://images.unsplash.com/photo-1517336712461-48114d884b76?q=80&w=500", category: "Laptops", tag: "Sale" },
    { id: 4, name: "Galaxy Watch 6", price: "LKR 85,000", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500", category: "Wearables", tag: "Hot" },
  ];

  return (
    <div className="flex flex-col bg-white overflow-x-hidden">
      
      {/* Hero Section - Clean Soft Blue Background */}
      <section className="relative bg-[#f4f7ff] py-20 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-600 text-[11px] font-bold uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              New Season Arrival
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              The Next <br />
              <span className="text-blue-600">Standard.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-md font-medium">
              Experience electronics curated for performance. Official warranty and 0% installment plans available.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                Shop Now <ArrowRight size={20} />
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-end relative">
             <div className="w-[500px] h-[500px] bg-blue-600 opacity-[0.03] rounded-full absolute -right-20 -top-20" />
             <div className="text-[250px] rotate-12 filter drop-shadow-2xl">💻</div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <main className="mx-auto max-w-7xl px-6 py-24 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Best Sellers</h2>
            <div className="h-1.5 w-24 bg-blue-600 mt-2 rounded-full" />
          </div>
          <button className="text-slate-400 font-bold text-sm uppercase tracking-widest hover:text-blue-600 transition-colors">
            View All Products →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((p) => (
            <div key={p.id} className="group relative bg-white rounded-[2rem] p-3 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-transparent hover:border-gray-50">
              <div className="relative aspect-[4/5] bg-[#f9f9f9] rounded-[1.8rem] overflow-hidden">
                <span className="absolute top-4 left-4 z-10 bg-white px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 shadow-sm uppercase tracking-tighter">
                  {p.tag}
                </span>
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.name} />
              </div>
              <div className="px-3 py-6">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{p.category}</p>
                <h3 className="text-lg font-extrabold text-slate-900">{p.name}</h3>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xl font-black text-slate-900 tracking-tighter">{p.price}</span>
                  <button className="bg-slate-50 p-4 rounded-2xl text-slate-900 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                    <ShoppingBag size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Trust Badges */}
      <section className="border-t border-gray-100 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {['Free Shipping', 'Official Warranty', 'Secure Payment', '24/7 Support'].map(text => (
                <div key={text} className="text-xs font-black uppercase tracking-widest text-slate-400">{text}</div>
            ))}
        </div>
      </section>
    </div>
  );
}