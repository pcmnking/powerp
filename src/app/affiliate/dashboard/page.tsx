"use client";

import { useState } from "react";

export default function AffiliateDashboard() {
    const [productUrl, setProductUrl] = useState("");
    const [generatedLink, setGeneratedLink] = useState("");
    const affiliateCode = "LUXE_PRO_888"; // 模擬推廣代碼

    const generateLink = () => {
        if (!productUrl) return;
        const link = `${productUrl}${productUrl.includes("?") ? "&" : "?"}affiliate_id=${affiliateCode}`;
        setGeneratedLink(link);
    };

    return (
        <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="mb-24 space-y-4">
                <h1 className="text-4xl font-serif tracking-widest uppercase">推廣者中心</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">分享卓越，獲取回報。</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                {/* 連結工廠 */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-xs uppercase tracking-widest text-gray-500 border-b pb-4">連結工廠</h2>
                        <div className="flex flex-col space-y-4">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">商品頁面連結</label>
                            <input
                                type="text"
                                className="luxury-input"
                                placeholder="貼上 Luxe 商品網址..."
                                value={productUrl}
                                onChange={(e) => setProductUrl(e.target.value)}
                            />
                            <button onClick={generateLink} className="luxury-button w-full mt-4">
                                生成推廣連結
                            </button>
                        </div>
                    </div>

                    {generatedLink && (
                        <div className="p-8 bg-gray-50 border border-gray-100 space-y-4 animate-in fade-in duration-700">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400">您的專屬連結：</p>
                            <p className="text-xs break-all font-mono text-gray-600">{generatedLink}</p>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(generatedLink);
                                    alert("連結已複製到剪貼簿");
                                }}
                                className="text-[10px] uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
                            >
                                複製連結
                            </button>
                        </div>
                    )}
                </div>

                {/* 績效概覽 */}
                <div className="space-y-12">
                    <h2 className="text-xs uppercase tracking-widest text-gray-500 border-b pb-4">推廣績效概覽</h2>
                    <div className="grid grid-cols-2 gap-12">
                        {[
                            { label: "點擊次數", value: "1,204" },
                            { label: "轉換次數", value: "48" },
                            { label: "預估佣金 (TWD)", value: "NT$ 15,600" },
                            { label: "轉換率", value: "3.9%" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <p className="text-[9px] uppercase tracking-widest text-gray-400">{stat.label}</p>
                                <p className="text-xl font-serif tracking-widest">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-12 space-y-8">
                        <h3 className="text-[10px] uppercase tracking-widest text-gray-400">即時動態</h3>
                        <div className="space-y-4">
                            {[
                                { event: "商品點擊", time: "2 分鐘前", detail: "大理石邊桌" },
                                { event: "成交轉換", time: "1 小時前", detail: "拉絲黃銅壁燈" },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 text-[10px] tracking-widest">
                                    <div className="space-x-4">
                                        <span className="uppercase text-black">{item.event}</span>
                                        <span className="text-gray-400 italic">{item.detail}</span>
                                    </div>
                                    <span className="text-gray-300 uppercase">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
