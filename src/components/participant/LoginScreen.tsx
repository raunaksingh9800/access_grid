// src/components/participant/LoginScreen.tsx

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface LoginScreenProps {
    email: string;
    setEmail: (email: string) => void;
    loading: boolean;
    handleLogin: (e: React.FormEvent) => Promise<void>;
}

export function LoginScreen({
    email,
    setEmail,
    loading,
    handleLogin,
}: LoginScreenProps) {
    return (
        <div className="min-h-dvh bg-[#F4F3ED] flex justify-center px-8 py-10 font-sans text-black">
            {/* Main container matching the warm canvas layout */}
            <div className="w-full max-w-md flex flex-col items-center text-center mt-10">

                {/* Global Brand Header */}
                <div className="flex items-center gap-3 w-full justify-start mb-16">
                    <div className="flex gap-1.5 items-center">
                        <div className="w-5 h-12 bg-[#FFD3A5] rounded-full border-[1.5px] border-black" />
                        <div className="w-[22px] h-[30px] bg-[#BDB2FF] rounded-full self-end border-[1.5px] border-black" />
                    </div>
                    <h1 className="text-[32px] ml-3 mt-4 font-bold tracking-tight text-black">
                        Iluna <span className="font-normal text-[#595959]">Student</span>
                    </h1>
                </div>

                {/* Form Processing Area */}
                <form onSubmit={handleLogin} className="w-full text-left">
                    <div className="flex flex-col gap-2 items-start w-full mb-6">
                        <label className="font-serif italic text-[#767676] text-[15px]">
                            Enter your Atria issued email address
                        </label>
                        <input
                            type="email"
                            placeholder="usn@atria.in"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="w-full h-[64px] px-6 bg-transparent border-[1.5px] border-black rounded-[24px] focus:outline-none text-black text-[16px] placeholder-[#A3A3A3] transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-[60px] bg-black hover:bg-neutral-900 text-white font-sans font-medium text-lg rounded-full transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-600"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                        ) : (
                            "Continue"
                        )}
                    </button>
                </form>

                {/* Bottom System Footer */}
                <div className="text-center py-16 space-y-1 mt-auto">
                    <h3 className="text-xl font-bold text-neutral-400">A Iluna Product</h3>
                    <p className="text-xs text-neutral-400 font-medium">made with ❤️ in India</p>
                </div>
            </div>
        </div>
    );
}