import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ChevronLeft, Plus, Lock, ExternalLink, Heart } from "lucide-react";
import { characters, CharacterAvatar } from "./onboarding/CharacterSelectionScreen";

function getOnboardingData() {
  try {
    const raw = localStorage.getItem("sugarBuddyOnboarding");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

interface Reminder {
  id: string;
  label: string;
  time: string;
  enabled: boolean;
}

const defaultReminders: Reminder[] = [
  { id: "morning", label: "Morning", time: "08:00", enabled: true },
  { id: "afternoon", label: "Afternoon", time: "14:00", enabled: true },
  { id: "evening", label: "Evening", time: "20:00", enabled: true },
];

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative flex-shrink-0"
      style={{
        width: 44,
        height: 26,
        borderRadius: 13,
        background: enabled
          ? "linear-gradient(135deg, #FF6B6B, #FF8E53)"
          : "#E0DAEA",
        transition: "background 0.25s",
        border: "none",
        outline: "none",
      }}
    >
      <motion.div
        className="absolute top-[3px] rounded-full"
        style={{
          width: 20,
          height: 20,
          background: "white",
          boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
        }}
        animate={{ left: enabled ? 21 : 3 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

export function SettingsPage() {
  const navigate = useNavigate();
  const data = getOnboardingData();

  const characterId = data?.characterId || "coral";
  const buddyName = data?.buddyName || "Buddy";
  const char = characters.find((c) => c.id === characterId) || characters[0];

  const [reminders, setReminders] = useState<Reminder[]>(
    data?.reminders?.length ? data.reminders : defaultReminders
  );

  const [appleHealth, setAppleHealth] = useState(
    data?.integrations?.appleHealth ?? false
  );
  const [googleFit, setGoogleFit] = useState(
    data?.integrations?.googleFit ?? false
  );

  const [showDevNote, setShowDevNote] = useState(false);

  const toggleReminder = useCallback((id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  }, []);

  const updateReminderTime = useCallback((id: string, time: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, time } : r))
    );
  }, []);

  const addReminder = useCallback(() => {
    const newReminder: Reminder = {
      id: `custom-${Date.now()}`,
      label: "Custom",
      time: "12:00",
      enabled: true,
    };
    setReminders((prev) => [...prev, newReminder]);
  }, []);

  const removeReminder = useCallback((id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const saveAndGoBack = useCallback(() => {
    try {
      const current = getOnboardingData() || {};
      localStorage.setItem(
        "sugarBuddyOnboarding",
        JSON.stringify({
          ...current,
          reminders,
          integrations: { appleHealth, googleFit },
        })
      );
    } catch {}
    navigate("/app");
  }, [navigate, reminders, appleHealth, googleFit]);

  const reminderEmojis: Record<string, string> = {
    morning: "🌅",
    afternoon: "☀️",
    evening: "🌙",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #FFF5F5 0%, #F8F6FF 60%, #F0FFFE 100%)",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <div className="max-w-md mx-auto relative min-h-screen" style={{ background: "inherit" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-5 pt-12 pb-4 flex items-center gap-3"
        style={{
          background: "rgba(255,245,245,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #F0E8FF",
        }}
      >
        <motion.button
          onClick={saveAndGoBack}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "#FF6B6B12" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={20} color="#FF6B6B" />
        </motion.button>
        <h1 className="text-[1.25rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
          Settings
        </h1>
      </div>

      <div className="px-5 pt-4 pb-24 space-y-4">
        {/* ── Your Buddy ── */}
        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "white",
            boxShadow: "0 4px 20px rgba(162, 155, 254, 0.1)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="px-5 pt-5 pb-2">
            <p className="text-[0.7rem] uppercase tracking-widest" style={{ color: "#B0A8C0", fontWeight: 700 }}>
              Your Buddy
            </p>
          </div>
          <div className="px-5 pb-5 flex items-center gap-4">
            {/* Character preview */}
            <div
              className="w-[68px] h-[68px] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
              style={{
                background: `${char.bodyColor}18`,
                border: `2.5px solid ${char.bodyColor}50`,
              }}
            >
              <div style={{ marginBottom: -6 }}>
                <CharacterAvatar char={char} size={62} />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[1.05rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
                {buddyName}
              </p>
              <p className="text-[0.75rem]" style={{ color: "#B0A8C0" }}>
                {char.name} · Level 5 ⭐
              </p>
            </div>
            <motion.button
              onClick={() => navigate("/app/change-buddy")}
              className="px-4 py-2 rounded-xl text-[0.78rem]"
              style={{
                background: "linear-gradient(135deg, #A29BFE18, #A29BFE10)",
                color: "#A29BFE",
                fontWeight: 700,
                border: "1.5px solid #A29BFE30",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Change Buddy
            </motion.button>
          </div>
        </motion.div>

        {/* ── Reminders ── */}
        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "white",
            boxShadow: "0 4px 20px rgba(162, 155, 254, 0.1)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="px-5 pt-5 pb-2">
            <p className="text-[0.7rem] uppercase tracking-widest" style={{ color: "#B0A8C0", fontWeight: 700 }}>
              Reminders
            </p>
          </div>

          <div className="pb-2">
            <AnimatePresence>
              {reminders.map((reminder, i) => (
                <motion.div
                  key={reminder.id}
                  className="px-5 py-3 flex items-center gap-3"
                  style={{
                    borderTop: i > 0 ? "1px solid #F5F0FF" : "none",
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-[1.1rem] w-7 text-center">
                    {reminderEmojis[reminder.id] || "⏰"}
                  </span>
                  <div className="flex-1">
                    <p className="text-[0.85rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
                      {reminder.label}
                    </p>
                    <input
                      type="time"
                      value={reminder.time}
                      onChange={(e) => updateReminderTime(reminder.id, e.target.value)}
                      className="text-[0.75rem] border-none outline-none bg-transparent"
                      style={{
                        color: reminder.enabled ? "#FF6B6B" : "#B0A8C0",
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                  <Toggle
                    enabled={reminder.enabled}
                    onToggle={() => toggleReminder(reminder.id)}
                  />
                  {reminder.id.startsWith("custom") && (
                    <button
                      onClick={() => removeReminder(reminder.id)}
                      className="w-6 h-6 rounded-full flex items-center justify-center ml-1"
                      style={{ background: "#FFE8E8", color: "#FF6B6B" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 2L8 8M8 2L2 8" stroke="#FF6B6B" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add reminder */}
            <button
              onClick={addReminder}
              className="w-full px-5 py-3 flex items-center gap-2 mt-1"
              style={{ borderTop: "1px dashed #F0EAFF" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#4ECDC415" }}
              >
                <Plus size={14} color="#4ECDC4" />
              </div>
              <span className="text-[0.82rem]" style={{ color: "#4ECDC4", fontWeight: 700 }}>
                Add reminder
              </span>
            </button>
          </div>
        </motion.div>

        {/* ── Health Connections ── */}
        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "white",
            boxShadow: "0 4px 20px rgba(162, 155, 254, 0.1)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="px-5 pt-5 pb-2">
            <p className="text-[0.7rem] uppercase tracking-widest" style={{ color: "#B0A8C0", fontWeight: 700 }}>
              Health Connections
            </p>
          </div>

          {/* Apple Health */}
          <div className="px-5 py-3 flex items-center gap-3" style={{ borderTop: "1px solid #F5F0FF" }}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #FFE8F0, #FFD0E0)" }}
            >
              <Heart size={18} color="#FF2D55" fill="#FF2D55" />
            </div>
            <div className="flex-1">
              <p className="text-[0.85rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>Apple Health</p>
              <p className="text-[0.72rem]" style={{ color: "#B0A8C0" }}>
                {appleHealth ? "Connected" : "Not connected"}
              </p>
            </div>
            <Toggle enabled={appleHealth} onToggle={() => setAppleHealth((p) => !p)} />
          </div>

          {/* Google Fit */}
          <div className="px-5 py-3 flex items-center gap-3" style={{ borderTop: "1px solid #F5F0FF" }}>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #E8F5E9, #C8E6C9)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" fill="none" stroke="#4CAF50" strokeWidth="2" />
                <path d="M8 12a4 4 0 1 0 8 0" stroke="#EA4335" strokeWidth="2" fill="none" />
                <path d="M8 12a4 4 0 0 1 4-4" stroke="#FBBC05" strokeWidth="2" fill="none" />
                <path d="M12 8a4 4 0 0 1 4 4" stroke="#4285F4" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[0.85rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>Google Fit</p>
              <p className="text-[0.72rem]" style={{ color: "#B0A8C0" }}>
                {googleFit ? "Connected" : "Not connected"}
              </p>
            </div>
            <Toggle enabled={googleFit} onToggle={() => setGoogleFit((p) => !p)} />
          </div>

          {/* Lock note */}
          <div className="px-5 py-3 flex items-center gap-2" style={{ borderTop: "1px solid #F5F0FF" }}>
            <Lock size={13} color="#B0A8C0" />
            <p className="text-[0.7rem]" style={{ color: "#B0A8C0" }}>
              Data stays on your device. We never sell or share your health data.
            </p>
          </div>
        </motion.div>

        {/* ── About ── */}
        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "white",
            boxShadow: "0 4px 20px rgba(162, 155, 254, 0.1)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="px-5 pt-5 pb-2">
            <p className="text-[0.7rem] uppercase tracking-widest" style={{ color: "#B0A8C0", fontWeight: 700 }}>
              About
            </p>
          </div>

          <div className="px-5 py-3" style={{ borderTop: "1px solid #F5F0FF" }}>
            <div className="flex items-center justify-between">
              <p className="text-[0.85rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>App Version</p>
              <span
                className="text-[0.78rem] px-3 py-1 rounded-full"
                style={{ background: "#4ECDC415", color: "#4ECDC4", fontWeight: 700 }}
              >
                1.0.0
              </span>
            </div>
          </div>

          {/* Dev note */}
          <div className="px-5 py-3" style={{ borderTop: "1px solid #F5F0FF" }}>
            <button
              className="w-full text-left"
              onClick={() => setShowDevNote((p) => !p)}
            >
              <div className="flex items-center justify-between">
                <p className="text-[0.85rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
                  💌 A note from the developer
                </p>
                <motion.span animate={{ rotate: showDevNote ? 180 : 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="#B0A8C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </div>
            </button>
            <AnimatePresence>
              {showDevNote && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="mt-3 p-4 rounded-2xl"
                    style={{ background: "linear-gradient(135deg, #FFF5F5, #F8F6FF)" }}
                  >
                    <p className="text-[0.78rem]" style={{ color: "#8A8498", lineHeight: 1.7 }}>
                      Hey 👋 I'm also a Type 1 diabetic, diagnosed at 14. I built Sugar Buddy because I
                      wished something like this existed when I was growing up — something that made
                      the daily grind feel a little less heavy and a lot more human. This app is my
                      love letter to everyone navigating life with diabetes. You're stronger than you
                      think. 💙
                    </p>
                    <p className="text-[0.72rem] mt-2" style={{ color: "#B0A8C0", fontWeight: 600 }}>
                      — The Sugar Buddy team
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Privacy policy */}
          <div className="px-5 py-3" style={{ borderTop: "1px solid #F5F0FF" }}>
            <button className="flex items-center gap-2">
              <p className="text-[0.85rem]" style={{ color: "#A29BFE", fontWeight: 600 }}>
                Privacy Policy
              </p>
              <ExternalLink size={13} color="#A29BFE" />
            </button>
          </div>

          {/* Spacer */}
          <div className="h-2" />
        </motion.div>

        {/* Save button */}
        <motion.button
          onClick={saveAndGoBack}
          className="w-full py-4 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
            color: "white",
            fontWeight: 800,
            fontSize: "1rem",
            fontFamily: "Nunito, sans-serif",
            boxShadow: "0 6px 20px rgba(255, 107, 107, 0.35)",
          }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Save & Go Back 🐻
        </motion.button>
      </div>
      </div>
    </div>
  );
}