"use client";

import { useCart } from "@/context/CartContext";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) return;
            setLoading(true);
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("slug", slug)
                .single();

            if (data) {
                setProduct(data);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-8 py-32 text-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 animate-pulse">品味加載中...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-8 py-32 text-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-400">未找到該傑作。</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                {/* 展覽廊 */}
                <div className="space-y-8">
                    <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                        <img
                            src={product.images?.[0] || 'https://via.placeholder.com/800x1200?text=Luxe+Aesthetics'}
                            className="w-full h-full object-cover"
                            alt={product.title}
                        />
                    </div>
                    {product.youtube_url && <YouTubeEmbed url={product.youtube_url} />}
                </div>

                {/* 內容詳情 */}
                <div className="space-y-12 lg:sticky lg:top-32">
                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">{product.category || "精品系列"}</p>
                        <h1 className="text-4xl font-serif tracking-widest uppercase">{product.title}</h1>
                        <p className="text-xl tracking-widest">NT$ {product.price?.toLocaleString()}</p>
                    </div>

                    <div className="space-y-6">
                        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                            {product.description}
                        </p>
                        <div className="pt-4 border-t border-gray-100 italic text-[10px] uppercase tracking-widest text-gray-400">
                            匠心打造 • 限量收藏
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart({ ...product, quantity: 1, image: product.images?.[0] })}
                        className="w-full luxury-button"
                    >
                        加入選品清單
                    </button>

                    <div className="pt-12 space-y-4 border-t border-gray-100 text-center">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400">分享這件傑作</p>
                        <div className="flex justify-center space-x-8">
                            <a href="#" className="hover:opacity-50 transition-opacity"><img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" className="w-4 h-4 grayscale" alt="Instagram" /></a>
                            <a href="#" className="hover:opacity-50 transition-opacity"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" className="w-4 h-4 grayscale" alt="Twitter" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
