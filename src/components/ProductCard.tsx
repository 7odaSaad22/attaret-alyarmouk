"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Props {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  unit: string;
}

export default function ProductCard({ id, name, slug, price, oldPrice, image, unit }: Props) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
      <Link href={`/products/${slug}`}>
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-6xl">🌿</div>
          )}
          {oldPrice && oldPrice > price && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              خصم {Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${slug}`}>
          <h3 className="font-bold text-sm line-clamp-2 hover:text-primary-700 transition mb-2">{name}</h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-primary-700 font-extrabold text-lg">{price} ج.م</span>
          {oldPrice && oldPrice > price && (
            <span className="text-gray-400 line-through text-sm">{oldPrice} ج.م</span>
          )}
          <span className="text-gray-400 text-xs">/ {unit}</span>
        </div>
        <button
          onClick={() => addItem({ id, name, price, image, unit })}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition"
        >
          <ShoppingCart className="w-4 h-4" />
          أضف للسلة
        </button>
      </div>
    </div>
  );
}
