// src/components/participant/Dashboard.tsx

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { Avatar } from "./Avatar";
import { Participant, ParticipantDetails, DashboardData, QueueData } from "../../../types/participant";
import { initials } from "../../../utils/helper";

interface DashboardProps {
    participant: Participant;
    details: ParticipantDetails;
    dashboardData: DashboardData | null;
    isAttended?: boolean;
    queueData?: QueueData[];
}

export function Dashboard({
    participant,
    details,
    dashboardData,
    isAttended = false,
    queueData
}: DashboardProps) {
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (dashboardData) {
            // Trigger the staggered top-to-bottom fade out
            setFadeOut(true);

            // Remove skeleton from DOM entirely after the longest transition finishes 
            // (700ms delay + 500ms duration = 1200ms)
            const timer = setTimeout(() => {
                setShowSkeleton(false);
            }, 1200);

            return () => clearTimeout(timer);
        }
    }, [dashboardData]);

    // Fallback in case both conditions are unmet (edge case)
    if (!dashboardData && !showSkeleton) {
        return (
            <div className="min-h-screen bg-[#F5F3EA] flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#F5F3EA] text-[#1c1c1c] font-sans pb-20 selection:bg-black selection:text-white">

            {/* --- SKELETON OVERLAY --- */}
            {showSkeleton && (
                <div className="absolute inset-x-0 top-0 z-50 pointer-events-none">
                    {/* Header Skeleton */}
                    <header className={`px-6 pt-12 pb-6 flex items-start justify-between transition-opacity duration-500 ease-out delay-0 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                        <div>
                            <div className="w-16 h-4 bg-[#e8e4d8] rounded animate-pulse mb-2 ml-2"></div>
                            <div className="w-32 h-11 rounded-full border border-[#dcd8c8] bg-[#e8e4d8] animate-pulse"></div>
                        </div>
                        <div className="flex mt-2 animate-pulse">
                            <div className="w-6 h-6 rounded-full bg-[#e8e4d8] z-10"></div>
                            <div className="w-6 h-6 rounded-full bg-[#dcd8c8] -ml-2"></div>
                        </div>
                    </header>

                    <main className="px-6 space-y-4 max-w-md mx-auto">
                        {/* Assigned Room Skeleton */}
                        <div className={`transition-opacity duration-500 ease-out delay-75 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                            <BentoCard className="flex items-center justify-between p-6 relative bg-white/50 border-[#dcd8c8]">
                                <div className="z-10">
                                    <div className="w-24 h-3 bg-[#e8e4d8] animate-pulse mb-2 rounded"></div>
                                    <div className="w-32 h-12 bg-[#e8e4d8] animate-pulse rounded"></div>
                                </div>
                                <div className="absolute right-0 top-0 bottom-0 w-32 bg-[#e8e4d8] animate-pulse rounded-r-2xl"></div>
                            </BentoCard>
                        </div>

                        {/* Middle Bento Grid Skeleton */}
                        <div className={`grid grid-cols-2 gap-4 transition-opacity duration-500 ease-out delay-150 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="flex flex-col gap-4">
                                <BentoCard className="p-6 flex flex-col items-center justify-center aspect-square relative bg-white/50 border-[#dcd8c8]">
                                    <div className="w-20 h-2 bg-[#e8e4d8] animate-pulse absolute top-4 rounded"></div>
                                    <div className="w-12 h-12 rounded-full bg-[#e8e4d8] animate-pulse mt-2"></div>
                                    <div className="w-16 h-2 bg-[#e8e4d8] animate-pulse absolute bottom-4 rounded"></div>
                                </BentoCard>

                                <BentoCard className="p-4 flex flex-col items-center justify-center aspect-square relative bg-white/50 border-[#dcd8c8]">
                                    <div className="w-16 h-2 bg-[#e8e4d8] animate-pulse absolute top-4 rounded"></div>
                                    <div className="mt-4 w-20 h-20 bg-[#e8e4d8] animate-pulse rounded-lg"></div>
                                </BentoCard>
                            </div>

                            <div className="flex flex-col gap-4">
                                <BentoCard className="p-5 flex flex-col items-center justify-center bg-white/50 border-[#dcd8c8]">
                                    <div className="w-20 h-2 bg-[#e8e4d8] animate-pulse mb-2 rounded"></div>
                                    <div className="w-24 h-6 bg-[#e8e4d8] animate-pulse rounded"></div>
                                </BentoCard>

                                <BentoCard className="p-5 flex-grow flex flex-col items-center min-h-[140px] bg-white/50 border-[#dcd8c8]">
                                    <div className="w-16 h-2 bg-[#e8e4d8] animate-pulse rounded"></div>
                                </BentoCard>
                            </div>
                        </div>

                        {/* Team Name Skeleton */}
                        <div className={`transition-opacity duration-500 ease-out delay-200 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                            <BentoCard className="p-6 bg-white/50 border-[#dcd8c8]">
                                <div className="w-20 h-3 bg-[#e8e4d8] animate-pulse mb-2 rounded"></div>
                                <div className="w-40 h-6 bg-[#e8e4d8] animate-pulse rounded"></div>
                            </BentoCard>
                        </div>

                        {/* Team Members Skeleton */}
                        <div className={`transition-opacity duration-500 ease-out delay-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                            <BentoCard className="p-6 bg-white/50 border-[#dcd8c8]">
                                <div className="w-24 h-3 bg-[#e8e4d8] animate-pulse mb-4 rounded"></div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#e8e4d8] animate-pulse shrink-0"></div>
                                            <div className="w-32 h-4 bg-[#e8e4d8] animate-pulse rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </BentoCard>
                        </div>

                        {/* Guide Skeleton */}
                        <div className={`transition-opacity duration-500 ease-out delay-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                            <BentoCard className="p-6 bg-white/50 border-[#dcd8c8]">
                                <div className="w-20 h-3 bg-[#e8e4d8] animate-pulse mb-2 rounded"></div>
                                <div className="w-32 h-6 bg-[#e8e4d8] animate-pulse mb-1 rounded"></div>
                                <div className="w-24 h-3 bg-[#e8e4d8] animate-pulse rounded"></div>
                            </BentoCard>
                        </div>
                    </main>

                    {/* Footer Skeleton */}
                    <footer className={`py-12 text-center transition-opacity duration-500 ease-out delay-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="w-32 h-6 bg-[#e8e4d8] animate-pulse mx-auto mb-2 rounded"></div>
                        <div className="w-24 h-4 bg-[#e8e4d8] animate-pulse mx-auto rounded"></div>
                    </footer>
                </div>
            )}

            {/* --- ACTUAL DASHBOARD CONTENT --- */}
            {dashboardData && (
                <>
                    {/* Header */}
                    <header className="px-6 pt-12 pb-6 flex items-start justify-between relative z-10">
                        <div>
                            <p className="text-sm font-medium mb-2 ml-2">Welcome,</p>
                            <div className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-[#dcd8c8] bg-transparent">
                                <span className="text-lg font-medium">{participant.name}</span>
                            </div>
                        </div>
                        <div className="flex mt-2">
                            <div className="w-6 h-6 rounded-full bg-[#fcd4a6] mix-blend-multiply z-10"></div>
                            <div className="w-6 h-6 rounded-full bg-[#b4a6d4] mix-blend-multiply -ml-2"></div>
                        </div>
                    </header>

                    <main className="px-6 space-y-4 max-w-md mx-auto relative z-10">
                        {/* Assigned Room */}
                        <BentoCard className="flex items-center justify-between p-6 relative bg-gradient-to-r from-transparent to-[#e8e4d8]">
                            <div className="z-10">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Assigned room
                                </p>
                                <p className="text-5xl font-black tracking-widest">
                                    {dashboardData.room ? dashboardData.room.name : "TBA"}
                                </p>
                            </div>
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gray-200 flex items-center justify-center text-[10px] text-gray-400 rounded-r-2xl">
                                [3D Room Img]
                            </div>
                        </BentoCard>

                        {/* Middle Bento Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="flex flex-col gap-4">
                                {/* Attendance Status */}
                                <BentoCard className="p-6 flex flex-col items-center justify-center aspect-square relative">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase absolute top-4">
                                        Attendance Status
                                    </p>
                                    <div
                                        className={`w-16 h-16 rounded-full blur-xl absolute opacity-50 ${isAttended ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    ></div>
                                    <div
                                        className={`w-12 h-12 rounded-full relative z-10 ${isAttended ? "bg-green-400" : "bg-[#ff7b7b]"
                                            }`}
                                    ></div>
                                    <p className="text-[11px] font-semibold mt-6 z-10 absolute bottom-4">
                                        {isAttended ? "Presented" : "Not presented"}
                                    </p>
                                </BentoCard>

                                {/* Avatar Card */}
                                <BentoCard className="p-4 flex flex-col justify-between aspect-square relative bg-white/40 border border-[#1a73e8]/20 shadow-sm">
                                    <p className="text-[10px] font-bold text-[#1a73e8] uppercase absolute top-4 left-4 tracking-wider">
                                        Presentation Queue
                                    </p>

                                    <div className="mt-8 flex-1 flex flex-col justify-center w-full">
                                        {queueData && queueData.length > 0 && dashboardData?.team ? (
                                            (() => {
                                                const currentTeam = queueData[0];
                                                const myTeamIndex = queueData.findIndex((q: any) => q.team_id === dashboardData.team.id);

                                                return (
                                                    <div className="space-y-3 w-full">
                                                        <div>
                                                            <span className="block text-[9px] font-medium text-gray-400 uppercase tracking-tight">Now Presenting</span>
                                                            <p className="text-sm font-bold text-gray-800 truncate">
                                                                {currentTeam.team?.name || "Unknown"}
                                                            </p>
                                                        </div>

                                                        {myTeamIndex !== -1 ? (
                                                            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200/60">
                                                                <div>
                                                                    <span className="block text-[9px] text-gray-400">Your Position</span>
                                                                    <p className="text-base font-extrabold text-gray-800">#{myTeamIndex + 1}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="block text-[9px] text-gray-400">Teams Ahead</span>
                                                                    <p className="text-base font-extrabold text-gray-800">{myTeamIndex}</p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className="text-[11px] font-medium text-gray-500 pt-2 border-t border-gray-200/60 leading-tight">
                                                                Not in waiting queue.
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            })()
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-1">
                                                <p className="text-xs font-medium">Queue Empty</p>
                                            </div>
                                        )}
                                    </div>
                                </BentoCard>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-4">
                                {/* Today's Event */}
                                <BentoCard className="p-5 flex flex-col items-center justify-center bg-white/40">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">
                                        Today's Event
                                    </p>
                                    <p className="text-lg font-bold text-center">ASIP SEE</p>
                                </BentoCard>

                                {/* Tips & Tricks */}
                                <BentoCard className="p-5 flex-grow flex flex-col items-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                                        Tips & Tricks
                                    </p>
                                </BentoCard>
                            </div>
                        </div>

                        {/* Team Name */}
                        <BentoCard className="p-6">
                            <p className="text-[11px] font-bold text-gray-500 uppercase mb-2">
                                Team Name
                            </p>
                            <p className="text-lg font-bold leading-tight">
                                {details?.input_1 || dashboardData.team?.name || "Pending..."}
                            </p>
                        </BentoCard>

                        {/* Team Members */}
                        <BentoCard className="p-6">
                            <p className="text-[11px] font-bold text-gray-500 uppercase mb-4">
                                Team Members
                            </p>
                            <div className="space-y-4">
                                {dashboardData.teammates?.map((mate, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold shrink-0">
                                            {initials(mate.name)}
                                        </div>
                                        <p className="text-base font-bold">{mate.name}</p>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>

                        {/* Guide */}
                        <BentoCard className="p-6">
                            <p className="text-[11px] font-bold text-gray-500 uppercase mb-2">
                                Your Guide
                            </p>
                            {dashboardData.guide ? (
                                <div>
                                    <p className="text-lg font-bold">{dashboardData.guide.name}</p>
                                    <p className="text-xs font-bold text-black mt-1">
                                        {dashboardData.guide.department}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-sm font-medium text-gray-500">Unassigned</p>
                            )}
                        </BentoCard>
                    </main>

                    {/* Footer */}
                    <footer className="py-12 text-center text-gray-400 relative z-10">
                        <h3 className="text-2xl font-bold mb-1 opacity-50">A Iluna Product</h3>
                        <p className="text-sm font-medium">made with ♥ in India</p>
                    </footer>
                </>
            )}
        </div>
    );
}