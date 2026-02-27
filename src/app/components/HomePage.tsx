import { useState, useCallback } from "react";
import { GlucoseBuddy } from "./GlucoseBuddy";
import { motion } from "motion/react";
import { Droplets, Clock, TrendingUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { characters, CharacterAvatar } from "./onboarding/CharacterSelectionScreen";

const quickRanges = [
  { label: "Low", value: 55, color: "#A29BFE" },
  { label: "In Range", value: 120, color: "#4ECDC4" },
  { label: "High", value: 220, color: "#FED766" },
  { label: "Very High", value: 300, color: "#FF6B6B" },
];

function getRangeLabel(glucose: number): { label: string; color: string; bg: string } {
  if (glucose < 70) return { label: "Low", color: "#7B73E0", bg: "#A29BFE20" };
  if (glucose <= 180) return { label: "In Range", color: "#2DA89E", bg: "#4ECDC420" };
  if (glucose <= 250) return { label: "High", color: "#D4A017", bg: "#FED76640" };
  return { label: "Very High", color: "#E04545", bg: "#FF6B6B20" };
}

function getTimeAgo(mins: number): string {
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 22) return "Good evening";
  return "Good night";
}

function getOnboardingData() {
  try {
    const raw = localStorage.getItem("sugarBuddyOnboarding");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function HomePage() {
  const navigate = useNavigate();
  const [glucose, setGlucose] = useState(120);
  const [showQuickPick, setShowQuickPick] = useState(false);
  const [lastReadingTime] = useState(5);
  const [trend] = useState<"up" | "down" | "flat">("flat");

  // Load onboarding data
  const onboardingData = getOnboardingData();
  const userName = onboardingData?.userName || "Friend";
  const characterId = onboardingData?.characterId || "coral";
  const buddyName = onboardingData?.buddyName || "Buddy";

  const char = characters.find((c) => c.id === characterId) || characters[0];
  const characterColor = char.bodyColor;

  const range = getRangeLabel(glucose);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGlucose(Number(e.target.value));
  }, []);

  return (
    <div
      className="min-h-screen pb-24 overflow-y-auto"
      style={{
        background: "linear-gradient(180deg, #FFF5F5 0%, #F0FFFE 40%, #F8F6FF 100%)",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-2 flex items-center justify-between">
        <div>
          <p className="text-[0.85rem]" style={{ color: "#B0A8C0" }}>
            {getGreeting()} 👋
          </p>
          <h1 className="text-[1.4rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
            Hey, {userName}!
          </h1>
        </div>

        {/* Buddy avatar tap → Settings */}
        <motion.button
          onClick={() => navigate("/app/settings")}
          className="relative"
          whileTap={{ scale: 0.92 }}
          style={{ outline: "none" }}
        >
          <div
            className="w-[42px] h-[42px] rounded-full flex items-center justify-center overflow-hidden"
            style={{
              border: "2.5px solid #FF6B6B",
              background: `${characterColor}18`,
              boxShadow: "0 2px 12px rgba(255, 107, 107, 0.25)",
            }}
          >
            <div style={{ marginBottom: -6 }}>
              <CharacterAvatar char={char} size={38} />
            </div>
          </div>
          {/* Tiny settings dot */}
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
            style={{ background: "#FF6B6B", border: "1.5px solid white" }}
          >
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
              <circle cx="3.5" cy="3.5" r="1.5" fill="white" />
              <circle cx="3.5" cy="1" r="0.6" fill="white" />
              <circle cx="3.5" cy="6" r="0.6" fill="white" />
              <circle cx="1" cy="3.5" r="0.6" fill="white" />
              <circle cx="6" cy="3.5" r="0.6" fill="white" />
            </svg>
          </div>
        </motion.button>
      </div>

      {/* Quick Stats Bar */}
      <div className="px-5 py-3">
        <div className="flex gap-3">
          <motion.div
            className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(162, 155, 254, 0.1)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#4ECDC415" }}>
              <Droplets size={16} color="#4ECDC4" />
            </div>
            <div>
              <p className="text-[0.65rem]" style={{ color: "#B0A8C0" }}>Today</p>
              <p className="text-[0.85rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>3 logs</p>
            </div>
          </motion.div>
          <motion.div
            className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl"
            style={{ background: "white", boxShadow: "0 2px 12px rgba(162, 155, 254, 0.1)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#FED76615" }}>
              <TrendingUp size={16} color="#D4A017" />
            </div>
            <div>
              <p className="text-[0.65rem]" style={{ color: "#B0A8C0" }}>Avg</p>
              <p className="text-[0.85rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>128 mg/dL</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Character Section */}
      <motion.div
        className="flex flex-col items-center px-5 pt-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <GlucoseBuddy glucose={glucose} name={buddyName} color={characterColor} />

        {/* Buddy Name Badge */}
        <motion.div
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full mt-2"
          style={{
            background: "linear-gradient(135deg, #FF6B6B18, #FF8E8E10)",
            border: "1.5px solid #FF6B6B30",
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <span style={{ fontSize: "0.9rem" }}>🐻</span>
          <span
            className="text-[0.78rem]"
            style={{ color: "#FF6B6B", fontWeight: 700 }}
          >
            {buddyName}
          </span>
        </motion.div>
      </motion.div>

      {/* Glucose Reading Card */}
      <motion.div
        className="mx-5 mt-4 p-5 rounded-3xl"
        style={{
          background: "white",
          boxShadow: "0 4px 20px rgba(162, 155, 254, 0.12)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets size={18} color="#FF6B6B" />
            <span className="text-[0.8rem]" style={{ color: "#B0A8C0", fontWeight: 600 }}>
              Last Reading
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={13} color="#B0A8C0" />
            <span className="text-[0.72rem]" style={{ color: "#B0A8C0" }}>
              {getTimeAgo(lastReadingTime)}
            </span>
          </div>
        </div>

        <div className="flex items-end gap-2 mb-1">
          <span className="text-[2.8rem]" style={{ color: "#4A4A6A", fontWeight: 800, lineHeight: 1 }}>
            {glucose}
          </span>
          <span className="text-[0.9rem] pb-1" style={{ color: "#B0A8C0", fontWeight: 600 }}>
            mg/dL
          </span>
          <div className="ml-auto flex items-center gap-1">
            {trend === "up" && <TrendingUp size={16} color="#D4A017" />}
            {trend === "flat" && (
              <div className="w-4 h-[2px] rounded" style={{ background: "#4ECDC4" }} />
            )}
            <span
              className="text-[0.75rem] px-3 py-1 rounded-full"
              style={{
                color: range.color,
                background: range.bg,
                fontWeight: 700,
              }}
            >
              {range.label}
            </span>
          </div>
        </div>

        {/* Glucose slider for demo */}
        <div className="mt-4 pt-3" style={{ borderTop: "1px dashed #E8E4F0" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[0.72rem]" style={{ color: "#B0A8C0", fontWeight: 600 }}>
              Try different levels:
            </span>
            <button
              onClick={() => setShowQuickPick(!showQuickPick)}
              className="flex items-center gap-1 text-[0.72rem] px-2 py-1 rounded-lg"
              style={{ color: "#A29BFE", background: "#A29BFE10", fontWeight: 600 }}
            >
              Quick pick <ChevronDown size={12} />
            </button>
          </div>

          {showQuickPick && (
            <motion.div
              className="flex gap-2 mb-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              {quickRanges.map((r) => (
                <button
                  key={r.label}
                  onClick={() => {
                    setGlucose(r.value);
                    setShowQuickPick(false);
                  }}
                  className="flex-1 py-2 rounded-xl text-[0.7rem]"
                  style={{
                    background: `${r.color}15`,
                    color: r.color,
                    fontWeight: 700,
                    border: `2px solid ${r.color}30`,
                  }}
                >
                  {r.label}
                </button>
              ))}
            </motion.div>
          )}

          <div className="relative">
            <input
              type="range"
              min="40"
              max="400"
              value={glucose}
              onChange={handleSliderChange}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, #A29BFE 0%, #4ECDC4 18%, #4ECDC4 43%, #FED766 65%, #FF6B6B 100%)`,
                WebkitAppearance: "none",
              }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-[0.6rem]" style={{ color: "#B0A8C0" }}>40</span>
              <span className="text-[0.6rem]" style={{ color: "#B0A8C0" }}>70</span>
              <span className="text-[0.6rem]" style={{ color: "#B0A8C0" }}>180</span>
              <span className="text-[0.6rem]" style={{ color: "#B0A8C0" }}>250</span>
              <span className="text-[0.6rem]" style={{ color: "#B0A8C0" }}>400</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tips Card */}
      <motion.div
        className="mx-5 mt-4 mb-6 p-4 rounded-2xl flex items-center gap-3"
        style={{
          background: "linear-gradient(135deg, #FED76615 0%, #4ECDC415 100%)",
          border: "2px solid #FED76625",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-[1.8rem]">💡</span>
        <div>
          <p className="text-[0.8rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            Daily Tip
          </p>
          <p className="text-[0.72rem]" style={{ color: "#8A8498" }}>
            Drinking water helps your body manage sugar levels. Try to drink 6-8 glasses today!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
