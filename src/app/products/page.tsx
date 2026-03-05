"use client";

import ProductCard from "@/components/ProductCard";

const MOCK_PRODUCTS = [
    {
        id: "1",
        title: "Minimalist Marble Table",
        price: 3200,
        slug: "minimalist-marble-table",
        images: ["https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1000&auto=format&fit=crop"],
        category: "Furniture"
    },
    {
        id: "2",
        title: "Brushed Brass Sconce",
        price: 850,
        slug: "brushed-brass-sconce",
        images: ["https://images.unsplash.com/photo-1513506496268-4d5dee5a6e8a?q=80&w=1000&auto=format&fit=crop"],
        category: "Lighting"
    },
    {
        id: "3",
        title: "Abstract Line Art #4",
        price: 1500,
        slug: "abstract-line-art-4",
        images: ["https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop"],
        category: "Art"
    },
    {
        id: "4",
        title: "Ceramic Vessel 'Luna'",
        price: 450,
        slug: "ceramic-vessel-luna",
        images: ["https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop"],
        category: "Objects"
    }
];

export default function ProductsPage() {
    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="mb-24 space-y-6 text-center">
                <h1 className="text-4xl md:text-5xl font-serif tracking-widest uppercase">The Collection</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.4em]">Curated selection of artisan pieces</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                {MOCK_PRODUCTS.map((p) => (
                    <a key={p.id} href={`/products/${p.slug}`}>
                        <ProductCard product={p} />
                    </a>
                ))}
            </div>
        </div>
    );
}
