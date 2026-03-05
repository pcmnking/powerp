import type { Metadata } from "next";
import { Suspense } from "react";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
    title: "LUXE | Curated Selection",
    description: "Minimalist Luxury E-commerce & Affiliate Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-TW">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;1,400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="antialiased bg-white">
                <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center font-serif uppercase tracking-widest text-xs">Loading Luxe...</div>}>
                    <CartProvider>
                        <Header />
                        <main className="pt-24 min-h-screen">
                            {children}
                        </main>
                        <footer className="px-8 py-12 border-t border-gray-100 mt-24">
                            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div>
                                    <div className="text-xl font-serif tracking-widest uppercase mb-6">Luxe</div>
                                    <p className="text-sm text-gray-500 max-w-xs">為現代生活策劃的極簡卓越體驗。</p>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest mb-6">服務與支援</h4>
                                    <ul className="text-sm text-gray-400 space-y-4">
                                        <li><a href="#" className="hover:text-black transition-colors">客戶服務</a></li>
                                        <li><a href="#" className="hover:text-black transition-colors">運送與退換貨</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase tracking-widest mb-6">關注我們</h4>
                                    <ul className="text-sm text-gray-400 space-y-4">
                                        <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                                        <li><a href="#" className="hover:text-black transition-colors">YouTube</a></li>
                                    </ul>
                                </div>
                            </div>
                        </footer>
                    </CartProvider>
                </Suspense>
            </body>
        </html>
    );
}
