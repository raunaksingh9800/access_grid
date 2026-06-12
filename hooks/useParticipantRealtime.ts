// src/hooks/useParticipantRealtime.ts

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function useParticipantRealtime(
    participantId: string | null,
    setIsAttended: (attended: boolean) => void,
    onAttendanceChange?: () => void
) {
    useEffect(() => {
        if (!participantId) return;

        const channelName = `attendance_${participantId}`;
        const existing = supabase
            .getChannels()
            .find((c) => c.topic === channelName || c.topic === `realtime:${channelName}`);

        if (!existing) {
            supabase
                .channel(channelName)
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "attendance",
                        filter: `student_id=eq.${participantId}`,
                    },
                    () => {
                        toast.success("✅ Attendance marked!", { duration: 10000 });
                        onAttendanceChange?.();
                    }
                )
                .on(
                    "postgres_changes",
                    {
                        event: "DELETE",
                        schema: "public",
                        table: "attendance",
                        filter: `student_id=eq.${participantId}`,
                    },
                    () => {
                        toast.error("❌ Attendance revoked.", { duration: 8000 });
                        onAttendanceChange?.();
                    }
                )
                .subscribe();
        }

        const qChannelName = `queue_part_${participantId}`;
        const qExisting = supabase.getChannels().find((c) => c.topic === qChannelName || c.topic === `realtime:${qChannelName}`);

        if (!qExisting) {
            supabase
                .channel(qChannelName)
                .on(
                    "postgres_changes",
                    { event: "*", schema: "public", table: "presentation_queue" },
                    () => {
                        onAttendanceChange?.();
                    }
                )
                .subscribe();
        }

        return () => {
            const attChan = supabase.getChannels().find((c) => c.topic === channelName || c.topic === `realtime:${channelName}`);
            if (attChan) {
                supabase.removeChannel(attChan);
            }
            const qChan = supabase.getChannels().find((c) => c.topic === qChannelName || c.topic === `realtime:${qChannelName}`);
            if (qChan) {
                supabase.removeChannel(qChan);
            }
        };
    }, [participantId, onAttendanceChange, setIsAttended]);
}