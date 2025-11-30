"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { X, Check, Mail, Hash, ArrowUpRight } from "lucide-react";

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
              w-full h-[95vh] md:h-[92vh]
              max-w-xl
              mx-2 md:mx-auto 
              mt-2 md:mt-4
              rounded-2xl md:rounded-3xl
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
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/10">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  Verify Identity
                </h3>
                <p className="text-xs md:text-sm text-orange-300/70 mt-1">
                  Select your profile and confirm
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 md:p-2 rounded-full hover:bg-white/10 transition"
              >
                <X size={20} className="text-white/70 md:w-[22px] md:h-[22px]" />
              </button>
            </div>

            {/* SCROLL AREA */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-5 space-y-4 md:space-y-6 scrollbar-thin">
              
              {/* WARNING MESSAGE */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg md:rounded-xl p-3 md:p-4">
                <p className="text-red-400 text-xs md:text-sm font-semibold text-center">
                  ⚠️ It is compulsory to join the WhatsApp group before clicking on Confirm Identity
                </p>
              </div>

              {/* MEMBERS LIST */}
              <div className="space-y-2 md:space-y-3">
                {members.map((m) => {
                  const selected = selectedId === m.id;

                  return (
             <motion.button
  key={m.id}
  disabled={m.hasAcceptedInvitation}
  onClick={() => !m.hasAcceptedInvitation && setSelectedId(m.id)}
  whileTap={{ scale: m.hasAcceptedInvitation ? 1 : 0.97 }}
  className={`
    w-full p-3 md:p-4 rounded-xl md:rounded-2xl text-left flex justify-between items-center transition
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

                      <div className="flex items-center gap-3 md:gap-4">
                        <div
                          className={`
                            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold
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
                          <p className="text-sm md:text-base font-semibold text-white">
                            {m.name}
                          </p>

                          <div className="flex flex-col sm:flex-row gap-1 text-[10px] md:text-xs text-white/50">
                            <span className="flex items-center gap-1">
                              <Mail size={10} className="md:w-3 md:h-3" /> <span className="truncate max-w-[200px]">{m.email}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Hash size={10} className="md:w-3 md:h-3" /> {m.rollNumber}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`
                          w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                          ${
                            m.hasAcceptedInvitation
                              ? "border-green-400 bg-green-500/20"
                              : selected 
                              ? "border-orange-400" 
                              : "border-white/30"
                          }
                        `}
                      >
                        {m.hasAcceptedInvitation ? (
                          <Check size={14} className="text-green-400" strokeWidth={3} />
                        ) : selected ? (
                          <motion.div
                            layoutId="selectedRadioNexus"
                            className="w-3 h-3 rounded-full bg-orange-400"
                          />
                        ) : null}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* WHATSAPP JOIN BUTTON */}
              <div className="relative group/wa w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/40 via-emerald-400/40 to-green-400/40 rounded-xl md:rounded-2xl blur-xl opacity-60 group-hover/wa:opacity-100 transition-all duration-700" />

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://chat.whatsapp.com/KnlU1djH2Mz6j7rSyncnVu?mode=wwt', '_blank')}
                  className="
                    relative overflow-hidden w-full
                    bg-gradient-to-r from-green-600 via-emerald-500 to-green-600
                    border-2 border-green-400/60
                    px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl
                    flex items-center justify-between gap-3 md:gap-4
                    transition-all duration-500
                    shadow-[0_0_30px_rgba(34,197,94,0.4)]
                    group-hover/wa:shadow-[0_0_50px_rgba(34,197,94,0.7)]
                    group-hover/wa:border-green-300/80
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/wa:translate-x-full transition-transform duration-1000" />

                  <div className="flex items-center gap-2 md:gap-3 relative z-10">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      <Mail size={18} className="text-white md:w-[22px] md:h-[22px]" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-sm md:text-base text-white tracking-wide">
                        Join WhatsApp Group
                      </span>
                      <span className="text-[10px] md:text-xs text-white/80 uppercase tracking-wider font-semibold">
                        Get Event Updates
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-white/80 relative z-10 flex-shrink-0" />
                </motion.button>
              </div>

              {/* WHATSAPP TOGGLE */}
              <button
                className="flex items-center gap-2 md:gap-3"
                onClick={() => setWhatsappJoined(!whatsappJoined)}
              >
                <div
                  className={`
                    w-5 h-5 md:w-6 md:h-6 rounded-md border-2 flex items-center justify-center transition flex-shrink-0
                    ${
                      whatsappJoined
                        ? "bg-gradient-to-br from-orange-500 to-amber-500 border-orange-300 shadow-[0_0_10px_rgba(255,180,0,0.6)]"
                        : "border-white/30"
                    }
                  `}
                >
                  {whatsappJoined && (
                    <Check size={12} className="text-black md:w-[14px] md:h-[14px]" strokeWidth={3} />
                  )}
                </div>

                <p
                  className={`text-xs md:text-sm ${
                    whatsappJoined ? "text-white" : "text-white/60"
                  }`}
                >
                  I have joined the WhatsApp group <span className="text-red-400">*</span>
                </p>
              </button>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="p-4 md:p-5 border-t border-white/10 flex flex-col sm:flex-row gap-2 md:gap-3 bg-black/30 backdrop-blur-xl">
              <button
                ref={firstBtnRef}
                onClick={() => selectedId && onConfirm(selectedId)}
                disabled={!canConfirm}
                className={`
                  flex-1 py-2.5 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm font-bold transition
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
                className="px-4 md:px-5 py-2.5 md:py-3 rounded-lg md:rounded-xl text-xs md:text-sm border border-white/20 text-white/70 hover:bg-white/10 transition"
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
