"use client";
import { useEffect, useState } from "react";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Category { id: number; name: string; slug: string; image: string; description: string; _count?: { products: number } }

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", image: "", description: "" });

  const load = async () => {
    const res = await fetch("/api/admin/categories");
    if (res.ok) setCategories(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setForm({ name: "", image: "", description: "" }); setShowForm(false); load(); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد؟ سيتم حذف التصنيف فقط إذا لم يكن فيه منتجات.")) return;
    await fetch("/api/admin/categories", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-primary-600"><ArrowRight className="w-6 h-6" /></Link>
          <h1 className="text-2xl font-extrabold">إدارة التصنيفات ({categories.length})</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm transition">
          <Plus className="w-4 h-4" /> إضافة تصنيف
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 mb-6 space-y-4">
          <h2 className="font-bold text-lg">إضافة تصنيف جديد</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required placeholder="اسم التصنيف *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
            <input placeholder="إيموجي أو رابط صورة (مثال: 🌿)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <input placeholder="وصف التصنيف (اختياري)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
          <div className="flex gap-3">
            <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl font-bold transition">إضافة</button>
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-xl font-bold transition">إلغاء</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
            <div>
              <div className="text-3xl mb-1">{c.image || "🌿"}</div>
              <h3 className="font-bold">{c.name}</h3>
              <p className="text-sm text-gray-400">{c._count?.products || 0} منتج</p>
            </div>
            <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-600 transition"><Trash2 className="w-5 h-5" /></button>
          </div>
        ))}
        {categories.length === 0 && <p className="text-center text-gray-400 py-10 col-span-3">لا توجد تصنيفات — أضف أول تصنيف</p>}
      </div>
    </div>
  );
}
