import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({ include: { _count: { select: { products: true } } } });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-8">التصنيفات</h1>
      {categories.length === 0 ? (
        <p className="text-gray-500 text-center py-20">لا توجد تصنيفات حاليًا</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((c: any) => (
            <Link key={c.id} href={`/categories/${c.slug}`} className="bg-white rounded-2xl shadow hover:shadow-xl transition p-8 text-center group">
              <div className="text-5xl mb-3">{c.image || "🌿"}</div>
              <h3 className="font-bold text-lg group-hover:text-primary-700 transition mb-1">{c.name}</h3>
              <p className="text-sm text-gray-400">{c._count.products} منتج</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
