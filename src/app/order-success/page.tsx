"use client";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function OrderContent() {
  const params = useSearchParams();
  const orderId = params.get("id");

  const whatsappMsg = encodeURIComponent(
    `مرحبًا عطارة اليرموك 🌿\nتم تأكيد طلبي رقم #${orderId}\nأرجو التواصل لتأكيد التوصيل.`
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-4" />
      <h1 className="text-3xl font-extrabold mb-2">تم استلام طلبك!</h1>
      <p className="text-gray-500 mb-2">رقم الطلب: <span className="font-bold text-primary-700">#{orderId}</span></p>
      <p className="text-gray-500 mb-8">سنتواصل معك قريبًا لتأكيد الطلب والشحن</p>
      <div className="flex flex-col gap-3">
        <a
          href={`https://wa.me/201158221296?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
        >
          📱 أرسل تفاصيل الطلب على واتساب
        </a>
        <Link href="/products" className="bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-bold transition">
          تابع التسوّق
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">جاري التحميل...</div>}>
      <OrderContent />
    </Suspense>
  );
}
