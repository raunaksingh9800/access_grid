// src/components/participant/BentoCard.tsx

import { ReactNode } from "react";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
}

export function BentoCard({ children, className = "" }: BentoCardProps) {
    return (
        <div className={`bg-transparent rounded-3xl border border-[#dcd8c8] overflow-hidden ${className}`}>
            {children}
        </div>
    );
}