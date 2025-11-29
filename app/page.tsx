import { redirect } from "next/navigation";

export default function Home() {
  // 1. Try to get the ID from Environment Variables
  const defaultTeamId = process.env.NEXT_PUBLIC_DEFAULT_TEAM_ID;

  // 2. If it exists, redirect immediately (Server-side)
  if (defaultTeamId) {
    redirect(`/team/${defaultTeamId}`);
  }

  // 3. Fallback: If no Env Var is set, don't 404. Show a helpful message instead.
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4 text-center">
      <h1 className="text-2xl font-bold text-red-500 mb-2">Configuration Error</h1>
      <p className="text-white/70">
        No <code>NEXT_PUBLIC_DEFAULT_TEAM_ID</code> found in environment variables.
      </p>
      <p className="text-sm text-white/50 mt-4">
        Please add this variable in your Vercel Project Settings.
      </p>
    </div>
  );
}