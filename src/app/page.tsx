"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Page() {
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            const { data } = await supabase
                .from("products")
                .select("*")
                .limit(3)
                .order("created_at", { ascending: false });

            if (data) setFeaturedProducts(data);
        };
        fetchFeatured();
    }, []);

    return (
        <div className="space-y-24 pb-24">
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#f9f8f6] -z-10" />
                <div className="text-center space-y-8 px-8">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">2026 春夏系列</p>
                    <h1 className="text-5xl md:text-7xl font-serif tracking-widest uppercase leading-tight">
                        極簡主義 <br /> 的本質
                    </h1>
                    <div className="pt-8">
                        <a href="/products" className="luxury-button">
                            探索室內之美
                        </a>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-8">
                <div className="flex justify-between items-end mb-16">
                    <div className="space-y-4 text-left">
                        <h2 className="text-3xl font-serif tracking-widest uppercase">精選傑作</h2>
                        <p className="text-xs text-gray-400 uppercase tracking-widest italic">為卓越品味而生的嚴選之作。</p>
                    </div>
                    <a href="/products" className="text-[10px] border-b border-black pb-1 uppercase tracking-widest hover:opacity-50 transition-opacity">查看全部</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map((product) => (
                            <a key={product.id} href={`/products/${product.slug}`} className="group cursor-pointer">
                                <div className="aspect-[3/4] bg-gray-50 mb-6 overflow-hidden relative">
                                    <img
                                        src={product.images?.[0] || 'https://via.placeholder.com/800x1200'}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-500" />
                                </div>
                                <div className="space-y-2 text-center">
                                    <h3 className="text-xs uppercase tracking-widest font-medium">{product.title}</h3>
                                    <p className="font-serif text-sm italic text-gray-500">{product.category || "精品選物"}</p>
                                    <p className="text-xs tracking-widest mt-4">NT$ {product.price?.toLocaleString()}</p>
                                </div>
                            </a>
                        ))
                    ) : (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="group cursor-pointer animate-pulse">
                                <div className="aspect-[3/4] bg-gray-100 mb-6 overflow-hidden relative" />
                                <div className="space-y-4 flex flex-col items-center">
                                    <div className="h-2 w-24 bg-gray-100" />
                                    <div className="h-2 w-16 bg-gray-100" />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
