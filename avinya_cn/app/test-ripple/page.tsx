"use client";

import dynamic from "next/dynamic";

// dynamic import with ssr: false — essential for react-bits shader components
const RippleGrid = dynamic(
  // try the installed package path first; fallback to local ./RippleGrid if you use that
  () => import("@/components/RippleGrid").then(mod => mod.default || mod),
  { ssr: false }
);

export default function TestRipplePage() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <header className="p-6 text-center">
        <h1 className="text-2xl font-bold">RippleGrid Test</h1>
        <p className="text-sm text-white/60 mt-2">If you see ripples, it works.</p>
      </header>

      {/* IMPORTANT: wrapper must have explicit height (h-screen or h-full inside fixed) */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative h-full w-full">
            <RippleGrid
              enableRainbow={false}
              gridColor="#ffffff"
              rippleIntensity={0.05}
              gridSize={10}
              gridThickness={15}
              mouseInteraction={true}
              mouseInteractionRadius={1.2}
              opacity={0.8}
            />
          </div>
        </div>
      </div>

      <main className="p-6">
        <p className="text-white/60">Move the mouse over the area to create ripples.</p>
      </main>
    </div>
  );
}
