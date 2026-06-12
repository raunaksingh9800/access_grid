const fs = require('fs');
const file = fs.readFileSync('src/app/evaluator/page.tsx', 'utf8');

const offlineComponent = `
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
`;

let newFile = file.replace('/* ─── ATTENDANCE DASHBOARD ─── */', offlineComponent);

newFile = newFile.replace(
  'import { useState } from "react";',
  'import { useState, useEffect } from "react";'
);

newFile = newFile.replace(
  '  return (\n    <div className="min-h-screen bg-[#f8f9fa]">\n      <header className="bg-white border-b border-[#e0e0e0] sticky top-0 z-10">',
  `  return (
    <>
      <OfflineWarning />
      <div className="min-h-screen bg-[#f8f9fa]">
        <header className="bg-white border-b border-[#e0e0e0] sticky top-0 z-10">`
);

// Close the fragment
newFile = newFile.replace(
  '        )}\n      </main>\n    </div>\n  );\n}\n\n/* ─── ROOT ─── */',
  '        )}\n      </main>\n    </div>\n    </>\n  );\n}\n\n/* ─── ROOT ─── */'
);

fs.writeFileSync('src/app/evaluator/page.tsx', newFile);
