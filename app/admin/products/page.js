"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Plus, Pencil, Trash2, X, Save, Package, Tag, ArrowDownCircle } from "lucide-react";

const supabase = createClient(
  "https://frqidzdqomybnninqurz.supabase.co",
  "sb_publishable_Asfcdq3OWd1yRsHRYGub1Q_iGRH7UvR"
);

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    Name: "", Price: "", compare_price: "", offers: "", category: "", image_url: "", description: "", specifications: "{}"
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("id", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { 
        ...formData, 
        Price: parseFloat(formData.Price),
        compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
        offers: formData.offers ? parseFloat(formData.offers) : null,
        specifications: JSON.parse(formData.specifications || "{}") 
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingId);
      if (!error) alert("Product updated!");
    } else {
      const { error } = await supabase.from("products").insert([payload]);
      if (!error) alert("Product added!");
    }
    
    closeModal();
    fetchProducts();
  }

  function openEdit(product) {
    setEditingId(product.id);
    setFormData({
      Name: product.Name,
      Price: product.Price,
      compare_price: product.compare_price || "",
      offers: product.offers || "",
      category: product.category,
      image_url: product.image_url,
      description: product.description,
      specifications: JSON.stringify(product.specifications, null, 2)
    });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ Name: "", Price: "", compare_price: "", offers: "", category: "", image_url: "", description: "", specifications: "{}" });
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 flex items-center gap-3">
            <Package className="text-blue-600" /> Inventory
          </h1>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:shadow-2xl transition-all">
            <Plus size={18} /> Add New Product
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em]">
              <tr>
                <th className="p-6">Product</th>
                <th className="p-6">Pricing (LKR)</th>
                <th className="p-6">Special Offer</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 flex items-center gap-4">
                    <img src={p.image_url} className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                    <div>
                        <div className="font-bold text-slate-900">{p.Name}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.category}</div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="font-black text-blue-600">LKR {p.Price?.toLocaleString()}</div>
                    {p.compare_price && (
                        <div className="text-xs text-slate-400 line-through">LKR {p.compare_price?.toLocaleString()}</div>
                    )}
                  </td>
                  <td className="p-6">
                    {p.offers ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit">
                            <Tag size={10} /> {p.offers}% OFF
                        </span>
                    ) : <span className="text-slate-300 text-[10px] uppercase font-black tracking-widest">No Offers</span>}
                  </td>
                  <td className="p-6 text-right space-x-2">
                    <button onClick={() => openEdit(p)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-50 transition-all"><Pencil size={16} /></button>
                    <button onClick={() => {if(confirm("Delete?")) supabase.from("products").delete().eq("id", p.id).then(fetchProducts)}} className="p-3 bg-slate-100 text-red-400 rounded-xl hover:bg-red-50 transition-all"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-6 max-h-[85vh] overflow-y-auto">
              <div className="col-span-2 flex justify-between items-center mb-4">
                <h2 className="text-xl font-black uppercase italic">{editingId ? "Edit Product" : "New Tech"}</h2>
                <button type="button" onClick={closeModal} className="text-slate-400"><X /></button>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Product Name</label>
                <input required value={formData.Name} onChange={e => setFormData({...formData, Name: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Selling Price (LKR)</label>
                <input type="number" step="0.01" required value={formData.Price} onChange={e => setFormData({...formData, Price: e.target.value})} className="w-full p-4 bg-blue-50 border border-blue-100 rounded-2xl outline-none font-black text-blue-600" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Compare Price (LKR)</label>
                <input type="number" step="0.01" value={formData.compare_price} onChange={e => setFormData({...formData, compare_price: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-slate-400" placeholder="Original Price" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Offer Percentage (%)</label>
                <input type="number" step="0.1" value={formData.offers} onChange={e => setFormData({...formData, offers: e.target.value})} className="w-full p-4 bg-green-50 border border-green-100 rounded-2xl outline-none font-black text-green-600" placeholder="e.g. 10.5" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Image URL</label>
                <input required value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium text-xs" />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Specifications (JSON)</label>
                <textarea rows="3" value={formData.specifications} onChange={e => setFormData({...formData, specifications: e.target.value})} className="w-full p-4 bg-slate-900 text-blue-400 font-mono text-[10px] rounded-2xl outline-none" />
              </div>

              <button type="submit" className="col-span-2 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                <Save size={18} /> {editingId ? "Update Product" : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}