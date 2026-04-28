"use client";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Props {
  product: { id: number; name: string; price: number; image: string; unit: string };
}

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-xl font-bold w-10 text-center">{qty}</span>
        <button onClick={() => setQty(qty + 1)} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={() => { addItem(product, qty); setQty(1); }}
        className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-8 rounded-xl font-bold flex items-center justify-center gap-2 transition text-lg"
      >
        <ShoppingCart className="w-5 h-5" />
        أضف للسلة
      </button>
    </div>
  );
}
