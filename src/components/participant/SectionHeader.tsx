// src/components/participant/SectionHeader.tsx

import { ReactNode } from "react";

interface SectionHeaderProps {
    icon: ReactNode;
    title: string;
}

export function SectionHeader({ icon, title }: SectionHeaderProps) {
    return (
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f0f0f0]">
            <span className="text-[#5f6368]">{icon}</span>
            <span className="text-sm font-semibold text-[#202124]">{title}</span>
        </div>
    );
}