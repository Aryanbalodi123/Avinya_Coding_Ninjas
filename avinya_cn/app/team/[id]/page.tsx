"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// --- IMPORTS ---
import GlassSurface from "@/components/GlassSurface"; 
import GlassNavbar from "@/components/GlassNavbar";   

// --- DYNAMIC IMPORT (THE FIX) ---
// This prevents the "White Screen" by loading the 3D canvas only on the client
const RippleGrid = dynamic(
  () => import("@/components/RippleGrid").then((mod) => mod.default || mod),
  { ssr: false }
);

// --- TEAM CARD COMPONENT ---
const TeamCard = ({ member, onAccept }: any) => {
  const [loading, setLoading] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="relative group">
      <GlassSurface
        width={300}
        height={380}
        borderRadius={30}
        displace={25}
        distortionScale={-150}
        redOffset={5}
        greenOffset={15}
        blueOffset={25}
        brightness={80}
        opacity={0.7}
        mixBlendMode="normal"
        // Force borders/shadows via style in case Tailwind is misbehaving
        style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
      >
        <div className="flex flex-col items-center justify-between h-full p-8 text-center relative z-10 text-white">
          
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="h-20 w-20 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-3xl font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {member.name.charAt(0)}
            </div>
            <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase border backdrop-blur-md ${member.hasAcceptedInvitation ? 'bg-emerald-500/80 border-emerald-400' : 'bg-amber-500/80 border-amber-400'}`}
                 style={{ backgroundColor: member.hasAcceptedInvitation ? 'rgba(16, 185, 129, 0.8)' : 'rgba(245, 158, 11, 0.8)' }}>
              {member.hasAcceptedInvitation ? 'Joined' : 'Pending'}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold drop-shadow-md">{member.name}</h3>
            <p className="text-xs text-white/60 font-mono tracking-widest uppercase">{member.rollNumber}</p>
            <p className="text-sm text-white/80 font-medium">{member.email}</p>
          </div>

          {/* Button */}
          {!member.hasAcceptedInvitation ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { setLoading(true); onAccept(member.id); }}
              disabled={loading}
              className="mt-6 w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-cyan-300 transition-colors shadow-lg"
              style={{ backgroundColor: 'white', color: 'black' }}
            >
              {loading ? 'Processing...' : 'Accept Invite'}
            </motion.button>
          ) : (
             <div className="mt-6 w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white/50 text-sm font-medium cursor-default">
               Member Active
             </div>
          )}
        </div>
      </GlassSurface>
    </motion.div>
  );
};

// --- MAIN PAGE ---
export default function TeamPage() {
  const params = useParams();
  const id = params?.id as string;
  const [team, setTeam] = useState<any>(null);

  useEffect(() => {
    if(!id) return;
    fetch(`/api/teams/${id}`).then(res => res.json()).then(setTeam);
  }, [id]);

  // Loading State
  if (!team) return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white font-bold" style={{backgroundColor: '#000'}}>
      Loading Data...
    </div>
  );

  return (
    // MAIN CONTAINER: Forced Black
    <div 
      className="relative w-full min-h-screen text-white overflow-x-hidden bg-black"
      style={{ backgroundColor: '#000000' }}
    >
      
      {/* 1. BACKGROUND LAYER (Fixed & Dynamic) */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto">
         {/* Using the wrapper structure that worked in your test file */}
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

      {/* 2. NAVBAR */}
      <GlassNavbar links={[{ label: 'Dashboard', href: '/' }, { label: 'Members', href: '#members' }]} />

      {/* 3. CONTENT LAYER (Scrolls over background) */}
      <main className="relative z-10 w-full flex flex-col items-center pt-32 pb-40 px-4 pointer-events-none">
        
        {/* Hero Title */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-20 pointer-events-auto"
        >
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-md">
            Team Workspace
          </span>
          <h1 className="mt-6 text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-2xl">
            {team.teamName}
          </h1>
        </motion.div>

        {/* Cards Grid */}
        <div id="members" className="flex flex-wrap justify-center gap-10 max-w-[1400px] pointer-events-auto">
          <AnimatePresence>
            {team.members.map((member: any, i: number) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <TeamCard member={member} onAccept={() => {}} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}