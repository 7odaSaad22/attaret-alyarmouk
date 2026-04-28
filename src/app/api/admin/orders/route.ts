import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdmin } from "@/lib/auth";

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function PUT(req: NextRequest) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const { id, status } = await req.json();
  const order = await prisma.order.update({ where: { id }, data: { status } });

  return NextResponse.json(order);
}
