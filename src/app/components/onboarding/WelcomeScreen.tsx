import { motion } from "motion/react";

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  // Four buddy characters for welcome screen
  const welcomeBuddies = [
    { color: "#FF6B6B", delay: 0 },
    { color: "#4ECDC4", delay: 0.1 },
    { color: "#FED766", delay: 0.2 },
    { color: "#A29BFE", delay: 0.3 },
  ];

  const features = [
    { emoji: "🎮", text: "Gamified tracking" },
    { emoji: "💬", text: "Zero judgment" },
    { emoji: "⏰", text: "Gentle reminders" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FF6B6B20 0%, #FED76630 100%)",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* Floating colorful dots background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 8 + Math.random() * 16,
              height: 8 + Math.random() * 16,
              background: ["#FF6B6B40", "#4ECDC440", "#FED76640", "#A29BFE40"][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        {/* Logo/App Name */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1
            className="text-[2.2rem] text-center mb-2"
            style={{ color: "#4A4A6A", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            Sugar Buddy
          </h1>
        </motion.div>

        {/* Character Row */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {welcomeBuddies.map((buddy, i) => (
            <motion.div
              key={i}
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${buddy.color}40, ${buddy.color}20)`,
                border: `3px solid ${buddy.color}`,
                boxShadow: `0 4px 16px ${buddy.color}30`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4 + buddy.delay,
                type: "spring",
                stiffness: 200,
              }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: buddy.delay,
                }}
              >
                {/* Simple buddy face */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="11" cy="14" r="2" fill={buddy.color} />
                  <circle cx="21" cy="14" r="2" fill={buddy.color} />
                  <path
                    d="M10 20 Q16 24 22 20"
                    stroke={buddy.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Title */}
        <motion.h2
          className="text-[1.6rem] text-center mb-2 px-6"
          style={{ color: "#4A4A6A", fontWeight: 800 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Your Diabetes Buddy awaits! 🌟
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-[0.95rem] text-center mb-10 px-6"
          style={{ color: "#8A8498" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Track glucose. Feel supported. Never alone.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center px-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={{
                background: "white",
                boxShadow: "0 2px 12px rgba(162, 155, 254, 0.15)",
              }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              <span className="text-[1.1rem]">{feature.emoji}</span>
              <span
                className="text-[0.8rem]"
                style={{ color: "#4A4A6A", fontWeight: 600 }}
              >
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-10 relative z-10">
        <motion.button
          onClick={onContinue}
          className="w-full py-4.5 rounded-2xl text-[1.05rem] flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
            color: "white",
            fontWeight: 800,
            boxShadow: "0 6px 20px rgba(255, 107, 107, 0.35)",
          }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          Let's Go! 🎉
        </motion.button>
      </div>
    </div>
  );
}
