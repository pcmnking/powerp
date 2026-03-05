"use client";

import { useState } from "react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("概覽");

    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="mb-16 flex justify-between items-end">
                <div className="space-y-4">
                    <h1 className="text-4xl font-serif tracking-widest uppercase">指揮中心</h1>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">全局平台治理與戰略監督。</p>
                </div>
                <nav className="flex space-x-8 text-[10px] uppercase tracking-[0.2em] font-medium border-b border-gray-100 pb-2">
                    {["概覽", "審核", "供應商", "報告"].map((tab) => (
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

            {activeTab === "概覽" && (
                <div className="space-y-24">
                    {/* Top Line Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { label: "總營收", value: "NT$ 425,800" },
                            { label: "活躍推廣者", value: "2,450" },
                            { label: "今日訂單", value: "142" },
                            { label: "平均佣金率", value: "12.5%" },
                        ].map((m, i) => (
                            <div key={i} className="space-y-2">
                                <p className="text-[9px] uppercase tracking-widest text-gray-400">{m.label}</p>
                                <p className="text-xl font-serif tracking-widest uppercase">{m.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Visual Analytics Simulation */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                        <div className="space-y-8">
                            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-8 border-b pb-4">營收趨勢 (7D)</h3>
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
                            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-8 border-b pb-4">頂尖推廣者 (依轉換率)</h3>
                            <div className="space-y-6">
                                {[
                                    { name: "策展專家", value: 84, growth: "金獎" },
                                    { name: "極簡美學", value: 62, growth: "銀獎" },
                                    { name: "真誠之線", value: 45, growth: "銅獎" },
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

            {activeTab === "審核" && (
                <div className="space-y-12">
                    <h2 className="text-xl font-serif tracking-widest uppercase">待審核傑作</h2>
                    <div className="grid grid-cols-1 gap-8">
                        {[1, 2].map(i => (
                            <div key={i} className="flex space-x-12 border border-gray-50 p-8 glass-morphism items-center">
                                <div className="w-32 aspect-square bg-gray-50 flex items-center justify-center text-[10px] text-gray-300 uppercase tracking-widest">縮圖預覽</div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xs uppercase tracking-widest font-medium">新商品提案 #{i}</h3>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest italic">提交人: Lusso Designs</p>
                                    <p className="text-xs text-gray-500 leading-relaxed max-w-lg">申請定價: NT$ 14,500。包含 YouTube 故事敘述與高解析度圖像。</p>
                                </div>
                                <div className="flex space-x-4">
                                    <button className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors px-6 py-2 border border-gray-100 uppercase transition-all duration-300">預覽</button>
                                    <button className="text-[10px] uppercase tracking-widest text-white bg-black hover:bg-gray-800 px-6 py-2 uppercase transition-all duration-300">批准</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
