"use client";

import { motion, type Variants, type TargetAndTransition } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

// ---------- FIXED TYPE-SAFE VARIANT  ----------
type CustomVariant = (i: number) => TargetAndTransition;

const item: Variants & { show: CustomVariant } = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },

  // The magic: proper typed resolver
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};
// -------------------------------------------------

export default function EventMeta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      {/* Outer glow container */}
      <div className="relative group">
        {/* Animated outer glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-pink-500/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
        
        <div
          className="
            relative p-8 rounded-3xl 
            bg-gradient-to-br from-black/60 via-black/50 to-black/60
            backdrop-blur-md 
            border-2 border-cyan-400/30 
            shadow-[0_0_100px_rgba(0,255,255,0.2),inset_0_0_60px_rgba(0,255,255,0.1)]
            group-hover:border-cyan-300/50
            group-hover:shadow-[0_0_120px_rgba(0,255,255,0.4),inset_0_0_80px_rgba(0,255,255,0.15)]
            overflow-hidden
            transition-all duration-700
          "
        >
          {/* Holographic background pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300ffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
          
          {/* Backlight Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/15 via-purple-600/10 to-pink-600/15 blur-3xl -z-10"></div>

          {/* Animated scanlines */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "200%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0.5,
            }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none"
            style={{ height: '50%' }}
          />

          {/* Hologram Scanline */}
          <motion.div
            initial={{ x: "-120%" }}
            animate={{ x: "220%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent pointer-events-none"
          />
          
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400/60 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400/60 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-pink-400/60 rounded-br-lg" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-8 text-white relative z-10"
          >
            {/* VENUE */}
            <motion.div custom={0} variants={item} className="flex items-center gap-5 group/item">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full group-hover/item:bg-cyan-400/50 transition-all duration-500" />
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/40 to-cyan-600/40 
                  border-2 border-cyan-400/60 flex items-center justify-center
                  shadow-[0_0_30px_rgba(0,255,255,0.5)]
                  group-hover/item:shadow-[0_0_50px_rgba(0,255,255,0.8)]
                  group-hover/item:border-cyan-300/80
                  transition-all duration-500">
                  <MapPin size={28} className="text-cyan-200 drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]" />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70 font-bold mb-1.5 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
                  VENUE
                </p>
                <p className="text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-cyan-100
                  drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]">
                  Main Auditorium • Block A
                </p>
              </div>
            </motion.div>

            {/* DATE */}
            <motion.div custom={1} variants={item} className="flex items-center gap-5 group/item">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/30 blur-xl rounded-full group-hover/item:bg-purple-400/50 transition-all duration-500" />
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/40 to-purple-600/40 
                  border-2 border-purple-400/60 flex items-center justify-center
                  shadow-[0_0_30px_rgba(139,92,246,0.5)]
                  group-hover/item:shadow-[0_0_50px_rgba(139,92,246,0.8)]
                  group-hover/item:border-purple-300/80
                  transition-all duration-500">
                  <Calendar size={28} className="text-purple-200 drop-shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-purple-300/70 font-bold mb-1.5 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                  DATE
                </p>
                <p className="text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-100
                  drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                  12 December 2025
                </p>
              </div>
            </motion.div>

            {/* TIME */}
            <motion.div custom={2} variants={item} className="flex items-center gap-5 group/item">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-500/30 blur-xl rounded-full group-hover/item:bg-pink-400/50 transition-all duration-500" />
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500/40 to-pink-600/40 
                  border-2 border-pink-400/60 flex items-center justify-center
                  shadow-[0_0_30px_rgba(236,72,153,0.5)]
                  group-hover/item:shadow-[0_0_50px_rgba(236,72,153,0.8)]
                  group-hover/item:border-pink-300/80
                  transition-all duration-500">
                  <Clock size={28} className="text-pink-200 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-pink-300/70 font-bold mb-1.5 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                  TIME
                </p>
                <p className="text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-pink-100
                  drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                  6:00 PM — 9:00 PM
                </p>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Bottom neon accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/60 via-purple-500/60 to-pink-500/60 
            shadow-[0_0_20px_rgba(0,255,255,0.6)] blur-[1px]" />
        </div>
      </div>
    </motion.div>
  );
}
