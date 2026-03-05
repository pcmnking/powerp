"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    affiliateId: string | null;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [affiliateId, setAffiliateId] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        // Capture affiliate_id from URL
        const aid = searchParams.get("affiliate_id");
        if (aid) {
            setAffiliateId(aid);
            localStorage.setItem("affiliate_id", aid);
        } else {
            const storedAid = localStorage.getItem("affiliate_id");
            if (storedAid) setAffiliateId(storedAid);
        }
    }, [searchParams]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, affiliateId, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
