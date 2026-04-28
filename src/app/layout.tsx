import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "عطارة اليرموك — أعشاب وبهارات وزيوت طبيعية",
  description: "متجر عطارة اليرموك لبيع الأعشاب والبهارات والزيوت الطبيعية والعسل والمكسرات أون لاين. شحن لكل المحافظات.",
  keywords: "عطارة, أعشاب, بهارات, زيوت طبيعية, عسل, مكسرات, عطارة اليرموك",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
