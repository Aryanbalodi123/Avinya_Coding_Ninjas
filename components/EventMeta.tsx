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
      className="w-full max-w-3xl mx-auto px-4 md:px-6"
    >
      {/* Outer container */}
      <div className="relative group">
        
        {/* Animated cyan glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-all duration-700" />
        
        <div
          className="
            relative p-6 md:p-10 rounded-3xl 
            bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-cyan-950/40
            backdrop-blur-xl
            border border-cyan-500/20
            shadow-[0_8px_32px_rgba(6,182,212,0.15)]
            group-hover:border-cyan-400/40
            group-hover:shadow-[0_12px_48px_rgba(6,182,212,0.25)]
            overflow-hidden
            transition-all duration-500
          "
        >
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent"
              style={{
                animation: 'shimmer 2.5s ease-in-out infinite',
              }}
            />
          </div>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-cyan-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-5 md:gap-7 text-white relative z-10"
          >
            {/* VENUE */}
            <motion.div custom={0} variants={item} className="flex items-start md:items-center gap-4 md:gap-6 group/item">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 bg-cyan-500/30 blur-md opacity-60 group-hover/item:opacity-100 transition-all duration-500" />
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                  backdrop-blur-md border border-cyan-400/30 flex items-center justify-center
                  group-hover/item:border-cyan-300/50 group-hover/item:shadow-[0_0_20px_rgba(6,182,212,0.4)]
                  transition-all duration-500">
                  <MapPin className="w-6 h-6 md:w-7 md:h-7 text-cyan-300" />
                </div>
              </div>
              <div className="flex-1 border-l-2 border-cyan-400/30 pl-4 md:pl-5 group-hover/item:border-cyan-300/50 transition-colors duration-300">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-cyan-400/60 font-bold mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(6,182,212,0.8)]"></span>
                  VENUE
                </p>
                <p className="text-lg md:text-2xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-100 to-blue-200">
                  Henry Ford Hall
                </p>
                <p className="text-sm md:text-base text-cyan-300/70 font-medium mt-0.5">Martin Luther</p>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

            {/* DATE */}
            <motion.div custom={1} variants={item} className="flex items-start md:items-center gap-4 md:gap-6 group/item">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 bg-cyan-500/30 blur-md opacity-60 group-hover/item:opacity-100 transition-all duration-500" />
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                  backdrop-blur-md border border-cyan-400/30 flex items-center justify-center
                  group-hover/item:border-cyan-300/50 group-hover/item:shadow-[0_0_20px_rgba(6,182,212,0.4)]
                  transition-all duration-500">
                  <Calendar className="w-6 h-6 md:w-7 md:h-7 text-cyan-300" />
                </div>
              </div>
              <div className="flex-1 border-l-2 border-cyan-400/30 pl-4 md:pl-5 group-hover/item:border-cyan-300/50 transition-colors duration-300">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-cyan-400/60 font-bold mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(6,182,212,0.8)]"></span>
                  DATE
                </p>
                <p className="text-lg md:text-2xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-100 to-blue-200">
                  2nd December 2025
                </p>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

            {/* TIME */}
            <motion.div custom={2} variants={item} className="flex items-start md:items-center gap-4 md:gap-6 group/item">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 bg-cyan-500/30 blur-md opacity-60 group-hover/item:opacity-100 transition-all duration-500" />
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                  backdrop-blur-md border border-cyan-400/30 flex items-center justify-center
                  group-hover/item:border-cyan-300/50 group-hover/item:shadow-[0_0_20px_rgba(6,182,212,0.4)]
                  transition-all duration-500">
                  <Clock className="w-6 h-6 md:w-7 md:h-7 text-cyan-300" />
                </div>
              </div>
              <div className="flex-1 border-l-2 border-cyan-400/30 pl-4 md:pl-5 group-hover/item:border-cyan-300/50 transition-colors duration-300">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] text-cyan-400/60 font-bold mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_rgba(6,182,212,0.8)]"></span>
                  TIME
                </p>
                <p className="text-lg md:text-2xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-100 to-blue-200">
                  9:30 AM Onwards
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent group-hover:via-cyan-300/60 transition-all duration-500" />
        </div>
      </div>
    </motion.div>
  );
}
