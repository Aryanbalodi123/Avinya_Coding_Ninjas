"use client";
import React from 'react';
import { motion } from 'framer-motion';

const TeamHero = ({ teamName, teamId }: { teamName: string; teamId: string }) => {
  return (
    <div className="relative w-full h-[60vh] flex flex-col items-center justify-center z-10">
      
      {/* Decorative Blur behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px]" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-center"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 mb-6 tracking-widest uppercase">
          {teamId} • Dashboard
        </span>
        
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 drop-shadow-2xl">
          {teamName}
        </h1>
        
        <p className="mt-6 text-lg text-white/40 max-w-lg mx-auto leading-relaxed">
          Manage your squad. Accept invitations. <br />
          <span className="text-white/80">Experience the future of team management.</span>
        </p>
      </motion.div>
    </div>
  );
};

export default TeamHero;