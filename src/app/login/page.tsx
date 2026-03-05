"use client";

import { useState } from "react";

export default function LoginPage() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        // Supabase Auth logic will go here
        setStep(2);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        // Supabase OTP verification logic will go here
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-8">
            <div className="w-full max-w-sm space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-3xl font-serif tracking-widest uppercase">SignIn</h1>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Minimalist luxury for a curated life.</p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-10">
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+886 912 345 678"
                                className="luxury-input text-lg"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full luxury-button">
                            Continue
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-10">
                        <div className="flex flex-col space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-gray-400">Verfication Code</label>
                            <input
                                type="text"
                                placeholder="000000"
                                className="luxury-input text-center text-2xl tracking-[0.5em]"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full luxury-button">
                            Verify
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                        >
                            Back to phone entry
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
