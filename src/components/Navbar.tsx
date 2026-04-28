"use client";
import Link from "next/link";
import { ShoppingCart, Menu, X, Leaf } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-primary-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Leaf className="w-7 h-7 text-accent-400" />
          <span>عطارة اليرموك</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-accent-300 transition">الرئيسية</Link>
          <Link href="/products" className="hover:text-accent-300 transition">المنتجات</Link>
          <Link href="/categories" className="hover:text-accent-300 transition">التصنيفات</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative hover:text-accent-300 transition">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-primary-900 px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-accent-300">الرئيسية</Link>
          <Link href="/products" onClick={() => setOpen(false)} className="hover:text-accent-300">المنتجات</Link>
          <Link href="/categories" onClick={() => setOpen(false)} className="hover:text-accent-300">التصنيفات</Link>
        </nav>
      )}
    </header>
  );
}
