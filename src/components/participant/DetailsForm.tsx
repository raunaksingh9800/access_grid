// src/components/participant/DetailsForm.tsx

import { BookOpen, FileText, Users, Send, Loader2 } from "lucide-react";
import { Card } from "./Card";
import { Participant, DetailsFormInputs } from "../../../types/participant";
import { validateProjectTitle, countWords } from "../../../utils/helper";

interface DetailsFormProps {
    participant: Participant;
    inputs: DetailsFormInputs;
    setInputs: (inputs: DetailsFormInputs) => void;
    loading: boolean;
    handleDetailsSubmit: (e: React.FormEvent) => Promise<void>;
}

export function DetailsForm({
    participant,
    inputs,
    setInputs,
    loading,
    handleDetailsSubmit,
}: DetailsFormProps) {
    const isProjectTitleValid = validateProjectTitle(inputs.input_1 || "");
    const descriptionWordCount = countWords(inputs.input_2);

    return (
        <div className="min-h-screen bg-[#F4F3ED] flex items-center justify-center px-4 py-10 font-sans text-black">
            <div className="w-full max-w-2xl">
                {/* Global Brand Header */}
                <div className="flex items-center gap-3 mb-10 justify-center">
                    <div className="flex gap-1.5 items-center">
                        <div className="w-5 h-12 bg-[#FFD3A5] rounded-full" />
                        <div className="w-[22px] h-[30px] bg-[#BDB2FF] rounded-full self-end" />
                    </div>
                    <h1 className="text-[32px] font-bold tracking-tight text-black">
                        Iluna <span className="font-normal text-[#595959]">Forms</span>
                    </h1>
                </div>

                <div className="mb-8 text-center">
                    <h2 className="text-[32px] font-bold tracking-tight text-black leading-tight">
                        Hi {participant.name.split(" ")[0]}, <br />{" "}
                        <span className="text-xl text-[#767676] font-normal">complete your project details</span>
                    </h2>

                    <p className="text-[15px] text-[#767676] font-serif italic mt-3 leading-relaxed max-w-md mx-auto">
                        Make sure all team members enter the exact same project title.
                        Incorrect formatting will be flagged during evaluation.
                    </p>
                </div>

                <Card className="p-8">
                    <form onSubmit={handleDetailsSubmit} className="space-y-8">
                        {/* Project Title */}
                        <div className="flex flex-col gap-2 items-start w-full">
                            <label className="font-serif italic text-[#767676] text-[15px] flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Project Name
                            </label>

                            <input
                                value={inputs.input_1}
                                onChange={(e) =>
                                    setInputs({
                                        ...inputs,
                                        input_1: e.target.value,
                                    })
                                }
                                placeholder="24SEAI06-Access Grid : Scalable QR based system for events"
                                required
                                className={`w-full h-[64px] px-6 bg-transparent border-[1.5px] border-black rounded-[24px] focus:outline-none text-black text-[16px] placeholder-[#A3A3A3] transition-all ${
                                    inputs.input_1 && !isProjectTitleValid
                                    ? "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                                    : ""
                                }`}
                            />

                            <div className="w-full rounded-[24px] bg-white/50 border-[1.5px] border-black p-5 text-sm space-y-2 mt-2">
                                <p className="font-bold text-black">Required format</p>
                                <p className="text-[#767676] font-serif">
                                    <span className="font-bold not-italic">ProjectID-Project Title</span>
                                </p>
                                <div className="font-mono text-xs bg-white border-[1.5px] border-black rounded-[16px] px-4 py-3 text-black break-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    24SEAI06-Access Grid : Scalable QR based system for events
                                </div>
                                <p className="text-red-500 text-xs font-bold pt-1">
                                    Use "-" between Project ID and Title. "_" is invalid.
                                </p>
                            </div>

                            {inputs.input_1 && !isProjectTitleValid && (
                                <p className="text-sm text-red-500 font-bold mt-1">
                                    Invalid format. Use:{" "}
                                    <span className="font-mono font-normal">ProjectID-Project Title</span>
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2 items-start w-full">
                            <label className="font-serif italic text-[#767676] text-[15px] flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Project Description
                            </label>

                            <textarea
                                value={inputs.input_2}
                                onChange={(e) =>
                                    setInputs({
                                        ...inputs,
                                        input_2: e.target.value,
                                    })
                                }
                                placeholder="Describe your project, its purpose, how it works, the problem it solves, and key features..."
                                required
                                rows={7}
                                className={`w-full p-6 bg-transparent border-[1.5px] border-black rounded-[24px] focus:outline-none text-black text-[16px] placeholder-[#A3A3A3] transition-all resize-none ${
                                    descriptionWordCount > 0 &&
                                    (descriptionWordCount < 100 || descriptionWordCount > 300)
                                    ? "border-red-500 focus-visible:ring-1 focus-visible:ring-red-500"
                                    : ""
                                }`}
                            />

                            <div className="flex items-center justify-between text-[13px] w-full px-2 mt-1">
                                <p
                                    className={`font-bold ${
                                        descriptionWordCount < 100 || descriptionWordCount > 300
                                        ? "text-red-500"
                                        : "text-green-600"
                                    }`}
                                >
                                    {descriptionWordCount} / 100–300 words
                                </p>
                                <p className="text-[#767676] font-serif italic">Minimum 100 words required</p>
                            </div>
                        </div>

                        {/* End User */}
                        <div className="flex flex-col gap-2 items-start w-full">
                            <label className="font-serif italic text-[#767676] text-[15px] flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Intended End Users
                            </label>

                            <textarea
                                value={inputs.input_3}
                                onChange={(e) =>
                                    setInputs({
                                        ...inputs,
                                        input_3: e.target.value,
                                    })
                                }
                                placeholder="Who will use this project? Students, hospitals, event organizers, businesses, rural communities, etc."
                                required
                                rows={4}
                                className="w-full p-6 bg-transparent border-[1.5px] border-black rounded-[24px] focus:outline-none text-black text-[16px] placeholder-[#A3A3A3] transition-all resize-none"
                            />

                            <p className="text-[13px] text-[#767676] font-serif italic px-2 mt-1">
                                Be specific. "Everyone" is not a real target user group.
                            </p>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={
                                    loading ||
                                    !isProjectTitleValid ||
                                    descriptionWordCount < 100 ||
                                    descriptionWordCount > 300
                                }
                                className="w-full h-[60px] bg-black hover:bg-neutral-900 text-white font-sans font-medium text-lg rounded-full transition-colors flex items-center justify-center gap-2 disabled:bg-neutral-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        Submit Project Details
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </Card>
                
                {/* Bottom System Footer */}
                <div className="text-center py-12 space-y-1 mt-6">
                    <h3 className="text-xl font-bold text-neutral-400">A Iluna Product</h3>
                    <p className="text-xs text-neutral-400 font-medium">made with ❤️ in India</p>
                </div>
            </div>
        </div>
    );
}