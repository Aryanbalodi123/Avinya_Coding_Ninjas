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
    <div className="relative w-full max-w-[400px] min-h-[280px] md:h-[280px] group">
      
      {/* Animated gray glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gray-400/20 via-gray-300/20 to-gray-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* Outer glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-gray-400/15 to-gray-500/15 rounded-2xl blur opacity-50 group-hover:opacity-100 transition-all duration-500" />
      
      {/* CARD BODY */}
      <div 
        className="
          relative w-full h-full 
          bg-gradient-to-br from-gray-700/50 via-gray-600/40 to-gray-700/50
          backdrop-blur-xl
          border border-gray-500/20
          rounded-2xl
          shadow-[0_8px_32px_rgba(100,100,100,0.15)]
          hover:border-gray-400/40
          hover:shadow-[0_12px_48px_rgba(100,100,100,0.3)]
          transition-all duration-500
          overflow-hidden
          hover:scale-[1.03]
          hover:-translate-y-2
        "
      >
        {/* Animated scanline effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-gray-400/60 to-transparent blur-[1px]"
            style={{
              animation: 'scan 4s linear infinite',
              top: '0',
            }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(150,150,150,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,150,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/15 to-transparent"
            style={{
              animation: 'shimmer 2.5s ease-in-out infinite',
            }}
          />
        </div>

        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gray-400/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gray-400/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gray-400/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gray-400/50 opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* CONTENT LAYER */}
        <div className="relative z-10 h-full p-5 md:p-6 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-gray-500/20 to-gray-600/20 backdrop-blur-md
                border border-gray-400/30 flex items-center justify-center
                group-hover:border-gray-300/50 group-hover:shadow-[0_0_15px_rgba(150,150,150,0.3)]
                transition-all duration-500">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] md:text-xs font-bold text-gray-400/70 tracking-widest uppercase block">OPERATIVE</span>
                <span className="text-[9px] text-gray-300/40 font-mono">ID-{member.id.slice(0, 6)}</span>
              </div>
            </div>
            
            {/* Status indicator with pulse animation */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-500/10 border border-gray-400/20">
              <div className="relative">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full shadow-[0_0_8px_rgba(150,150,150,0.8)]" />
                <div className="absolute inset-0 w-1.5 h-1.5 bg-gray-400 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-[9px] md:text-[10px] text-gray-300/70 font-mono uppercase font-semibold">ACTIVE</span>
            </div>
          </div>

          {/* Main Info Section */}
          <div className="space-y-4 md:space-y-5 flex-1">
            {/* Name */}
            <div className="border-l-2 border-gray-400/40 pl-3 group-hover:border-gray-300/60 transition-colors duration-300">
              <p className="text-[9px] md:text-[10px] font-bold text-gray-400/50 uppercase tracking-wider mb-1">FULL NAME</p>
              <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 tracking-tight leading-tight">
                {member.name}
              </h3>
            </div>

            {/* Roll Number & Email in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-1 bg-gray-500/5 p-3 rounded-lg border border-gray-500/10 group-hover:bg-gray-500/10 group-hover:border-gray-400/20 transition-all duration-300">
                <p className="text-[9px] md:text-[10px] font-bold text-gray-400/50 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  ROLL NO.
                </p>
                <p className="text-sm md:text-base font-mono text-gray-100 font-bold tracking-wide">
                  {member.rollNumber}
                </p>
              </div>
              <div className="space-y-1 bg-gray-500/5 p-3 rounded-lg border border-gray-500/10 group-hover:bg-gray-500/10 group-hover:border-gray-400/20 transition-all duration-300">
                <p className="text-[9px] md:text-[10px] font-bold text-gray-400/50 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  EMAIL
                </p>
                <p className="text-[10px] md:text-[11px] text-gray-200/80 font-medium break-all leading-tight">
                  {member.email}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom accent line with animated pulse */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400/40 to-transparent group-hover:via-gray-300/60 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;