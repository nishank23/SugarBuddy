import { motion } from "motion/react";

interface WelcomeScreenProps {
  onContinue: () => void;
}

function LogoIcon() {
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sq" x1="0" y1="0" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#FF8E53" />
        </linearGradient>
        {/* Top-edge inner gloss */}
        <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.22" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Glucose drop glow */}
        <radialGradient id="dropGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rounded square body */}
      <rect width="110" height="110" rx="28" fill="url(#sq)" />

      {/* Top gloss sheen */}
      <rect width="110" height="55" rx="28" fill="url(#gloss)" />

      {/* ── Face ── */}

      {/* Left eye — solid white dot + tiny shine */}
      <circle cx="39" cy="46" r="5" fill="white" />
      <circle cx="41" cy="44" r="1.6" fill="white" opacity="0.55" />

      {/* Right eye */}
      <circle cx="71" cy="46" r="5" fill="white" />
      <circle cx="73" cy="44" r="1.6" fill="white" opacity="0.55" />

      {/* Smooth smile curve */}
      <path
        d="M36 62 Q55 78 74 62"
        stroke="white"
        strokeWidth="3.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Glucose drop / heart at bottom center ── */}
      {/* Glow halo behind the drop */}
      <circle cx="55" cy="90" r="9" fill="url(#dropGlow)" />

      {/* Drop shape: two arcs meeting at a point */}
      <path
        d="M55 80 C46 80 42 86 42 90 C42 96 48 100 55 100 C62 100 68 96 68 90 C68 86 64 80 55 80Z"
        fill="none"
      />
      {/* Simplified clean teardrop */}
      <path
        d="M55 79 C51 79 47 83 47 88 C47 93 50.5 97 55 97 C59.5 97 63 93 63 88 C63 83 59 79 55 79Z"
        fill="white"
        opacity="0.88"
      />
      {/* Heart notch at top of drop */}
      <path
        d="M51 80 Q55 76 59 80"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.88"
      />
      {/* Tiny shine on drop */}
      <circle cx="51" cy="86" r="1.5" fill="white" opacity="0.5" />
    </svg>
  );
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "#0F0E17",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* ── 3 ambient glow orbs ── */}
      {/* Coral — bottom left */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "-15%",
          bottom: "-8%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,107,0.28) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Purple — top right */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          right: "-12%",
          top: "-5%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Blue — center-ish */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "25%",
          top: "35%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* ── Main content — centered ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">

        {/* Logo with pulsing glow ring */}
        <motion.div
          className="relative mb-9"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
        >
          {/* Outer pulse ring */}
          <motion.div
            className="absolute rounded-[32px]"
            style={{
              inset: -4,
              border: "1.5px solid rgba(255,107,107,0.5)",
              borderRadius: 34,
            }}
            animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.16, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
          {/* Soft glow underneath */}
          <motion.div
            className="absolute rounded-[28px]"
            style={{
              inset: 0,
              boxShadow: "0 0 40px 0px rgba(255,107,107,0.55)",
              borderRadius: 28,
            }}
            animate={{ boxShadow: [
              "0 0 30px 0px rgba(255,107,107,0.45)",
              "0 0 55px 6px rgba(255,107,107,0.65)",
              "0 0 30px 0px rgba(255,107,107,0.45)",
            ]}}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Gentle float */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <LogoIcon />
          </motion.div>
        </motion.div>

        {/* App name — gradient white→coral */}
        <motion.h1
          className="text-center mb-3"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #FFCFBF 55%, #FF8E53 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "2.6rem",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.55, ease: "easeOut" }}
        >
          Sugar Buddy
        </motion.h1>

        {/* Tagline */}
        <motion.p
          style={{
            color: "rgba(255,255,255,0.38)",
            fontSize: "0.88rem",
            fontWeight: 500,
            letterSpacing: "0.015em",
            textAlign: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.72, duration: 0.55 }}
        >
          Your glucose. Your buddy. Your way.
        </motion.p>
      </div>

      {/* ── Button pinned to bottom ── */}
      <div className="px-6 pb-14 relative z-10">
        <motion.button
          onClick={onContinue}
          className="w-full relative overflow-hidden rounded-2xl flex items-center justify-center"
          style={{
            height: 62,
            background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 800,
            fontSize: "1.08rem",
            color: "white",
            border: "none",
            outline: "none",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.55, ease: "easeOut" }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Warm inner glow — top highlight */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 55%)",
            }}
          />
          {/* Bottom warm undertone */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(0deg, rgba(255,80,30,0.25) 0%, transparent 60%)",
            }}
          />
          {/* Outer glow via box-shadow — animated */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                "0 6px 28px rgba(255,107,107,0.38)",
                "0 6px 44px rgba(255,107,107,0.62)",
                "0 6px 28px rgba(255,107,107,0.38)",
              ],
            }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
          <span className="relative z-10">Let's Go! 🎉</span>
        </motion.button>
      </div>
    </div>
  );
}
