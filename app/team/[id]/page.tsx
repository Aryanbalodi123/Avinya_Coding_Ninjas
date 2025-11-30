"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { MessageCircle, ArrowUpRight, ShieldCheck } from "lucide-react";

// --- IMPORTS ---
import TeamCard from "@/components/TeamCard";
import GlassNavbar from "@/components/GlassNavbar";
import Rules from "@/components/Rules";
import VerificationModal from "@/components/VerificationModal";
import EventMeta from "@/components/EventMeta";

import Toast from "@/components/Toast";
// --- DYNAMIC IMPORTS ---
const LiquidEther = dynamic(
  () => import("@/components/LiquidEther"),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
  }
);


const WHATSAPP_LINK = "https://chat.whatsapp.com/KnlU1djH2Mz6j7rSyncnVu?mode=wwt";

// Hook to detect mobile view
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// === Types ===
interface TeamMember {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  hasAcceptedInvitation: boolean;
}
interface TeamData {
  teamName: string;
  members: TeamMember[];
}

/* ======================================================
   HERO SECTION (Unchanged Size, Center Animation)
   ====================================================== */
const HeroSection = ({ teamName, teamId }: { teamName: string; teamId: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const blur = useTransform(scrollYProgress, [0, 0.5], ["0px", "12px"]);

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative snap-start snap-always overflow-hidden">
      <motion.div
        ref={ref}
        style={{ y, opacity, scale, filter: blur, willChange: 'transform, opacity' }}
        className="text-center relative z-10 flex flex-col items-center"
      >

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="inline-block py-3 px-6 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-xl md:text-2xl font-mono text-cyan-300 mb-6 tracking-[0.3em] uppercase backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          AVINYA 3.0
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: ["blur(10px)", "blur(0px)"],
          }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative text-8xl md:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-transparent drop-shadow-2xl leading-none select-none"
        >
          {teamName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-lg text-cyan-100/60 font-mono uppercase tracking-widest">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg
                className="w-5 h-5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ======================================================
   SCALING SECTION (Reduced Size + Bottom-Left Flow)
   ====================================================== */
const ScalingSection = ({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Scroll Transforms (Exit effects)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const blur = useTransform(scrollYProgress, [0, 0.5], ["0px", "8px"]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="min-h-screen w-full relative snap-start snap-always pt-32 pb-20 px-4 flex flex-col"
    >
      <motion.div
        style={{ scale, y, opacity, filter: blur, willChange: 'transform, opacity' }}
        className="text-center mb-12 relative z-10 origin-center flex flex-col items-center"
      >
        {/* SECTION TITLE 
            - Reduced size: text-5xl md:text-7xl
            - Animation: From Bottom-Left (x: -60, y: 60)
        */}
        <motion.h2
          initial={{ opacity: 0, x: -60, y: 60, scale: 0.9 }}
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: ["blur(10px)", "blur(0px)"],
          }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="relative text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-transparent drop-shadow-2xl leading-none select-none"
        >
          {title}

          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            transition={{
              duration: 2.5,
              delay: 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 5,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent mix-blend-overlay pointer-events-none"
          />
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/70 text-lg font-mono tracking-widest uppercase mt-4"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>

      <div className="max-w-[1400px] mx-auto w-full z-20">
        {children}
      </div>
    </section>
  );
};

/* ======================================================
   MAIN PAGE
   ====================================================== */
export default function TeamPage() {
  const params = useParams();
  const id = params?.id as string;

  const [team, setTeam] = useState<TeamData | null>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const [toast, setToast] = useState<string | null>(null);
  const [liquidEtherSettings, setLiquidEtherSettings] = useState({
    resolution: 0.5,
    iterationsPoisson: 32,
    mouseForce: 20,
    cursorSize: 100,
    autoSpeed: 0.3,
    autoIntensity: 1.8,
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2300); // auto hide
  };

  // Optimize LiquidEther settings based on screen size
  useEffect(() => {
    const updateSettings = () => {
      const isDesktop = window.innerWidth >= 768;
      
      if (isDesktop) {
        // Desktop: Lower resolution and iterations for performance
        setLiquidEtherSettings({
          resolution: 0.5,
          iterationsPoisson: 25,
          mouseForce: 22,
          cursorSize: 100,
          autoSpeed: 0.3,
          autoIntensity: 1.8,
        });
      } else {
        // Mobile: Keep current settings
        setLiquidEtherSettings({
          resolution: 1,
          iterationsPoisson: 41,
          mouseForce: 28,
          cursorSize: 120,
          autoSpeed: 0.4,
          autoIntensity: 2.2,
        });
      }
    };

    updateSettings();
    window.addEventListener('resize', updateSettings);
    return () => window.removeEventListener('resize', updateSettings);
  }, []);

  const handleWhatsappJoin = () => {
    // open the constant link so UI button behavior is identical
    window.open(WHATSAPP_LINK, "_blank");
  };

  useEffect(() => {
    if (!id) return;

    const loadTeam = async () => {
      try {
        const res = await fetch(`/api/teams/${id}`, { cache: "no-store" });

        if (!res.ok) {
          console.error("Failed to fetch team");
          return;
        }

        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    loadTeam();
  }, [id]);

  if (!team)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );

  return (
    <div className="relative w-full bg-[#0A1628] snap-y snap-mandatory overflow-y-scroll h-screen">

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <LiquidEther
          colors={['#1E3A8A', '#0EA5E9', '#06B6D4', '#22D3EE', '#67E8F9']}
          mouseForce={liquidEtherSettings.mouseForce}
          cursorSize={liquidEtherSettings.cursorSize}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={liquidEtherSettings.iterationsPoisson}
          resolution={liquidEtherSettings.resolution}
          isBounce={false}
          autoDemo={true}
          autoSpeed={liquidEtherSettings.autoSpeed}
          autoIntensity={liquidEtherSettings.autoIntensity}
          takeoverDuration={0.25}
          autoResumeDelay={0}
          autoRampDuration={0.6}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/0 via-[#0A1628]/40 to-[#0A1628]/90" />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <GlassNavbar
          links={[
            { label: "Home", href: `/team/${id}` },
            { label: "Team", href: "#members" },
            { label: "Event", href: "#event" },
            { label: "Rules", href: "#rules" },
          ]}
        />
      </div>

      <main className="relative z-10">

        {/* HERO */}
        <HeroSection teamName={team.teamName} teamId={id} />

        {/* OPERATIVES */}
        {/* OPERATIVES */}
        <ScalingSection id="members" title="MEMBERS" subtitle="Team Roster">
          <div className="w-full max-w-[1000px] mx-auto px-4">

            <div
              className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-2
        gap-y-10
        gap-x-6
        pt-4
        pb-4
      "
            >
              {team.members.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="w-full flex justify-center"
                >
                  <TeamCard
                    member={member}
                    onAccept={async () => {
                      try {
                        const res = await fetch(`/api/teams/${id}`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            memberId: member.id,
                            hasAcceptedInvitation: true,
                          }),
                        });

                        if (!res.ok) return;

                        const updated = await res.json();
                        setTeam(updated);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                </motion.div>
              ))}
            </div>

          </div>
        </ScalingSection>

        {/* REMOVE HEAVY SECTION MARGIN */}


        {/* EVENT DETAILS */}
        <ScalingSection id="event" title="EVENT DETAILS" subtitle="Venue • Date • Time">
          <EventMeta />
        </ScalingSection>

        {/* RULES */}
        <ScalingSection id="rules" title="PROTOCOLS" subtitle="Operational Guidelines">
          <Rules />
        </ScalingSection>

        <ScalingSection id="actions" title="INITIALIZE" subtitle="Verification Required">
          <div className="max-w-4xl w-full flex flex-col items-center text-center mx-auto pb-32">
            <p className="text-white/60 text-lg mb-12 max-w-lg font-light">
              To proceed with the operation, verify your identity and establish secure communication.
            </p>

            <div className="w-full flex flex-col gap-8 items-center justify-center">

              {/* WHATSAPP BUTTON - Enhanced Futuristic Style */}
              <div className="relative group/wa w-full md:w-auto">
                {/* Outer animated glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/40 via-emerald-400/40 to-green-400/40 rounded-2xl blur-xl opacity-60 group-hover/wa:opacity-100 transition-all duration-700 animate-pulse" />

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsappJoin}
                  className="
            relative overflow-hidden
            bg-gradient-to-r from-green-600 via-emerald-500 to-green-600
            border-2 border-green-400/60
            px-10 py-7 rounded-2xl
            w-full md:w-auto md:min-w-[320px]
            flex items-center justify-between gap-5
            transition-all duration-700
            shadow-[0_0_40px_rgba(34,197,94,0.4),inset_0_0_20px_rgba(255,255,255,0.1)]
            group-hover/wa:shadow-[0_0_60px_rgba(34,197,94,0.7),inset_0_0_30px_rgba(255,255,255,0.2)]
            group-hover/wa:border-green-300/80
            backdrop-blur
          "
                >
                  {/* Holographic shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/wa:translate-x-full transition-transform duration-1000" />

                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-300/10 to-transparent opacity-0 group-hover/wa:opacity-100 animate-scan-line" />

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-green-200/60 rounded-tl" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-green-200/60 rounded-br" />

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm
              shadow-[0_0_20px_rgba(255,255,255,0.3)]
              group-hover/wa:shadow-[0_0_30px_rgba(255,255,255,0.5)]
              transition-all duration-500">
                      <MessageCircle size={28} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                      <span className="font-black text-xl md:text-2xl text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        Join WhatsApp
                      </span>
                      <span className="text-xs text-white/80 uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                        EVENTS UPDATE
                      </span>
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* VERIFY BUTTON - Enhanced Futuristic Style */}
              <div className="relative group/verify w-full md:w-auto">
                {/* Outer animated glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400/40 via-amber-400/40 to-orange-400/40 rounded-2xl blur-xl opacity-60 group-hover/verify:opacity-100 transition-all duration-700 animate-pulse" />

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsVerifyModalOpen(true)}
                  className="
            relative overflow-hidden
            bg-gradient-to-r from-orange-600/30 via-amber-600/30 to-orange-600/30
            border-2 border-orange-400/60
            px-10 py-7 rounded-2xl
            w-full md:w-auto md:min-w-[320px]
            flex items-center gap-5 justify-center
            transition-all duration-700
            shadow-[0_0_40px_rgba(251,146,60,0.3),inset_0_0_30px_rgba(251,146,60,0.1)]
            group-hover/verify:shadow-[0_0_70px_rgba(251,146,60,0.6),inset_0_0_50px_rgba(251,146,60,0.2)]
            group-hover/verify:border-orange-300/80
            backdrop-blur-md
          "
                >
                  {/* Holographic shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent -translate-x-full group-hover/verify:translate-x-full transition-transform duration-1000" />

                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-300/10 to-transparent opacity-0 group-hover/verify:opacity-100 animate-scan-line" />

                  {/* Hexagonal pattern overlay */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'49\' viewBox=\'0 0 28 49\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  }} />

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-orange-300/60 rounded-tl" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-orange-300/60 rounded-tr" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-orange-300/60 rounded-bl" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-orange-300/60 rounded-br" />

                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500/40 to-amber-600/40 
            border-2 border-orange-400/60 flex items-center justify-center relative z-10
            shadow-[0_0_25px_rgba(251,146,60,0.5)]
            group-hover/verify:shadow-[0_0_40px_rgba(251,146,60,0.8)]
            group-hover/verify:border-orange-300/80
            transition-all duration-500">
                    <ShieldCheck size={28} className="text-orange-200 drop-shadow-[0_0_15px_rgba(251,146,60,0.9)]" />
                  </div>
                  <div className="flex flex-col items-center md:items-start relative z-10">
                    <span className="font-black text-base md:text-xl text-white tracking-wide drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]">
                      VERIFY YOUR PRESENCE
                    </span>
                    <span className="text-xs text-orange-100/70 uppercase tracking-[0.1em] md:tracking-[0.15em] font-bold">
                      Security Protocol
                    </span>
                  </div>
                </motion.button>
              </div>

            </div>
          </div>
        </ScalingSection>



      </main>

      <VerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        members={team.members}
        onConfirm={async (memberId) => {
          try {
            const res = await fetch(`/api/teams/${id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                memberId,
                hasAcceptedInvitation: true,
              }),
            });

            if (!res.ok) return;

            const updated = await res.json();
            setTeam(updated);

            showToast("Presence Verified Successfully");
            setIsVerifyModalOpen(false);
          } catch (err) {
            console.error(err);
          }
        }}

      />
      <Toast message={toast || ""} show={toast !== null} />

    </div>
  );
}
