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
      className="w-full max-w-xl mx-auto px-4"
    >
      <div
        className="
          relative p-6 rounded-3xl 
          bg-black/40 backdrop-blur-xl 
          border border-white/10 
          shadow-[0_0_90px_rgba(0,255,255,0.15)]
          overflow-hidden
        "
      >
        {/* Backlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-purple-600/10 blur-3xl -z-10"></div>

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
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-7 text-white"
        >
          {/* VENUE */}
          <motion.div custom={0} variants={item} className="flex items-center gap-4">
            <MapPin size={32} className="text-cyan-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.4)]" />
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-200/50 font-mono">Venue</p>
              <p className="text-2xl font-bold leading-tight">
                Main Auditorium • Block A
              </p>
            </div>
          </motion.div>

          {/* DATE */}
          <motion.div custom={1} variants={item} className="flex items-center gap-4">
            <Calendar size={32} className="text-pink-300 drop-shadow-[0_0_8px_rgba(255,0,255,0.4)]" />
            <div>
              <p className="text-xs uppercase tracking-widest text-pink-200/50 font-mono">Date</p>
              <p className="text-2xl font-bold leading-tight">
                12 December 2025
              </p>
            </div>
          </motion.div>

          {/* TIME */}
          <motion.div custom={2} variants={item} className="flex items-center gap-4">
            <Clock size={32} className="text-purple-300 drop-shadow-[0_0_8px_rgba(200,0,255,0.4)]" />
            <div>
              <p className="text-xs uppercase tracking-widest text-purple-200/50 font-mono">Time</p>
              <p className="text-2xl font-bold leading-tight">
                6:00 PM — 9:00 PM
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
