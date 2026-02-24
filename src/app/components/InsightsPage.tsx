import { motion } from "motion/react";
import { Award, Target, Star, Heart, Zap, TrendingUp } from "lucide-react";

const achievements = [
  { icon: "🏆", title: "7-Day Streak!", desc: "Logged every day this week", color: "#FED766", earned: true },
  { icon: "🎯", title: "Bullseye", desc: "5 readings in range today", color: "#4ECDC4", earned: true },
  { icon: "⭐", title: "Super Logger", desc: "Log 30 days in a row", color: "#A29BFE", earned: false },
  { icon: "💪", title: "Range Master", desc: "90% in range for a week", color: "#FF6B6B", earned: false },
];

const tips = [
  {
    emoji: "🥤",
    title: "Stay Hydrated",
    desc: "Water helps your kidneys flush out extra sugar through urine.",
    color: "#4ECDC4",
  },
  {
    emoji: "🚶",
    title: "Walk After Meals",
    desc: "A 15-minute walk after eating can help lower glucose spikes.",
    color: "#FED766",
  },
  {
    emoji: "😴",
    title: "Sleep Well",
    desc: "Good sleep helps your body use insulin better. Aim for 8-10 hours!",
    color: "#A29BFE",
  },
  {
    emoji: "🍎",
    title: "Fiber is Your Friend",
    desc: "Foods with fiber slow down sugar absorption. Try fruits and veggies!",
    color: "#FF6B6B",
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
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-[1.4rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
          💡 Insights
        </h1>
        <p className="text-[0.82rem]" style={{ color: "#B0A8C0" }}>
          Learn & earn badges!
        </p>
      </div>

      {/* Weekly Summary */}
      <motion.div
        className="mx-5 mb-4 p-5 rounded-3xl"
        style={{
          background: "linear-gradient(135deg, #FF6B6B15, #A29BFE15)",
          border: "2px solid #FF6B6B15",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={18} color="#FF6B6B" />
          <span className="text-[0.9rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            Weekly Summary
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-2xl" style={{ background: "white" }}>
            <div className="flex items-center justify-center gap-1">
              <Target size={14} color="#4ECDC4" />
            </div>
            <p className="text-[1.3rem] mt-1" style={{ color: "#4A4A6A", fontWeight: 800 }}>79%</p>
            <p className="text-[0.6rem]" style={{ color: "#B0A8C0" }}>In Range</p>
          </div>
          <div className="text-center p-3 rounded-2xl" style={{ background: "white" }}>
            <div className="flex items-center justify-center gap-1">
              <Zap size={14} color="#FED766" />
            </div>
            <p className="text-[1.3rem] mt-1" style={{ color: "#4A4A6A", fontWeight: 800 }}>128</p>
            <p className="text-[0.6rem]" style={{ color: "#B0A8C0" }}>Avg mg/dL</p>
          </div>
          <div className="text-center p-3 rounded-2xl" style={{ background: "white" }}>
            <div className="flex items-center justify-center gap-1">
              <Heart size={14} color="#FF6B6B" />
            </div>
            <p className="text-[1.3rem] mt-1" style={{ color: "#4A4A6A", fontWeight: 800 }}>21</p>
            <p className="text-[0.6rem]" style={{ color: "#B0A8C0" }}>Logs</p>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <div className="px-5 mb-3">
        <div className="flex items-center gap-2">
          <Award size={18} color="#FED766" />
          <span className="text-[0.9rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            Achievements
          </span>
        </div>
      </div>

      <div className="px-5 mb-4 grid grid-cols-2 gap-3">
        {achievements.map((badge, i) => (
          <motion.div
            key={badge.title}
            className="p-4 rounded-2xl text-center relative overflow-hidden"
            style={{
              background: badge.earned ? "white" : "#F0ECF8",
              boxShadow: badge.earned ? "0 3px 12px rgba(162, 155, 254, 0.1)" : "none",
              opacity: badge.earned ? 1 : 0.6,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: badge.earned ? 1 : 0.6, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            {!badge.earned && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] rounded-2xl z-10">
                <span className="text-[0.7rem] px-2 py-1 rounded-full" style={{ background: "#A29BFE20", color: "#A29BFE", fontWeight: 700 }}>
                  🔒 Locked
                </span>
              </div>
            )}
            <span className="text-[2rem]">{badge.icon}</span>
            <p className="text-[0.78rem] mt-1" style={{ color: "#4A4A6A", fontWeight: 700 }}>
              {badge.title}
            </p>
            <p className="text-[0.62rem]" style={{ color: "#B0A8C0" }}>
              {badge.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tips & Learn */}
      <div className="px-5 mb-3">
        <div className="flex items-center gap-2">
          <Star size={18} color="#4ECDC4" />
          <span className="text-[0.9rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            Tips & Learn
          </span>
        </div>
      </div>

      <div className="px-5 space-y-3 pb-6">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.title}
            className="p-4 rounded-2xl flex items-start gap-3"
            style={{
              background: "white",
              boxShadow: "0 2px 10px rgba(162, 155, 254, 0.08)",
              borderLeft: `4px solid ${tip.color}`,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <span className="text-[1.6rem] mt-0.5">{tip.emoji}</span>
            <div>
              <p className="text-[0.82rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
                {tip.title}
              </p>
              <p className="text-[0.72rem] mt-0.5" style={{ color: "#8A8498" }}>
                {tip.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
