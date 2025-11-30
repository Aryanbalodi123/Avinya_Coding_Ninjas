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
      className="w-full max-w-2xl mx-auto px-4 md:px-6"
    >
      {/* Outer container */}
      <div className="relative group">
        
        <div
          className="
            relative p-6 md:p-8 rounded-2xl 
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.3)]
            group-hover:border-white/30
            overflow-hidden
            transition-all duration-500
          "
        >
          
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6 md:gap-8 text-white relative z-10"
          >
            {/* VENUE */}
            <motion.div custom={0} variants={item} className="flex items-start md:items-center gap-4 md:gap-5 group/item">
              <div className="relative flex-shrink-0">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/10
                  backdrop-blur-md border border-white/20 flex items-center justify-center
                  transition-all duration-500">
                  <MapPin size={20} className="md:w-6 md:h-6 text-white/90" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/50 font-semibold mb-1">
                  VENUE
                </p>
                <p className="text-lg md:text-2xl font-bold leading-tight text-white/95">
                  Main Auditorium • Block A
                </p>
              </div>
            </motion.div>

            {/* DATE */}
            <motion.div custom={1} variants={item} className="flex items-start md:items-center gap-4 md:gap-5 group/item">
              <div className="relative flex-shrink-0">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/10
                  backdrop-blur-md border border-white/20 flex items-center justify-center
                  transition-all duration-500">
                  <Calendar size={20} className="md:w-6 md:h-6 text-white/90" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/50 font-semibold mb-1">
                  DATE
                </p>
                <p className="text-lg md:text-2xl font-bold leading-tight text-white/95">
                  12 December 2025
                </p>
              </div>
            </motion.div>

            {/* TIME */}
            <motion.div custom={2} variants={item} className="flex items-start md:items-center gap-4 md:gap-5 group/item">
              <div className="relative flex-shrink-0">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/10
                  backdrop-blur-md border border-white/20 flex items-center justify-center
                  transition-all duration-500">
                  <Clock size={20} className="md:w-6 md:h-6 text-white/90" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/50 font-semibold mb-1">
                  TIME
                </p>
                <p className="text-lg md:text-2xl font-bold leading-tight text-white/95">
                  6:00 PM — 9:00 PM
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
