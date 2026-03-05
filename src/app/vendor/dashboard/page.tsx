"use client";

import { useState } from "react";

export default function VendorDashboard() {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        imageUrl: "",
        youtubeUrl: "",
        category: "Furniture",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Product Uploaded (Simulation)");
        console.log("Submitting product:", product);
    };

    return (
        <div className="max-w-4xl mx-auto px-8 py-12">
            <div className="mb-16 space-y-4">
                <h1 className="text-4xl font-serif tracking-widest uppercase">Vendor Dashboard</h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Manage your curated inventory.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="space-y-8">
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">Product Title</label>
                            <input
                                type="text"
                                className="luxury-input"
                                placeholder="Marble Side Table"
                                value={product.title}
                                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">Price (USD)</label>
                            <input
                                type="number"
                                className="luxury-input"
                                placeholder="1200"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">Category</label>
                            <select
                                className="luxury-input appearance-none"
                                value={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            >
                                <option>Furniture</option>
                                <option>Lighting</option>
                                <option>Art</option>
                                <option>Jewelry</option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">Description</label>
                            <textarea
                                className="luxury-input min-h-[100px] resize-none"
                                placeholder="Describe the artisan craftsmanship..."
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">YouTube Embed Link</label>
                            <input
                                type="url"
                                className="luxury-input"
                                placeholder="https://youtube.com/watch?v=..."
                                value={product.youtubeUrl}
                                onChange={(e) => setProduct({ ...product, youtubeUrl: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">Main Image URL</label>
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

                    <button type="submit" className="w-full luxury-button">
                        Publish Product
                    </button>
                </form>

                <div className="space-y-8">
                    <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 border-b pb-4">Live Preview</h2>
                    <div className="border border-gray-100 p-8 glass-morphism">
                        {product.imageUrl && (
                            <img src={product.imageUrl} className="w-full aspect-[3/4] object-cover mb-4" alt="Preview" />
                        )}
                        <h3 className="text-lg font-serif tracking-widest uppercase">{product.title || "Product Title"}</h3>
                        <p className="text-xs tracking-widest mt-2">${Number(product.price || 0).toLocaleString()}</p>
                        <p className="text-sm text-gray-400 mt-4 italic">{product.description || "Description placeholder..."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
