// src/app/participant/page.tsx

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { LoginScreen } from "@/components/participant/LoginScreen";
import { Dashboard } from "@/components/participant/Dashboard";
import { useParticipantRealtime } from "@/root/hooks/useParticipantRealtime";
import { Participant, DashboardData } from "@/root/types/participant";

export default function ParticipantPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [queueData, setQueueData] = useState<any[]>([]);
  const [isAttended, setIsAttended] = useState<boolean>(false);

  const fetchDashboardData = async (participantId: string) => {
    const { data: pData } = await supabase
      .from("participant")
      .select("sip_id")
      .eq("id", participantId)
      .single();

    if (!pData?.sip_id) return;
    const teamId = pData.sip_id;

    const { data: teammates } = await supabase
      .from("participant")
      .select("name, email")
      .eq("sip_id", teamId);

    const { data: teamData } = await supabase
      .from("team")
      .select(`id, name, "SDG", guide_id, allocated_room`)
      .eq("id", teamId)
      .single();

    if (!teamData) return;

    let guide = null;
    if (teamData.guide_id) {
      const { data } = await supabase
        .from("guide")
        .select("*")
        .eq("id", teamData.guide_id)
        .single();
      guide = data;
    }

    let room = null;
    let evaluators: any[] = [];
    if (teamData.allocated_room) {
      const { data: rData } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", teamData.allocated_room)
        .single();
      room = rData;

      if (rData?.panel_id) {
        const { data: pnlData } = await supabase
          .from("panel")
          .select("*")
          .eq("id", rData.panel_id)
          .single();

        if (pnlData) {
          const { data: ev1 } = await supabase
            .from("evaluator")
            .select("*")
            .eq("id", pnlData.evaluator_1)
            .single();
          const { data: ev2 } = await supabase
            .from("evaluator")
            .select("*")
            .eq("id", pnlData.evaluator_2)
            .single();
          if (ev1) evaluators.push(ev1);
          if (ev2) evaluators.push(ev2);
        }
      }

      // Fetch presentation queue data for the allocated room
      const { data: qData } = await supabase
        .from("presentation_queue")
        .select(`*, team:team_id(name)`)
        .eq("room_id", teamData.allocated_room)
        .eq("status", "waiting")
        .order("position", { ascending: true });

      if (qData) {
        setQueueData(qData);
      }
    }

    setDashboardData({ team: teamData, teammates: teammates || [], guide, room, evaluators });

    // Check attendance status
    const { data: attendanceData } = await supabase
      .from("attendance")
      .select("*")
      .eq("student_id", participantId)
      .single();

    setIsAttended(!!attendanceData);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("participant")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) {
        toast.error("Participant not found");
        return;
      }
      setParticipant(data);
      toast.success("Signed in");

      // Instantly hit the dashboard data fetcher without validating table completion
      await fetchDashboardData(data.id);
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Set up generic hooks-based realtime subscriptions
  useParticipantRealtime(
    participant?.id || null,
    setIsAttended,
    () => {
      if (participant?.id) {
        fetchDashboardData(participant.id);
      }
    }
  );

  if (!participant) {
    return (
      <LoginScreen
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <Dashboard
      participant={participant}
      dashboardData={dashboardData}
      isAttended={isAttended}
      queueData={queueData}
    />
  );
}