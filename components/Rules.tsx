"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Rule {
  id: number;
  title: string;
  description: string;
}

interface RulesProps {
  rules?: Rule[];
}

const defaultRules: Rule[] = [
  {
    id: 1,
    title: "Venue & Timing",
    description: "Kindly reach the venue i.e. Henry Ford Hall, Martin Luther at 09:30 AM sharp.",
  },
  {
    id: 2,
    title: "Essential Items",
    description: "Carry your laptops, chargers and necessary accessories with you.",
  },
  {
    id: 3,
    title: "Prize Pool",
    description: "Prizes worth Rs. 5000, Rs. 3000, and Rs. 2000 will be given to top 3 positions.",
  }
];

const Rules: React.FC<RulesProps> = ({ rules = defaultRules }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef} className="w-full relative py-16 md:py-32 px-4 overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* RULES CARDS */}
        <div className="space-y-6 md:space-y-8">
          {rules.map((rule, index) => {
            const cardRef = React.useRef<HTMLDivElement | null>(null);
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={rule.id}
                ref={cardRef}
                initial={{
                  opacity: 0,
                  y: 30
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{ once: true, margin: "-50px", amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative group w-full"
              >
                {/* Outer Glow Container */}
                <div className="relative">
                  {/* Subtle Static Glow Effect */}
                  <div
                    className="absolute -inset-[1px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-[2rem] blur-2xl"
                    style={{
                      background: isEven
                        ? 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))'
                        : 'linear-gradient(225deg, rgba(236,72,153,0.2), rgba(139,92,246,0.2))'
                    }}
                  />

                  {/* Main Card - Ultra Modern Asymmetric Shape with Deep Glass Effect */}
                  <motion.div
                    className="relative overflow-hidden
                      bg-white/[0.03]
                      border-2 border-white/[0.15]
                      group-hover:border-white/[0.3]
                      transition-all duration-500 ease-out
                      shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1),0_0_0_1px_rgba(139,92,246,0.1)]
                      group-hover:shadow-[0_20px_60px_rgba(139,92,246,0.25),inset_0_1px_1px_rgba(255,255,255,0.15),0_0_0_1px_rgba(139,92,246,0.3)]"
                    style={{
                      clipPath: isEven
                        ? 'polygon(0 0, 100% 0, 100% calc(100% - 50px), calc(100% - 50px) 100%, 0 100%)'
                        : 'polygon(0 0, 100% 0, 100% 100%, 50px 100%, 0 calc(100% - 50px))',
                      transform: 'translateZ(0)' // GPU acceleration
                    }}
                    whileHover={{
                      scale: 1.015,
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                    }}
                  >
                    {/* Deep Blur Glass Layer */}
                    <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02]" />

                    {/* Secondary Blur Layer for Extra Depth */}
                    <div className="absolute inset-0 backdrop-blur-xl bg-black/20" />

                    {/* Subtle Color Tint */}
                    <div
                      className="absolute inset-0 opacity-30 mix-blend-overlay"
                      style={{
                        background: isEven
                          ? 'radial-gradient(circle at 20% 30%, rgba(139,92,246,0.08) 0%, transparent 60%)'
                          : 'radial-gradient(circle at 80% 30%, rgba(236,72,153,0.08) 0%, transparent 60%)'
                      }}
                    />

                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
                    }} />

                    {/* Giant Background Number - Outline + Reflection */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-visible z-0">
                      <div className="relative overflow-visible">
                        {/* MAIN NUMBER */}
                        <motion.div
                          className="text-[120px] md:text-[280px] font-black leading-none pl-4 md:pl-8 pr-4 md:pr-8 select-none pointer-events-none"
                          style={{
                            // Enhanced gradient fill with subtle outline
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(139,92,246,0.08) 50%, rgba(6,182,212,0.05) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow:
                              '0 0 8px rgba(255,255,255,0.04), 0 6px 40px rgba(0,0,0,0.45)',
                            // Prominent text stroke for clear outline
                            WebkitTextStroke: '1.5px rgba(139,92,246,0.2)',
                            filter: 'drop-shadow(0 0 20px rgba(139,92,246,0.15))',
                            willChange: "transform"
                          }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
                        >
                          {rule.id}
                        </motion.div>

                        {/* NUMBER REFLECTION */}
                        <div
                          aria-hidden
                          className="absolute top-full left-0 w-full overflow-hidden pointer-events-none"
                          style={{
                            // flip vertically and mask fade
                            transform: 'translateY(6px) scaleY(-1)',
                            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.0))',
                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.0))',
                            opacity: 0.08,
                            filter: 'blur(8px)'
                          }}
                        >
                          <div
                            className="text-[120px] md:text-[280px] font-black leading-none pl-4 md:pl-8 pr-4 md:pr-8 select-none"
                            style={{
                              background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              WebkitTextStroke: '0.6px rgba(255,255,255,0.03)'
                            }}
                          >
                            {rule.id}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Accent Elements - Refined */}
                    <motion.div
                      className="hidden md:block absolute top-8 right-8 w-2 h-2 rounded-full bg-gradient-to-br from-violet-400/60 to-cyan-400/60 opacity-50 group-hover:opacity-80 transition-opacity shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                      animate={!prefersReducedMotion ? { y: [0, -8, 0] } : {}}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1]
                      }}
                    />
                    <motion.div
                      className="hidden md:block absolute top-12 right-14 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-pink-400/50 to-violet-400/50 opacity-40 group-hover:opacity-70 transition-opacity shadow-[0_0_8px_rgba(236,72,153,0.3)]"
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1],
                        delay: 0.5
                      }}
                    />
                    <motion.div
                      className="hidden md:block absolute top-6 right-20 w-1 h-1 rounded-full bg-gradient-to-br from-cyan-400/40 to-pink-400/40 opacity-30 group-hover:opacity-60 transition-opacity shadow-[0_0_6px_rgba(6,182,212,0.3)]"
                      animate={!prefersReducedMotion ? { y: [0, -5, 0] } : {}}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1],
                        delay: 1
                      }}
                    />

                    {/* Content Container */}
                    <div className="relative p-6 pl-24 pr-6 md:p-12 md:pl-48 md:pr-16">
                      {/* Micro Accent Line Above Title */}
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="w-12 md:w-16 h-[2px] mb-4 md:mb-6 origin-left"
                        style={{
                          background: isEven
                            ? 'linear-gradient(90deg, rgba(139,92,246,0.6), rgba(6,182,212,0.4))'
                            : 'linear-gradient(90deg, rgba(236,72,153,0.6), rgba(139,92,246,0.4))'
                        }}
                      />

                      {/* Text Content */}
                      <div className="relative z-10">
                        {/* Title with Refined Typography */}
                        <motion.h3
                          className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight tracking-tight
                            text-white/90
                            group-hover:text-white
                            transition-all duration-400
                            drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ x: prefersReducedMotion ? 0 : 3, transition: { duration: 0.3 } }}
                        >
                          {rule.title}
                        </motion.h3>

                        {/* Description with Improved Readability */}
                        <motion.p
                          className="text-base md:text-lg leading-relaxed text-white/40
                            group-hover:text-white/60 transition-colors duration-400
                            drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]
                            max-w-2xl"
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {rule.description}
                        </motion.p>

                        {/* Decorative Corner Element */}
                        <motion.div
                          className="hidden md:block absolute -bottom-4 -right-4 w-20 h-20 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                          style={{
                            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Bottom Border Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* Subtle Shimmer Effect on Hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                      animate={!prefersReducedMotion ? { x: ['-100%', '100%'] } : {}}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        ease: [0.45, 0, 0.55, 1]
                      }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent)'
                      }}
                    />
                  </motion.div>

                  {/* Reflection Effect Below Card */}
                  <motion.div
                    className="absolute top-full left-0 right-0 h-32 opacity-10 pointer-events-none"
                    style={{
                      background: isEven
                        ? 'linear-gradient(to bottom, rgba(139,92,246,0.08), transparent)'
                        : 'linear-gradient(to bottom, rgba(236,72,153,0.08), transparent)',
                      maskImage: 'linear-gradient(to bottom, black, transparent)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
                      transform: 'scaleY(-1)',
                      filter: 'blur(8px)'
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.25 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Bottom CTA with Advanced Styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-24 text-center"
        >
          <motion.div
            className="inline-block relative group/cta"
            whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* CTA Subtle Glow */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-cyan-500/20 to-pink-600/20 rounded-3xl blur-2xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"
            />

            <motion.div
              className="relative p-6 px-8 md:p-8 md:px-12 rounded-3xl 
                bg-white/[0.03]
                border-2 border-white/[0.15]
                backdrop-blur-2xl
                shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08),0_0_0_1px_rgba(139,92,246,0.08)]
                group-hover/cta:border-white/[0.25]
                group-hover/cta:shadow-[0_12px_48px_rgba(139,92,246,0.2),inset_0_1px_1px_rgba(255,255,255,0.12),0_0_0_1px_rgba(139,92,246,0.2)]
                transition-all duration-400"
            >
              {/* Decorative Corner Dots */}
              <motion.div
                className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-violet-400/40"
                animate={!prefersReducedMotion ? { opacity: [0.4, 0.8, 0.4] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
              />
              <motion.div
                className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-cyan-400/40"
                animate={!prefersReducedMotion ? { opacity: [0.4, 0.8, 0.4] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-pink-400/40"
                animate={!prefersReducedMotion ? { opacity: [0.4, 0.8, 0.4] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 1 }}
              />
              <motion.div
                className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-violet-400/40"
                animate={!prefersReducedMotion ? { opacity: [0.4, 0.8, 0.4] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 1.5 }}
              />

              <motion.p
                className="text-white/60 font-medium text-sm md:text-base tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="text-white/80 font-bold">
                  Note:
                </span>
                {" "}Following these guidelines ensures a smooth event experience for everyone.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Rules;