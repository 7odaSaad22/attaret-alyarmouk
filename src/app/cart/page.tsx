"use client";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal, totalItems } = useCart();
  const shipping = 50;
  const total = subtotal + (items.length > 0 ? shipping : 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-500 mb-4">السلة فارغة</h1>
        <Link href="/products" className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition inline-block">
          تصفّح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-8">سلة المشتريات ({totalItems})</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">🌿</div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">{item.name}</h3>
                <p className="text-primary-700 font-bold">{item.price} ج.م <span className="text-gray-400 text-xs font-normal">/ {item.unit}</span></p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <p className="font-extrabold text-primary-700 w-20 text-left">{(item.price * item.quantity).toFixed(0)} ج.م</p>
              <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">ملخص الطلب</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">المنتجات ({totalItems})</span><span>{subtotal.toFixed(0)} ج.م</span></div>
            <div className="flex justify-between"><span className="text-gray-500">الشحن</span><span>{shipping} ج.م</span></div>
            <hr />
            <div className="flex justify-between font-extrabold text-lg"><span>الإجمالي</span><span className="text-primary-700">{total.toFixed(0)} ج.م</span></div>
          </div>
          <Link href="/checkout" className="mt-6 block bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-xl font-bold transition">
            إتمام الطلب
          </Link>
        </div>
      </div>
    </div>
  );
}
