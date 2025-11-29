"use client";

import React from "react";
import { cn } from "@/lib/utils";

// --- GLASS FILTER (Export this to use in your page) ---
export function GlassFilter() {
  return (
    <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        <filter
          id="liquid-glass-filter"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          {/* Create turbulent noise for distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.1 0.15"
            numOctaves="4"
            seed="7"
            result="turbulence"
          />
          
          {/* Blur the noise pattern heavily */}
          <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredNoise" />
          
          {/* Very subtle displacement */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          
          {/* Optimized blur for frosted glass */}
          <feGaussianBlur in="displaced" stdDeviation="15" result="ultraBlur" />
          
          {/* Composite for final output */}
          <feComposite in="ultraBlur" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

// --- ID CARD COMPONENT ---
interface TeamCardProps {
  member: {
    id: string;
    name: string;
    rollNumber: string;
    email: string;
    hasAcceptedInvitation?: boolean;
  };
  onAccept?: (id: string) => void;
}

const TeamCard = ({ member }: TeamCardProps) => {
  return (
    <div className="relative w-full max-w-[400px] h-[240px] group">
      
      {/* Animated glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* CARD BODY */}
      <div 
        className="
          relative w-full h-full 
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          rounded-xl
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          hover:border-white/30
          hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)]
          transition-all duration-500
          overflow-hidden
          hover:scale-[1.02]
          hover:-translate-y-1
        "
      >
        {/* Animated scanline effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm"
            style={{
              animation: 'scan 3s linear infinite',
              top: '0',
            }}
          />
        </div>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            style={{
              animation: 'shimmer 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-white/30 rounded-tl opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/30 rounded-tr opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-white/30 rounded-bl opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-white/30 rounded-br opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* CONTENT LAYER */}
        <div className="relative z-10 h-full p-6 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-md
                border border-white/20 flex items-center justify-center
                group-hover:bg-white/15 transition-all duration-500">
                <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-white/50 tracking-wider uppercase">OPERATIVE ID</span>
            </div>
            
            {/* Status indicator with pulse animation */}
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-[10px] text-white/40 font-mono uppercase">ACTIVE</span>
            </div>
          </div>

          {/* Main Info Section */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1.5">FULL NAME</p>
              <h3 className="text-2xl font-bold text-white/95 tracking-tight group-hover:text-white transition-colors duration-300">
                {member.name}
              </h3>
            </div>

            {/* Roll Number & Email in Grid */}
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">ROLL NO.</p>
                <p className="text-sm font-mono text-white/90 font-semibold">
                  {member.rollNumber}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">CONTACT</p>
                <p className="text-[11px] text-white/80 font-medium truncate">
                  {member.email}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;