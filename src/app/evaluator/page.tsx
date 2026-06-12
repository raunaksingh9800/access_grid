"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Calendar, ChevronRight, ArrowLeft, Play, Download, Menu, X } from "lucide-react";

const initials = (name: string) =>
  name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "NA";

// --- Design System Components ---

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-[24px] md:rounded-[40px] border-[1.5px] border-black ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 px-6 py-5 border-b border-[#f0f0f0]">
      <span className="text-black">{icon}</span>
      <span className="text-base font-semibold text-black">{title}</span>
    </div>
  );
}

/* ─── LOGIN ─── */
function LoginScreen({ email, setEmail, loading, handleLogin }: any) {
  return (
    <div className="min-h-screen bg-[#F4F3ED] flex flex-col items-center justify-center px-4 font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white border-[1.5px] border-black rounded-[24px] mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

            <div className="flex gap-1.5 items-center">
              <div className="w-5 h-12 bg-[#FFD3A5] rounded-full border-[1.5px] border-black" />
              <div className="w-[22px] h-[30px] bg-[#BDB2FF] rounded-full self-end border-[1.5px] border-black" />
            </div>


          </div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Evaluator Portal</h1>
          <p className="mt-2 text-sm text-[#767676] font-serif">Sign in with your official email</p>
        </div>
        <Card className="p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-black font-serif">Email address</Label>
              <Input
                type="email"
                placeholder="name@atria.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-black rounded-xl text-base focus-visible:ring-1 focus-visible:ring-black placeholder:text-[#767676]"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-black hover:bg-black/90 text-white text-base font-semibold rounded-full shadow-none transition-all hover:-translate-y-0.5"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Continue"}
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
    <div className="min-h-screen bg-[#F4F3ED] font-sans pb-10">
      <header className="bg-[#F4F3ED] border-b-[1.5px] border-black sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-black bg-white flex items-center justify-center text-sm font-bold text-black shrink-0">
            {initials(evaluator.name)}
          </div>
          <div className="min-w-0">
            <p className="text-base font-bold text-black leading-tight truncate">{evaluator.name}</p>
          </div>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-black">Select an event</h2>
          <p className="text-base text-[#767676] font-serif mt-1">Choose the session you are currently evaluating</p>
        </div>
        <Card className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <SectionHeader icon={<Calendar className="h-5 w-5" />} title="Scheduled events" />
          {events.length === 0 ? (
            <p className="px-6 py-8 text-base text-[#767676]">No events scheduled.</p>
          ) : (
            <div className="divide-y divide-black/10">
              {events.map((ev: any) => (
                <button
                  key={ev.id}
                  onClick={() => onSelect(ev.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-black/5 transition-colors group"
                >
                  <div>
                    <p className="text-base font-bold text-black group-hover:underline decoration-2 underline-offset-4 transition-all">{ev.name}</p>
                    <p className="text-sm text-[#767676] font-serif mt-1">
                      {new Date(ev.start_time).toLocaleString()} – {new Date(ev.end_time).toLocaleTimeString()}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-black shrink-0 transition-transform group-hover:translate-x-1" />
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <Card className="p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full text-center">
        <div className="w-16 h-16 mx-auto bg-[#ffdfdf] border-[1.5px] border-black rounded-full flex items-center justify-center mb-5">
          <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-black tracking-tight mb-2">Internet Disconnected</h2>
        <p className="text-[#767676] font-serif mb-8 text-base leading-relaxed">Evaluation is paused. Changes will be saved locally and synced when online.</p>
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-black bg-[#ffdfdf] border border-black py-2.5 px-5 rounded-full mx-auto w-fit">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          Waiting for connection...
        </div>
      </Card>
    </div>
  );
}

/* ─── ATTENDANCE DASHBOARD ─── */

function AttendanceDashboard({ evaluator, events, selectedEventId, teams, students, attendanceRecords, loading, onBack, onToggle, rooms, queueData, handleNextTeam, handleTeamNotPresent }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const eventName = events.find((e: any) => e.id === selectedEventId)?.name ?? "";
  const presentCount = Object.values(attendanceRecords).filter(Boolean).length;

  const downloadCSV = () => {
    const header = ["Student Name", "Email", "Team Name", "Status"];
    const rows = students.map((student: any) => {
      const isPresent = !!attendanceRecords[student.id];
      const teamName = teams.find((t: any) => t.id === student.sip_id)?.name || "Unknown";
      return [
        `"${student.name}"`,
        `"${student.email}"`,
        `"${teamName}"`,
        isPresent ? "Present" : "Absent"
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [header.join(","), ...rows.map((r: any[]) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `attendance_${eventName.replace(/\s+/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <OfflineWarning />
      <div className="min-h-screen bg-[#F4F3ED] font-sans flex flex-col md:flex-row">
        {/* MOBILE HEADER */}
        <header className="md:hidden bg-[#F4F3ED] border-b-[1.5px] border-black sticky top-0 z-20 px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 border border-black rounded-full hover:bg-black/5">
              <ArrowLeft className="h-5 w-5 text-black" />
            </button>
            <p className="text-base font-bold text-black truncate max-w-[150px]">{eventName}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={downloadCSV} className="p-2 border border-black rounded-full hover:bg-black/5" title="Download Attendance">
              <Download className="h-5 w-5 text-black" />
            </button>
            <button onClick={() => setSidebarOpen(true)} className="p-2 border border-black rounded-full hover:bg-black/5">
              <Menu className="h-5 w-5 text-black" />
            </button>
          </div>
        </header>

        {/* SIDEBAR (Desktop permanent, Mobile drawer) */}
        <div className={`fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity md:hidden ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setSidebarOpen(false)} />

        <aside className={`fixed md:sticky top-0 left-0 h-full w-[85%] md:w-80 bg-[#F4F3ED] border-r-[1.5px] border-black z-40 transform transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}>
          <div className="p-6 border-b-[1.5px] border-black flex items-center justify-between md:block">
            <div>
              <p className="text-sm text-[#767676] font-serif">Evaluating as</p>
              <p className="text-lg font-bold text-black">{evaluator.name}</p>
            </div>
            <button className="md:hidden p-2 border border-black rounded-full hover:bg-black/5" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5 text-black" />
            </button>
          </div>
          <div className="p-4 border-b-[1.5px] border-black hidden md:flex items-center justify-between bg-white">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button onClick={downloadCSV} className="flex items-center gap-2 text-sm font-bold bg-black text-white px-3 py-1.5 rounded-full hover:bg-black/80">
              <Download className="h-4 w-4" /> CSV
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-2">All Assigned Teams</h3>
            {teams.length === 0 ? (
              <p className="text-sm text-[#767676] font-serif">No teams assigned.</p>
            ) : (
              teams.map((t: any) => {
                const teamQueueItem = queueData.find((q: any) => q.team_id === t.id);
                const status = teamQueueItem ? teamQueueItem.status : "waiting";
                return (
                  <div key={t.id} className="p-4 bg-white border border-black rounded-2xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-base font-bold text-black">{t.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-serif text-[#767676]">SDG {t.SDG || "N/A"}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md border border-black ${status === 'completed' ? "bg-[#d1fae5]" : "bg-[#fef9c3]"}`}>
                        {status === 'completed' ? "Evaluated" : "Waiting"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto w-full">
          <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 space-y-8 pb-24">

            <div className="hidden md:flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold text-black">{eventName}</h1>
                <p className="text-base text-[#767676] font-serif mt-1">Live Evaluation Dashboard</p>
              </div>
              <div className="px-4 py-2 bg-white border-[1.5px] border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm">
                {presentCount} Students Present
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-black" />
              </div>
            ) : rooms && queueData && rooms.length > 0 ? (
              rooms.map((room: any) => {
                const roomQueue = queueData.filter((q: any) => q.room_id === room.id && q.status === 'waiting');
                if (roomQueue.length === 0) {
                  return (
                    <Card key={"queue-empty-" + room.id} className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
                      <SectionHeader icon={<Play className="h-5 w-5" />} title={"Queue Status - " + room.name} />
                      <div className="p-10 text-center">
                        <div className="w-16 h-16 mx-auto bg-white border-[1.5px] border-black rounded-2xl mb-4 flex items-center justify-center rotate-3">
                          <span className="text-2xl">🎉</span>
                        </div>
                        <p className="text-xl font-bold text-black">Queue Completed</p>
                        <p className="text-base text-[#767676] font-serif mt-2">All teams for this room have been evaluated.</p>
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
                  <div key={"room-container-" + room.id} className="relative mb-8">
                    <Card key={"queue-" + room.id} className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden border-2">
                      <SectionHeader icon={<Play className="h-5 w-5" />} title={"Evaluating Now - " + room.name} />

                      {/* Team Info Header */}
                      <div className="p-6 md:p-8 border-b-[1.5px] border-black bg-white">
                        <div className="flex flex-col gap-3">
                          <h2 className="text-2xl md:text-3xl font-bold text-black">{activeTeamData?.name || "Unknown Team"}</h2>
                          <div className="flex items-center gap-3 flex-wrap">
                            {activeTeamData?.SDG && (
                              <span className="text-sm font-bold text-black bg-[#fef08a] border border-black px-3 py-1.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                SDG {activeTeamData.SDG}
                              </span>
                            )}
                            {currentTeamQueueItem.absent_count > 0 && (
                              <span className="text-sm font-bold text-black bg-[#fecaca] border border-black px-3 py-1.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                Absent {currentTeamQueueItem.absent_count} time(s)
                              </span>
                            )}
                            <span className="text-sm font-bold text-black bg-white border border-black px-3 py-1.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              {teamPresent}/{teamStudents.length} Present
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Students List */}
                      <div className="bg-[#fafafa]">
                        {teamStudents.length === 0 ? (
                          <p className="px-6 py-8 text-base text-[#767676] font-serif">No students found for this team.</p>
                        ) : (
                          <div className="divide-y divide-black/10">
                            {teamStudents.map((student: any) => {
                              const isPresent = !!attendanceRecords[student.id];
                              return (
                                <div
                                  key={student.id}
                                  className={`flex items-center justify-between p-4 md:p-6 transition-colors ${isPresent ? "bg-[#dcfce7]" : ""}`}
                                >
                                  <div className="flex items-center gap-4 min-w-0">
                                    <div className={`w-12 h-12 rounded-[14px] border border-black flex items-center justify-center text-sm font-bold shrink-0 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${isPresent ? "bg-white text-black" : "bg-white text-black"}`}>
                                      {initials(student.name)}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-base font-bold text-black truncate">{student.name}</p>
                                      <p className="text-sm text-[#767676] font-serif truncate">{student.email}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 shrink-0 ml-4">
                                    <span className={`text-sm font-bold hidden md:inline-block ${isPresent ? "text-green-700" : "text-black"}`}>
                                      {isPresent ? "Present" : "Absent"}
                                    </span>
                                    <Switch
                                      checked={isPresent}
                                      onCheckedChange={() => onToggle(student.id, isPresent)}
                                      className="data-[state=checked]:bg-green-500 border-2 border-black"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                    </Card>

                    {/* Team Control Panel - Floating Sticky */}
                    <div className="fixed  right-0 bottom-6 z-20 flex flex-col sm:flex-row items-center justify-center md:justify-end  md:w-auto gap-4 mt-6 pointer-events-none px-2">
                      <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-full border-[1.5px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex gap-3 w-full sm:w-auto">
                        <Button
                          onClick={() => handleTeamNotPresent(currentTeamQueueItem)}
                          variant="outline"
                          className="flex-1 sm:flex-none h-12 text-base font-bold border-[1.5px] border-black text-black hover:bg-black/5 rounded-full shadow-none transition-transform hover:-translate-y-0.5"
                        >
                          Not Present
                        </Button>
                        <Button
                          onClick={() => handleNextTeam(currentTeamQueueItem.id)}
                          className="flex-1 sm:flex-none h-12 text-base font-bold bg-[#bbf7d0] border-[1.5px] border-black text-black hover:bg-[#86efac] rounded-full shadow-none transition-transform hover:-translate-y-0.5"
                        >
                          Complete & Next
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Card className="shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="px-6 py-12 text-center">
                  <p className="text-xl font-bold text-black">No rooms assigned</p>
                  <p className="text-base text-[#767676] font-serif mt-2">You don't have any rooms for this event.</p>
                </div>
              </Card>
            )}
          </div>
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

  // Load from local storage on mount/event select
  useEffect(() => {
    if (selectedEventId) {
      const stored = localStorage.getItem(`attendance_${selectedEventId}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setAttendanceRecords((prev) => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error("Failed to parse stored attendance", e);
        }
      }
    }
  }, [selectedEventId]);

  // Save to local storage on change
  useEffect(() => {
    if (selectedEventId && Object.keys(attendanceRecords).length > 0) {
      localStorage.setItem(`attendance_${selectedEventId}`, JSON.stringify(attendanceRecords));
    }
  }, [attendanceRecords, selectedEventId]);

  const fetchQueueData = async (evtId: string, currentRooms: any[]) => {
    const { data: qData } = await supabase
      .from("presentation_queue")
      .select(`*, team:team_id(id, name, "SDG", is_star)`)
      .in("room_id", currentRooms.map((r: any) => r.id))
      .eq("event_id", evtId)
      // .eq("status", "waiting")  // We want all for sidebar, but we'll filter in UI or keep it.
      .order("position", { ascending: true });
    if (qData) setQueueData(qData);
  };

  const handleNextTeam = async (queueId: string) => {
    const { error } = await supabase
      .from("presentation_queue")
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq("id", queueId);
    if (error) {
      toast.error("Failed to update queue");
    } else {
      toast.success("Team Evaluation Completed");
    }
  };

  const handleTeamNotPresent = async (queueItem: any) => {
    const roomQueue = queueData.filter(q => q.room_id === queueItem.room_id && q.status === 'waiting');
    const maxPosition = roomQueue.length > 0 ? Math.max(...roomQueue.map(q => q.position), queueItem.position) : queueItem.position;

    const { error } = await supabase
      .from("presentation_queue")
      .update({
        position: maxPosition + 1,
        absent_count: queueItem.absent_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq("id", queueItem.id);

    if (error) {
      toast.error("Failed to update queue");
    } else {
      toast.info("Team pushed down in queue");
    }
  };

  const setupRealtime = (eventId: string, currentRooms: any[]) => {
    const channelName = `eval_att_${eventId}`;
    const existing = supabase.getChannels().find(c => c.topic === channelName || c.topic === `realtime:${channelName}`);

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
    const qExisting = supabase.getChannels().find(c => c.topic === qChannelName || c.topic === `realtime:${qChannelName}`);

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
      setAttendanceRecords(prev => ({ ...prev, ...attMap })); // Merge with any local storage we just loaded

      setupRealtime(eventId, rooms);
    } catch { toast.error("Failed to load data"); }
    finally { setLoading(false); }
  };

  const toggleAttendance = async (studentId: string, currentStatus: boolean) => {
    setAttendanceRecords((prev) => ({ ...prev, [studentId]: !currentStatus }));

    if (!currentStatus) {
      toast.success("Marked Present", { duration: 500 });
      const { error } = await supabase.from("attendance").insert({ student_id: studentId, event_id: selectedEventId });
      if (error && error.code !== "23505") {
        toast.error("Failed to sync present status to cloud (saved locally)");
      }
    } else {
      toast.success("Marked Absent", { duration: 500 });
      const { error } = await supabase.from("attendance").delete()
        .match({ student_id: studentId, event_id: selectedEventId });
      if (error) {
        toast.error("Failed to sync absent status to cloud (saved locally)");
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