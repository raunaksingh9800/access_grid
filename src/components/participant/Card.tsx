// src/components/participant/Card.tsx

import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`bg-white rounded-[24px] border-[1.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
            {children}
        </div>
    );
}