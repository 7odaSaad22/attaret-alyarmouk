"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface OrderItem { id: number; quantity: number; price: number; product: { name: string } }
interface Order {
  id: number; customerName: string; phone: string; address: string; city: string;
  notes: string; subtotal: number; shipping: number; total: number; status: string;
  createdAt: string; items: OrderItem[];
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "معلق", color: "bg-amber-100 text-amber-700" },
  confirmed: { label: "مؤكد", color: "bg-blue-100 text-blue-700" },
  shipping: { label: "جاري الشحن", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "تم التوصيل", color: "bg-green-100 text-green-700" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-700" },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = async () => {
    const res = await fetch("/api/admin/orders");
    if (res.ok) setOrders(await res.json());
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/admin/orders", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    load();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="text-gray-400 hover:text-primary-600"><ArrowRight className="w-6 h-6" /></Link>
        <h1 className="text-2xl font-extrabold">إدارة الطلبات ({orders.length})</h1>
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="p-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-gray-50" onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
              <div>
                <span className="font-bold">طلب #{o.id}</span>
                <span className="text-gray-400 text-sm mr-3">{new Date(o.createdAt).toLocaleDateString("ar-EG")}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-primary-700">{o.total} ج.م</span>
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${statusLabels[o.status]?.color || "bg-gray-100"}`}>
                  {statusLabels[o.status]?.label || o.status}
                </span>
              </div>
            </div>

            {expanded === o.id && (
              <div className="border-t px-4 py-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>العميل:</strong> {o.customerName}</div>
                  <div><strong>الهاتف:</strong> <a href={`tel:${o.phone}`} className="text-primary-600">{o.phone}</a></div>
                  <div><strong>المحافظة:</strong> {o.city}</div>
                  <div><strong>العنوان:</strong> {o.address}</div>
                  {o.notes && <div className="md:col-span-2"><strong>ملاحظات:</strong> {o.notes}</div>}
                </div>

                <div className="bg-gray-50 rounded-xl p-3">
                  <h4 className="font-bold text-sm mb-2">المنتجات:</h4>
                  {o.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>{item.price * item.quantity} ج.م</span>
                    </div>
                  ))}
                  <hr className="my-2" />
                  <div className="flex justify-between text-sm"><span>المنتجات</span><span>{o.subtotal} ج.م</span></div>
                  <div className="flex justify-between text-sm"><span>الشحن</span><span>{o.shipping} ج.م</span></div>
                  <div className="flex justify-between font-bold"><span>الإجمالي</span><span>{o.total} ج.م</span></div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-bold ml-2">تغيير الحالة:</span>
                  {Object.entries(statusLabels).map(([key, val]) => (
                    <button key={key} onClick={() => updateStatus(o.id, key)} className={`text-xs px-3 py-1 rounded-full font-bold transition ${o.status === key ? val.color + " ring-2 ring-offset-1" : "bg-gray-100 hover:bg-gray-200"}`}>
                      {val.label}
                    </button>
                  ))}
                </div>

                <a
                  href={`https://wa.me/2${o.phone}?text=${encodeURIComponent(`مرحبًا ${o.customerName}، بخصوص طلبك رقم #${o.id} من عطارة اليرموك 🌿`)}`}
                  target="_blank"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-xl font-bold transition"
                >
                  📱 تواصل واتساب
                </a>
              </div>
            )}
          </div>
        ))}
        {orders.length === 0 && <p className="text-center text-gray-400 py-10">لا توجد طلبات بعد</p>}
      </div>
    </div>
  );
}
