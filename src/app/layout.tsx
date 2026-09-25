import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // 🌟 Глобальные стили (Tailwind) подключаются СТРОГО ТУТ
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Настройка оптимизированных шрифтов от Google
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Глобальные метатеги для поисковиков (SEO)
export const metadata: Metadata = {
  title: "Velocity Store",
  description: "Современный интернет-магазин на Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}
      >
        <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
      </body>
    </html>
  );
}
