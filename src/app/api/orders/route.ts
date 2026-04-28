import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, phone, address, city, notes, subtotal, shipping, total, items } = body;

    if (!customerName || !phone || !address || !items?.length) {
      return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        address,
        city: city || "",
        notes: notes || "",
        subtotal,
        shipping,
        total,
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
    });

    return NextResponse.json({ id: order.id }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "خطأ في السيرفر" }, { status: 500 });
  }
}
