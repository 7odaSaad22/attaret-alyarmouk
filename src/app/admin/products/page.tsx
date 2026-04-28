"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Product {
  id: number; name: string; price: number; oldPrice?: number; stock: number; unit: string;
  image: string; featured: boolean; active: boolean; categoryId: number; description: string;
  category?: { name: string };
}
interface Category { id: number; name: string; }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", oldPrice: "", stock: "10", unit: "قطعة", image: "", description: "", categoryId: "", featured: false, active: true });

  const load = async () => {
    const [pRes, cRes] = await Promise.all([fetch("/api/admin/products"), fetch("/api/admin/categories")]);
    if (pRes.ok) setProducts(await pRes.json());
    if (cRes.ok) setCategories(await cRes.json());
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ name: "", price: "", oldPrice: "", stock: "10", unit: "قطعة", image: "", description: "", categoryId: "", featured: false, active: true });
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (p: Product) => {
    setForm({ name: p.name, price: String(p.price), oldPrice: p.oldPrice ? String(p.oldPrice) : "", stock: String(p.stock), unit: p.unit, image: p.image, description: p.description, categoryId: String(p.categoryId), featured: p.featured, active: p.active });
    setEditing(p);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;
    const res = await fetch("/api/admin/products", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { resetForm(); load(); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    await fetch("/api/admin/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-primary-600"><ArrowRight className="w-6 h-6" /></Link>
          <h1 className="text-2xl font-extrabold">إدارة المنتجات ({products.length})</h1>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm transition">
          <Plus className="w-4 h-4" /> إضافة منتج
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 mb-6 space-y-4">
          <h2 className="font-bold text-lg">{editing ? "تعديل منتج" : "إضافة منتج جديد"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="اسم المنتج *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
            <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none">
              <option value="">اختر التصنيف *</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input required type="number" placeholder="السعر *" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
            <input type="number" placeholder="السعر القديم (اختياري)" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
            <input type="number" placeholder="المخزون" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
            <input placeholder="الوحدة (مثلاً: كيلو، قطعة)" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
            <input placeholder="رابط الصورة" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none md:col-span-2" />
          </div>
          <textarea placeholder="الوصف" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" rows={3} />
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> منتج مميز</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> نشط (ظاهر)</label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl font-bold transition">{editing ? "حفظ التعديل" : "إضافة"}</button>
            <button type="button" onClick={resetForm} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl font-bold transition">إلغاء</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-right font-bold">المنتج</th>
              <th className="px-4 py-3 text-right font-bold">التصنيف</th>
              <th className="px-4 py-3 text-right font-bold">السعر</th>
              <th className="px-4 py-3 text-right font-bold">المخزون</th>
              <th className="px-4 py-3 text-right font-bold">الحالة</th>
              <th className="px-4 py-3 text-right font-bold">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-bold">{p.name}</td>
                <td className="px-4 py-3 text-gray-500">{p.category?.name}</td>
                <td className="px-4 py-3">{p.price} ج.م</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">
                  {p.active ? <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">نشط</span> : <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">مخفي</span>}
                  {p.featured && <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full mr-1">مميز</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(p)} className="text-blue-500 hover:text-blue-700"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-center text-gray-400 py-10">لا توجد منتجات — أضف أول منتج</p>}
      </div>
    </div>
  );
}
