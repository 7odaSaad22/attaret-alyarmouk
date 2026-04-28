"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error || "خطأ في تسجيل الدخول");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <Leaf className="w-12 h-12 mx-auto text-primary-600 mb-2" />
          <h1 className="text-xl font-extrabold">لوحة التحكم</h1>
          <p className="text-sm text-gray-400">عطارة اليرموك</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">اسم المستخدم</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">كلمة المرور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-bold transition">
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </div>
      </form>
    </div>
  );
}
