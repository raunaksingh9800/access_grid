"use client";

import { useState } from "react";
import { Layers, X } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { DashboardData, QueueData } from "../../../types/participant";
// Ensure this path correctly points to wherever your React Bits Counter component lives
import Counter from "@/components/Counter";

interface QueueBentoCardProps {
    queueData?: QueueData[];
    dashboardData: DashboardData | null;
}

export function QueueBentoCard({ queueData, dashboardData }: QueueBentoCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const hasQueueData = queueData && queueData.length > 0 && dashboardData?.team;
    const currentTeam = hasQueueData ? queueData[0] : null;
    const myTeamIndex = hasQueueData ? queueData.findIndex((q: any) => q.team_id === dashboardData.team.id) : -1;

    // Metric representing teams left ahead of the user
    const teamsAhead = myTeamIndex !== -1 ? myTeamIndex : null;
    const totalWaiting = queueData?.length || 0;
    const yourPosition = myTeamIndex !== -1 ? myTeamIndex + 1 : 0;

    return (
        <>
            {/* Interactive At-a-Glance Bento Block */}
            <BentoCard
                onClick={() => setIsModalOpen(true)}
                className="p-4 flex flex-col justify-between aspect-square relative bg-white/40 border border-[#1a73e8]/20 shadow-sm hover:bg-white/60 transition-all duration-200 cursor-pointer group active:scale-[0.98]"
            >
                <div className="w-full flex justify-center items-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                        Evaluation Queue
                    </p>
                </div>

                <div className="flex flex-col justify-center items-center mb-2 mt-5">
                    {teamsAhead !== null ? (
                        <>
                            {/* Animated Counter tailored down to safely fit inside the Bento Square */}
                            <div className="flex items-center justify-center h-16">
                                <Counter
                                    value={teamsAhead}
                                    places={[10, 1]}
                                    fontSize={56}
                                    padding={2}
                                    gap={4}
                                    textColor="black"
                                    fontWeight={900}

                                />

                            </div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight mt-3">
                                {teamsAhead === 1 ? "Team Ahead" : "Teams Ahead"}
                            </p>
                        </>
                    ) : (
                        <>
                            <span className="text-2xl font-bold text-gray-400 tracking-tight">
                                {hasQueueData && myTeamIndex === -1 ? "Idle" : "Empty"}
                            </span>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight mt-1">
                                {hasQueueData && myTeamIndex === -1 ? "Not in Live Queue" : "No Teams Waiting"}
                            </p>
                        </>
                    )}
                </div>

                <div className="w-full text-right">
                    <span className="text-[9px] font-medium text-gray-400 group-hover:text-[#1a73e8] transition-colors">
                        View Details →
                    </span>
                </div>
            </BentoCard>

            {/* Detail Context Modal Overlay */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="w-full max-w-sm bg-[#f9f8f3] rounded-[2rem] border border-black/10 p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-2">
                            <div className="flex items-center gap-2">
                                <div className="px-4 py-1.5 bg-white/10 border border-black/10 rounded-full shadow-sm">
                                    <h3 className="text-xs font-bold text-gray-800 tracking-tight">Queue Management</h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-7 h-7 flex items-center justify-center rounded-full border border-black/10 text-gray-500 hover:bg-gray-100 transition-colors shadow-sm"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>

                        {/* Live Presenter Card */}
                        <div className="p-4 bg-white/10 border border-black/10 rounded-2xl shadow-sm space-y-1">
                            <span className="block text-[11px] font-semibold text-gray-400">
                                Live Presenter
                            </span>
                            <p className="text-base font-bold text-black tracking-tight leading-snug">
                                {currentTeam?.team?.name || "No active team details"}
                            </p>
                        </div>

                        {/* Stats Grid with Multi-digit Counter Adaptations */}
                        {myTeamIndex !== -1 ? (
                            <div className="grid grid-cols-2 gap-3">
                                {/* Your Position Card */}
                                <div className="p-4 bg-white/10 border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between aspect-square">
                                    <span className="block text-[11px] font-semibold text-gray-400">
                                        Your Position
                                    </span>
                                    <div className="flex items-baseline mt-auto">
                                        <span className="text-2xl font-black text-black mr-1 select-none">#</span>
                                        <Counter
                                            value={yourPosition}
                                            places={[100, 10, 1]}
                                            fontSize={36}
                                            padding={1}
                                            gap={2}
                                            textColor="black"
                                            fontWeight={900}

                                        />
                                    </div>
                                </div>

                                {/* Total Waiting Card */}
                                <div className="p-4 bg-white/10 border border-black/10 rounded-2xl shadow-sm flex flex-col justify-between aspect-square">
                                    <span className="block text-[11px] font-semibold text-gray-400">
                                        Total Waiting
                                    </span>
                                    <div className="flex items-baseline mt-auto">
                                        <Counter
                                            value={totalWaiting}
                                            places={[100, 10, 1]}
                                            fontSize={36}
                                            padding={1}
                                            gap={2}
                                            textColor="black"
                                            fontWeight={900}

                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Warning State */
                            <div className="p-5 bg-white/10 border border-black/10 rounded-2xl shadow-sm text-center space-y-2">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                                    <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                                </div>
                                <p className="text-xs font-medium text-gray-600 leading-relaxed px-2">
                                    Your team is not currently mapped into this room's active execution sequence.
                                </p>
                            </div>
                        )}

                        {/* Footer / Action */}
                        <div className="pt-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full py-3 text-xs font-bold text-gray-700 bg-white border border-black/10 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Dismiss Window
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}