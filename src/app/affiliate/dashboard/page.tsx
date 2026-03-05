"use client";

import { useState } from "react";

export default function AffiliateDashboard() {
    const [selectedProduct, setSelectedProduct] = useState("1");
    const [generatedLink, setGeneratedLink] = useState("");

    const products = [
        { id: "1", title: "Minimalist Marble Table", slug: "minimalist-marble-table" },
        { id: "2", title: "Brushed Brass Sconce", slug: "brushed-brass-sconce" },
        { id: "3", title: "Abstract Line Art #4", slug: "abstract-line-art-4" },
    ];

    const handleGenerate = () => {
        const product = products.find(p => p.id === selectedProduct);
        const baseUrl = window.location.origin;
        const link = `${baseUrl}/products/${product?.slug}?affiliate_id=AFF_USER_888`;
        setGeneratedLink(link);
    };

    return (
        <div className="max-w-6xl mx-auto px-8 py-12">
            <div className="mb-16 space-y-4">
                <h1 className="text-4xl font-serif tracking-widest uppercase">Promoter Space</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Your bridge to curated influence.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                {[
                    { label: "Total Clicks", value: "1,204", growth: "+12%" },
                    { label: "Conversions", value: "84", growth: "+5%" },
                    { label: "Unpaid Earnings", value: "$4,250.00", growth: "Top 5%" },
                ].map((stat, i) => (
                    <div key={i} className="p-8 border border-gray-100 glass-morphism space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-serif tracking-widest">{stat.value}</p>
                        <p className="text-[9px] uppercase tracking-widest text-gold-accent italic">{stat.growth}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                {/* Link Generator */}
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-xl font-serif tracking-widest uppercase">Link Factory</h2>
                        <p className="text-xs text-gray-400 leading-relaxed">Select a masterpiece from our collection to generate your bespoke tracking link.</p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">Select Masterpiece</label>
                            <select
                                className="luxury-input appearance-none"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>{p.title}</option>
                                ))}
                            </select>
                        </div>

                        <button onClick={handleGenerate} className="luxury-button w-full">
                            Forge Tracking Link
                        </button>

                        {generatedLink && (
                            <div className="p-4 bg-gray-50 border border-gray-100 space-y-2 overflow-hidden">
                                <p className="text-[9px] uppercase tracking-widest text-gray-400">Your Bespoke URL</p>
                                <code className="text-[10px] break-all text-gold-accent">{generatedLink}</code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(generatedLink);
                                        alert("Link copied to clipboard");
                                    }}
                                    className="block mt-4 text-[9px] uppercase tracking-widest text-black underline underline-offset-4"
                                >
                                    Copy URL
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Performance Details */}
                <div className="space-y-8">
                    <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-8 border-b pb-4">Real-time Performance</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex justify-between items-center text-xs tracking-widest py-4 border-b border-gray-50">
                                <div className="space-y-1">
                                    <p className="uppercase">Click Captured</p>
                                    <p className="text-[9px] text-gray-400 uppercase italic">Minimalist Marble Table • 2m ago</p>
                                </div>
                                <p className="text-gold-accent">$0.00</p>
                            </div>
                        ))}
                        <div className="flex justify-between items-center text-xs tracking-widest py-4 border-b border-gray-50">
                            <div className="space-y-1">
                                <p className="uppercase">Conversion Verified</p>
                                <p className="text-[9px] text-gray-400 uppercase italic">Brushed Brass Sconce • 45m ago</p>
                            </div>
                            <p className="text-black font-medium">+$85.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
