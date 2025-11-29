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
    <div className="relative w-full max-w-[400px] h-[240px] group perspective-1000">
      
      {/* Outer glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
      
      {/* FUTURISTIC CARD BODY */}
      <div 
        className="
          relative w-full h-full 
          transition-all duration-700 ease-out
          group-hover:scale-[1.03] group-hover:-translate-y-2
          group-hover:rotate-x-2
        "
        style={{
          clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)',
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* 1. HOLOGRAPHIC BACKDROP */}
        <div
          className="absolute inset-0"
          style={{ 
            backdropFilter: 'blur(40px) saturate(2)',
            WebkitBackdropFilter: 'blur(40px) saturate(2)',
            background: 'linear-gradient(135deg, rgba(100,255,255,0.25) 0%, rgba(200,100,255,0.2) 50%, rgba(255,100,200,0.18) 100%)',
            clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)'
          }}
        />

        {/* 2. HOLOGRAPHIC TEXTURE LAYER */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'4\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.4\'/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px',
          }}
        />
        
        {/* Animated scanline effect */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)' }}>
          <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-scan-line" 
            style={{
              animation: 'scan 3s linear infinite',
              boxShadow: '0 0 10px rgba(0,255,255,0.8)'
            }}
          />
        </div>

        {/* 3. NEON ANIMATED BORDERS */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 rounded-sm
            transition-all duration-700
          "
          style={{
            clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)'
          }}
        >
          {/* Neon outer glow border */}
          <div className="absolute inset-0 border-2 border-cyan-400/30 
            shadow-[0_0_30px_rgba(0,255,255,0.3),inset_0_0_40px_rgba(0,255,255,0.1),0_0_60px_rgba(139,92,246,0.2)]
            group-hover:border-cyan-300/60
            group-hover:shadow-[0_0_50px_rgba(0,255,255,0.6),inset_0_0_60px_rgba(0,255,255,0.2),0_0_80px_rgba(139,92,246,0.4)]
            transition-all duration-700"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)'
            }}
          />
          
          {/* Inner holographic shimmer border */}
          <div className="absolute inset-[3px] border border-purple-400/40
            group-hover:border-purple-300/70
            transition-all duration-700"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 33px) 0, 100% 33px, 100% 100%, 0 100%)',
              boxShadow: 'inset 0 0 20px rgba(139,92,246,0.2)'
            }}
          />
          
          {/* Animated edge glow - multi-color */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute top-0 left-0 right-[35px] h-[3px] bg-gradient-to-r from-cyan-400/80 via-purple-400/80 to-pink-400/80 blur-sm animate-pulse" 
              style={{ boxShadow: '0 0 15px rgba(0,255,255,0.8)' }}
            />
            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-cyan-400/80 via-purple-400/80 to-pink-400/80 blur-sm animate-pulse" 
              style={{ boxShadow: '0 0 15px rgba(0,255,255,0.8)' }}
            />
          </div>
        </div>

        {/* 4. Corner Cut Accent with Holographic Glow */}
        <div className="absolute top-0 right-0 w-[37px] h-[37px] z-30">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/60 via-purple-500/60 to-pink-500/60 
            opacity-70 group-hover:opacity-100 transition-all duration-700
            shadow-[0_0_25px_rgba(0,255,255,0.8)]
            blur-[2px] animate-pulse"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
          {/* Corner cut border line with neon glow */}
          <div className="absolute top-0 right-0 w-[35px] h-[3px] bg-cyan-400/80 blur-[1px]" 
            style={{ 
              transform: 'rotate(45deg)', 
              transformOrigin: 'top right',
              boxShadow: '0 0 10px rgba(0,255,255,0.9)'
            }}
          />
        </div>

        {/* 5. HOLOGRAPHIC GLASS SHINE */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 via-purple-300/10 to-pink-300/5 
          opacity-50 group-hover:opacity-70 pointer-events-none z-10 transition-opacity duration-700"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)'
          }}
        />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)' }}
        >
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full blur-sm animate-float" />
          <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full blur-sm animate-float-delay" />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-pink-400 rounded-full blur-sm animate-float-slow" />
        </div>

        {/* 6. CONTENT LAYER - Futuristic ID Card */}
        <div className="relative z-30 h-full p-7 flex flex-col justify-between">
          
          {/* Header with holographic badge */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/30 to-purple-600/30 
                border-2 border-cyan-400/40 flex items-center justify-center 
                backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.4)]
                group-hover:border-cyan-300/60 group-hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]
                transition-all duration-700 relative overflow-hidden">
                {/* Holographic shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                  animate-shimmer" style={{ animation: 'shimmer 2s infinite' }} />
                <svg className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-cyan-300/90 tracking-widest uppercase 
                drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]">OPERATIVE ID</span>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
              <span className="text-[9px] text-cyan-300/70 font-mono uppercase">ACTIVE</span>
            </div>
          </div>

          {/* Main Info Section */}
          <div className="space-y-5">
            {/* Name with holographic effect */}
            <div>
              <p className="text-[10px] font-bold text-purple-300/80 uppercase tracking-[0.2em] mb-1.5 
                drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">FULL NAME</p>
              <h3 className="text-2xl font-black text-transparent bg-clip-text 
                bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 
                drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] 
                tracking-tight group-hover:tracking-wide transition-all duration-700">
                {member.name}
              </h3>
            </div>

            {/* Roll Number & Email in Grid with enhanced styling */}
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-pink-300/80 uppercase tracking-[0.15em]
                  drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">ROLL NO.</p>
                <p className="text-sm font-mono text-cyan-100 font-bold
                  drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
                  style={{ textShadow: '0 0 10px rgba(0,255,255,0.5)' }}>
                  {member.rollNumber}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-bold text-purple-300/80 uppercase tracking-[0.15em]
                  drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]">CONTACT</p>
                <p className="text-[10px] text-purple-100/90 font-semibold truncate
                  drop-shadow-[0_0_8px_rgba(139,92,246,0.4)]">
                  {member.email}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Accent Bar with animated glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] 
            bg-gradient-to-r from-cyan-500/60 via-purple-500/70 to-pink-500/60 
            opacity-80 group-hover:opacity-100 
            group-hover:shadow-[0_0_20px_rgba(0,255,255,0.8),0_0_40px_rgba(139,92,246,0.5)]
            transition-all duration-700 blur-[1px]" />
        </div>
      </div>
    </div>
  );
};

export default TeamCard;