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
            className={`bg-transparent rounded-3xl border border-[#dcd8c8] overflow-hidden ${className}`}
        >
            {children}
        </div>
    );
}