// src/components/participant/Card.tsx

import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`bg-white rounded-2xl border border-[#e0e0e0] ${className}`}>
            {children}
        </div>
    );
}