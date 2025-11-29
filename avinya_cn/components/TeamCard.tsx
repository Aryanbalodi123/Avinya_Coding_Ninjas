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
          <feGaussianBlur in="turbulence" stdDeviation="5" result="blurredNoise" />
          
          {/* Very subtle displacement */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          
          {/* EXTREME blur for ultra-frosted glass */}
          <feGaussianBlur in="displaced" stdDeviation="30" result="ultraBlur" />
          
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
    <div className="relative w-full max-w-[380px] h-[220px] group perspective-1000">
      
      {/* FROSTED ID CARD BODY - with corner cut */}
      <div 
        className="
          relative w-full h-full 
          transition-all duration-500 ease-out
          group-hover:scale-[1.02] group-hover:-translate-y-1
        "
        style={{
          clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)'
        }}
      >
        
        {/* 1. ULTRA FROSTED BACKDROP */}
        <div
          className="absolute inset-0"
          style={{ 
            backdropFilter: 'url("#liquid-glass-filter") blur(35px) saturate(1.8) brightness(1.15)',
            WebkitBackdropFilter: 'url("#liquid-glass-filter") blur(35px) saturate(1.8) brightness(1.15)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
            clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)'
          }}
        />

        {/* 2. FROSTED TEXTURE LAYER */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'3.5\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.3\'/%3E%3C/svg%3E")',
            backgroundSize: '150px 150px',
          }}
        />

        {/* 3. GLOWING ANIMATED BORDERS */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 rounded-sm
            transition-all duration-500
          "
          style={{
            clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)'
          }}
        >
          {/* Outer glow border */}
          <div className="absolute inset-0 border-2 border-white/25 
            shadow-[0_0_20px_rgba(255,255,255,0.2),inset_0_0_30px_rgba(255,255,255,0.15)]
            group-hover:border-white/40
            group-hover:shadow-[0_0_30px_rgba(255,255,255,0.4),inset_0_0_40px_rgba(255,255,255,0.25)]
            transition-all duration-500"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)'
            }}
          />
          
          {/* Inner shimmer border */}
          <div className="absolute inset-[3px] border border-white/30
            group-hover:border-white/50
            transition-all duration-500"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)'
            }}
          />
          
          {/* Animated edge glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-0 right-[30px] h-[2px] bg-gradient-to-r from-cyan-300/60 via-white/80 to-purple-300/60 blur-sm" />
            <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-cyan-300/60 via-white/80 to-purple-300/60 blur-sm" />
          </div>
        </div>

        {/* 4. Corner Cut Accent with Glow */}
        <div className="absolute top-0 right-0 w-[32px] h-[32px] z-30">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/50 to-purple-400/50 
            opacity-0 group-hover:opacity-100 transition-all duration-500
            shadow-[0_0_15px_rgba(34,211,238,0.5)]
            blur-[1px]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
            }}
          />
          {/* Corner cut border line */}
          <div className="absolute top-0 right-0 w-[30px] h-[2px] bg-white/30 blur-[0.5px]" 
            style={{ transform: 'rotate(45deg)', transformOrigin: 'top right' }}
          />
        </div>

        {/* 5. FROSTED GLASS SHINE */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent 
          opacity-60 pointer-events-none z-10"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)'
          }}
        />

        {/* 6. CONTENT LAYER - ID Card Layout */}
        <div className="relative z-30 h-full p-6 flex flex-col justify-between">
          
          {/* Header with ID Badge Icon */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white/20 border border-white/30 flex items-center justify-center 
                backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.2)]
                group-hover:bg-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]
                transition-all duration-300">
                <svg className="w-4 h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <span className="text-[10px] font-bold text-white/70 tracking-wider uppercase 
                drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Member ID</span>
            </div>
          </div>

          {/* Main Info Section */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <p className="text-[10px] font-medium text-white/60 uppercase tracking-wider mb-1 
                drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Full Name</p>
              <h3 className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] tracking-tight">
                {member.name}
              </h3>
            </div>

            {/* Roll Number & Email in Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] font-medium text-white/60 uppercase tracking-wider mb-1
                  drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Roll No.</p>
                <p className="text-sm font-mono text-white/95 font-semibold
                  drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                  {member.rollNumber}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-medium text-white/60 uppercase tracking-wider mb-1
                  drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Contact</p>
                <p className="text-[11px] text-white/90 font-medium truncate
                  drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                  {member.email}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Accent Bar with Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] 
            bg-gradient-to-r from-cyan-400/40 via-purple-400/50 to-cyan-400/40 
            opacity-70 group-hover:opacity-100 
            group-hover:shadow-[0_0_10px_rgba(34,211,238,0.6)]
            transition-all duration-500 blur-[0.5px]" />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;