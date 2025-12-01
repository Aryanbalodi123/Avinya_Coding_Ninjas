"use client";

import { motion } from "framer-motion";
import { Mail, Phone, User, Sparkles } from "lucide-react";

export default function ContactUs() {
  const coordinators = [
    {
      name: "Ansh Chahal",
      phone: "+91 9499188732",
      email: "ansh@chitkara.edu.in",
      role: "Event Coordinator",
      delay: 0,
    },
    {
      name: "Anishka",
      phone: "+91 7082534677",
      role: "Event Coordinator",
      delay: 0.2,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto px-4 md:px-6"
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
            {/* Coordinators Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {coordinators.map((coordinator) => (
                <motion.div
                  key={coordinator.name}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: coordinator.delay, duration: 0.6 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  className="relative group/card"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-400/30 via-gray-300/30 to-gray-400/30 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-all duration-500" />

                  <div className="relative p-6 md:p-8 rounded-2xl backdrop-blur-md border-2 border-gray-500/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50 overflow-hidden transition-all duration-500 group-hover/card:border-gray-400/50 shadow-[0_8px_32px_rgba(100,100,100,0.2)] group-hover/card:shadow-[0_12px_48px_rgba(100,100,100,0.35)]">
                    {/* Scanline effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                      <div
                        className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-gray-300/40 to-transparent"
                        style={{
                          animation: "scan 3s linear infinite",
                        }}
                      />
                    </div>

                    {/* Role badge */}
                    <div className="absolute top-3 right-3">
                      <div className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 text-black backdrop-blur-sm uppercase tracking-wider">
                        Coordinator
                      </div>
                    </div>

                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-400 via-gray-300 to-gray-400 flex items-center justify-center shadow-[0_0_30px_rgba(150,150,150,0.4)] group-hover/card:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-gradient-to-br from-gray-400 to-gray-300" />
                        <User className="w-8 h-8 md:w-10 md:h-10 text-black relative z-10" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Name */}
                    <h4 className="text-xl md:text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
                      {coordinator.name}
                    </h4>

                    {/* Contact Details */}
                    <div className="space-y-4">
                      {/* Phone */}
                      <a
                        href={`tel:${coordinator.phone}`}
                        className="group/link flex items-center gap-3 p-3 rounded-xl bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20 hover:border-gray-300/40 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500/30 to-gray-600/30 border border-gray-400/30 flex items-center justify-center group-hover/link:scale-110 transition-transform duration-300">
                          <Phone className="w-5 h-5 text-gray-200" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] md:text-xs text-gray-400/70 uppercase font-bold tracking-wider">
                            Phone
                          </p>
                          <p className="text-sm md:text-base text-gray-100 font-mono font-semibold">
                            {coordinator.phone}
                          </p>
                        </div>
                      </a>

                      {/* Email (if available) */}
                      {coordinator.email && (
                        <a
                          href={`mailto:${coordinator.email}`}
                          className="group/link flex items-center gap-3 p-3 rounded-xl bg-gray-500/10 border border-gray-400/20 hover:bg-gray-500/20 hover:border-gray-300/40 transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500/30 to-gray-600/30 border border-gray-400/30 flex items-center justify-center group-hover/link:scale-110 transition-transform duration-300">
                            <Mail className="w-5 h-5 text-gray-200" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] md:text-xs text-gray-400/70 uppercase font-bold tracking-wider">
                              Email
                            </p>
                            <p className="text-xs md:text-sm text-gray-100 font-medium break-all">
                              {coordinator.email}
                            </p>
                          </div>
                        </a>
                      )}
                    </div>

                    {/* Decorative line */}
                    <div className="mt-6 h-[2px] bg-gradient-to-r from-transparent via-gray-400/30 to-transparent group-hover/card:via-gray-300/50 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 md:mt-10 text-center"
            >
              <div className="inline-block px-6 py-3 rounded-xl bg-gray-500/10 border border-gray-400/20 backdrop-blur-sm">
                <p className="text-xs md:text-sm text-gray-300/70 font-medium">
                  <span className="text-gray-200 font-bold">Need assistance?</span> Feel free to reach out to our coordinators
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
