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
    title: "Project Preparation",
    description: "Students should come prepared with their project and presentation ready for evaluation.",
  },
  {
    id: 4,
    title: "Prize Pool",
    description: "Prizes worth Rs. 5000, Rs. 3000, and Rs. 2000 will be given to top 3 positions.",
  }
];

const Rules: React.FC<RulesProps> = ({ rules = defaultRules }) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={containerRef} className="w-full relative py-0 px-4 overflow-hidden">
      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* RULES CARDS */}
        <div className="space-y-5 md:space-y-7">
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
                  {/* Gray Glow Effect */}
                  <div
                    className="absolute -inset-[1px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 rounded-[2rem] blur-2xl"
                    style={{
                      background: isEven
                        ? 'linear-gradient(135deg, rgba(150,150,150,0.25), rgba(120,120,120,0.25))'
                        : 'linear-gradient(225deg, rgba(160,160,160,0.25), rgba(150,150,150,0.25))'
                    }}
                  />

                  {/* Main Card - Gray Theme */}
                  <motion.div
                    className="relative overflow-hidden
                      bg-gradient-to-br from-gray-700/50 via-gray-600/40 to-gray-700/50
                      border-2 border-gray-500/20
                      group-hover:border-gray-400/40
                      transition-all duration-500 ease-out
                      shadow-[0_8px_32px_rgba(100,100,100,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]
                      group-hover:shadow-[0_20px_60px_rgba(100,100,100,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)]"
                    style={{
                      clipPath: isEven
                        ? 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)'
                        : 'polygon(0 0, 100% 0, 100% 100%, 30px 100%, 0 calc(100% - 30px))',
                      transform: 'translateZ(0)' // GPU acceleration
                    }}
                    whileHover={{
                      scale: 1.015,
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                    }}
                  >
                    {/* Deep Blur Glass Layer */}
                    <div className="absolute inset-0 backdrop-blur-lg bg-gradient-to-br from-gray-500/5 via-transparent to-gray-600/5" />

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
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/10 to-transparent"
                        style={{
                          animation: 'shimmer 2.5s ease-in-out infinite',
                        }}
                      />
                    </div>

                    {/* Subtle Gray Tint */}
                    <div
                      className="absolute inset-0 opacity-20 mix-blend-overlay"
                      style={{
                        background: isEven
                          ? 'radial-gradient(circle at 20% 30%, rgba(150,150,150,0.12) 0%, transparent 60%)'
                          : 'radial-gradient(circle at 80% 30%, rgba(160,160,160,0.12) 0%, transparent 60%)'
                      }}
                    />

                    {/* Giant Background Number */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none overflow-visible z-0">
                      <div className="relative overflow-visible">
                        {/* MAIN NUMBER */}
                        <motion.div
                          className="text-[80px] md:text-[180px] font-black leading-none pl-3 md:pl-6 pr-3 md:pr-6 select-none pointer-events-none"
                          style={{
                            color: 'rgba(150,150,150,0.15)',
                            textShadow: '0 0 20px rgba(150,150,150,0.1)',
                            WebkitTextStroke: '1.5px rgba(150,150,150,0.25)',
                            filter: 'drop-shadow(0 0 25px rgba(150,150,150,0.2))',
                            willChange: "transform"
                          }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
                        >
                          {rule.id}
                        </motion.div>
                      </div>
                    </div>

                    {/* Floating Gray Accent Elements */}
                    <motion.div
                      className="hidden md:block absolute top-6 right-6 md:top-8 md:right-8 w-2 h-2 rounded-full bg-gray-400/60 opacity-50 group-hover:opacity-80 transition-opacity shadow-[0_0_12px_rgba(150,150,150,0.6)]"
                      style={{ willChange: 'transform' }}
                      animate={!prefersReducedMotion ? { y: [0, -8, 0] } : {}}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1]
                      }}
                    />
                    <motion.div
                      className="hidden md:block absolute top-10 right-12 md:top-12 md:right-14 w-1.5 h-1.5 rounded-full bg-gray-400/50 opacity-40 group-hover:opacity-70 transition-opacity shadow-[0_0_10px_rgba(140,140,140,0.5)]"
                      style={{ willChange: 'transform' }}
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1],
                        delay: 0.5
                      }}
                    />

                    {/* Content Container - Responsive Padding */}
                    <div className="relative p-6 pl-20 pr-6 md:p-12 md:pl-44 md:pr-16">
                      {/* Text Content */}
                      <div className="relative z-10">
                        {/* Title with Gray Gradient */}
                        <motion.h3
                          className="text-xl md:text-3xl font-bold mb-3 md:mb-5 leading-tight tracking-tight
                            text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200
                            transition-all duration-400
                            drop-shadow-[0_2px_12px_rgba(150,150,150,0.3)]"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ x: prefersReducedMotion ? 0 : 3, transition: { duration: 0.3 } }}
                        >
                          {rule.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          className="text-sm md:text-lg leading-relaxed text-gray-100/60
                            group-hover:text-gray-100/80 transition-colors duration-400
                            drop-shadow-[0_2px_10px_rgba(150,150,150,0.2)]
                            max-w-2xl"
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {rule.description}
                        </motion.p>
                      </div>
                    </div>

                    {/* Bottom Border Accent - Gray */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-400/30 to-transparent group-hover:via-gray-300/50 transition-all duration-500" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - Cyan Theme */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-20 text-center"
        >
          <motion.div
            className="inline-block relative group/cta"
            whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* CTA Gray Glow */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 via-gray-400/20 to-gray-500/20 rounded-3xl blur-2xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"
            />

            <motion.div
              className="relative p-5 px-6 md:p-7 md:px-10 rounded-3xl 
                bg-gradient-to-br from-gray-700/50 via-gray-600/40 to-gray-700/50
                border-2 border-gray-500/20
                backdrop-blur-md
                shadow-[0_8px_32px_rgba(100,100,100,0.15),inset_0_1px_1px_rgba(255,255,255,0.08)]
                group-hover/cta:border-gray-400/30
                group-hover/cta:shadow-[0_12px_48px_rgba(100,100,100,0.25),inset_0_1px_1px_rgba(255,255,255,0.12)]
                transition-all duration-400"
            >
              {/* Decorative Corner Dots - Gray */}
              <motion.div
                className="absolute top-3 left-3 md:top-4 md:left-4 w-1.5 h-1.5 rounded-full bg-gray-400/40 shadow-[0_0_8px_rgba(150,150,150,0.6)]"
                animate={!prefersReducedMotion ? { opacity: [0.4, 0.8, 0.4] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
              />
              <motion.div
                className="absolute top-3 right-3 md:top-4 md:right-4 w-1.5 h-1.5 rounded-full bg-gray-400/40 shadow-[0_0_8px_rgba(140,140,140,0.6)]"
                animate={!prefersReducedMotion ? { opacity: [0.4, 0.8, 0.4] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-1.5 h-1.5 rounded-full bg-gray-300/40 shadow-[0_0_8px_rgba(160,160,160,0.6)]"
                animate={!prefersReducedMotion ? { opacity: [0.4, 0.8, 0.4] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 1 }}
              />
              <motion.div
                className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-1.5 h-1.5 rounded-full bg-gray-400/40 shadow-[0_0_8px_rgba(140,140,140,0.6)]"
                animate={!prefersReducedMotion ? { opacity: [0.4, 0.8, 0.4] } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: [0.45, 0, 0.55, 1], delay: 1.5 }}
              />

              <motion.p
                className="text-gray-100/70 font-medium text-xs md:text-base tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="text-gray-100/90 font-bold">
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