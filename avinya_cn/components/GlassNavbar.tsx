"use client";
import React from 'react';
import { motion } from 'framer-motion';

const GlassNavbar = ({ links }: { links: { label: string; href: string }[] }) => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="
          pointer-events-auto
          bg-black/20 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20
          rounded-full px-6 py-3
          flex items-center gap-8
          hover:bg-white/10 transition-colors duration-300
        "
      >
        {/* Animated Logo */}
        <div className="relative h-8 w-8 group cursor-pointer">
          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative h-full w-full bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full border border-white/20" />
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-sm font-medium text-white/60 hover:text-white transition-all shadow-white/50 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export default GlassNavbar;