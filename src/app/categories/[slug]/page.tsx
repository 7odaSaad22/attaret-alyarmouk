import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({ where: { slug: params.slug }, include: { products: { where: { active: true } } } });
  if (!category) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">{category.name}</h1>
      {category.description && <p className="text-gray-500 mb-8">{category.description}</p>}
      {category.products.length === 0 ? (
        <p className="text-gray-500 text-center py-20">لا توجد منتجات في هذا التصنيف</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {category.products.map((p: any) => (
            <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.price} oldPrice={p.oldPrice} image={p.image} unit={p.unit} />
          ))}
        </div>
      )}
    </div>
  );
}
