"use client";

import { useCart } from "@/context/CartContext";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { useParams } from "next/navigation";

const MOCK_PRODUCTS = [
    {
        id: "1",
        title: "Minimalist Marble Table",
        price: 3200,
        slug: "minimalist-marble-table",
        images: ["https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1000&auto=format&fit=crop"],
        category: "Furniture",
        description: "A statement of pure form and material. This marble side table is hand-carved from a single block of Carrara marble, polished to a soft honed finish that invites touch.",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Example
    },
    // ... repeating for others if needed, but we'll just handle one for demo
];

export default function ProductDetailPage() {
    const { slug } = useParams();
    const { addToCart } = useCart();

    const product = MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];

    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                {/* Gallery */}
                <div className="space-y-8">
                    <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                        <img
                            src={product.images[0]}
                            className="w-full h-full object-cover"
                            alt={product.title}
                        />
                    </div>
                    <YouTubeEmbed url={product.youtubeUrl} />
                </div>

                {/* Content */}
                <div className="space-y-12 lg:sticky lg:top-32">
                    <div className="space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">{product.category}</p>
                        <h1 className="text-4xl font-serif tracking-widest uppercase">{product.title}</h1>
                        <p className="text-xl tracking-widest">${product.price.toLocaleString()}</p>
                    </div>

                    <div className="space-y-6">
                        <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                            {product.description}
                        </p>
                        <div className="pt-4 border-t border-gray-100 italic text-[10px] uppercase tracking-widest text-gray-400">
                            Handcrafted in Italy • Limited Edition
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart({ ...product, quantity: 1, image: product.images[0] })}
                        className="w-full luxury-button"
                    >
                        Add to Selection
                    </button>

                    <div className="pt-12 space-y-4 border-t border-gray-100 text-center">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400">Share this piece</p>
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
