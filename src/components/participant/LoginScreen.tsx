// src/components/participant/LoginScreen.tsx

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "./Card";

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
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5">
                        <img src="./logo_acc.png" alt="Logo" />
                    </div>
                    <h1 className="text-2xl font-semibold text-[#202124] tracking-tight">
                        SIP Participant Portal
                    </h1>
                    <p className="mt-1.5 text-sm text-[#5f6368]">
                        Sign in with your registered email
                    </p>
                </div>
                <Card className="p-6 shadow-sm">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-[#3c4043]">
                                Email address
                            </Label>
                            <Input
                                type="email"
                                placeholder="1at24bbnnn@atria.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11 border-[#dadce0] rounded-lg text-sm focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] placeholder:text-[#bdc1c6]"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium rounded-lg shadow-none transition-colors"
                        >
                            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Continue"}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}