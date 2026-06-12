import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserCircle, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-[#F4F3ED] px-6 py-12 text-[#2D2D2D] font-sans antialiased selection:bg-purple-200">

      {/* Top Brand Logo Mimic */}
      <div className="w-full max-w-md flex justify-start pl-4 pt-4">
        <div className="flex gap-1.5 items-center">
          <img className="w-12" src="/luna-light-logo.png" alt="" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col items-center text-center max-w-md w-full px-4 my-auto gap-8">

        {/* Placeholder for Character Illustration */}
        <div className="w-64 h-64 relative my-4 flex items-center justify-center bg-white/40 rounded-full border border-dashed border-neutral-300">
          <div className="w-72 h-72  rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
            <img src="/mos.png" alt="mos" className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Typography block matching "Welcome to Iluna Forms" */}
        <div className="space-y-1">
          <p className="text-sm font-medium tracking-wide text-neutral-500">
            Welcome to
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            lluna <span className="font-normal text-neutral-600">Mark</span>
          </h1>
          <p className="text-xs text-neutral-400 max-w-xs mx-auto pt-2">
            The next-generation evaluation system.
          </p>
        </div>

        {/* Action Buttons styled like the primary "Countinue" button */}
        <div className="w-full flex flex-col gap-3 pt-2">
          <Link href="/participant" className="w-full">
            <Button className="w-full bg-black hover:bg-neutral-800 text-white rounded-full py-6 text-base font-semibold transition-all shadow-sm">
              Continue as Participant
            </Button>
          </Link>

          <Link href="/evaluator" className="w-full">
            <Button className="w-full bg-transparent hover:bg-neutral-200/50  mt-2 text-neutral-700 rounded-full py-6 text-sm font-medium transition-all border border-neutral-400">
              Enter Evaluator Portal
            </Button>
          </Link>
        </div>
      </div>

      {/* Subtle Footer Subtext matching "Continuing as..." */}
      <div className="w-full text-center text-[11px] mt-4 font-medium text-neutral-400 tracking-wide">
        System active for <span className="font-semibold text-neutral-600">Live events</span>
      </div>
    </div>
  );
}