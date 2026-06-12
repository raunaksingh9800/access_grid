import Link from 'next/link';
import { ChevronRight } from 'lucide-react'; // Swapped for directional navigation clarity

export default function Home() {
  return (
    // Base layout utilizing Warm Cream (#F4F3ED) background
    <div className="flex min-h-screen items-center justify-center  p-4 md:p-8 font-sans antialiased">

      {/* Main Device Container - Adheres to rounded-[40px] and solid black border-[1.5px] if framed, or clean bounds */}
      <div className="w-full max-w-md  rounded-[40px] p-8 flex flex-col justify-between min-h-[780px] shadow-none">

        {/* 1. Global Brand Header Component */}
        <div className="flex items-center gap-3 w-full justify-start ">
          <div className="flex gap-1.5 items-center">
            <div className="w-5 h-12 bg-[#FFD3A5] rounded-full border-[1.5px] border-black" />
            <div className="w-[22px] h-[30px] bg-[#BDB2FF] rounded-full self-end border-[1.5px] border-black" />
          </div>
          <h1 className="text-[32px] ml-3 mt-4 font-bold tracking-tight text-black">
            Iluna <span className="font-normal text-[#595959]">Mark</span>
          </h1>
        </div>

        {/* 2. Main Content / Illustration Area */}
        <div className="flex flex-col items-center text-center pt-6 gap-6">

          {/* Avatar/Illustration Frame Container with System Geometry */}
          <div className="w-72 h-72 relative flex items-center justify-center  border-black rounded-[24px] overflow-hidden">
            <img
              src="/mos.png"
              alt="Illustration"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Typography Block aligning with Token Specifications */}
          <div className="space-y-1.5">
            <p className="font-serif italic text-[#767676] text-[15px]">
              Welcome to the next-generation
            </p>
            <p className="text-[11px] font-medium tracking-wide text-[#989893] uppercase">
              Evaluation System
            </p>
          </div>
        </div>

        {/* 3. Action Buttons - Adhering to Standard Action Button (h-[60px], bg-black) */}
        <div className="w-full flex flex-col gap-4">

          {/* Primary Action Button */}
          <Link href="/participant" className="w-full">
            <button className="w-full h-[60px] bg-black hover:bg-neutral-900 text-white font-sans font-medium text-lg rounded-full transition-colors flex items-center justify-center gap-2">
              Continue as Student
            </button>
          </Link>

          {/* Secondary Action Button - Styled with system borders and fonts */}
          <Link href="/evaluator" className="w-full">
            <button className="w-full h-[60px] bg-transparent hover:bg-black/5 text-black font-sans font-medium text-lg border-[1.5px] border-black rounded-full transition-colors flex items-center justify-center gap-2">
              Enter Evaluator Portal
            </button>
          </Link>
        </div>

        {/* 4. Bento Grid/System Style Footer Label */}
        <div className="w-full text-center pt-6 border-t border-black/10 mt-6">
          <p className="text-[11px] font-medium tracking-wide text-[#989893]">
            SYSTEM ACTIVE FOR <span className="font-bold text-black uppercase">Live Events</span>
          </p>
        </div>

      </div>
    </div>
  );
}