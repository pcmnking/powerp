"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
    const { cart, removeFromCart, total, affiliateId, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        // Simulation of order creation
        setTimeout(() => {
            alert(`Order Placed! \nTotal: $${total} \nAffiliate ID: ${affiliateId || 'None'}`);
            clearCart();
            setIsCheckingOut(false);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="mb-16 space-y-4 text-center">
                <h1 className="text-4xl font-serif tracking-widest uppercase">Your Selection</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    {cart.length === 0 ? "Your bag is currently empty." : "Review your curated items."}
                </p>
            </div>

            {cart.length > 0 && (
                <div className="grid grid-cols-1 gap-12">
                    {/* Cart Items */}
                    <div className="space-y-8">
                        {cart.map((item) => (
                            <div key={item.id} className="flex space-x-8 border-b border-gray-100 pb-8">
                                <div className="w-24 aspect-[3/4] bg-gray-50 overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 flex justify-between items-start">
                                    <div className="space-y-2">
                                        <h3 className="text-xs uppercase tracking-widest font-medium">{item.title}</h3>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">Quantity: {item.quantity}</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-[9px] uppercase tracking-widest text-gray-300 hover:text-black transition-colors underline underline-offset-4"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <p className="text-sm tracking-widest">${(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="pt-8 space-y-8 max-w-sm ml-auto w-full">
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                                <span>Subtotal</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                                <span>Shipping</span>
                                <span>Complimentary</span>
                            </div>
                            {affiliateId && (
                                <div className="flex justify-between text-[9px] uppercase tracking-widest text-gold-accent italic border-t border-gray-50 pt-4">
                                    <span>Affiliate Attribution</span>
                                    <span>Active ({affiliateId})</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg tracking-widest pt-4 border-t border-gray-100 italic font-serif">
                                <span>Total</span>
                                <span>${total.toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className="w-full luxury-button disabled:bg-gray-200"
                        >
                            {isCheckingOut ? "Processing..." : "Continue to Checkout"}
                        </button>
                        <p className="text-[9px] text-center text-gray-300 uppercase tracking-widest leading-relaxed">
                            Security & Privacy are paramount. <br /> Your data is encrypted and secure.
                        </p>
                    </div>
                </div>
            )}

            {cart.length === 0 && (
                <div className="py-24 text-center">
                    <a href="/products" className="text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
                        Browse the Collection
                    </a>
                </div>
            )}
        </div>
    );
}
