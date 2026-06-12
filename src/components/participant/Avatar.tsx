// src/components/participant/Avatar.tsx

import { initials } from "../../../utils/helper";

interface AvatarProps {
    name: string;
    size?: "sm" | "md";
}

export function Avatar({ name, size = "md" }: AvatarProps) {
    const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
    return (
        <div
            className={`${sz} rounded-full bg-[#e8f0fe] text-[#1a73e8] font-semibold flex items-center justify-center shrink-0 select-none`}
        >
            {initials(name)}
        </div>
    );
}