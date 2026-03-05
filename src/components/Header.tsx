"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Header() {
    const { cart, removeFromCart, total } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleCheckout = () => {
        alert("前往結帳... (結帳系統即將上線)");
        setIsCartOpen(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center text-black bg-white/80 backdrop-blur-md">
                <Link href="/" className="text-2xl font-serif tracking-ultra uppercase">
                    Luxe
                </Link>
                <div className="flex items-center space-x-8">
                    <nav className="hidden md:flex space-x-8 text-xs uppercase tracking-widest">
                        <Link href="/products" className="hover:opacity-50 transition-opacity">系列</Link>
                        <Link href="/vendor/dashboard" className="hover:opacity-50 transition-opacity">供應商</Link>
                        <Link href="/affiliate/dashboard" className="hover:opacity-50 transition-opacity">推廣者</Link>
                        <Link href="/admin/dashboard" className="hover:opacity-50 transition-opacity">管理頁</Link>
                        <Link href="/login" className="hover:opacity-50 transition-opacity">帳戶</Link>
                    </nav>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="text-xs uppercase tracking-widest hover:opacity-50 transition-opacity relative"
                    >
                        選品清單 ({cart.reduce((acc: number, item: any) => acc + item.quantity, 0)})
                    </button>
                </div>
            </header>

            {/* Shopping Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
                    <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col pl-8 pr-8 py-12 animate-in slide-in-from-right duration-500">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-2xl font-serif tracking-widest uppercase">選品清單</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black">
                                關閉
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-8 pr-4">
                            {cart.length === 0 ? (
                                <p className="text-sm text-gray-400 italic font-serif">清單內尚無選品。</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex space-x-4 border-b border-gray-50 pb-8">
                                        <div className="w-20 h-24 bg-gray-50 overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-2 flex flex-col justify-center">
                                            <h3 className="text-[10px] uppercase tracking-widest font-medium">{item.title}</h3>
                                            <p className="text-xs tracking-widest text-gray-500">NT$ {item.price.toLocaleString()}</p>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-[10px] text-gray-400">數量: {item.quantity}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-[10px] text-red-800/60 hover:text-red-800 uppercase tracking-widest transition-colors"
                                                >
                                                    移除
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="pt-8 space-y-6 mt-auto">
                            <div className="flex justify-between items-center text-sm tracking-widest">
                                <span className="uppercase text-gray-500 text-xs">總計</span>
                                <span>NT$ {total.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={cart.length === 0}
                                className="w-full luxury-button disabled:opacity-50"
                            >
                                結帳
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
