import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const categories = await prisma.category.findMany({ include: { _count: { select: { products: true } } }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const slug = body.name.replace(/\s+/g, "-").toLowerCase() + "-" + Date.now();

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug,
      image: body.image || "",
      description: body.description || "",
    },
  });

  return NextResponse.json(category, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await req.json();
  await prisma.category.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
