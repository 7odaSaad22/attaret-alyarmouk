import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { oldPassword, newPassword } = await req.json();
  const dbAdmin = await prisma.admin.findUnique({ where: { id: admin.id } });
  if (!dbAdmin) return NextResponse.json({ error: "غير موجود" }, { status: 404 });

  const valid = await bcrypt.compare(oldPassword, dbAdmin.password);
  if (!valid) return NextResponse.json({ error: "كلمة المرور القديمة غير صحيحة" }, { status: 400 });

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.admin.update({ where: { id: admin.id }, data: { password: hashed } });

  return NextResponse.json({ success: true });
}
