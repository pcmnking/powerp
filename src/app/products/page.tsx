"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("is_published", true)
                .order("created_at", { ascending: false });

            if (!error && data) {
                setProducts(data);
            }
            setLoading(false);
        }
        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="mb-24 space-y-6 text-center">
                <h1 className="text-4xl md:text-5xl font-serif tracking-widest uppercase">精選系列</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em]">由工匠精心挑選的藝術作品</p>
            </div>

            {loading ? (
                <div className="text-center py-24 font-serif text-xs uppercase tracking-widest animate-pulse">
                    正在載入傑作...
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {products.map((p: Product) => (
                        <a key={p.id} href={`/products/${p.slug}`}>
                            <ProductCard product={p} />
                        </a>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24">
                    <p className="text-sm text-gray-400 font-serif italic uppercase tracking-widest">目前尚無上架商品</p>
                </div>
            )}
        </div>
    );
}
