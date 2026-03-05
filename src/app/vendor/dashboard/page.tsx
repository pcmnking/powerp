"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function VendorDashboard() {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        imageUrl: "",
        youtubeUrl: "",
        category: "家具",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // NOTE: In a real app, logic would get the current user's ID
            // For now, we assume the user is authenticated and is a vendor.
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                alert("請先登入");
                return;
            }

            const { error } = await supabase.from("products").insert([
                {
                    vendor_id: user.id,
                    title: product.title,
                    slug: product.title.toLowerCase().replace(/ /g, "-") + "-" + Math.random().toString(36).substring(2, 7),
                    price: parseFloat(product.price),
                    description: product.description,
                    images: [product.imageUrl],
                    youtube_url: product.youtubeUrl,
                    category: product.category,
                    is_published: true, // Auto-publish for the demo
                },
            ]);

            if (error) throw error;

            alert("商品上架成功！");
            setProduct({
                title: "",
                price: "",
                description: "",
                imageUrl: "",
                youtubeUrl: "",
                category: "家具",
            });
        } catch (error: any) {
            alert("錯誤: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="mb-16 space-y-4">
                <h1 className="text-4xl font-serif tracking-widest uppercase">供應商主頁</h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest">管理您的精品庫存。</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="space-y-8">
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">商品名稱</label>
                            <input
                                type="text"
                                className="luxury-input"
                                placeholder="例如：大理石邊桌"
                                value={product.title}
                                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">價格 (TWD)</label>
                            <input
                                type="number"
                                className="luxury-input"
                                placeholder="12000"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">類別</label>
                            <select
                                className="luxury-input appearance-none"
                                value={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            >
                                <option>家具</option>
                                <option>燈飾</option>
                                <option>藝術</option>
                                <option>珠寶</option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">商品描述</label>
                            <textarea
                                className="luxury-input min-h-[100px] resize-none"
                                placeholder="描述工匠的精湛工藝..."
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">YouTube 影片連結</label>
                            <input
                                type="url"
                                className="luxury-input"
                                placeholder="https://youtube.com/watch?v=..."
                                value={product.youtubeUrl}
                                onChange={(e) => setProduct({ ...product, youtubeUrl: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">主圖連結 (URL)</label>
                            <input
                                type="url"
                                className="luxury-input"
                                placeholder="https://images.unsplash.com/..."
                                value={product.imageUrl}
                                onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full luxury-button disabled:opacity-50">
                        {loading ? "上傳中..." : "發布商品"}
                    </button>
                </form>

                <div className="space-y-8">
                    <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 border-b pb-4">即時預覽</h2>
                    <div className="border border-gray-100 p-8 glass-morphism">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} className="w-full aspect-[3/4] object-cover mb-4" alt="Preview" />
                        ) : (
                            <div className="w-full aspect-[3/4] bg-gray-50 flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-300 mb-4">預覽圖片</div>
                        )}
                        <h3 className="text-lg font-serif tracking-widest uppercase">{product.title || "商品名稱"}</h3>
                        <p className="text-xs tracking-widest mt-2">${Number(product.price || 0).toLocaleString()}</p>
                        <p className="text-sm text-gray-400 mt-4 italic">{product.description || "商品描述預覽..."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
