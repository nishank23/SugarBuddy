import { useState } from "react";
import { motion } from "motion/react";
import { CharacterAvatar, characters, type CharacterOption } from "./CharacterSelectionScreen";

interface NameBuddyScreenProps {
  onContinue: (buddyName: string) => void;
  onBack: () => void;
  characterId: string;
}

export function NameBuddyScreen({ onContinue, onBack, characterId }: NameBuddyScreenProps) {
  const selectedChar = characters.find((c) => c.id === characterId);
  const [buddyName, setBuddyName] = useState(selectedChar?.name || "");

  const handleSubmit = () => {
    if (buddyName.trim()) {
      onContinue(buddyName.trim());
    }
  };

  if (!selectedChar) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #FED76620 0%, #A29BFE20 100%)",
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
        {/* Title */}
        <motion.h1
          className="text-[1.5rem] mb-2 text-center"
          style={{ color: "#4A4A6A", fontWeight: 800 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Name Your Buddy! ✨
        </motion.h1>

        {/* Large character preview */}
        <motion.div
          className="mb-6 mt-6 relative"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-36 h-36 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${selectedChar.bodyColor}15, ${selectedChar.bodyColor}08)`,
              border: `3px solid #FF6B6B50`,
              boxShadow: "0 0 0 6px #FF6B6B10, 0 8px 30px rgba(255,107,107,0.12)",
            }}
          >
            <div className="-mb-6">
              <CharacterAvatar char={selectedChar} size={120} />
            </div>
          </div>
          
          {/* Sparkles */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-[1.2rem]">✨</span>
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-2"
            animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <span className="text-[1rem]">✨</span>
          </motion.div>
        </motion.div>

        {/* Name input */}
        <div className="w-full max-w-xs">
          <input
            type="text"
            value={buddyName}
            onChange={(e) => setBuddyName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type a name..."
            maxLength={15}
            autoFocus
            className="w-full text-center py-4 rounded-2xl outline-none text-[1.4rem]"
            style={{
              background: "white",
              color: "#4A4A6A",
              fontWeight: 700,
              fontFamily: "Nunito, sans-serif",
              border: "2.5px solid #A29BFE30",
              boxShadow: "0 4px 16px rgba(162, 155, 254, 0.1)",
              caretColor: "#FF6B6B",
            }}
          />
          <p className="text-center text-[0.65rem] mt-2" style={{ color: "#C4BFD6" }}>
            {buddyName.length}/15 characters
          </p>
        </div>

        {/* Confirmation message */}
        {buddyName.trim() && buddyName !== selectedChar.name && (
          <motion.p
            className="text-[0.95rem] text-center mt-6"
            style={{ color: "#FF6B6B", fontWeight: 700 }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🎉 {buddyName} loves it!
          </motion.p>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-10">
        <motion.button
          onClick={handleSubmit}
          disabled={!buddyName.trim()}
          className="w-full py-4.5 rounded-2xl text-[1.05rem]"
          style={{
            background: buddyName.trim()
              ? "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)"
              : "#E8E4F0",
            color: buddyName.trim() ? "white" : "#C4BFD6",
            fontWeight: 800,
            boxShadow: buddyName.trim() ? "0 6px 20px rgba(255, 107, 107, 0.35)" : "none",
            fontFamily: "Nunito, sans-serif",
          }}
          whileTap={buddyName.trim() ? { scale: 0.97 } : {}}
        >
          {buddyName.trim() ? `Let's Go, ${buddyName}!` : "Enter a name"}
        </motion.button>
      </div>
    </div>
  );
}
