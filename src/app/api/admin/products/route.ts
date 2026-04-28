import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const products = await prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  const slug = body.name.replace(/\s+/g, "-").toLowerCase() + "-" + Date.now();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
      description: body.description || "",
      price: parseFloat(body.price),
      oldPrice: body.oldPrice ? parseFloat(body.oldPrice) : null,
      image: body.image || "",
      stock: parseInt(body.stock || "0"),
      unit: body.unit || "قطعة",
      featured: body.featured || false,
      active: body.active !== false,
      categoryId: parseInt(body.categoryId),
    },
  });

  return NextResponse.json(product, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();

  const product = await prisma.product.update({
    where: { id: body.id },
    data: {
      name: body.name,
      description: body.description || "",
      price: parseFloat(body.price),
      oldPrice: body.oldPrice ? parseFloat(body.oldPrice) : null,
      image: body.image || "",
      stock: parseInt(body.stock || "0"),
      unit: body.unit || "قطعة",
      featured: body.featured || false,
      active: body.active !== false,
      categoryId: parseInt(body.categoryId),
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id } = await req.json();
  await prisma.product.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
