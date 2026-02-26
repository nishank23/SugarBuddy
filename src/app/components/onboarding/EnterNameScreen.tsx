import { useState } from "react";
import { motion } from "motion/react";

interface EnterNameScreenProps {
  onContinue: (name: string) => void;
  onBack: () => void;
}

export function EnterNameScreen({ onContinue, onBack }: EnterNameScreenProps) {
  const [userName, setUserName] = useState("");

  const handleSubmit = () => {
    if (userName.trim()) {
      onContinue(userName.trim());
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #4ECDC420 0%, #E8E3FF 100%)",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* Back button */}
      <div className="px-5 pt-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[0.82rem] px-3 py-1.5 rounded-xl"
          style={{ color: "#A29BFE", background: "#A29BFE12", fontWeight: 600 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 4L6 8L10 12"
              stroke="#A29BFE"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Animated waving hand */}
        <motion.div
          className="text-[4rem] mb-6"
          animate={{
            rotate: [0, 14, -8, 14, -4, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          👋
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-[1.8rem] text-center mb-2"
          style={{ color: "#4A4A6A", fontWeight: 800 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          What's your name?
        </motion.h1>

        {/* Input */}
        <motion.div
          className="w-full max-w-sm mt-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Enter your name..."
            maxLength={20}
            autoFocus
            className="w-full text-center py-5 rounded-2xl outline-none text-[1.3rem]"
            style={{
              background: "white",
              color: "#4A4A6A",
              fontWeight: 700,
              border: "3px solid #4ECDC430",
              boxShadow: "0 6px 24px rgba(78, 205, 196, 0.15)",
              caretColor: "#4ECDC4",
              fontFamily: "Nunito, sans-serif",
            }}
          />
        </motion.div>

        {/* Confirmation message */}
        {userName.trim() && (
          <motion.p
            className="text-[1.05rem] text-center mt-6"
            style={{ color: "#4ECDC4", fontWeight: 700 }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Hi {userName}! Great to meet you! 👋
          </motion.p>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-10">
        <motion.button
          onClick={handleSubmit}
          disabled={!userName.trim()}
          className="w-full py-4.5 rounded-2xl text-[1.05rem]"
          style={{
            background: userName.trim()
              ? "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)"
              : "#E8E4F0",
            color: userName.trim() ? "white" : "#C4BFD6",
            fontWeight: 800,
            boxShadow: userName.trim() ? "0 6px 20px rgba(255, 107, 107, 0.35)" : "none",
            fontFamily: "Nunito, sans-serif",
          }}
          whileTap={userName.trim() ? { scale: 0.97 } : {}}
        >
          {userName.trim() ? "Continue" : "Enter your name"}
        </motion.button>
      </div>
    </div>
  );
}
