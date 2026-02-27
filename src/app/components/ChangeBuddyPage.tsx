import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { characters, CharacterAvatar } from "./onboarding/CharacterSelectionScreen";

function getOnboardingData() {
  try {
    const raw = localStorage.getItem("sugarBuddyOnboarding");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function ChangeBuddyPage() {
  const navigate = useNavigate();
  const data = getOnboardingData();

  const currentCharacterId = data?.characterId || "coral";
  const currentBuddyName = data?.buddyName || "Buddy";

  const currentChar = characters.find((c) => c.id === currentCharacterId) || characters[0];

  const [pendingCharId, setPendingCharId] = useState<string | null>(null);
  const pendingChar = characters.find((c) => c.id === pendingCharId);

  const handleSelect = (charId: string) => {
    if (charId === currentCharacterId) return;
    setPendingCharId(charId);
  };

  const handleSwitch = () => {
    if (!pendingChar) return;
    try {
      const current = getOnboardingData() || {};
      localStorage.setItem(
        "sugarBuddyOnboarding",
        JSON.stringify({
          ...current,
          characterId: pendingChar.id,
          buddyName: pendingChar.name,
        })
      );
    } catch {}
    navigate("/app/settings");
  };

  const handleCancel = () => {
    setPendingCharId(null);
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF5F5 0%, #F8F6FF 60%, #F0FFFE 100%)",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      <div className="max-w-md mx-auto relative min-h-screen" style={{ background: "inherit" }}>
      {/* Subtle background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, #FF6B6B08 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full"
          style={{ background: "radial-gradient(circle, #A29BFE08 0%, transparent 70%)" }}
        />
      </div>

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
          onClick={() => navigate("/app/settings")}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "#FF6B6B12" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={20} color="#FF6B6B" />
        </motion.button>
        <h1 className="text-[1.25rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
          Change Buddy
        </h1>
      </div>

      <div className="px-5 pt-6 pb-40 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-[1.4rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
            Meet a new buddy?
          </h2>
          <p className="text-[0.88rem] mt-1" style={{ color: "#8A8498" }}>
            Your current buddy <span style={{ color: "#FF6B6B", fontWeight: 700 }}>{currentBuddyName}</span> will miss you 🥺
          </p>
        </motion.div>

        {/* Current buddy — large, sad */}
        <motion.div
          className="flex flex-col items-center my-6"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            {/* Subtle sad aura */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${currentChar.bodyColor}18 0%, transparent 70%)`,
                transform: "scale(1.6)",
              }}
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1.5, 1.7, 1.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <CharacterAvatar char={currentChar} size={140} sad />
            </motion.div>

            {/* Sad emoji floats */}
            <motion.div
              className="absolute -top-2 -right-4 text-[1.1rem]"
              animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              😢
            </motion.div>
            <motion.div
              className="absolute top-4 -left-5 text-[0.85rem]"
              animate={{ y: [0, -10, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.2 }}
            >
              💔
            </motion.div>
          </div>

          <div
            className="mt-4 px-4 py-1.5 rounded-full"
            style={{ background: `${currentChar.bodyColor}18`, border: `1.5px solid ${currentChar.bodyColor}30` }}
          >
            <span className="text-[0.78rem]" style={{ color: currentChar.bodyColor, fontWeight: 700 }}>
              🐻 {currentBuddyName} (current)
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px" style={{ background: "#E8E4F0" }} />
          <span className="text-[0.75rem]" style={{ color: "#C0BACC", fontWeight: 600 }}>
            Pick a new buddy
          </span>
          <div className="flex-1 h-px" style={{ background: "#E8E4F0" }} />
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-3 gap-4">
          {characters.map((char, i) => {
            const isCurrent = char.id === currentCharacterId;
            const isPending = char.id === pendingCharId;

            return (
              <motion.button
                key={char.id}
                onClick={() => handleSelect(char.id)}
                className="flex flex-col items-center gap-2 py-3 rounded-3xl relative"
                style={{
                  background: isPending ? "white" : isCurrent ? "#F8F6FF" : "transparent",
                  boxShadow: isPending
                    ? "0 4px 20px rgba(255, 107, 107, 0.15)"
                    : "none",
                  opacity: isCurrent ? 0.55 : 1,
                  cursor: isCurrent ? "default" : "pointer",
                }}
                initial={{ opacity: isCurrent ? 0.55 : 0, scale: 0.85 }}
                animate={{ opacity: isCurrent ? 0.55 : 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                whileTap={!isCurrent ? { scale: 0.95 } : {}}
              >
                <div className="relative">
                  {isPending && (
                    <motion.div
                      className="absolute -inset-2 rounded-full"
                      style={{
                        background: "radial-gradient(circle, #FF6B6B30 0%, #FF6B6B08 70%)",
                        boxShadow: "0 0 20px #FF6B6B25",
                      }}
                      layoutId="changeBuddyGlow"
                    />
                  )}
                  <div
                    className="w-[82px] h-[82px] rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                      background: isPending
                        ? `linear-gradient(135deg, ${char.bodyColor}18, ${char.bodyColor}08)`
                        : `${char.bodyColor}10`,
                      border: isPending
                        ? `3px solid #FF6B6B`
                        : isCurrent
                        ? `3px dashed ${char.bodyColor}60`
                        : `3px solid #E8E4F050`,
                      boxShadow: isPending ? "0 0 0 4px #FF6B6B18" : "none",
                      transition: "border 0.3s",
                    }}
                  >
                    <div style={{ marginBottom: -6 }}>
                      <CharacterAvatar char={char} size={70} />
                    </div>
                  </div>

                  {/* "Current" label */}
                  {isCurrent && (
                    <div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{ background: "#A29BFE", fontSize: "0.58rem", color: "white", fontWeight: 700 }}
                    >
                      Current
                    </div>
                  )}

                  {/* Selected checkmark */}
                  {isPending && (
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: "#FF6B6B", boxShadow: "0 2px 8px #FF6B6B40" }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </div>

                <span
                  className="text-[0.78rem]"
                  style={{
                    color: isPending ? "#FF6B6B" : isCurrent ? "#A29BFE" : "#8A8498",
                    fontWeight: isPending || isCurrent ? 700 : 600,
                  }}
                >
                  {char.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Confirmation Bottom Sheet ── */}
      <AnimatePresence>
        {pendingChar && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: "rgba(26, 26, 46, 0.45)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
            />

            {/* Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            >
              <div
                className="rounded-t-3xl px-6 pt-6 pb-10"
                style={{
                  background: "white",
                  boxShadow: "0 -8px 40px rgba(162, 155, 254, 0.18)",
                }}
              >
                {/* Handle */}
                <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "#E8E4F0" }} />

                {/* New buddy preview */}
                <div className="flex flex-col items-center mb-5">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <CharacterAvatar char={pendingChar} size={90} />
                  </motion.div>
                  <h3 className="text-[1.2rem] mt-3" style={{ color: "#4A4A6A", fontWeight: 800 }}>
                    Switch to {pendingChar.name}?
                  </h3>
                  <p className="text-[0.82rem] text-center mt-1 px-4" style={{ color: "#8A8498" }}>
                    {currentBuddyName} will always be here if you change your mind 🤗
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleCancel}
                    className="flex-1 py-3.5 rounded-2xl text-[0.92rem]"
                    style={{
                      background: "#F5F0FF",
                      color: "#8A8498",
                      fontWeight: 700,
                      fontFamily: "Nunito, sans-serif",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Stay with {currentBuddyName}
                  </motion.button>
                  <motion.button
                    onClick={handleSwitch}
                    className="flex-1 py-3.5 rounded-2xl text-[0.92rem]"
                    style={{
                      background: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
                      color: "white",
                      fontWeight: 800,
                      fontFamily: "Nunito, sans-serif",
                      boxShadow: "0 4px 16px rgba(255,107,107,0.35)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Switch! 🐾
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}