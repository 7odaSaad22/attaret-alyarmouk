import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug }, include: { category: true } });
  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">🌿</div>
          )}
        </div>
        <div>
          <p className="text-sm text-primary-600 font-bold mb-2">{product.category.name}</p>
          <h1 className="text-3xl font-extrabold mb-4">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-extrabold text-primary-700">{product.price} ج.م</span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="text-gray-400 line-through text-lg">{product.oldPrice} ج.م</span>
            )}
            <span className="text-gray-400">/ {product.unit}</span>
          </div>
          {product.stock > 0 ? (
            <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold mb-4">متوفر</span>
          ) : (
            <span className="inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-bold mb-4">غير متوفر</span>
          )}
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <AddToCartButton product={{ id: product.id, name: product.name, price: product.price, image: product.image, unit: product.unit }} />
        </div>
      </div>
    </div>
  );
}
