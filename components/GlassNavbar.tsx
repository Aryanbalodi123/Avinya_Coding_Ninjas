"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const GlassNavbar = ({ links }: { links: { label: string; href: string }[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
<motion.nav
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 100, damping: 20 }}
  className="
    pointer-events-auto
    bg-black/20 backdrop-blur-md border border-white/10 shadow-lg shadow-black/20
    rounded-full

    /* *** SLIM + MUCH LONGER PILL *** */
    py-2 md:py-3
    px-8                  /* mobile padding */
    md:px-32              /* HUGE desktop padding */
    min-w-[70%] md:min-w-[900px]  /* stretch wide on desktop */

    flex items-center justify-between
    gap-6 md:gap-16       /* spaced out interior */

    hover:bg-white/10 transition-colors duration-300
  "
>

          {/* --- LEFT: LOGO & TITLE --- */}
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer flex items-center justify-center">
              <div className="absolute -inset-3 bg-cyan-500/40 blur-2xl opacity-70 animate-pulse"></div>
              <div className="absolute -inset-2 bg-blue-400/30 blur-lg opacity-80"></div>

              <Image
                src="/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="
                  relative z-10 object-cover rounded-full
                "
              />
            </div>

            <h1
              className="
                text-white tracking-widest font-bold 
                text-sm md:text-lg
                select-none
                hidden md:block
              "
            >
              AVINYA 3.0
            </h1>
          </div>

          {/* --- CENTER TITLE (MOBILE ONLY) --- */}
          <h1
            className="
              text-white tracking-widest font-bold 
              text-sm
              select-none
              md:hidden
            "
          >
            AVINYA 3.0
          </h1>

          {/* --- RIGHT DESKTOP LINKS --- */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  text-base font-medium text-white/60 hover:text-white
                  transition-all hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* --- MOBILE HAMBURGER --- */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 text-white/80 hover:text-white"
          >
            <Menu size={26} />
          </button>
        </motion.nav>
      </div>

      {/* MOBILE MENU DRAWER */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.25 }}
        className="
          fixed top-0 right-0 bottom-0 z-[9999]
          w-64
          bg-black/60 backdrop-blur-lg
          border-l border-white/10
          p-6
          flex flex-col gap-6
        "
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="self-end text-white/80 hover:text-white mb-8"
        >
          <X size={28} />
        </button>

        {/* MOBILE LINKS */}
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="
              text-white/70 text-lg
              hover:text-white transition
              border-b border-white/10 pb-3
            "
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </>
  );
};

export default GlassNavbar;
