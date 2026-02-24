import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

const contextTags = [
  { label: "Before Meal", emoji: "🍽️", color: "#FED766" },
  { label: "After Meal", emoji: "😋", color: "#4ECDC4" },
  { label: "Fasting", emoji: "🌅", color: "#A29BFE" },
  { label: "Bedtime", emoji: "🌙", color: "#7B73E0" },
  { label: "Exercise", emoji: "🏃", color: "#FF6B6B" },
  { label: "Snack", emoji: "🍎", color: "#FF8E8E" },
  { label: "Feeling Off", emoji: "🤒", color: "#D4A017" },
  { label: "Other", emoji: "📝", color: "#B0A8C0" },
];

function PencilBuddy() {
  return (
    <motion.svg
      width="80"
      height="90"
      viewBox="0 0 80 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -4, 0], rotate: [-3, 3, -3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Body */}
      <ellipse cx="35" cy="52" rx="28" ry="30" fill="#FF6B6B" />
      <ellipse cx="35" cy="58" rx="18" ry="18" fill="white" opacity="0.25" />
      {/* Ears */}
      <circle cx="14" cy="30" r="9" fill="#FF6B6B" />
      <circle cx="14" cy="30" r="5" fill="#FFB4B4" opacity="0.5" />
      <circle cx="56" cy="30" r="9" fill="#FF6B6B" />
      <circle cx="56" cy="30" r="5" fill="#FFB4B4" opacity="0.5" />
      {/* Eyes */}
      <circle cx="26" cy="44" r="5" fill="white" stroke="#4A4A6A" strokeWidth="1.5" />
      <circle cx="27" cy="43" r="3" fill="#4A4A6A" />
      <circle cx="28.5" cy="41.5" r="1.2" fill="white" />
      <circle cx="44" cy="44" r="5" fill="white" stroke="#4A4A6A" strokeWidth="1.5" />
      <circle cx="45" cy="43" r="3" fill="#4A4A6A" />
      <circle cx="46.5" cy="41.5" r="1.2" fill="white" />
      {/* Mouth */}
      <path d="M29 54 Q35 62 41 54" stroke="#4A4A6A" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <ellipse cx="20" cy="52" rx="5" ry="3.5" fill="#FFB4B4" opacity="0.6" />
      <ellipse cx="50" cy="52" rx="5" ry="3.5" fill="#FFB4B4" opacity="0.6" />
      {/* Pencil in right hand */}
      <motion.g
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "62px 50px" }}
      >
        {/* Arm holding pencil */}
        <path d="M58 50 Q65 45 68 38" stroke="#FF6B6B" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Pencil body */}
        <rect x="64" y="12" width="7" height="30" rx="2" fill="#FED766" transform="rotate(10, 67, 27)" />
        {/* Pencil tip */}
        <polygon points="64,42 68,50 72,42" fill="#FFE4A0" transform="rotate(10, 68, 46)" />
        <polygon points="66,46 68,52 70,46" fill="#4A4A6A" transform="rotate(10, 68, 49)" />
        {/* Pencil eraser */}
        <rect x="64" y="10" width="7" height="6" rx="2" fill="#FF8E8E" transform="rotate(10, 67, 13)" />
      </motion.g>
      {/* Left arm wave */}
      <path d="M12 50 Q4 55 6 63" stroke="#FF6B6B" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Feet */}
      <ellipse cx="25" cy="78" rx="9" ry="5" fill="#FF6B6B" />
      <ellipse cx="45" cy="78" rx="9" ry="5" fill="#FF6B6B" />
    </motion.svg>
  );
}

export function LogPage() {
  const [glucoseInput, setGlucoseInput] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (!glucoseInput) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setGlucoseInput("");
      setSelectedTag("");
      setNotes("");
    }, 2500);
  };

  const glucoseNum = Number(glucoseInput) || 0;
  const rangeHint =
    glucoseNum === 0
      ? ""
      : glucoseNum < 70
      ? "Low"
      : glucoseNum <= 180
      ? "In Range"
      : glucoseNum <= 250
      ? "High"
      : "Very High";
  const rangeColor =
    glucoseNum < 70
      ? "#A29BFE"
      : glucoseNum <= 180
      ? "#4ECDC4"
      : glucoseNum <= 250
      ? "#FED766"
      : "#FF6B6B";

  return (
    <div
      className="min-h-screen pb-28 overflow-y-auto relative"
      style={{
        background: "linear-gradient(180deg, #F0FFFE 0%, #FFF5F5 50%, #F8F6FF 100%)",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* Small character in corner */}
      <div className="absolute top-3 right-2 z-10">
        <PencilBuddy />
      </div>

      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-[1.4rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
          Log Reading
        </h1>
        <p className="text-[0.82rem]" style={{ color: "#B0A8C0" }}>
          How are you doing right now?
        </p>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="mx-5 mb-4 p-4 rounded-2xl flex items-center gap-3"
            style={{ background: "#4ECDC420", border: "2px solid #4ECDC440" }}
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
          >
            <motion.div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "#4ECDC4" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Check size={22} color="white" strokeWidth={3} />
            </motion.div>
            <div>
              <p className="text-[0.95rem]" style={{ color: "#2DA89E", fontWeight: 700 }}>
                Saved!
              </p>
              <p className="text-[0.75rem]" style={{ color: "#4ECDC4" }}>
                Great job logging today! Keep it up!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big Centered Number Input */}
      <motion.div
        className="mx-5 mt-2 mb-5 p-6 rounded-3xl flex flex-col items-center"
        style={{
          background: "white",
          boxShadow: "0 6px 28px rgba(162, 155, 254, 0.1)",
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-[0.75rem] mb-2" style={{ color: "#B0A8C0", fontWeight: 600 }}>
          Blood Glucose
        </span>
        <div className="relative w-full flex flex-col items-center">
          <input
            type="number"
            inputMode="numeric"
            value={glucoseInput}
            onChange={(e) => setGlucoseInput(e.target.value)}
            placeholder="---"
            className="w-48 text-center py-3 rounded-2xl outline-none"
            style={{
              fontSize: "3.2rem",
              background: "transparent",
              color: glucoseInput ? "#4A4A6A" : "#D4D0E0",
              fontWeight: 800,
              fontFamily: "Nunito, sans-serif",
              lineHeight: 1.1,
              caretColor: "#FF6B6B",
            }}
          />
          <span className="text-[0.9rem] -mt-1" style={{ color: "#C4BFD6", fontWeight: 600 }}>
            mg/dL
          </span>
          {/* Animated underline */}
          <motion.div
            className="h-[3px] rounded-full mt-2"
            style={{ background: glucoseInput ? rangeColor : "#E8E4F0" }}
            animate={{ width: glucoseInput ? 140 : 80 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          {/* Range hint badge */}
          <AnimatePresence>
            {rangeHint && (
              <motion.span
                className="mt-3 px-4 py-1.5 rounded-full text-[0.75rem]"
                style={{
                  background: `${rangeColor}18`,
                  color: rangeColor,
                  fontWeight: 700,
                  border: `1.5px solid ${rangeColor}30`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {rangeHint === "In Range" ? "In Range" : rangeHint}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Horizontal Scrollable Context Tags */}
      <motion.div
        className="mb-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="px-5 mb-2.5">
          <span className="text-[0.82rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            Context
          </span>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-2.5 overflow-x-auto px-5 pb-2 hide-scrollbar"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {contextTags.map((tag) => {
            const isSelected = selectedTag === tag.label;
            return (
              <motion.button
                key={tag.label}
                onClick={() => setSelectedTag(isSelected ? "" : tag.label)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl whitespace-nowrap shrink-0"
                style={{
                  background: isSelected ? `${tag.color}20` : "white",
                  border: isSelected
                    ? `2.5px solid ${tag.color}60`
                    : "2.5px solid transparent",
                  boxShadow: isSelected
                    ? `0 3px 12px ${tag.color}20`
                    : "0 2px 8px rgba(162, 155, 254, 0.06)",
                  fontFamily: "Nunito, sans-serif",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[1.15rem]">{tag.emoji}</span>
                <span
                  className="text-[0.8rem]"
                  style={{
                    color: isSelected ? tag.color : "#8A8498",
                    fontWeight: isSelected ? 700 : 600,
                  }}
                >
                  {tag.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Optional Notes */}
      <motion.div
        className="mx-5 mb-6 p-5 rounded-3xl"
        style={{
          background: "white",
          boxShadow: "0 4px 20px rgba(162, 155, 254, 0.08)",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[0.82rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            Notes
          </span>
          <span className="text-[0.65rem] px-2 py-0.5 rounded-full" style={{ background: "#A29BFE12", color: "#B0A8C0" }}>
            optional
          </span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How are you feeling? Had a snack? Exercised?"
          rows={3}
          className="w-full p-3.5 rounded-2xl outline-none resize-none text-[0.82rem]"
          style={{
            background: "#F8F6FF",
            color: "#4A4A6A",
            fontFamily: "Nunito, sans-serif",
            border: "2px solid #A29BFE12",
            lineHeight: 1.6,
          }}
        />
      </motion.div>

      {/* Coral Save Button */}
      <div className="mx-5 mb-6">
        <motion.button
          onClick={handleSave}
          className="w-full py-4.5 rounded-2xl text-[1.05rem] relative overflow-hidden"
          style={{
            background: glucoseInput
              ? "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)"
              : "#E8E4F0",
            color: glucoseInput ? "white" : "#C4BFD6",
            fontWeight: 800,
            fontFamily: "Nunito, sans-serif",
            boxShadow: glucoseInput
              ? "0 6px 20px rgba(255, 107, 107, 0.35)"
              : "none",
          }}
          whileTap={glucoseInput ? { scale: 0.97 } : {}}
        >
          {glucoseInput ? "Save Entry" : "Enter glucose to save"}
        </motion.button>
      </div>
    </div>
  );
}