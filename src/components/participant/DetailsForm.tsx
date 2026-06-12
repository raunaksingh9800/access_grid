// src/components/participant/DetailsForm.tsx

import { BookOpen, FileText, Users, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
        <div className="min-h-screen bg-gradient-to-br from-[#f6f8fc] to-[#eef2ff] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <div className="inline-flex items-center rounded-full bg-[#e8f0fe] px-3 py-1 text-xs font-medium text-[#1a73e8] mb-4">
                        Project Submission
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight text-[#202124]">
                        Hi {participant.name.split(" ")[0]}, <br />{" "}
                        <span className="text-lg text-gray-400">complete your project details</span>
                    </h2>

                    <p className="text-sm text-[#5f6368] mt-2 leading-relaxed">
                        Make sure all team members enter the exact same project title.
                        Incorrect formatting will be flagged during evaluation.
                    </p>
                </div>

                <Card className="border border-[#e5e7eb] shadow-xl rounded-3xl overflow-hidden bg-white">
                    <form onSubmit={handleDetailsSubmit}>
                        <div className="p-6 space-y-8">
                            {/* Project Title */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-[#1a73e8]" />
                                    <Label className="text-base font-semibold text-[#202124]">
                                        Project Name
                                    </Label>
                                </div>

                                <Input
                                    value={inputs.input_1}
                                    onChange={(e) =>
                                        setInputs({
                                            ...inputs,
                                            input_1: e.target.value,
                                        })
                                    }
                                    placeholder="24SEAI06-Access Grid : Scalable QR based system for events"
                                    required
                                    className={`h-12 rounded-xl border text-sm px-4 ${inputs.input_1 && !isProjectTitleValid
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : "border-[#d2d6dc]"
                                        }`}
                                />

                                <div className="rounded-xl bg-[#f8fafc] border border-[#e5e7eb] p-4 text-sm space-y-2">
                                    <p className="font-medium text-[#202124]">Required format</p>
                                    <p className="text-[#5f6368]">
                                        <span className="font-semibold">ProjectID-Project Title</span>
                                    </p>
                                    <p className="text-[#5f6368]">Example:</p>
                                    <div className="font-mono text-xs bg-white border border-[#e5e7eb] rounded-lg px-3 py-2 text-[#1a73e8] break-all">
                                        24SEAI06-Access Grid : Scalable QR based system for events
                                    </div>
                                    <p className="text-red-300 text-xs font-medium">
                                        Use "-" between Project ID and Title. "_" is invalid.
                                    </p>
                                </div>

                                {inputs.input_1 && !isProjectTitleValid && (
                                    <p className="text-sm text-red-500 font-medium">
                                        Invalid format. Use:{" "}
                                        <span className="font-mono">ProjectID-Project Title</span>
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-[#1a73e8]" />
                                    <Label className="text-base font-semibold text-[#202124]">
                                        Project Description
                                    </Label>
                                </div>

                                <Textarea
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
                                    className={`rounded-2xl border text-sm resize-none p-4 ${descriptionWordCount > 0 &&
                                        (descriptionWordCount < 100 || descriptionWordCount > 300)
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : "border-[#d2d6dc]"
                                        }`}
                                />

                                <div className="flex items-center justify-between text-xs">
                                    <p
                                        className={`font-medium ${descriptionWordCount < 100 || descriptionWordCount > 300
                                            ? "text-red-300"
                                            : "text-green-600"
                                            }`}
                                    >
                                        {descriptionWordCount} / 100–300 words
                                    </p>
                                    <p className="text-[#5f6368]">Minimum 100 words required</p>
                                </div>
                            </div>

                            {/* End User */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-[#1a73e8]" />
                                    <Label className="text-base font-semibold text-[#202124]">
                                        Intended End Users
                                    </Label>
                                </div>

                                <Textarea
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
                                    className="rounded-2xl border border-[#d2d6dc] text-sm resize-none p-4"
                                />

                                <p className="text-xs text-[#5f6368]">
                                    Be specific. "Everyone" is not a real target user group.
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-[#eef0f2] bg-[#fafbfc] px-6 py-5">
                            <Button
                                type="submit"
                                disabled={
                                    loading ||
                                    !isProjectTitleValid ||
                                    descriptionWordCount < 100 ||
                                    descriptionWordCount > 300
                                }
                                className="w-full h-12 rounded-2xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-sm shadow-none"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        <Send className="h-4 w-4 mr-2" />
                                        Submit Project Details
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}