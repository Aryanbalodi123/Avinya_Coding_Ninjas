"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X, Check, Mail, Hash } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  hasAcceptedInvitation: boolean;
}

export default function VerificationModal({
  isOpen,
  onClose,
  members,
  onConfirm
}: {
  isOpen: boolean;
  onClose: () => void;
  members: TeamMember[];
  onConfirm: (memberId: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [whatsappJoined, setWhatsappJoined] = useState(false);
  const firstBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedId(null);
      setWhatsappJoined(false);

      setTimeout(() => firstBtnRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const canConfirm = selectedId !== null && whatsappJoined;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0">
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backdropFilter: "blur(25px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="
              relative z-[201] 
              w-full h-[92vh]
              max-w-xl
              mx-auto 
              mt-4
              rounded-3xl
              bg-black/50 
              backdrop-blur-2xl 
              border border-orange-400/20
              shadow-[0_0_50px_rgba(255,120,0,0.25)]
              overflow-hidden
              flex flex-col
            "
          >
            {/* TOP GLOW LINE */}
            <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 shadow-[0_0_20px_rgba(255,160,0,0.5)]"></div>

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  Verify Identity
                </h3>
                <p className="text-sm text-orange-300/70 mt-1">
                  Select your profile and confirm
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <X size={22} className="text-white/70" />
              </button>
            </div>

            {/* SCROLL AREA */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 scrollbar-thin">
              {/* MEMBERS LIST */}
              <div className="space-y-3">
                {members.map((m) => {
                  const selected = selectedId === m.id;

                  return (
             <motion.button
  key={m.id}
  disabled={m.hasAcceptedInvitation}
  onClick={() => !m.hasAcceptedInvitation && setSelectedId(m.id)}
  whileTap={{ scale: m.hasAcceptedInvitation ? 1 : 0.97 }}
  className={`
    w-full p-4 rounded-2xl text-left flex justify-between items-center transition
    backdrop-blur-lg
    ${
      m.hasAcceptedInvitation
        ? "bg-green-500/20 border border-green-400/40 cursor-not-allowed"
        : selected
        ? "bg-orange-500/25 border border-orange-400 shadow-[0_0_20px_rgba(255,160,0,0.4)]"
        : "bg-white/5 border border-white/10 hover:bg-white/10"
    }
  `}
>

                      <div className="flex items-center gap-4">
                        <div
                          className={`
                            w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                            ${
                              selected
                                ? "bg-gradient-to-br from-orange-400 to-amber-500 text-black shadow-[0_0_15px_rgba(255,160,0,0.6)]"
                                : "bg-white/10 text-white/70"
                            }
                          `}
                        >
                          {m.name.charAt(0)}
                        </div>

                        <div>
                          <p className="text-base font-semibold text-white">
                            {m.name}
                          </p>

                          <div className="flex flex-col sm:flex-row gap-1 text-xs text-white/50">
                            <span className="flex items-center gap-1">
                              <Mail size={12} /> {m.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Hash size={12} /> {m.rollNumber}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${
                            selected ? "border-orange-400" : "border-white/30"
                          }
                        `}
                      >
                        {selected && (
                          <motion.div
                            layoutId="selectedRadioNexus"
                            className="w-3 h-3 rounded-full bg-orange-400"
                          />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* WHATSAPP TOGGLE */}
              <button
                className="flex items-center gap-3"
                onClick={() => setWhatsappJoined(!whatsappJoined)}
              >
                <div
                  className={`
                    w-6 h-6 rounded-md border-2 flex items-center justify-center transition
                    ${
                      whatsappJoined
                        ? "bg-gradient-to-br from-orange-500 to-amber-500 border-orange-300 shadow-[0_0_10px_rgba(255,180,0,0.6)]"
                        : "border-white/30"
                    }
                  `}
                >
                  {whatsappJoined && (
                    <Check size={14} className="text-black" strokeWidth={3} />
                  )}
                </div>

                <p
                  className={`text-sm ${
                    whatsappJoined ? "text-white" : "text-white/60"
                  }`}
                >
                  I have joined the WhatsApp group
                </p>
              </button>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="p-5 border-t border-white/10 flex gap-3 bg-black/30 backdrop-blur-xl">
              <button
                ref={firstBtnRef}
                onClick={() => selectedId && onConfirm(selectedId)}
                disabled={!canConfirm}
                className={`
                  flex-1 py-3 rounded-xl text-sm font-bold transition
                  ${
                    canConfirm
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-[0_0_25px_rgba(255,150,0,0.4)]"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }
                `}
              >
                {canConfirm ? "Confirm Identity" : "Complete Requirements"}
              </button>

              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl text-sm border border-white/20 text-white/70 hover:bg-white/10 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
