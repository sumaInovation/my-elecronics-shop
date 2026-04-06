"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Plus, Pencil, Trash2, X, Save, Package } from "lucide-react";

const supabase = createClient(
  "https://frqidzdqomybnninqurz.supabase.co",
  "sb_publishable_Asfcdq3OWd1yRsHRYGub1Q_iGRH7UvR"
);

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    Name: "", Price: "", category: "", image_url: "", description: "", specifications: "{}"
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

  // --- Actions ---
  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { 
        ...formData, 
        Price: parseFloat(formData.Price),
        specifications: JSON.parse(formData.specifications || "{}") 
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingId);
      if (!error) alert("Product updated successfully!");
    } else {
      const { error } = await supabase.from("products").insert([payload]);
      if (!error) alert("Product added successfully!");
    }
    
    closeModal();
    fetchProducts();
  }

  async function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this?")) {
      await supabase.from("products").delete().eq("id", id);
      fetchProducts();
    }
  }

  function openEdit(product) {
    setEditingId(product.id);
    setFormData({
      Name: product.Name,
      Price: product.Price,
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
    setFormData({ Name: "", Price: "", category: "", image_url: "", description: "", specifications: "{}" });
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-slate-900 flex items-center gap-3">
            <Package className="text-blue-600" /> Inventory Control
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-blue-100"
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-[0.2em]">
              <tr>
                <th className="p-6">Product</th>
                <th className="p-6">Category</th>
                <th className="p-6">Price</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 flex items-center gap-4">
                    <img src={p.image_url} className="w-12 h-12 rounded-xl object-cover bg-slate-100" />
                    <span className="font-bold text-slate-900">{p.Name}</span>
                  </td>
                  <td className="p-6 text-sm font-bold text-slate-400 uppercase">{p.category}</td>
                  <td className="p-6 font-black text-blue-600">LKR {p.Price?.toLocaleString()}</td>
                  <td className="p-6 text-right space-x-2">
                    <button onClick={() => openEdit(p)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"><Pencil size={16} /></button>
                    <button onClick={() => deleteProduct(p.id)} className="p-3 bg-slate-100 text-red-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"><Trash2 size={16} /></button>
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
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-black uppercase italic text-slate-900">
                {editingId ? "Edit Product" : "Add New Tech"}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-900"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Product Name</label>
                <input required value={formData.Name} onChange={e => setFormData({...formData, Name: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-600/20 outline-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Price (LKR)</label>
                <input type="number" required value={formData.Price} onChange={e => setFormData({...formData, Price: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold text-blue-600" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Image URL</label>
                <input required value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium" />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Specifications (JSON Format)</label>
                <textarea rows="4" value={formData.specifications} onChange={e => setFormData({...formData, specifications: e.target.value})} className="w-full p-4 bg-slate-900 text-blue-400 font-mono text-xs rounded-2xl outline-none" placeholder='{"Voltage": "24V"}' />
              </div>
              <button type="submit" className="col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                <Save size={18} /> {editingId ? "Update Product" : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}