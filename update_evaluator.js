const fs = require('fs');
const file = fs.readFileSync('src/app/evaluator/page.tsx', 'utf8');

let newFile = file.replace(
  'import { Loader2, Calendar, ChevronRight, BookOpen, ArrowLeft } from "lucide-react";',
  'import { Loader2, Calendar, ChevronRight, BookOpen, ArrowLeft, Play, XCircle } from "lucide-react";'
);

newFile = newFile.replace(
  'function AttendanceDashboard({ evaluator, events, selectedEventId, teams, students, attendanceRecords, loading, onBack, onToggle }: any) {',
  'function AttendanceDashboard({ evaluator, events, selectedEventId, teams, students, attendanceRecords, loading, onBack, onToggle, rooms, queueData, handleNextTeam, handleTeamNotPresent }: any) {'
);

const queueUI = `
        {rooms && queueData && rooms.map((room: any) => {
          const roomQueue = queueData.filter((q: any) => q.room_id === room.id);
          if (roomQueue.length === 0) return null;
          
          const currentTeam = roomQueue[0];
          const upcomingTeams = roomQueue.slice(1);

          return (
            <Card key={"queue-" + room.id} className="shadow-sm overflow-hidden mb-6 border-[#1a73e8] border-opacity-30">
              <SectionHeader icon={<Play className="h-4 w-4 text-[#1a73e8]" />} title={"Presentation Queue - " + room.name} />
              
              <div className="p-5 bg-gradient-to-r from-[#f8fbff] to-white border-b border-[#f0f0f0]">
                <p className="text-xs font-semibold text-[#1a73e8] uppercase tracking-wider mb-2">Current Team</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold text-[#202124]">{currentTeam.team?.name || "Unknown Team"}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {currentTeam.team?.SDG && (
                        <span className="text-xs text-[#1a73e8] bg-[#e8f0fe] px-2 py-0.5 rounded-full font-medium">
                          SDG {currentTeam.team.SDG}
                        </span>
                      )}
                      {currentTeam.absent_count > 0 && (
                        <span className="text-xs text-[#d93025] bg-[#fce8e6] px-2 py-0.5 rounded-full font-medium">
                          Absent {currentTeam.absent_count} time(s)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button 
                      onClick={() => handleTeamNotPresent(currentTeam)}
                      variant="outline" 
                      className="h-9 text-xs border-[#d2d6dc] text-[#5f6368] hover:bg-[#f1f3f4]"
                    >
                      Not Present
                    </Button>
                    <Button 
                      onClick={() => handleNextTeam(currentTeam.id)}
                      className="h-9 text-xs bg-[#1a73e8] hover:bg-[#1557b0] text-white shadow-none"
                    >
                      Complete & Next
                    </Button>
                  </div>
                </div>
              </div>

              {upcomingTeams.length > 0 && (
                <div className="px-5 py-4">
                  <p className="text-xs font-semibold text-[#5f6368] uppercase tracking-wider mb-3">Upcoming</p>
                  <div className="space-y-2">
                    {upcomingTeams.map((q: any, idx: number) => (
                      <div key={q.id} className="flex items-center justify-between py-2 border-b border-[#f0f0f0] last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium text-[#5f6368] w-4">{idx + 1}.</span>
                          <p className="text-sm font-medium text-[#3c4043]">{q.team?.name || "Unknown Team"}</p>
                        </div>
                        {q.absent_count > 0 && (
                          <span className="text-xs text-[#d93025]">Skipped</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
`;

newFile = newFile.replace(
  '{loading ? (\n          <div className="flex justify-center py-20">',
  queueUI + '\n        {loading ? (\n          <div className="flex justify-center py-20">'
);

newFile = newFile.replace(
  'const [students, setStudents] = useState<any[]>([]);\n  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, boolean>>({});',
  `const [students, setStudents] = useState<any[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, boolean>>({});
  const [rooms, setRooms] = useState<any[]>([]);
  const [queueData, setQueueData] = useState<any[]>([]);

  const fetchQueueData = async (evtId: string, currentRooms: any[]) => {
    const { data: qData } = await supabase
      .from("presentation_queue")
      .select(\`*, team:team_id(id, name, "SDG", is_star)\`)
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
  };`
);

newFile = newFile.replace(
  'const setupRealtime = (eventId: string) => {\n    const channelName = `eval_att_${eventId}`;',
  `const setupRealtime = (eventId: string, currentRooms: any[]) => {
    const channelName = \`eval_att_\${eventId}\`;`
);

newFile = newFile.replace(
  '        (payload) => setAttendanceRecords((prev) => {\n          const next = { ...prev };\n          delete next[payload.old.student_id];\n          return next;\n        })\n      )\n      .subscribe();\n  };',
  `        (payload) => setAttendanceRecords((prev) => {
          const next = { ...prev };
          delete next[payload.old.student_id];
          return next;
        })
      )
      .subscribe();

    const qChannelName = \`eval_queue_\${eventId}\`;
    const qExisting = supabase.getChannels().find(c => c.topic === qChannelName);
    if (qExisting) supabase.removeChannel(qExisting);

    supabase
      .channel(qChannelName)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "presentation_queue", filter: \`event_id=eq.\${eventId}\` },
        () => {
          fetchQueueData(eventId, currentRooms);
        }
      )
      .subscribe();
  };`
);

newFile = newFile.replace(
  '      const { data: rooms } = await supabase\n        .from("rooms").select("id, name").in("panel_id", panels.map((p: any) => p.id));\n      if (!rooms?.length) { setLoading(false); return; }',
  `      const { data: rooms } = await supabase
        .from("rooms").select("id, name").in("panel_id", panels.map((p: any) => p.id));
      if (!rooms?.length) { setLoading(false); return; }
      setRooms(rooms);
      await fetchQueueData(eventId, rooms);`
);

newFile = newFile.replace(
  'setupRealtime(eventId);',
  'setupRealtime(eventId, rooms);'
);

newFile = newFile.replace(
  '<AttendanceDashboard\n      evaluator={evaluator}\n      events={events}\n      selectedEventId={selectedEventId}\n      teams={teams}\n      students={students}\n      attendanceRecords={attendanceRecords}\n      loading={loading}\n      onBack={() => setSelectedEventId("")}\n      onToggle={toggleAttendance}\n    />',
  `<AttendanceDashboard
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
    />`
);

fs.writeFileSync('src/app/evaluator/page.tsx', newFile);
