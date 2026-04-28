"use client";
import { useState } from "react";
import { ArrowRight, Key } from "lucide-react";
import Link from "next/link";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(""); setError("");
    if (form.newPassword !== form.confirm) { setError("كلمة المرور الجديدة غير متطابقة"); return; }
    if (form.newPassword.length < 6) { setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل"); return; }

    setLoading(true);
    const res = await fetch("/api/admin/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword: form.oldPassword, newPassword: form.newPassword }),
    });

    if (res.ok) {
      setMsg("تم تغيير كلمة المرور بنجاح ✅");
      setForm({ oldPassword: "", newPassword: "", confirm: "" });
    } else {
      const data = await res.json();
      setError(data.error || "حدث خطأ");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-gray-400 hover:text-primary-600"><ArrowRight className="w-6 h-6" /></Link>
        <h1 className="text-2xl font-extrabold">تغيير كلمة المرور</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
        <div className="flex justify-center mb-2"><Key className="w-12 h-12 text-primary-600" /></div>
        <div>
          <label className="block text-sm font-bold mb-1">كلمة المرور الحالية</label>
          <input type="password" required value={form.oldPassword} onChange={(e) => setForm({ ...form, oldPassword: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">كلمة المرور الجديدة</label>
          <input type="password" required value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">تأكيد كلمة المرور الجديدة</label>
          <input type="password" required value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none" />
        </div>
        {error && <p className="text-red-500 font-bold text-sm text-center">{error}</p>}
        {msg && <p className="text-green-600 font-bold text-sm text-center">{msg}</p>}
        <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-bold transition">
          {loading ? "جاري التغيير..." : "تغيير كلمة المرور"}
        </button>
      </form>
    </div>
  );
}
