// src/hooks/useParticipantRealtime.ts

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function useParticipantRealtime(
    participantId: string | null,
    onAttendanceChange?: () => void
) {
    useEffect(() => {
        if (!participantId) return;

        const channelName = `attendance_${participantId}`;
        const existing = supabase
            .getChannels()
            .find((c) => c.topic === channelName);

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
        const qExisting = supabase.getChannels().find((c) => c.topic === qChannelName);

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
            supabase.removeChannel(supabase.channel(channelName));
            supabase.removeChannel(supabase.channel(qChannelName));
        };
    }, [participantId, onAttendanceChange]);
}