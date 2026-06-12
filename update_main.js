const fs = require('fs');
const file = fs.readFileSync('src/app/evaluator/page.tsx', 'utf8');

const startMarker = '<main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-16">';
const endMarker = '</main>';

const startIndex = file.indexOf(startMarker);
const endIndex = file.indexOf(endMarker, startIndex) + endMarker.length;

const newMain = `<main className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-16">
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
                          className={\`flex items-center justify-between px-5 py-3.5 transition-colors \${isPresent ? "bg-[#f6fef9]" : ""}\`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={\`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors \${isPresent ? "bg-[#e6f4ea] text-[#188038]" : "bg-[#f1f3f4] text-[#5f6368]"}\`}>
                              {initials(student.name)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-[#202124] truncate">{student.name}</p>
                              <p className="text-xs text-[#5f6368] truncate">{student.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0 ml-2">
                            <span className={\`text-xs font-medium \${isPresent ? "text-[#188038]" : "text-[#5f6368]"}\`}>
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
      </main>`;

const updatedFile = file.substring(0, startIndex) + newMain + file.substring(endIndex);
fs.writeFileSync('src/app/evaluator/page.tsx', updatedFile);
