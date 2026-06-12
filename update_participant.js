const fs = require('fs');
const file = fs.readFileSync('src/app/participant/page.tsx', 'utf8');

let newFile = file.replace(
  '  FileText,\n} from "lucide-react";',
  '  FileText,\n  Play,\n} from "lucide-react";'
);

newFile = newFile.replace(
  'function Dashboard({ participant, details, dashboardData }: any) {',
  'function Dashboard({ participant, details, dashboardData, queueData }: any) {'
);

const queueUI = `
            {/* Presentation Queue */}
            {queueData && queueData.length > 0 && dashboardData.team && (
              <Card className="shadow-sm overflow-hidden border-[#1a73e8] border-opacity-30 mb-4">
                <SectionHeader
                  icon={<Play className="h-4 w-4 text-[#1a73e8]" />}
                  title="Presentation Queue"
                />
                <div className="p-5 bg-gradient-to-r from-[#f8fbff] to-white">
                  {(() => {
                    const currentTeam = queueData[0];
                    const myTeamIndex = queueData.findIndex((q: any) => q.team_id === dashboardData.team.id);
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-[#1a73e8] uppercase tracking-wider mb-1">Current Presenting Team</p>
                          <p className="text-lg font-bold text-[#202124]">{currentTeam.team?.name || "Unknown"}</p>
                        </div>
                        
                        {myTeamIndex !== -1 && (
                          <div className="flex gap-4 pt-4 border-t border-[#f0f0f0]">
                            <div>
                              <p className="text-xs text-[#5f6368] mb-0.5">Your Position</p>
                              <p className="text-xl font-bold text-[#202124]">{myTeamIndex + 1}</p>
                            </div>
                            <div className="w-px bg-[#f0f0f0]"></div>
                            <div>
                              <p className="text-xs text-[#5f6368] mb-0.5">Teams Ahead</p>
                              <p className="text-xl font-bold text-[#202124]">{myTeamIndex}</p>
                            </div>
                          </div>
                        )}
                        {myTeamIndex === -1 && (
                          <div className="pt-4 border-t border-[#f0f0f0]">
                            <p className="text-sm font-medium text-[#5f6368]">Your team is not currently in the waiting queue.</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </Card>
            )}`;

newFile = newFile.replace(
  '{/* Room */}',
  queueUI + '\n\n            {/* Room */}'
);

newFile = newFile.replace(
  'const [inputs, setInputs] = useState({',
  'const [queueData, setQueueData] = useState<any[]>([]);\n  const [inputs, setInputs] = useState({'
);

newFile = newFile.replace(
  '() => toast.error("❌ Attendance revoked.", { duration: 8000 }),\n      )\n      .subscribe();',
  `() => toast.error("❌ Attendance revoked.", { duration: 8000 }),
      )
      .subscribe();

    const qChannelName = \`queue_part_\${participantId}\`;
    const qExisting = supabase.getChannels().find((c) => c.topic === qChannelName);
    if (qExisting) supabase.removeChannel(qExisting);

    supabase
      .channel(qChannelName)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "presentation_queue" },
        () => {
          fetchDashboardData(participantId);
        }
      )
      .subscribe();`
);

newFile = newFile.replace(
  'select(`name, "SDG", guide_id, allocated_room`)',
  'select(`id, name, "SDG", guide_id, allocated_room`)'
);

newFile = newFile.replace(
  'setDashboardData({ team: teamData, teammates, guide, room, evaluators });\n    setupRealtime(participantId);',
  `setDashboardData({ team: teamData, teammates, guide, room, evaluators });
    if (teamData.allocated_room) {
      const { data: qData } = await supabase
        .from("presentation_queue")
        .select(\`*, team:team_id(name)\`)
        .eq("room_id", teamData.allocated_room)
        .eq("status", "waiting")
        .order("position", { ascending: true });
      if (qData) setQueueData(qData);
    }
    setupRealtime(participantId);`
);

newFile = newFile.replace(
  '<Dashboard\n      participant={participant}\n      details={details}\n      dashboardData={dashboardData}\n    />',
  `<Dashboard
      participant={participant}
      details={details}
      dashboardData={dashboardData}
      queueData={queueData}
    />`
);

fs.writeFileSync('src/app/participant/page.tsx', newFile);
