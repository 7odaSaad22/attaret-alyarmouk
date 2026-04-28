import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold mb-3">
            <Leaf className="w-6 h-6 text-accent-400" />
            <span>عطارة اليرموك</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            نقدم أجود أنواع الأعشاب والبهارات والزيوت الطبيعية والعسل والمكسرات. منتجات طبيعية 100% بأسعار مناسبة وشحن لكل المحافظات.
          </p>
        </div>
        <div>
          <h3 className="font-bold mb-3 text-accent-400">روابط سريعة</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white transition">الرئيسية</Link></li>
            <li><Link href="/products" className="hover:text-white transition">جميع المنتجات</Link></li>
            <li><Link href="/categories" className="hover:text-white transition">التصنيفات</Link></li>
            <li><Link href="/cart" className="hover:text-white transition">سلة المشتريات</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3 text-accent-400">تواصل معنا</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>واتساب: 01158221296</li>
            <li>الشحن لكل المحافظات</li>
            <li>الدفع عند الاستلام</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-700 text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} عطارة اليرموك — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
