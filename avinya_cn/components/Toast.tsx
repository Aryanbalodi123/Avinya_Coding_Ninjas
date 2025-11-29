"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Toast({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="
            fixed inset-0
            z-[9999]
            flex
            items-end
            justify-center
            pointer-events-none
            pb-10
          "
        >
          <div
            className="
              px-7 py-4
              rounded-2xl
              bg-black/60 
              backdrop-blur-xl
              border border-orange-400/40
              shadow-[0_0_30px_rgba(255,140,0,0.55)]
              flex items-center gap-3
              pointer-events-auto
            "
          >
            <CheckCircle size={26} className="text-orange-400" />
            <p className="text-white font-semibold tracking-wide">
              {message}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
