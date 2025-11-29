import { redirect } from "next/navigation";

// Force this page to be dynamic so it checks the Env Var on every request
// (Useful if you change the Default ID in Vercel later without rebuilding)
export const dynamic = "force-dynamic";

export default function Home() {
  // 1. Get the ID from Environment Variables
  const defaultTeamId = process.env.NEXT_PUBLIC_DEFAULT_TEAM_ID;

  // 2. If it exists, redirect immediately
  if (defaultTeamId) {
    redirect(`/team/${defaultTeamId}`);
  }

  // 3. Fallback: If Env Var is missing, show error
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4 text-center font-mono">
      <div className="border border-red-500/50 bg-red-900/10 p-8 rounded-xl backdrop-blur-md">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Configuration Error</h1>
        <p className="text-white/70 mb-2">
          The system could not find the <code>NEXT_PUBLIC_DEFAULT_TEAM_ID</code> variable.
        </p>
        <p className="text-sm text-white/40">
          Check your Vercel Project Settings {'>'} Environment Variables.
        </p>
      </div>
    </div>
  );
}