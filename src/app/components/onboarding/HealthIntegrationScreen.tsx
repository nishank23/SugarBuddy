import { useState } from "react";
import { motion } from "motion/react";
import { CharacterAvatar, characters } from "./CharacterSelectionScreen";
import { Switch } from "../ui/switch";

interface HealthIntegrationScreenProps {
  onComplete: (integrations: { appleHealth: boolean; googleFit: boolean }) => void;
  onBack: () => void;
  characterId: string;
}

export function HealthIntegrationScreen({
  onComplete,
  onBack,
  characterId,
}: HealthIntegrationScreenProps) {
  const [appleHealth, setAppleHealth] = useState(false);
  const [googleFit, setGoogleFit] = useState(false);

  const selectedChar = characters.find((c) => c.id === characterId);

  const handleSubmit = () => {
    onComplete({ appleHealth, googleFit });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #74B9FF20 0%, #4ECDC420 100%)",
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
      <div className="flex-1 flex flex-col px-6 pt-4">
        {/* Small character at top */}
        {selectedChar && (
          <motion.div
            className="flex justify-center mb-4"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${selectedChar.bodyColor}20, ${selectedChar.bodyColor}10)`,
                border: `2px solid ${selectedChar.bodyColor}40`,
              }}
            >
              <div className="-mb-2">
                <CharacterAvatar char={selectedChar} size={50} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-[1.6rem] mb-1"
            style={{ color: "#4A4A6A", fontWeight: 800 }}
          >
            Connect your health app
          </h1>
          <p className="text-[0.88rem]" style={{ color: "#8A8498" }}>
            Import glucose readings automatically — no manual typing needed!
          </p>
        </motion.div>

        {/* Integration Cards */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Apple Health */}
          <motion.div
            className="p-4 rounded-2xl"
            style={{
              background: "white",
              boxShadow: appleHealth
                ? "0 4px 20px rgba(255, 107, 107, 0.15)"
                : "0 2px 12px rgba(162, 155, 254, 0.1)",
              border: appleHealth ? "2px solid #FF6B6B30" : "2px solid transparent",
              transition: "all 0.3s",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #FF0844 0%, #FF375F 100%)",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="white">
                  <path d="M14 4C14 4 12 2 10 2C6 2 4 5 4 8C4 13 14 22 14 22C14 22 24 13 24 8C24 5 22 2 18 2C16 2 14 4 14 4Z" />
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p
                  className="text-[0.95rem] mb-0.5"
                  style={{ color: "#4A4A6A", fontWeight: 700 }}
                >
                  Apple Health
                </p>
                <p className="text-[0.72rem]" style={{ color: "#8A8498" }}>
                  iOS — HealthKit integration
                </p>
              </div>

              {/* Toggle */}
              <Switch checked={appleHealth} onCheckedChange={setAppleHealth} />
            </div>
          </motion.div>

          {/* Google Fit */}
          <motion.div
            className="p-4 rounded-2xl"
            style={{
              background: "white",
              boxShadow: googleFit
                ? "0 4px 20px rgba(78, 205, 196, 0.15)"
                : "0 2px 12px rgba(162, 155, 254, 0.1)",
              border: googleFit ? "2px solid #4ECDC430" : "2px solid transparent",
              transition: "all 0.3s",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #4ECDC4 0%, #5FE3DB 100%)",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="white">
                  <path d="M14 4C14 4 12 2 10 2C6 2 4 5 4 8C4 13 14 22 14 22C14 22 24 13 24 8C24 5 22 2 18 2C16 2 14 4 14 4Z" />
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p
                  className="text-[0.95rem] mb-0.5"
                  style={{ color: "#4A4A6A", fontWeight: 700 }}
                >
                  Google Fit
                </p>
                <p className="text-[0.72rem]" style={{ color: "#8A8498" }}>
                  Android — Health Connect
                </p>
              </div>

              {/* Toggle */}
              <Switch checked={googleFit} onCheckedChange={setGoogleFit} />
            </div>
          </motion.div>
        </div>

        {/* Privacy Note */}
        <motion.div
          className="p-4 rounded-2xl"
          style={{
            background: "#A29BFE15",
            border: "1px solid #A29BFE20",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-3">
            <span className="text-[1.2rem]">🔒</span>
            <div>
              <p
                className="text-[0.8rem]"
                style={{ color: "#4A4A6A", fontWeight: 600 }}
              >
                Your data stays only on your device. Never uploaded. You're in full
                control.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTAs */}
      <div className="px-6 pb-10">
        {/* Skip button */}
        <motion.button
          onClick={handleSubmit}
          className="w-full text-center py-2 mb-3 text-[0.85rem]"
          style={{ color: "#A29BFE", fontWeight: 600 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip
        </motion.button>

        {/* Continue button */}
        <motion.button
          onClick={handleSubmit}
          className="w-full py-4.5 rounded-2xl text-[1.05rem]"
          style={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
            color: "white",
            fontWeight: 800,
            boxShadow: "0 6px 20px rgba(255, 107, 107, 0.35)",
            fontFamily: "Nunito, sans-serif",
          }}
          whileTap={{ scale: 0.97 }}
        >
          {appleHealth || googleFit ? "Continue with integration" : "Continue"}
        </motion.button>
      </div>
    </div>
  );
}
