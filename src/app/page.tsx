import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Leaf, Truck, ShieldCheck, Phone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let categories: any[] = [];
  let featured: any[] = [];
  let latest: any[] = [];
  try {
    categories = await prisma.category.findMany({ take: 8 });
    featured = await prisma.product.findMany({ where: { featured: true, active: true }, take: 8 });
    latest = await prisma.product.findMany({ where: { active: true }, orderBy: { createdAt: "desc" }, take: 8 });
  } catch (e) {
    console.error("DB Error:", e);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-bl from-primary-800 via-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="w-16 h-16 text-accent-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">عطارة اليرموك</h1>
          <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            أعشاب طبيعية · بهارات فاخرة · زيوت نقية · عسل أصلي · مكسرات طازجة
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-xl font-bold transition">
              تسوّق الآن
            </Link>
            <Link href="/categories" className="border-2 border-white/30 hover:bg-white/10 px-8 py-3 rounded-xl font-bold transition">
              تصفّح التصنيفات
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Truck, title: "شحن لكل المحافظات", desc: "توصيل سريع لباب بيتك" },
            { icon: ShieldCheck, title: "منتجات أصلية 100%", desc: "جودة مضمونة وطبيعية" },
            { icon: Phone, title: "تواصل مباشر", desc: "واتساب: 01158221296" },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4">
              <div className="bg-primary-100 text-primary-700 p-3 rounded-xl">
                <f.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold">التصنيفات</h2>
            <Link href="/categories" className="text-primary-600 text-sm font-bold hover:underline">عرض الكل ←</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((c) => (
              <Link key={c.id} href={`/categories/${c.slug}`} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 text-center group">
                <div className="text-4xl mb-2">{c.image || "🌿"}</div>
                <h3 className="font-bold text-sm group-hover:text-primary-700 transition">{c.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-14">
          <h2 className="text-2xl font-extrabold mb-6">⭐ منتجات مميزة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.price} oldPrice={p.oldPrice} image={p.image} unit={p.unit} />
            ))}
          </div>
        </section>
      )}

      {/* Latest */}
      {latest.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-14 mb-14">
          <h2 className="text-2xl font-extrabold mb-6">🆕 أحدث المنتجات</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {latest.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.price} oldPrice={p.oldPrice} image={p.image} unit={p.unit} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
