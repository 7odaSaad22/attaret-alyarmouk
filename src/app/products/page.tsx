import prisma from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ where: { active: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-8">جميع المنتجات</h1>
      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-20">لا توجد منتجات حاليًا</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p: any) => (
            <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.price} oldPrice={p.oldPrice} image={p.image} unit={p.unit} />
          ))}
        </div>
      )}
    </div>
  );
}
