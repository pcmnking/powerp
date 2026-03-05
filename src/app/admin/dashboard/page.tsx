"use client";

import { useState } from "react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="mb-16 flex justify-between items-end">
                <div className="space-y-4">
                    <h1 className="text-4xl font-serif tracking-widest uppercase">Command Center</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Global platform governance and strategic oversight.</p>
                </div>
                <nav className="flex space-x-8 text-[10px] uppercase tracking-[0.2em] font-medium border-b border-gray-100 pb-2">
                    {["overview", "approvals", "vendors", "reports"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${activeTab === tab ? "text-black border-b border-black" : "text-gray-300 hover:text-gray-500"} transition-all pb-2`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {activeTab === "overview" && (
                <div className="space-y-24">
                    {/* Top Line Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { label: "Total Revenue", value: "$425,800" },
                            { label: "Active Promoters", value: "2,450" },
                            { label: "Orders Today", value: "142" },
                            { label: "Avg. Commission", value: "12.5%" },
                        ].map((m, i) => (
                            <div key={i} className="space-y-2">
                                <p className="text-[9px] uppercase tracking-widest text-gray-400">{m.label}</p>
                                <p className="text-xl font-serif tracking-widest uppercase">{m.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Visual Analytics Simulation (CSS Based) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        <div className="space-y-8">
                            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-8 border-b pb-4">Revenue Performance (7D)</h3>
                            <div className="h-64 flex items-end justify-between space-x-4">
                                {[45, 60, 55, 80, 75, 95, 100].map((h, i) => (
                                    <div key={i} className="flex-1 space-y-2 group">
                                        <div
                                            className="bg-black bg-opacity-5 group-hover:bg-opacity-10 transition-all cursor-default"
                                            style={{ height: `${h}%` }}
                                        />
                                        <p className="text-[8px] text-center text-gray-400 uppercase tracking-widest">Day 0{i + 1}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-8 border-b pb-4">Top Affiliates (By Conversion)</h3>
                            <div className="space-y-6">
                                {[
                                    { name: "The Curator", value: 84, growth: "Gold" },
                                    { name: "Minimalist.Vibe", value: 62, growth: "Silver" },
                                    { name: "Sincere_Lines", value: 45, growth: "Bronze" },
                                ].map((a, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs tracking-widest py-2">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-[8px] text-gray-300">0{i + 1}</span>
                                            <span className="uppercase">{a.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <span className="text-[9px] text-gold-accent italic">{a.growth}</span>
                                            <span className="font-medium">{a.value}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "approvals" && (
                <div className="space-y-12">
                    <h2 className="text-xl font-serif tracking-widest uppercase">Pending Masterpieces</h2>
                    <div className="grid grid-cols-1 gap-8">
                        {[1, 2].map(i => (
                            <div key={i} className="flex space-x-12 border border-gray-50 p-8 glass-morphism items-center">
                                <div className="w-32 aspect-square bg-gray-50 flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest">Thumbnail</div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xs uppercase tracking-widest font-medium">New Product Proposal #{i}</h3>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">Submitted by Vendor: Lusso Designs</p>
                                    <p className="text-xs text-gray-500 leading-relaxed max-w-lg">Requested pricing: $1,450. Complete with YouTube storytelling and high-res imagery.</p>
                                </div>
                                <div className="flex space-x-4">
                                    <button className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors px-6 py-2 border border-gray-100 uppercase transition-all duration-300">Preview</button>
                                    <button className="text-[10px] uppercase tracking-widest text-white bg-black hover:bg-gray-800 px-6 py-2 uppercase transition-all duration-300">Approve</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
