import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  let admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin && username === "admin") {
    const defaultPass = process.env.ADMIN_DEFAULT_PASSWORD || "Admin@123";
    const hashed = await bcrypt.hash(defaultPass, 10);
    admin = await prisma.admin.create({ data: { username: "admin", password: hashed } });
  }

  if (!admin) {
    return NextResponse.json({ error: "بيانات غير صحيحة" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
  }

  const token = signToken({ id: admin.id, username: admin.username });

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res;
}
