// src/components/participant/Chip.tsx

interface ChipProps {
    label: string;
}

export function Chip({ label }: ChipProps) {
    return (
        <span className="inline-block text-xs font-medium text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
            {label}
        </span>
    );
}