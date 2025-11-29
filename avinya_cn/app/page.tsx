"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const defaultTeamId = process.env.NEXT_PUBLIC_DEFAULT_TEAM_ID;

    if (defaultTeamId) {
      router.push(`/team/${defaultTeamId}`);
    } else {
      console.warn("No default team ID in .env, redirecting to team-01...");
      router.push("/team/team-01"); 
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white/50">
      <span className="animate-pulse">Loading Team Portal...</span>
    </div>
  );
}
