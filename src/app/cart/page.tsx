"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
    const { cart, removeFromCart, total, affiliateId, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        // 模擬訂單建立
        setTimeout(() => {
            alert(`訂單已提交！ \n總金額: NT$ ${total.toLocaleString()} \n推廣代碼: ${affiliateId || '無'}`);
            clearCart();
            setIsCheckingOut(false);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="mb-16 space-y-4 text-center">
                <h1 className="text-4xl font-serif tracking-widest uppercase">您的選品</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    {cart.length === 0 ? "您的購物袋目前是空的。" : "查看您心儀的傑作。"}
                </p>
            </div>

            {cart.length > 0 && (
                <div className="grid grid-cols-1 gap-12">
                    {/* 購物車項目 */}
                    <div className="space-y-8">
                        {cart.map((item) => (
                            <div key={item.id} className="flex space-x-8 border-b border-gray-100 pb-8">
                                <div className="w-24 aspect-[3/4] bg-gray-50 overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex justify-between items-start">
                                    <div className="space-y-2">
                                        <h3 className="text-xs uppercase tracking-widest font-medium">{item.title}</h3>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">數量: {item.quantity}</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-[9px] uppercase tracking-widest text-gray-300 hover:text-black transition-colors underline underline-offset-4"
                                        >
                                            移除
                                        </button>
                                    </div>
                                    <p className="text-sm tracking-widest">NT$ {(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 結帳摘要 */}
                    <div className="pt-8 space-y-8 max-w-sm ml-auto w-full">
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                                <span>小計</span>
                                <span>NT$ {total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                                <span>運費</span>
                                <span>免運費</span>
                            </div>
                            {affiliateId && (
                                <div className="flex justify-between text-[9px] uppercase tracking-widest text-gold-accent italic border-t border-gray-50 pt-4">
                                    <span>推廣分紅關聯</span>
                                    <span>已啟用 ({affiliateId})</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg tracking-widest pt-4 border-t border-gray-100 italic font-serif">
                                <span>總計</span>
                                <span>NT$ {total.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full luxury-button disabled:bg-gray-200"
                        >
                            {isCheckingOut ? "處理中..." : "前往結帳"}
                        </button>
                        <p className="text-[9px] text-center text-gray-300 uppercase tracking-widest leading-relaxed">
                            安全與隱私是我們的首要任務。 <br /> 您的數據已加密。
                        </p>
                    </div>
                </div>
            )}

            {cart.length === 0 && (
                <div className="py-24 text-center">
                    <a href="/products" className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
                        瀏覽系列
                    </a>
                </div>
            )}
        </div>
    );
}
