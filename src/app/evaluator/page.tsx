"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Calendar, ChevronRight, BookOpen, ArrowLeft, Play, XCircle } from "lucide-react";

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#e0e0e0] ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 px-5 py-4 border-b border-[#f0f0f0]">
      <span className="text-[#5f6368]">{icon}</span>
      <span className="text-sm font-semibold text-[#202124]">{title}</span>
    </div>
  );
}

/* ─── LOGIN ─── */
function LoginScreen({ email, setEmail, loading, handleLogin }: any) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl  mb-5">
            <img src="./logo_acc.png" alt="" />
          </div>
          <h1 className="text-2xl font-semibold text-[#202124] tracking-tight">Evaluator Portal</h1>
          <p className="mt-1.5 text-sm text-[#5f6368]">Sign in with your official email</p>
        </div>
        <Card className="p-6 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-[#3c4043]">Email address</Label>
              <Input
                type="email"
                placeholder="name@atria.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-[#dadce0] rounded-lg text-sm focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] placeholder:text-[#bdc1c6]"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium rounded-lg shadow-none transition-colors"
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Continue"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

/* ─── EVENT PICKER ─── */
function EventPicker({ evaluator, events, onSelect }: any) {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-white border-b border-[#e0e0e0] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#1a73e8] flex items-center justify-center text-xs font-bold text-white shrink-0">
            {initials(evaluator.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#202124] leading-tight truncate">{evaluator.name}</p>
            <p className="text-xs text-[#5f6368] truncate">{evaluator.department}</p>
          </div>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-[#202124]">Select an event</h2>
          <p className="text-sm text-[#5f6368] mt-0.5">Choose the session you are currently evaluating</p>
        </div>
        <Card className="shadow-sm overflow-hidden">
          <SectionHeader icon={<Calendar className="h-4 w-4" />} title="Scheduled events" />
          {events.length === 0 ? (
            <p className="px-5 py-6 text-sm text-[#5f6368]">No events scheduled.</p>
          ) : (
            <div className="divide-y divide-[#f0f0f0]">
              {events.map((ev: any) => (
                <button
                  key={ev.id}
                  onClick={() => onSelect(ev.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f8f9fa] transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors">{ev.name}</p>
                    <p className="text-xs text-[#5f6368] mt-0.5">
                      {new Date(ev.start_time).toLocaleString()} – {new Date(ev.end_time).toLocaleTimeString()}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#bdc1c6] group-hover:text-[#1a73e8] shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}


function OfflineWarning() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    setIsOffline(!navigator.onLine);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#202124]/60 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full mx-4 text-center border border-[#e0e0e0]">
        <div className="w-14 h-14 mx-auto bg-[#fce8e6] rounded-full flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-[#d93025]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#202124] tracking-tight mb-2">Internet Disconnected</h2>
        <p className="text-[#5f6368] mb-6 text-sm leading-relaxed">Evaluation is paused. Real-time updates and attendance tracking require an active internet connection.</p>
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-[#d93025] bg-[#fce8e6] py-2 px-4 rounded-full mx-auto w-fit">
          <span className="w-2 h-2 rounded-full bg-[#d93025] animate-pulse"></span>
          Waiting for connection...
        </div>
      </div>
    </div>
  );
}

/* ─── ATTENDANCE DASHBOARD ─── */

function AttendanceDashboard({ evaluator, events, selectedEventId, teams, students, attendanceRecords, loading, onBack, onToggle, rooms, queueData, handleNextTeam, handleTeamNotPresent }: any) {
  const eventName = events.find((e: any) => e.id === selectedEventId)?.name ?? "";
  const presentCount = Object.values(attendanceRecords).filter(Boolean).length;

  return (
    <>
      <OfflineWarning />
      <div className="min-h-screen bg-[#f8f9fa]">
        <header className="bg-white border-b border-[#e0e0e0] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f1f3f4] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#5f6368]" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-[#202124] truncate">{eventName}</p>
            <p className="text-xs text-[#5f6368]">{evaluator.name}</p>
          </div>
          <span className="text-xs font-medium text-[#188038] bg-[#e6f4ea] px-2.5 py-1 rounded-full shrink-0">
            {presentCount} present
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#1a73e8]" />
          </div>
        ) : rooms && queueData && rooms.length > 0 ? (
          rooms.map((room: any) => {
            const roomQueue = queueData.filter((q: any) => q.room_id === room.id);
            if (roomQueue.length === 0) {
              return (
                <Card key={"queue-empty-" + room.id} className="shadow-sm overflow-hidden mb-6">
                  <SectionHeader icon={<Play className="h-4 w-4 text-[#5f6368]" />} title={"Presentation Queue - " + room.name} />
                  <div className="p-10 text-center">
                    <p className="text-sm font-medium text-[#202124]">Queue Completed</p>
                    <p className="text-xs text-[#5f6368] mt-1">All teams for this room have been evaluated.</p>
                  </div>
                </Card>
              );
            }

            const currentTeamQueueItem = roomQueue[0];
            const activeTeamId = currentTeamQueueItem.team_id;
            const activeTeamData = teams.find((t: any) => t.id === activeTeamId) || currentTeamQueueItem.team;

            const teamStudents = students.filter((s: any) => s.sip_id === activeTeamId);
            const teamPresent = teamStudents.filter((s: any) => attendanceRecords[s.id]).length;

            return (
              <Card key={"queue-" + room.id} className="shadow-sm overflow-hidden mb-6 border-[#1a73e8] border-opacity-30">
                <SectionHeader icon={<Play className="h-4 w-4 text-[#1a73e8]" />} title={"Evaluating Now - " + room.name} />

                {/* Team Info Header */}
                <div className="p-5 bg-gradient-to-r from-[#f8fbff] to-white border-b border-[#f0f0f0]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-[#202124]">{activeTeamData?.name || "Unknown Team"}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {activeTeamData?.SDG && (
                          <span className="text-xs text-[#1a73e8] bg-[#e8f0fe] px-2 py-0.5 rounded-full font-medium">
                            SDG {activeTeamData.SDG}
                          </span>
                        )}
                        {currentTeamQueueItem.absent_count > 0 && (
                          <span className="text-xs text-[#d93025] bg-[#fce8e6] px-2 py-0.5 rounded-full font-medium">
                            Absent {currentTeamQueueItem.absent_count} time(s)
                          </span>
                        )}
                        <span className="text-xs text-[#5f6368] bg-[#f1f3f4] px-2.5 py-0.5 rounded-full font-medium">
                          {teamPresent}/{teamStudents.length} Present
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        onClick={() => handleTeamNotPresent(currentTeamQueueItem)}
                        variant="outline"
                        className="h-9 text-xs border-[#d2d6dc] text-[#5f6368] hover:bg-[#f1f3f4]"
                      >
                        Not Present
                      </Button>
                      <Button
                        onClick={() => handleNextTeam(currentTeamQueueItem.id)}
                        className="h-9 text-xs bg-[#1a73e8] hover:bg-[#1557b0] text-white shadow-none"
                      >
                        Complete & Next
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Students List */}
                {teamStudents.length === 0 ? (
                  <p className="px-5 py-4 text-sm text-[#5f6368]">No students found.</p>
                ) : (
                  <div className="divide-y divide-[#f0f0f0]">
                    {teamStudents.map((student: any) => {
                      const isPresent = !!attendanceRecords[student.id];
                      return (
                        <div
                          key={student.id}
                          className={`flex items-center justify-between px-5 py-3.5 transition-colors ${isPresent ? "bg-[#f6fef9]" : ""}`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${isPresent ? "bg-[#e6f4ea] text-[#188038]" : "bg-[#f1f3f4] text-[#5f6368]"}`}>
                              {initials(student.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-[#202124] truncate">{student.name}</p>
                              <p className="text-xs text-[#5f6368] truncate">{student.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0 ml-2">
                            <span className={`text-xs font-medium ${isPresent ? "text-[#188038]" : "text-[#5f6368]"}`}>
                              {isPresent ? "Present" : "Absent"}
                            </span>
                            <Switch
                              checked={isPresent}
                              onCheckedChange={() => onToggle(student.id, isPresent)}
                              className="data-[state=checked]:bg-[#1a73e8]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            );
          })
        ) : (
          <Card className="shadow-sm">
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-[#202124]">No rooms assigned</p>
              <p className="text-xs text-[#5f6368] mt-1">You don't have any rooms for this event.</p>
            </div>
          </Card>
        )}
      </main>
    </div>
    </>
  );
}

/* ─── ROOT ─── */
export default function EvaluatorPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluator, setEvaluator] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [teams, setTeams] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, boolean>>({});
  const [rooms, setRooms] = useState<any[]>([]);
  const [queueData, setQueueData] = useState<any[]>([]);

  const fetchQueueData = async (evtId: string, currentRooms: any[]) => {
    const { data: qData } = await supabase
      .from("presentation_queue")
      .select(`*, team:team_id(id, name, "SDG", is_star)`)
      .in("room_id", currentRooms.map((r: any) => r.id))
      .eq("event_id", evtId)
      .eq("status", "waiting")
      .order("position", { ascending: true });
    if (qData) setQueueData(qData);
  };

  const handleNextTeam = async (queueId: string) => {
    const { error } = await supabase
      .from("presentation_queue")
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq("id", queueId);
    if (error) toast.error("Failed to update queue");
  };

  const handleTeamNotPresent = async (queueItem: any) => {
    const roomQueue = queueData.filter(q => q.room_id === queueItem.room_id);
    const maxPosition = Math.max(...roomQueue.map(q => q.position), queueItem.position);

    const { error } = await supabase
      .from("presentation_queue")
      .update({
        position: maxPosition + 1,
        absent_count: queueItem.absent_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq("id", queueItem.id);

    if (error) toast.error("Failed to update queue");
  };

  const setupRealtime = (eventId: string, currentRooms: any[]) => {
    const channelName = `eval_att_${eventId}`;
    const existing = supabase.getChannels().find(c => c.topic === channelName);
    
    if (!existing) {
      supabase
        .channel(channelName)
        .on("postgres_changes",
          { event: "INSERT", schema: "public", table: "attendance", filter: `event_id=eq.${eventId}` },
          (payload) => setAttendanceRecords((prev) => ({ ...prev, [payload.new.student_id]: true }))
        )
        .on("postgres_changes",
          { event: "DELETE", schema: "public", table: "attendance", filter: `event_id=eq.${eventId}` },
          (payload) => setAttendanceRecords((prev) => {
            const next = { ...prev };
            delete next[payload.old.student_id];
            return next;
          })
        )
        .subscribe();
    }

    const qChannelName = `eval_queue_${eventId}`;
    const qExisting = supabase.getChannels().find(c => c.topic === qChannelName);
    
    if (!qExisting) {
      supabase
        .channel(qChannelName)
        .on("postgres_changes",
          { event: "*", schema: "public", table: "presentation_queue", filter: `event_id=eq.${eventId}` },
          () => {
            fetchQueueData(eventId, currentRooms);
          }
        )
        .subscribe();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      const { data, error } = await supabase.from("evaluator").select("*").eq("email", email).single();
      if (error || !data) return toast.error("Evaluator not found");
      setEvaluator(data);
      toast.success("Signed in");
      const { data: evData } = await supabase.from("events").select("*").order("start_time", { ascending: true });
      if (evData) setEvents(evData);
    } catch { toast.error("An error occurred"); }
    finally { setLoading(false); }
  };

  const handleEventSelect = async (eventId: string) => {
    setSelectedEventId(eventId);
    setLoading(true);
    try {
      const { data: panels } = await supabase
        .from("panel").select("id")
        .or(`evaluator_1.eq.${evaluator.id},evaluator_2.eq.${evaluator.id}`);
      if (!panels?.length) { toast.info("No panels assigned."); setLoading(false); return; }

      const { data: rooms } = await supabase
        .from("rooms").select("id, name").in("panel_id", panels.map((p: any) => p.id));
      if (!rooms?.length) { setLoading(false); return; }
      setRooms(rooms);

      const { data: assignedTeams } = await supabase
        .from("team").select("*").in("allocated_room", rooms.map((r: any) => r.id));
      if (!assignedTeams) { setLoading(false); return; }
      setTeams(assignedTeams);

      for (const room of rooms) {
        const { data: existingQ } = await supabase
          .from("presentation_queue")
          .select("id")
          .eq("room_id", room.id)
          .eq("event_id", eventId);
        
        if (!existingQ || existingQ.length === 0) {
          const roomTeams = assignedTeams.filter((t: any) => t.allocated_room === room.id);
          if (roomTeams.length > 0) {
            const { data: maxQ } = await supabase
              .from("presentation_queue")
              .select("position")
              .eq("room_id", room.id)
              .order("position", { ascending: false })
              .limit(1);
            
            let startPos = 1;
            if (maxQ && maxQ.length > 0) {
              startPos = maxQ[0].position + 1;
            }

            const inserts = roomTeams.map((t: any, idx: number) => ({
              event_id: eventId,
              room_id: room.id,
              team_id: t.id,
              position: startPos + idx,
              status: 'waiting'
            }));
            await supabase.from("presentation_queue").insert(inserts);
          }
        }
      }

      await fetchQueueData(eventId, rooms);

      const { data: assignedStudents } = await supabase
        .from("participant").select("id, name, email, sip_id")
        .in("sip_id", assignedTeams.map((t: any) => t.id));
      if (assignedStudents) setStudents(assignedStudents);

      const { data: attData } = await supabase
        .from("attendance").select("student_id").eq("event_id", eventId);
      const attMap: Record<string, boolean> = {};
      attData?.forEach((r: any) => { attMap[r.student_id] = true; });
      setAttendanceRecords(attMap);

      setupRealtime(eventId, rooms);
    } catch { toast.error("Failed to load data"); }
    finally { setLoading(false); }
  };

  const toggleAttendance = async (studentId: string, currentStatus: boolean) => {
    setAttendanceRecords((prev) => ({ ...prev, [studentId]: !currentStatus }));
    if (!currentStatus) {
      const { error } = await supabase.from("attendance").insert({ student_id: studentId, event_id: selectedEventId });
      if (error && error.code !== "23505") {
        toast.error("Failed to mark present");
        setAttendanceRecords((prev) => ({ ...prev, [studentId]: false }));
      }
    } else {
      const { error } = await supabase.from("attendance").delete()
        .match({ student_id: studentId, event_id: selectedEventId });
      if (error) {
        toast.error("Failed to mark absent");
        setAttendanceRecords((prev) => ({ ...prev, [studentId]: true }));
      }
    }
  };

  if (!evaluator)
    return <LoginScreen email={email} setEmail={setEmail} loading={loading} handleLogin={handleLogin} />;
  if (!selectedEventId)
    return <EventPicker evaluator={evaluator} events={events} onSelect={handleEventSelect} />;
  return (
    <AttendanceDashboard
      evaluator={evaluator}
      events={events}
      selectedEventId={selectedEventId}
      teams={teams}
      students={students}
      attendanceRecords={attendanceRecords}
      loading={loading}
      onBack={() => setSelectedEventId("")}
      onToggle={toggleAttendance}
      rooms={rooms}
      queueData={queueData}
      handleNextTeam={handleNextTeam}
      handleTeamNotPresent={handleTeamNotPresent}
    />
  );
}