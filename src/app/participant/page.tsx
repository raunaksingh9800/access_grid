"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Loader2, Send, MapPin, Users, Award,
  ShieldCheck, BookOpen, Link2, Monitor, Bell, Mail
} from "lucide-react";

const initials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#e0e0e0] ${className}`}>
      {children}
    </div>
  );
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div className={`${sz} rounded-full bg-[#e8f0fe] text-[#1a73e8] font-semibold flex items-center justify-center shrink-0 select-none`}>
      {initials(name)}
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs font-medium text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
      {label}
    </span>
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1a73e8] mb-5">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-[#202124] tracking-tight">SIP Participant Portal</h1>
          <p className="mt-1.5 text-sm text-[#5f6368]">Sign in with your registered email</p>
        </div>
        <Card className="p-6 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-[#3c4043]">Email address</Label>
              <Input
                type="email"
                placeholder="you@example.com"
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

/* ─── DETAILS FORM ─── */
function DetailsForm({ participant, inputs, setInputs, loading, handleDetailsSubmit }: any) {
  const fields = [
    { key: "input_1", label: "Project repository", placeholder: "https://github.com/…", icon: BookOpen },
    { key: "input_2", label: "Presentation deck", placeholder: "https://canva.com/…", icon: Link2 },
    { key: "input_3", label: "Live demo", placeholder: "https://yourapp.vercel.app", icon: Monitor },
  ];
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <p className="text-xs font-medium text-[#1a73e8] uppercase tracking-wider mb-1">One more step</p>
          <h2 className="text-xl font-semibold text-[#202124]">Hi {participant.name.split(" ")[0]}, submit your links</h2>
          <p className="text-sm text-[#5f6368] mt-1">Your dashboard unlocks once these are saved.</p>
        </div>
        <Card className="shadow-sm overflow-hidden">
          <form onSubmit={handleDetailsSubmit}>
            <div className="divide-y divide-[#f0f0f0]">
              {fields.map(({ key, label, placeholder, icon: Icon }) => (
                <div key={key} className="px-5 py-4 space-y-1.5">
                  <Label className="text-xs font-medium text-[#3c4043] flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 text-[#5f6368]" />{label}
                  </Label>
                  <Input
                    value={(inputs as any)[key]}
                    onChange={(e) => setInputs({ ...inputs, [key]: e.target.value })}
                    placeholder={placeholder}
                    required
                    className="h-10 border-[#dadce0] rounded-lg text-sm focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] placeholder:text-[#bdc1c6]"
                  />
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-[#f8f9fa] border-t border-[#f0f0f0]">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium rounded-lg shadow-none"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <><Send className="h-3.5 w-3.5 mr-2" />Save & unlock dashboard</>}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

/* ─── DASHBOARD ─── */
function Dashboard({ participant, details, dashboardData }: any) {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-white border-b border-[#e0e0e0] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1a73e8] flex items-center justify-center text-xs font-bold text-white">
              {initials(participant.name)}
            </div>
            <span className="text-sm font-medium text-[#202124]">{participant.name}</span>
          </div>
          <span className="text-xs font-medium text-[#188038] bg-[#e6f4ea] px-2.5 py-1 rounded-full">Active</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-16">
        {!dashboardData ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-[#1a73e8]" />
          </div>
        ) : (
          <>
            {/* Notification bar */}
            <div className="flex items-start gap-3 bg-[#e8f0fe] border border-[#c5d8fd] rounded-xl px-4 py-3">
              <Bell className="h-4 w-4 text-[#1a73e8] mt-0.5 shrink-0" />
              <p className="text-xs text-[#1a73e8] leading-relaxed">
                You'll get a notification here when an evaluator marks your attendance.
              </p>
            </div>

            {/* Room */}
            <Card className="shadow-sm overflow-hidden">
              <div className="px-5 py-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#5f6368] flex items-center gap-1.5 mb-1">
                    <MapPin className="h-3.5 w-3.5" />Assigned room
                  </p>
                  {dashboardData.room ? (
                    <>
                      <p className="text-4xl font-bold text-[#202124] tracking-tight leading-none">
                        {dashboardData.room.name}
                      </p>
                      <p className="text-xs text-[#5f6368] mt-1.5">Report here for your evaluation</p>
                    </>
                  ) : (
                    <p className="text-base font-medium text-[#5f6368] mt-1">Pending allocation</p>
                  )}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#e8f0fe] flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-[#1a73e8]" />
                </div>
              </div>
            </Card>

            {/* Team */}
            <Card className="shadow-sm overflow-hidden">
              <SectionHeader icon={<Award className="h-4 w-4" />} title={dashboardData.team?.name || "Team"} />
              {dashboardData.team?.SDG && (
                <div className="px-5 pt-3 pb-1"><Chip label={`SDG • ${dashboardData.team.SDG}`} /></div>
              )}
              <div className="px-5 py-3 space-y-2">
                {dashboardData.teammates?.map((mate: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 py-1.5">
                    <Avatar name={mate.name} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#202124] truncate">{mate.name}</p>
                      <p className="text-xs text-[#5f6368] truncate">{mate.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Evaluators */}
            <Card className="shadow-sm overflow-hidden">
              <SectionHeader icon={<ShieldCheck className="h-4 w-4" />} title="Evaluators" />
              <div className="px-5 py-3">
                {dashboardData.evaluators?.length > 0 ? (
                  <div className="space-y-2">
                    {dashboardData.evaluators.map((ev: any, i: number) => (
                      <div key={i} className="flex items-center justify-between py-1.5">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-[#e6f4ea] flex items-center justify-center shrink-0">
                            <Users className="h-4 w-4 text-[#188038]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-[#202124] truncate">{ev.name}</p>
                            <p className="text-xs text-[#5f6368] truncate">{ev.department}</p>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[#5f6368] bg-[#f1f3f4] px-2.5 py-1 rounded-full shrink-0 ml-2">
                          E{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#5f6368] py-2">No evaluators assigned yet.</p>
                )}
              </div>
            </Card>

            {/* Guide */}
            <Card className="shadow-sm overflow-hidden">
              <SectionHeader icon={<BookOpen className="h-4 w-4" />} title="Guide" />
              <div className="px-5 py-3">
                {dashboardData.guide ? (
                  <div className="flex items-center gap-3 py-1.5">
                    <Avatar name={dashboardData.guide.name} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#202124]">{dashboardData.guide.name}</p>
                      <p className="text-xs text-[#5f6368]">{dashboardData.guide.department}</p>
                      <a href={`mailto:${dashboardData.guide.email}`} className="text-xs text-[#1a73e8] hover:underline flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3" />{dashboardData.guide.email}
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#5f6368] py-2">No guide assigned yet.</p>
                )}
              </div>
            </Card>

            {/* Submitted links */}
            <Card className="shadow-sm overflow-hidden">
              <SectionHeader icon={<Link2 className="h-4 w-4" />} title="Submitted links" />
              <div className="divide-y divide-[#f0f0f0]">
                {[
                  { label: "Project repository", value: details.input_1, icon: BookOpen },
                  { label: "Presentation deck", value: details.input_2, icon: Link2 },
                  { label: "Live demo", value: details.input_3, icon: Monitor },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="px-5 py-3.5 flex items-start gap-3">
                    <Icon className="h-4 w-4 text-[#5f6368] mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-[#5f6368] mb-0.5">{label}</p>
                      <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1a73e8] hover:underline truncate block">
                        {value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}

/* ─── ROOT ─── */
export default function ParticipantPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [participant, setParticipant] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [inputs, setInputs] = useState({ input_1: "", input_2: "", input_3: "" });

  const setupRealtime = (participantId: string) => {
    const channelName = `attendance_${participantId}`;
    const existing = supabase.getChannels().find(c => c.topic === channelName);
    if (existing) supabase.removeChannel(existing);

    supabase
      .channel(channelName)
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "attendance", filter: `student_id=eq.${participantId}` },
        () => toast.success("✅ Attendance marked!", { duration: 10000 })
      )
      .on("postgres_changes",
        { event: "DELETE", schema: "public", table: "attendance", filter: `student_id=eq.${participantId}` },
        () => toast.error("❌ Attendance revoked.", { duration: 8000 })
      )
      .subscribe();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      const { data, error } = await supabase.from("participant").select("*").eq("email", email).single();
      if (error || !data) return toast.error("Participant not found");
      setParticipant(data);
      toast.success("Signed in");
      checkDetails(data.id);
    } catch { toast.error("An error occurred"); }
    finally { setLoading(false); }
  };

  const checkDetails = async (participantId: string) => {
    const { data } = await supabase.from("participant_details").select("*").eq("participant_id", participantId).single();
    if (data) {
      setDetails(data);
      fetchDashboardData(participantId);
    } else {
      setupRealtime(participantId);
    }
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.input_1 || !inputs.input_2 || !inputs.input_3) return toast.error("Please fill in all fields");
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("participant_details")
        .insert({ participant_id: participant.id, ...inputs })
        .select().single();
      if (error) return toast.error("Failed to save: " + error.message);
      setDetails(data);
      toast.success("Saved! Dashboard unlocked.");
      fetchDashboardData(participant.id);
    } catch { toast.error("An error occurred"); }
    finally { setLoading(false); }
  };

  const fetchDashboardData = async (participantId: string) => {
    const { data: pData } = await supabase.from("participant").select("sip_id").eq("id", participantId).single();
    if (!pData?.sip_id) return;
    const teamId = pData.sip_id;

    const { data: teammates } = await supabase.from("participant").select("name, email").eq("sip_id", teamId);
    const { data: teamData } = await supabase.from("team").select(`name, "SDG", guide_id, allocated_room`).eq("id", teamId).single();
    if (!teamData) return;

    let guide = null;
    if (teamData.guide_id) {
      const { data } = await supabase.from("guide").select("*").eq("id", teamData.guide_id).single();
      guide = data;
    }

    let room = null;
    let evaluators: any[] = [];
    if (teamData.allocated_room) {
      const { data: rData } = await supabase.from("rooms").select("*").eq("id", teamData.allocated_room).single();
      room = rData;
      if (rData?.panel_id) {
        const { data: pnlData } = await supabase.from("panel").select("*").eq("id", rData.panel_id).single();
        if (pnlData) {
          const { data: ev1 } = await supabase.from("evaluator").select("*").eq("id", pnlData.evaluator_1).single();
          const { data: ev2 } = await supabase.from("evaluator").select("*").eq("id", pnlData.evaluator_2).single();
          if (ev1) evaluators.push(ev1);
          if (ev2) evaluators.push(ev2);
        }
      }
    }

    setDashboardData({ team: teamData, teammates, guide, room, evaluators });
    setupRealtime(participantId);
  };

  if (!participant)
    return <LoginScreen email={email} setEmail={setEmail} loading={loading} handleLogin={handleLogin} />;
  if (!details)
    return <DetailsForm participant={participant} inputs={inputs} setInputs={setInputs} loading={loading} handleDetailsSubmit={handleDetailsSubmit} />;
  return <Dashboard participant={participant} details={details} dashboardData={dashboardData} />;
}