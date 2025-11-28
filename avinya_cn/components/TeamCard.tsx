"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Adjust import path based on where npx installed it
import GlassSurface from './GlassSurface'; 

const TeamCard = ({ member, onAccept }: any) => {
  const [loading, setLoading] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="relative group"
    >
      <GlassSurface
        width={300}
        height={380}
        borderRadius={30}
        displace={25}             // Strong glass distortion
        distortionScale={-150}    // Liquid effect
        redOffset={5}             // Chromatic aberration (RGB Split)
        greenOffset={15}
        blueOffset={25}
        brightness={80}           // Bright glass
        opacity={0.7}
        mixBlendMode="normal"     // Clean look
        className="shadow-2xl shadow-black/50"
      >
        <div className="flex flex-col items-center justify-between h-full p-8 text-center relative z-10">
          
          {/* Avatar Area */}
          <div className="relative mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {member.name.charAt(0)}
            </div>
            {/* Status Badge */}
            <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md shadow-lg ${member.hasAcceptedInvitation ? 'bg-emerald-500/80 text-white border-emerald-400' : 'bg-amber-500/80 text-white border-amber-400'}`}>
              {member.hasAcceptedInvitation ? 'Joined' : 'Pending'}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white drop-shadow-md">
              {member.name}
            </h3>
            <p className="text-xs text-white/60 font-mono tracking-widest uppercase">
              {member.rollNumber}
            </p>
            <p className="text-sm text-white/80 font-medium">
              {member.email}
            </p>
          </div>

          {/* Action Button */}
          {!member.hasAcceptedInvitation ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { setLoading(true); onAccept(member.id); }}
              disabled={loading}
              className="mt-6 w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-cyan-300 transition-colors shadow-lg"
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

export default TeamCard;