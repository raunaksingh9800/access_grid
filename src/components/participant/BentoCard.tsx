// src/components/participant/BentoCard.tsx

import { ReactNode } from "react";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function BentoCard({ children, className = "", onClick }: BentoCardProps) {
    return (
        <div 
            onClick={onClick}
            className={`bg-white/30 rounded-[24px] border-[1.5px] border-black overflow-hidden ${className}`}
        >
            {children}
        </div>
    );
}