// src/components/participant/Dashboard.tsx

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { QueueBentoCard } from "./QueueBentoCard";
import { Participant, DashboardData, QueueData } from "../../../types/participant";
import { initials } from "../../../utils/helper";

interface DashboardProps {
    participant: Participant;
    dashboardData: DashboardData | null;
    isAttended?: boolean;
    queueData?: QueueData[];
}

export function Dashboard({
    participant,
    dashboardData,
    isAttended = false,
    queueData
}: DashboardProps) {
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (dashboardData) {
            setFadeOut(true);
            const timer = setTimeout(() => {
                setShowSkeleton(false);
            }, 1200);

            return () => clearTimeout(timer);
        }
    }, [dashboardData]);

    if (!dashboardData && !showSkeleton) {
        return (
            <div className="min-h-screen bg-[#F4F3ED] flex justify-center py-20 font-sans">
                <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#F4F3ED] text-black font-sans pb-20 selection:bg-black selection:text-white">

            {/* --- SKELETON OVERLAY --- */}
            {showSkeleton && (
                <div className="absolute inset-x-0 top-0 z-50 pointer-events-none">
                    <header className={`px-6 pt-12 pb-6 flex items-center justify-between transition-opacity duration-500 ease-out delay-0 max-w-md mx-auto ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                        <div>
                            <div className="w-16 h-4 bg-black/10 rounded animate-pulse mb-2"></div>
                            <div className="w-32 h-11 rounded-full border border-black/10 bg-black/5 animate-pulse"></div>
                        </div>
                        <div className="flex mt-2 animate-pulse gap-1">
                            <div className="w-5 h-12 rounded-full bg-black/10"></div>
                            <div className="w-5 h-8 rounded-full bg-black/10 self-end"></div>
                        </div>
                    </header>

                    <main className="px-6 space-y-4 max-w-md mx-auto">
                        <div className={`transition-opacity duration-500 ease-out delay-75 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                            <BentoCard className="flex items-center justify-between p-6 relative">
                                <div className="z-10">
                                    <div className="w-24 h-3 bg-black/10 animate-pulse mb-2 rounded"></div>
                                    <div className="w-32 h-12 bg-black/10 animate-pulse rounded"></div>
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-32 bg-black/5 animate-pulse"></div>
                            </BentoCard>
                        </div>

                        <div className={`grid grid-cols-2 gap-4 transition-opacity duration-500 ease-out delay-150 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="flex flex-col gap-4">
                                <BentoCard className="p-6 flex flex-col items-center justify-center aspect-square relative">
                                    <div className="w-20 h-2 bg-black/10 animate-pulse absolute top-4 rounded"></div>
                                    <div className="w-12 h-12 rounded-full bg-black/10 animate-pulse mt-2"></div>
                                    <div className="w-16 h-2 bg-black/10 animate-pulse absolute bottom-4 rounded"></div>
                                </BentoCard>

                                <BentoCard className="p-4 flex flex-col items-center justify-center aspect-square relative">
                                    <div className="w-16 h-2 bg-black/10 animate-pulse absolute top-4 rounded"></div>
                                    <div className="mt-4 w-20 h-20 bg-black/10 animate-pulse rounded-lg"></div>
                                </BentoCard>
                            </div>

                            <div className="flex flex-col gap-4">
                                <BentoCard className="p-5 flex flex-col items-center justify-center">
                                    <div className="w-20 h-2 bg-black/10 animate-pulse mb-2 rounded"></div>
                                    <div className="w-24 h-6 bg-black/10 animate-pulse rounded"></div>
                                </BentoCard>

                                <BentoCard className="p-5 flex-grow flex flex-col items-center min-h-[140px]">
                                    <div className="w-16 h-2 bg-black/10 animate-pulse rounded"></div>
                                </BentoCard>
                            </div>
                        </div>

                        <div className={`transition-opacity duration-500 ease-out delay-200 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                            <BentoCard className="p-6">
                                <div className="w-20 h-3 bg-black/10 animate-pulse mb-2 rounded"></div>
                                <div className="w-40 h-6 bg-black/10 animate-pulse rounded"></div>
                            </BentoCard>
                        </div>

                        <div className={`transition-opacity duration-500 ease-out delay-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                            <BentoCard className="p-6">
                                <div className="w-24 h-3 bg-black/10 animate-pulse mb-4 rounded"></div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-full bg-black/10 animate-pulse shrink-0"></div>
                                            <div className="w-32 h-4 bg-black/10 animate-pulse rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </BentoCard>
                        </div>
                    </main>
                </div>
            )}

            {/* --- ACTUAL DASHBOARD CONTENT --- */}
            {dashboardData && (
                <>
                    {/* Header */}
                    <header className="px-6 pt-12 max-w-md pb-6 flex items-center mx-auto justify-between relative z-10">
                        <div>
                            <p className="text-[15px] font-serif italic text-[#767676] mb-1">Welcome,</p>
                            <h2 className="text-[32px] font-bold tracking-tight text-black leading-none">
                                {participant.name ? participant.name.split(" ")[0].charAt(0).toUpperCase() + participant.name.split(" ")[0].slice(1).toLowerCase() : ""}
                            </h2>
                        </div>
                        {/* Global Brand Header / Logo Mark */}
                        <div className="flex gap-1.5 items-center">
                            <div className="w-5 h-12 bg-[#FFD3A5] rounded-full border-[1.5px] border-black" />
                            <div className="w-[22px] h-[30px] bg-[#BDB2FF] rounded-full self-end border-[1.5px] border-black" />
                        </div>
                    </header>

                    <main className="px-6 space-y-4 max-w-md mx-auto relative z-10">
                        {/* Assigned Room */}
                        <BentoCard className="flex items-center justify-between p-6 relative">
                            <div className="z-10 w-2/3">
                                <p className="text-[11px] font-medium tracking-wide text-[#989893] uppercase mb-1">
                                    Assigned room
                                </p>
                                <p className="text-[40px] font-bold  leading-none text-black">
                                    {dashboardData.room ? dashboardData.room.name : "TBA"}
                                </p>
                            </div>
                            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-black/5 flex items-center justify-center border-l-[1.5px] border-black text-[10px] text-gray-500">
                                {/* Isometric illustration placeholder */}
                                <div className="w-16 h-16 bg-white border-[1.5px] border-black rounded-[12px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-12 transform hover:rotate-0 transition-transform flex items-center justify-center">
                                    <span className="font-bold text-xl">🚪</span>
                                </div>
                            </div>
                        </BentoCard>

                        {/* Middle Bento Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="flex flex-col gap-4">
                                {/* Attendance Status */}
                                <BentoCard className="p-6 flex flex-col items-center justify-center aspect-square relative">
                                    <p className="text-[11px] font-medium tracking-wide text-[#989893] uppercase absolute top-4 text-center">
                                        Attendance
                                    </p>

                                    {/* Soft blurred radial accent */}
                                    <div
                                        className={`w-16 h-16 rounded-full blur-xl absolute animate-pingg-slow ${isAttended ? "bg-green-400/80" : "bg-red-400/80"}`}
                                    ></div>

                                    <div
                                        className={`w-12 h-12 rounded-full border-[1.5px] border-black relative z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isAttended ? "bg-green-300" : "bg-[#ff7b7b]"
                                            }`}
                                    ></div>

                                    <p className="text-xs font-semibold text-neutral-800 mt-6 z-10 absolute bottom-4">
                                        {isAttended ? "Presented" : "Not presented"}
                                    </p>
                                </BentoCard>

                                <QueueBentoCard
                                    queueData={queueData}
                                    dashboardData={dashboardData}
                                />
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-4">
                                {/* Today's Event */}
                                <BentoCard className="p-5 flex flex-col items-center justify-center">
                                    <p className="text-[11px] font-medium tracking-wide text-[#989893] uppercase mb-1">
                                        Today's Event
                                    </p>
                                    <p className="text-[16px] font-bold text-center text-black">ASIP SEE</p>
                                </BentoCard>

                                {/* Tips & Tricks */}
                                <BentoCard className="p-5 flex-grow flex flex-col items-center justify-center">
                                    <p className="text-[11px] font-medium tracking-wide text-[#989893] uppercase text-center mb-3">
                                        All the best
                                    </p>
                                    <div className="w-12 h-12 bg-[#FFD3A5] border-[1.5px] border-black rounded-[12px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rotate-[-6deg] flex items-center justify-center">
                                        <span className="text-lg font-bold">💡</span>
                                    </div>
                                </BentoCard>
                            </div>
                        </div>

                        {/* Team Name */}
                        <BentoCard className="p-6">
                            <p className="text-[11px] font-medium tracking-wide text-[#989893] uppercase mb-1">
                                Team Name
                            </p>
                            <p className="text-[20px] font-bold text-black leading-tight">
                                {dashboardData.team?.name || "Pending..."}
                            </p>
                        </BentoCard>

                        {/* Team Members */}
                        <BentoCard className="p-0">
                            <div className="p-6 pb-2">
                                <p className="text-[11px] font-medium tracking-wide text-[#989893] uppercase">
                                    Team Members
                                </p>
                            </div>
                            <div className="flex flex-col px-4 pb-4">
                                {dashboardData.teammates?.map((mate, i) => (
                                    <div key={i} className="flex items-center gap-3 py-3 px-2 border-b-[1.5px] border-black/5 last:border-0 hover:bg-white/50 transition-colors rounded-[16px]">
                                        <div className="w-8 h-8 rounded-full border-[1.5px] border-black bg-[#BDB2FF] text-black flex items-center justify-center text-xs font-bold shrink-0 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                            {initials(mate.name)}
                                        </div>
                                        <p className="text-[16px] font-sans font-medium text-black">{mate.name}</p>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>

                        {/* Guide */}
                        <BentoCard className="p-6">
                            <p className="text-[11px] font-medium tracking-wide text-[#989893] uppercase mb-1">
                                Your Guide
                            </p>
                            {dashboardData.guide ? (
                                <div>
                                    <p className="text-[20px] font-bold text-black">{dashboardData.guide.name}</p>
                                    <p className="text-[15px] font-serif italic text-[#767676] mt-1">
                                        {dashboardData.guide.department}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-[15px] font-serif italic text-[#767676]">Unassigned</p>
                            )}
                        </BentoCard>
                    </main>

                    {/* System Footer */}
                    <div className="text-center py-12 space-y-1 mt-6">
                        <h3 className="text-xl font-bold text-[#A3A3A3]">A Iluna Product</h3>
                        <p className="text-xs text-[#A3A3A3] font-medium">made with ❤️ in India</p>
                    </div>
                </>
            )}
        </div>
    );
}