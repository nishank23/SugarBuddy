import { motion } from "motion/react";
import { Award, Target, Zap, Heart, TrendingUp } from "lucide-react";

const earnedAchievements = [
  {
    icon: "🏆",
    title: "7-Day Streak!",
    desc: "Logged every single day this week. Keep it up!",
    color: "#FED766",
    bg: "#FED76618",
  },
  {
    icon: "🎯",
    title: "Bullseye",
    desc: "5 readings in range today. You're crushing it!",
    color: "#4ECDC4",
    bg: "#4ECDC418",
  },
];

const tips = [
  {
    emoji: "🥤",
    title: "Stay Hydrated",
    desc: "Water helps your kidneys flush out extra sugar. Aim for 6-8 glasses a day!",
    color: "#4ECDC4",
    bg: "linear-gradient(135deg, #4ECDC415, #4ECDC408)",
  },
  {
    emoji: "🚶",
    title: "Walk After Meals",
    desc: "A 15-minute walk after eating can help reduce glucose spikes naturally.",
    color: "#FED766",
    bg: "linear-gradient(135deg, #FED76618, #FED76608)",
  },
];

export function InsightsPage() {
  return (
    <div
      className="min-h-screen pb-24 overflow-y-auto"
      style={{
        background: "linear-gradient(180deg, #FFF5F5 0%, #F8F6FF 50%, #F0FFFE 100%)",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-[1.4rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
          💡 Insights
        </h1>
        <p className="text-[0.82rem]" style={{ color: "#B0A8C0" }}>
          Your week at a glance
        </p>
      </div>

      {/* ── Weekly Summary Card ── */}
      <motion.div
        className="mx-5 mb-4 rounded-3xl overflow-hidden"
        style={{
          background: "white",
          boxShadow: "0 4px 24px rgba(162, 155, 254, 0.12)",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        {/* Card header */}
        <div
          className="px-5 py-4 flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #FF6B6B12, #A29BFE10)",
            borderBottom: "1px solid #F5F0FF",
          }}
        >
          <TrendingUp size={18} color="#FF6B6B" />
          <span className="text-[0.95rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            Weekly Summary
          </span>
          <span
            className="ml-auto text-[0.7rem] px-2.5 py-1 rounded-full"
            style={{ background: "#FF6B6B15", color: "#FF6B6B", fontWeight: 700 }}
          >
            This Week
          </span>
        </div>

        {/* Stat tiles */}
        <div className="p-4 grid grid-cols-3 gap-3">
          {/* Time in range */}
          <motion.div
            className="rounded-2xl p-3 text-center"
            style={{
              background: "linear-gradient(135deg, #4ECDC415, #4ECDC408)",
              border: "1.5px solid #4ECDC420",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-center mb-1">
              <Target size={15} color="#4ECDC4" />
            </div>
            <p className="text-[1.4rem]" style={{ color: "#4A4A6A", fontWeight: 800, lineHeight: 1.1 }}>79%</p>
            <p className="text-[0.6rem] mt-1" style={{ color: "#4ECDC4", fontWeight: 700 }}>In Range</p>
          </motion.div>

          {/* Average glucose */}
          <motion.div
            className="rounded-2xl p-3 text-center"
            style={{
              background: "linear-gradient(135deg, #FED76618, #FED76608)",
              border: "1.5px solid #FED76625",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center justify-center mb-1">
              <Zap size={15} color="#D4A017" />
            </div>
            <p className="text-[1.4rem]" style={{ color: "#4A4A6A", fontWeight: 800, lineHeight: 1.1 }}>128</p>
            <p className="text-[0.6rem] mt-1" style={{ color: "#D4A017", fontWeight: 700 }}>Avg mg/dL</p>
          </motion.div>

          {/* Total logs */}
          <motion.div
            className="rounded-2xl p-3 text-center"
            style={{
              background: "linear-gradient(135deg, #FF6B6B15, #FF6B6B08)",
              border: "1.5px solid #FF6B6B20",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-1">
              <Heart size={15} color="#FF6B6B" />
            </div>
            <p className="text-[1.4rem]" style={{ color: "#4A4A6A", fontWeight: 800, lineHeight: 1.1 }}>21</p>
            <p className="text-[0.6rem] mt-1" style={{ color: "#FF6B6B", fontWeight: 700 }}>Logs</p>
          </motion.div>
        </div>

        {/* Progress bar for time in range */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[0.7rem]" style={{ color: "#B0A8C0", fontWeight: 600 }}>Time in range progress</span>
            <span className="text-[0.7rem]" style={{ color: "#4ECDC4", fontWeight: 700 }}>79%</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "#E8F8F7" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #4ECDC4, #2DA89E)" }}
              initial={{ width: 0 }}
              animate={{ width: "79%" }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Achievements Card ── */}
      <motion.div
        className="mx-5 mb-4 rounded-3xl overflow-hidden"
        style={{
          background: "white",
          boxShadow: "0 4px 24px rgba(162, 155, 254, 0.12)",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Card header */}
        <div
          className="px-5 py-4 flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #FED76612, #FF6B6B08)",
            borderBottom: "1px solid #F5F0FF",
          }}
        >
          <Award size={18} color="#FED766" />
          <span className="text-[0.95rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            Achievements
          </span>
          <span
            className="ml-auto text-[0.7rem] px-2.5 py-1 rounded-full"
            style={{ background: "#FED76620", color: "#C49600", fontWeight: 700 }}
          >
            2 Earned 🎉
          </span>
        </div>

        {/* Achievement items */}
        <div className="p-4 space-y-3">
          {earnedAchievements.map((badge, i) => (
            <motion.div
              key={badge.title}
              className="flex items-center gap-4 p-3 rounded-2xl"
              style={{
                background: badge.bg,
                border: `1.5px solid ${badge.color}25`,
              }}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {/* Badge icon with glow */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "white",
                  boxShadow: `0 3px 12px ${badge.color}25`,
                }}
              >
                <span className="text-[1.6rem]">{badge.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-[0.88rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
                  {badge.title}
                </p>
                <p className="text-[0.72rem] mt-0.5" style={{ color: "#8A8498" }}>
                  {badge.desc}
                </p>
              </div>
              {/* Earned check */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: badge.color }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Locked badges teaser */}
        <div className="px-4 pb-4">
          <div
            className="rounded-2xl px-4 py-3 flex items-center gap-2"
            style={{ background: "#F5F0FF" }}
          >
            <span className="text-[0.9rem]">🔒</span>
            <p className="text-[0.72rem]" style={{ color: "#A29BFE", fontWeight: 600 }}>
              2 more badges to unlock — keep logging!
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Tips & Learn ── */}
      <motion.div
        className="mx-5 mb-4 rounded-3xl overflow-hidden"
        style={{
          background: "white",
          boxShadow: "0 4px 24px rgba(162, 155, 254, 0.12)",
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {/* Card header */}
        <div
          className="px-5 py-4 flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #4ECDC412, #A29BFE08)",
            borderBottom: "1px solid #F5F0FF",
          }}
        >
          <span className="text-[1rem]">✨</span>
          <span className="text-[0.95rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            Tips & Learn
          </span>
        </div>

        <div className="p-4 space-y-3">
          {tips.map((tip, i) => (
            <motion.div
              key={tip.title}
              className="p-4 rounded-2xl flex items-start gap-3"
              style={{
                background: tip.bg,
                borderLeft: `4px solid ${tip.color}`,
                border: `1.5px solid ${tip.color}20`,
                borderLeftWidth: 4,
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "white", boxShadow: `0 2px 8px ${tip.color}20` }}
              >
                <span className="text-[1.3rem]">{tip.emoji}</span>
              </div>
              <div>
                <p className="text-[0.85rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
                  {tip.title}
                </p>
                <p className="text-[0.72rem] mt-0.5" style={{ color: "#8A8498", lineHeight: 1.55 }}>
                  {tip.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More tips teaser */}
        <div className="px-4 pb-4">
          <button
            className="w-full py-3 rounded-2xl text-[0.8rem]"
            style={{
              background: "linear-gradient(135deg, #A29BFE15, #4ECDC415)",
              color: "#A29BFE",
              fontWeight: 700,
              fontFamily: "Nunito, sans-serif",
              border: "1.5px solid #A29BFE20",
            }}
          >
            Browse all tips 📚
          </button>
        </div>
      </motion.div>
    </div>
  );
}
