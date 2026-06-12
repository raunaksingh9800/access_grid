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
        <div className="min-h-dvh bg-[#f9f8f3] flex justify-center px-8 py-10">
            {/* Main container matching the warm canvas layout */}
            <div className="w-full max-w-md flex flex-col items-center text-center">

                {/* Branding / Header Setup */}
                <div className="flex gap-2 mb-0 w-full justify-start items-end z-10">
                    <img className="w-12 h-12 object-contain" src="./luna-light-logo.png" alt="Logo" />
                    <h1 className="text-3xl font-bold text-gray-900 relative top-1 left-4 tracking-tight">
                        lluna <span className="font-light text-gray-500">Student</span>
                    </h1>
                </div>

                {/* Form Processing Area */}
                <form onSubmit={handleLogin} className="mt-20 w-full text-left">
                    <p className="mb-6 font-serif text-gray-500 text-center md:text-left">
                        Enter your Atria issued email address
                    </p>

                    <input
                        type="email"
                        placeholder="name@atria.edu.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="border border-black/10 w-full bg-white rounded-full py-3 px-5 text-gray-900 outline-none transition-all focus:border-black/30 placeholder:text-gray-400 text-base"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-full mt-6 text-lg font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-5 w-5 text-white" />
                        ) : (
                            "Continue"
                        )}
                    </button>
                </form>

                {/* Bottom Bento Box Accent (From your reference pattern) */}
                <div className="rounded-[30px] mt-10 bg-white/40 border border-black/5 w-full h-72 flex items-center justify-center p-6 shadow-sm">
                    <div className="text-center space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">A Iluna Product</p>
                        <p className="text-[11px] text-gray-400 font-medium">made with 🖤 in India</p>
                    </div>
                </div>
            </div>
        </div>
    );
}