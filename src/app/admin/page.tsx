import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ShoppingBag, FolderOpen, Key } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  const [productCount, orderCount, categoryCount, pendingOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.category.count(),
    prisma.order.count({ where: { status: "pending" } }),
  ]);

  const stats = [
    { label: "المنتجات", value: productCount, icon: Package, color: "bg-blue-100 text-blue-700", href: "/admin/products" },
    { label: "الطلبات", value: orderCount, icon: ShoppingBag, color: "bg-green-100 text-green-700", href: "/admin/orders" },
    { label: "طلبات معلقة", value: pendingOrders, icon: ShoppingBag, color: "bg-amber-100 text-amber-700", href: "/admin/orders" },
    { label: "التصنيفات", value: categoryCount, icon: FolderOpen, color: "bg-purple-100 text-purple-700", href: "/admin/categories" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold">لوحة التحكم</h1>
        <Link href="/admin/settings" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition">
          <Key className="w-4 h-4" /> تغيير كلمة المرور
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <Link key={i} href={s.href} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6">
            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className="w-6 h-6" />
            </div>
            <p className="text-3xl font-extrabold">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/products" className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl p-6 font-bold text-lg transition text-center">إدارة المنتجات</Link>
        <Link href="/admin/orders" className="bg-accent-600 hover:bg-accent-700 text-white rounded-2xl p-6 font-bold text-lg transition text-center">إدارة الطلبات</Link>
        <Link href="/admin/categories" className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-6 font-bold text-lg transition text-center">إدارة التصنيفات</Link>
      </div>
    </div>
  );
}
