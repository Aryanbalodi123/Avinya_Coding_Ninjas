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
const GridScan = dynamic(
  () => import("@/components/GridScan").then((mod) => mod.GridScan),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
  }
);


const WHATSAPP_LINK = "https://your-link-here.com"; // change this

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
        style={{ y, opacity, scale, filter: blur }}
        className="text-center relative z-10 flex flex-col items-center"
      >
 
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="inline-block py-1 px-3 rounded-full bg-cyan-900/20 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 tracking-[0.3em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)]"
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
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 2.5,
              delay: 1.2,
              repeat: Infinity,
              repeatDelay: 5,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent mix-blend-overlay pointer-events-none"
          />
        </motion.h1>

        <p className="mt-8 text-lg text-cyan-100/40 font-mono max-w-lg mx-auto uppercase tracking-widest">
          Scroll to explore
        </p>
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
        style={{ scale, y, opacity, filter: blur }} 
        className="text-center mb-24 relative z-10 origin-center flex flex-col items-center"
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

const [toast, setToast] = useState<string | null>(null);

const showToast = (msg: string) => {
  setToast(msg);
  setTimeout(() => setToast(null), 2300); // auto hide
};

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
    <div className="relative w-full bg-black snap-y snap-mandatory overflow-y-scroll h-screen">

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <GridScan
          scanDuration={6}
  linesColor="#FFB84D"        // soft amber neon
  scanColor="#E2852E"         // bright warm orange
          sensitivity={0.8}
          gridScale={0.15}
          scanOpacity={0.3}
          enablePost={true}
          bloomIntensity={0.8}
          chromaticAberration={0.005}
          noiseIntensity={0.02}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/90" />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <GlassNavbar
          links={[
            { label: "Home", href: "/" },
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
<ScalingSection id="members" title="OPERATIVES" subtitle="Team Roster">
  <div className="w-full max-w-[900px] mx-auto px-4">

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-2
        gap-y-8
        gap-x-4
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
    <p className="text-white/50 text-lg mb-12 max-w-lg">
      To proceed with the operation, verify your identity and establish secure communication.
    </p>

    <div className="w-full flex flex-col md:flex-row gap-6 items-center justify-center">

      {/* VERIFY BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsVerifyModalOpen(true)}
        className="
          group relative overflow-hidden
          bg-gradient-to-r from-orange-500/10 to-amber-500/10
          border-2 border-orange-500/30
          px-8 py-6 rounded-2xl
          w-full md:w-auto md:min-w-[280px]
          flex items-center gap-4 justify-center
          transition-all duration-300
          hover:border-orange-400
          hover:shadow-[0_0_50px_rgba(251,146,60,0.3)]
          backdrop-blur-sm
        "
      >
        <ShieldCheck size={28} className="text-orange-400" />
        <div className="flex flex-col items-start">
          <span className="font-bold text-l text-white tracking-wide">VERIFY YOUR PRESENCE</span>
          <span className="text-xs text-white/50 uppercase tracking-wider"></span>
        </div>
      </motion.button>

      {/* WHATSAPP BUTTON */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleWhatsappJoin}
        className="
          group relative overflow-hidden
          bg-gradient-to-r from-green-500 to-emerald-600
          border border-green-400/50
          px-8 py-6 rounded-2xl
          w-full md:w-auto md:min-w-[280px]
          flex items-center justify-between gap-4
          transition-all duration-300
          hover:shadow-[0_0_50px_rgba(34,197,94,0.4)]
        "
      >
        <div className="flex items-center gap-4">
          <MessageCircle size={28} className="text-black" />
          <div className="flex flex-col items-start">
            <span className="font-bold text-xl text-black tracking-wide">EVENTS UPDATE</span>
            <span className="text-xs text-black/70 uppercase tracking-wider">Join WhatsApp</span>
          </div>
        </div>
        <ArrowUpRight size={20} className="text-black" />
      </motion.button>

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
