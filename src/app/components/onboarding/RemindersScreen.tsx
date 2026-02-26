import { useState } from "react";
import { motion } from "motion/react";
import { Switch } from "../ui/switch";

interface Reminder {
  id: string;
  label: string;
  emoji: string;
  time: string;
  enabled: boolean;
}

interface RemindersScreenProps {
  onContinue: (reminders: Reminder[]) => void;
  onSkip: () => void;
  onBack: () => void;
  buddyName: string;
}

export function RemindersScreen({
  onContinue,
  onSkip,
  onBack,
  buddyName,
}: RemindersScreenProps) {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: "morning", label: "Morning", emoji: "🌅", time: "08:00", enabled: true },
    { id: "afternoon", label: "Afternoon", emoji: "☀️", time: "14:00", enabled: true },
    { id: "evening", label: "Evening", emoji: "🌙", time: "20:00", enabled: true },
  ]);

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const updateTime = (id: string, time: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, time } : r)));
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #FED76620 0%, #FF6B6B20 100%)",
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
        {/* Animated clock */}
        <motion.div
          className="flex justify-center mb-4 text-[3.5rem]"
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          🕐
        </motion.div>

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
            Set your reminders
          </h1>
          <p className="text-[0.88rem]" style={{ color: "#8A8498" }}>
            {buddyName} will nudge you gently 🌟
          </p>
        </motion.div>

        {/* Reminder Cards */}
        <div className="flex flex-col gap-3 mb-6">
          {reminders.map((reminder, i) => (
            <motion.div
              key={reminder.id}
              className="flex items-center gap-4 p-4 rounded-2xl"
              style={{
                background: "white",
                boxShadow: "0 2px 12px rgba(162, 155, 254, 0.1)",
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Emoji */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[1.5rem]"
                style={{
                  background: reminder.enabled ? "#4ECDC415" : "#E8E4F015",
                }}
              >
                {reminder.emoji}
              </div>

              {/* Label & Time */}
              <div className="flex-1">
                <p
                  className="text-[0.85rem] mb-1"
                  style={{
                    color: reminder.enabled ? "#4A4A6A" : "#B0A8C0",
                    fontWeight: 700,
                  }}
                >
                  {reminder.label}
                </p>
                <input
                  type="time"
                  value={reminder.time}
                  onChange={(e) => updateTime(reminder.id, e.target.value)}
                  disabled={!reminder.enabled}
                  className="text-[0.75rem] outline-none"
                  style={{
                    color: reminder.enabled ? "#8A8498" : "#C4BFD6",
                    fontWeight: 600,
                    background: "transparent",
                    fontFamily: "Nunito, sans-serif",
                  }}
                />
              </div>

              {/* Toggle */}
              <Switch
                checked={reminder.enabled}
                onCheckedChange={() => toggleReminder(reminder.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          className="text-center text-[0.75rem] px-4"
          style={{ color: "#B0A8C0" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          You can always change these in settings
        </motion.p>
      </div>

      {/* Bottom CTAs */}
      <div className="px-6 pb-10">
        {/* Skip link */}
        <motion.button
          onClick={onSkip}
          className="w-full text-center py-2 mb-3 text-[0.85rem]"
          style={{ color: "#A29BFE", fontWeight: 600 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip for now
        </motion.button>

        {/* Continue button */}
        <motion.button
          onClick={() => onContinue(reminders)}
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
          Continue
        </motion.button>
      </div>
    </div>
  );
}
