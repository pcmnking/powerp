"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLoginOrSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 嘗試使用信箱登入 (這裡簡單起見用 phone 變數當作信箱)
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: phone,
                password: password,
            });

            if (signInError) {
                // 如果登入失敗，可能是沒有帳號，嘗試註冊
                const { error: signUpError } = await supabase.auth.signUp({
                    email: phone,
                    password: password,
                });

                if (signUpError) {
                    throw signUpError;
                }
                alert("註冊成功！請檢查您的信箱進行驗證 (如果 Supabase 啟用了信箱驗證)，或直接登入。");
            } else {
                alert("登入成功！");
                router.push("/"); // 登入後回到首頁
            }
        } catch (error: any) {
            alert("錯誤: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-8">
            <div className="w-full max-w-sm space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-3xl font-serif tracking-widest uppercase">登入 / 註冊</h1>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">極簡奢華，品味生活。</p>
                    <p className="text-[10px] text-gray-400 mt-2">首次使用將自動為您註冊帳號。</p>
                </div>

                <form onSubmit={handleLoginOrSignup} className="space-y-10">
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">信箱帳號</label>
                            <input
                                type="email"
                                placeholder="example@luxe.com"
                                className="luxury-input text-lg"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">密碼</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="luxury-input text-lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full luxury-button disabled:opacity-50">
                        {loading ? "處理中..." : "註冊 / 登入"}
                    </button>
                </form>
            </div>
        </div>
    );
}
