import { useState } from "react";
import { motion } from "motion/react";
import { CharacterAvatar, characters, type CharacterOption } from "./CharacterSelectionScreen";

interface DiabetesInfoScreenProps {
  onContinue: (diabetesType: string, ageGroup: string) => void;
  onBack: () => void;
  characterId: string;
  buddyName: string;
}

export function DiabetesInfoScreen({
  onContinue,
  onBack,
  characterId,
  buddyName,
}: DiabetesInfoScreenProps) {
  const [diabetesType, setDiabetesType] = useState<string | null>(null);
  const [ageGroup, setAgeGroup] = useState<string | null>(null);

  const selectedChar = characters.find((c) => c.id === characterId);

  const handleSubmit = () => {
    if (diabetesType && ageGroup) {
      onContinue(diabetesType, ageGroup);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #4ECDC420 0%, #A29BFE20 100%)",
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
          className="text-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-[1.6rem] mb-1"
            style={{ color: "#4A4A6A", fontWeight: 800 }}
          >
            Tell us about you
          </h1>
          <p className="text-[0.88rem]" style={{ color: "#8A8498" }}>
            {buddyName} wants to support you better 💙
          </p>
        </motion.div>

        {/* Diabetes Type Section */}
        <div className="mb-6">
          <label
            className="block text-[0.85rem] mb-3"
            style={{ color: "#4A4A6A", fontWeight: 700 }}
          >
            What type of diabetes do you have?
          </label>
          <div className="flex gap-3">
            {["Type 1", "Type 2"].map((type) => (
              <motion.button
                key={type}
                onClick={() => setDiabetesType(type)}
                className="flex-1 py-4 rounded-2xl text-[0.95rem]"
                style={{
                  background: diabetesType === type ? "#FF6B6B" : "white",
                  color: diabetesType === type ? "white" : "#4A4A6A",
                  fontWeight: 700,
                  border:
                    diabetesType === type ? "2px solid #FF6B6B" : "2px solid #E8E4F0",
                  boxShadow:
                    diabetesType === type
                      ? "0 4px 16px rgba(255, 107, 107, 0.25)"
                      : "0 2px 8px rgba(162, 155, 254, 0.08)",
                }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: type === "Type 1" ? 0.1 : 0.15 }}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Age Group Section */}
        <div className="mb-8">
          <label
            className="block text-[0.85rem] mb-3"
            style={{ color: "#4A4A6A", fontWeight: 700 }}
          >
            How old are you?
          </label>
          <div className="flex flex-col gap-3">
            {[
              { label: "👦 8–12 years", value: "8-12" },
              { label: "🧑 13–17 years", value: "13-17" },
              { label: "🧑‍💻 18+ years", value: "18+" },
            ].map((age, i) => (
              <motion.button
                key={age.value}
                onClick={() => setAgeGroup(age.value)}
                className="w-full py-4 rounded-2xl text-[0.95rem]"
                style={{
                  background: ageGroup === age.value ? "#A29BFE" : "white",
                  color: ageGroup === age.value ? "white" : "#4A4A6A",
                  fontWeight: 700,
                  border:
                    ageGroup === age.value ? "2px solid #A29BFE" : "2px solid #E8E4F0",
                  boxShadow:
                    ageGroup === age.value
                      ? "0 4px 16px rgba(162, 155, 254, 0.25)"
                      : "0 2px 8px rgba(162, 155, 254, 0.08)",
                }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                {age.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Privacy note */}
        <motion.div
          className="text-center text-[0.75rem] px-4"
          style={{ color: "#B0A8C0" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your information is private and used only to personalize your experience
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-10">
        <motion.button
          onClick={handleSubmit}
          disabled={!diabetesType || !ageGroup}
          className="w-full py-4.5 rounded-2xl text-[1.05rem]"
          style={{
            background:
              diabetesType && ageGroup
                ? "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)"
                : "#E8E4F0",
            color: diabetesType && ageGroup ? "white" : "#C4BFD6",
            fontWeight: 800,
            boxShadow:
              diabetesType && ageGroup ? "0 6px 20px rgba(255, 107, 107, 0.35)" : "none",
            fontFamily: "Nunito, sans-serif",
          }}
          whileTap={diabetesType && ageGroup ? { scale: 0.97 } : {}}
        >
          {diabetesType && ageGroup ? "Continue" : "Answer both questions"}
        </motion.button>
      </div>
    </div>
  );
}
