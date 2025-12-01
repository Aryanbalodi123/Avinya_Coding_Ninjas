"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";

export default function PrizePool() {
  const prizes = [
    {
      position: "1st",
      amount: "₹5,000",
      title: "Gold Medal",
      icon: Trophy,
      color: "from-yellow-400 via-amber-400 to-yellow-500",
      glow: "rgba(251,191,36,0.4)",
      borderColor: "border-yellow-400/40",
      shadowColor: "shadow-[0_0_40px_rgba(251,191,36,0.3)]",
      delay: 0,
    },
    {
      position: "2nd",
      amount: "₹3,000",
      title: "Silver Medal",
      icon: Award,
      color: "from-gray-300 via-gray-200 to-gray-300",
      glow: "rgba(209,213,219,0.4)",
      borderColor: "border-gray-300/40",
      shadowColor: "shadow-[0_0_40px_rgba(209,213,219,0.3)]",
      delay: 0.2,
    },
    {
      position: "3rd",
      amount: "₹2,000",
      title: "Bronze Medal",
      icon: Medal,
      color: "from-orange-600 via-amber-700 to-orange-600",
      glow: "rgba(234,88,12,0.4)",
      borderColor: "border-orange-500/40",
      shadowColor: "shadow-[0_0_40px_rgba(234,88,12,0.3)]",
      delay: 0.4,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto px-4 md:px-6"
    >
      <div className="relative group">
        {/* Animated glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 via-gray-400/20 to-gray-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700" />

        <div className="relative p-6 md:p-10 rounded-3xl bg-gradient-to-br from-gray-700/50 via-gray-600/40 to-gray-700/50 backdrop-blur-xl border border-gray-500/20 shadow-[0_8px_32px_rgba(100,100,100,0.15)] overflow-hidden">
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(150,150,150,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,150,0.3) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/10 to-transparent"
              style={{
                animation: "shimmer 2.5s ease-in-out infinite",
              }}
            />
          </div>

          {/* Corner brackets */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-gray-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gray-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-gray-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-gray-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          <div className="relative z-10">
            {/* Prize Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {prizes.map((prize) => {
                const Icon = prize.icon;
                return (
                  <motion.div
                    key={prize.position}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: prize.delay, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="relative group/card"
                  >
                    {/* Glow effect */}
                    <div
                      className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-all duration-500"
                      style={{ background: `radial-gradient(circle, ${prize.glow}, transparent)` }}
                    />

                    <div
                      className={`relative p-6 md:p-8 rounded-2xl backdrop-blur-md border-2 ${prize.borderColor} ${prize.shadowColor} bg-gradient-to-br from-gray-800/40 to-gray-900/40 overflow-hidden transition-all duration-500 group-hover/card:border-opacity-80`}
                    >
                      {/* Scanline effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                        <div
                          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          style={{
                            animation: "scan 3s linear infinite",
                          }}
                        />
                      </div>

                      {/* Position badge */}
                      <div className="absolute top-3 right-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${prize.color} text-black backdrop-blur-sm`}>
                          {prize.position}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="flex justify-center mb-4">
                        <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${prize.color} flex items-center justify-center ${prize.shadowColor} group-hover/card:scale-110 transition-transform duration-500`}>
                          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: `linear-gradient(to bottom right, ${prize.glow}, transparent)` }} />
                          <Icon className="w-10 h-10 md:w-12 md:h-12 text-black relative z-10" strokeWidth={2.5} />
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className={`text-lg md:text-xl font-bold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r ${prize.color}`}>
                        {prize.title}
                      </h4>

                      {/* Amount */}
                      <div className="text-center">
                        <div className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${prize.color} drop-shadow-[0_0_15px_${prize.glow}]`}>
                          {prize.amount}
                        </div>
                      </div>

                      {/* Decorative line */}
                      <div className="mt-4 h-[2px] bg-gradient-to-r from-transparent via-gray-400/30 to-transparent group-hover/card:via-gray-300/50 transition-all duration-500" />

                      {/* Bottom accent dots */}
                      <div className="flex justify-center gap-2 mt-4">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${prize.color}`} />
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${prize.color} opacity-60`} />
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${prize.color} opacity-30`} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 md:mt-10 text-center"
            >
              <div className="inline-block px-6 py-3 rounded-xl bg-gray-500/10 border border-gray-400/20 backdrop-blur-sm">
                <p className="text-xs md:text-sm text-gray-300/70 font-medium">
                  <span className="text-gray-200 font-bold">Total Prize Pool:</span> ₹10,000
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-400/40 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}
