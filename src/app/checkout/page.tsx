"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const shipping = 50;
  const total = subtotal + shipping;

  const [form, setForm] = useState({ customerName: "", phone: "", address: "", city: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subtotal,
          shipping,
          total,
          items: items.map((i) => ({ productId: i.id, quantity: i.quantity, price: i.price })),
        }),
      });

      if (!res.ok) throw new Error("فشل في إنشاء الطلب");
      const data = await res.json();
      clearCart();
      router.push(`/order-success?id=${data.id}`);
    } catch {
      setError("حدث خطأ أثناء إنشاء الطلب. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-xl">السلة فارغة — أضف منتجات أولًا</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-8">إتمام الطلب</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="font-bold text-lg mb-2">بيانات التوصيل</h2>
          <div>
            <label className="block text-sm font-bold mb-1">الاسم بالكامل *</label>
            <input required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="محمد أحمد" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">رقم الهاتف *</label>
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="01xxxxxxxxx" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">المحافظة *</label>
            <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="القاهرة" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">العنوان بالتفصيل *</label>
            <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" rows={3} placeholder="الشارع - المبنى - الطابق - الشقة" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">ملاحظات</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" rows={2} placeholder="أي ملاحظات إضافية..." />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">ملخص الطلب</h2>
          <div className="space-y-2 text-sm mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(0)} ج.م</span>
              </div>
            ))}
          </div>
          <hr className="my-3" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>المنتجات</span><span>{subtotal.toFixed(0)} ج.م</span></div>
            <div className="flex justify-between"><span>الشحن</span><span>{shipping} ج.م</span></div>
            <div className="flex justify-between font-extrabold text-lg pt-2"><span>الإجمالي</span><span className="text-primary-700">{total.toFixed(0)} ج.م</span></div>
          </div>
          <div className="mt-4 bg-accent-50 border border-accent-200 rounded-xl p-3 text-sm text-accent-800">
            💰 الدفع عند الاستلام
          </div>
        </div>

        {error && <p className="text-red-500 font-bold text-center">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-lg transition">
          {loading ? "جاري إنشاء الطلب..." : "تأكيد الطلب"}
        </button>
      </form>
    </div>
  );
}
