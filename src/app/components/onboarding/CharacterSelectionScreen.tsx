import { motion } from "motion/react";
import { useState } from "react";

export interface CharacterOption {
  id: string;
  name: string;
  bodyColor: string;
  cheekColor: string;
  earInner: string;
  skinTone: string;
  accessory?: "bow" | "hat" | "glasses" | "bandana" | "crown" | "none";
}

export const characters: CharacterOption[] = [
  {
    id: "coral",
    name: "Rosie",
    bodyColor: "#FF6B6B",
    cheekColor: "#FFB4B4",
    earInner: "#FF9E9E",
    skinTone: "light",
    accessory: "bow",
  },
  {
    id: "mint",
    name: "Minty",
    bodyColor: "#4ECDC4",
    cheekColor: "#A0E8E2",
    earInner: "#7EDDD6",
    skinTone: "light",
    accessory: "hat",
  },
  {
    id: "sunny",
    name: "Sunny",
    bodyColor: "#FED766",
    cheekColor: "#FFE8A0",
    earInner: "#FFDF85",
    skinTone: "warm",
    accessory: "glasses",
  },
  {
    id: "lavender",
    name: "Luna",
    bodyColor: "#A29BFE",
    cheekColor: "#C8C3FF",
    earInner: "#B5AFFE",
    skinTone: "light",
    accessory: "crown",
  },
  {
    id: "peach",
    name: "Coco",
    bodyColor: "#D4915E",
    cheekColor: "#E8B58A",
    earInner: "#C48050",
    skinTone: "medium",
    accessory: "bandana",
  },
  {
    id: "sky",
    name: "Bubbles",
    bodyColor: "#74B9FF",
    cheekColor: "#A8D8FF",
    earInner: "#90C8FF",
    skinTone: "light",
    accessory: "none",
  },
];

export function CharacterAvatar({
  char,
  size = 90,
  sad = false,
}: {
  char: CharacterOption;
  size?: number;
  sad?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="45" cy="50" rx="28" ry="30" fill={char.bodyColor} />
      <ellipse cx="45" cy="56" rx="18" ry="18" fill="white" opacity="0.22" />

      {/* Left ear */}
      <circle cx="22" cy="28" r="10" fill={char.bodyColor} />
      <circle cx="22" cy="28" r="5.5" fill={char.earInner} opacity="0.5" />

      {/* Right ear */}
      <circle cx="68" cy="28" r="10" fill={char.bodyColor} />
      <circle cx="68" cy="28" r="5.5" fill={char.earInner} opacity="0.5" />

      {/* Sad eyebrows */}
      {sad && (
        <>
          <path d="M29 36 Q36 32 43 36" stroke="#4A4A6A" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M47 36 Q54 32 61 36" stroke="#4A4A6A" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" />
        </>
      )}

      {/* Eyes */}
      <circle cx="36" cy="44" r="5.5" fill="white" stroke="#4A4A6A" strokeWidth="1.5" />
      <circle cx={sad ? "36" : "37"} cy={sad ? "45" : "43"} r="3.2" fill="#4A4A6A" />
      {!sad && <circle cx="38.5" cy="41.5" r="1.3" fill="white" />}
      <circle cx="54" cy="44" r="5.5" fill="white" stroke="#4A4A6A" strokeWidth="1.5" />
      <circle cx={sad ? "54" : "55"} cy={sad ? "45" : "43"} r="3.2" fill="#4A4A6A" />
      {!sad && <circle cx="56.5" cy="41.5" r="1.3" fill="white" />}

      {/* Mouth */}
      {sad ? (
        <path d="M38 62 Q45 56 52 62" stroke="#4A4A6A" strokeWidth="2" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M38 56 Q45 63 52 56" stroke="#4A4A6A" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}

      {/* Cheeks */}
      <ellipse cx="28" cy="52" rx="5.5" ry="3.5" fill={char.cheekColor} opacity="0.6" />
      <ellipse cx="62" cy="52" rx="5.5" ry="3.5" fill={char.cheekColor} opacity="0.6" />

      {/* Tear drop when sad */}
      {sad && (
        <>
          <ellipse cx="28" cy="58" rx="2" ry="3" fill="#87CEEB" opacity="0.85" />
          <path d="M26.5 56 Q28 52.5 29.5 56" fill="#87CEEB" opacity="0.85" />
        </>
      )}

      {/* Arms */}
      <path d="M20 52 Q10 48 8 40" stroke={char.bodyColor} strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M70 52 Q80 48 82 40" stroke={char.bodyColor} strokeWidth="5.5" strokeLinecap="round" fill="none" />

      {/* Feet */}
      <ellipse cx="35" cy="78" rx="9" ry="5" fill={char.bodyColor} />
      <ellipse cx="55" cy="78" rx="9" ry="5" fill={char.bodyColor} />

      {/* Accessories */}
      {char.accessory === "bow" && (
        <g>
          <circle cx="18" cy="18" r="3" fill="#FF8E8E" />
          <ellipse cx="13" cy="16" rx="5" ry="3.5" fill="#FF8E8E" transform="rotate(-20, 13, 16)" />
          <ellipse cx="23" cy="16" rx="5" ry="3.5" fill="#FF8E8E" transform="rotate(20, 23, 16)" />
          <circle cx="18" cy="18" r="1.5" fill="#FFB4B4" />
        </g>
      )}

      {char.accessory === "hat" && (
        <g>
          <ellipse cx="45" cy="22" rx="22" ry="5" fill={char.bodyColor} opacity="0.8" />
          <rect x="33" y="6" width="24" height="18" rx="8" fill={char.bodyColor} opacity="0.85" />
          <rect x="38" y="12" width="14" height="3" rx="1.5" fill="white" opacity="0.4" />
        </g>
      )}

      {char.accessory === "glasses" && (
        <g>
          <circle cx="36" cy="44" r="8" stroke="#4A4A6A" strokeWidth="1.8" fill="none" />
          <circle cx="54" cy="44" r="8" stroke="#4A4A6A" strokeWidth="1.8" fill="none" />
          <path d="M44 44 L46 44" stroke="#4A4A6A" strokeWidth="1.8" />
          <path d="M28 43 L22 40" stroke="#4A4A6A" strokeWidth="1.5" />
          <path d="M62 43 L68 40" stroke="#4A4A6A" strokeWidth="1.5" />
        </g>
      )}

      {char.accessory === "bandana" && (
        <g>
          <path d="M22 25 Q45 18 68 25" stroke={char.bodyColor} strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M22 25 Q45 15 68 25" fill={char.earInner} opacity="0.6" />
          <circle cx="45" cy="20" r="3" fill="white" opacity="0.5" />
        </g>
      )}

      {char.accessory === "crown" && (
        <g>
          <path d="M28 22 L32 10 L38 18 L45 6 L52 18 L58 10 L62 22 Z" fill="#FED766" />
          <circle cx="32" cy="12" r="2" fill="#FF6B6B" />
          <circle cx="45" cy="8" r="2" fill="#4ECDC4" />
          <circle cx="58" cy="12" r="2" fill="#A29BFE" />
          <rect x="28" y="20" width="34" height="5" rx="2" fill="#FED766" />
        </g>
      )}
    </svg>
  );
}

interface CharacterSelectionScreenProps {
  onContinue: (characterId: string) => void;
  onBack: () => void;
  userName: string;
}

export function CharacterSelectionScreen({
  onContinue,
  onBack,
  userName,
}: CharacterSelectionScreenProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #E8E3FF 0%, #F0ECF8 30%, #F8F6FF 60%, #FFF5F5 100%)",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* Top decorative dots */}
      <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 6 + Math.random() * 10,
              height: 6 + Math.random() * 10,
              background: ["#FF6B6B30", "#4ECDC430", "#FED76630", "#A29BFE30"][i % 4],
              left: `${(i / 12) * 100 + Math.random() * 8}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Back button */}
      <div className="px-5 pt-6 relative z-10">
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
      <div className="flex-1 flex flex-col items-center px-5 pt-6 pb-6 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-[1.6rem] mb-1"
            style={{ color: "#4A4A6A", fontWeight: 800 }}
          >
            Choose Your Buddy!
          </h1>
          <p className="text-[0.88rem]" style={{ color: "#8A8498" }}>
            Pick a friend to join your journey
          </p>
        </motion.div>

        {/* 2x3 Character Grid */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
          {characters.map((char, i) => {
            const isSelected = selectedId === char.id;
            return (
              <motion.button
                key={char.id}
                onClick={() => setSelectedId(char.id)}
                className="flex flex-col items-center gap-2 py-3 rounded-3xl relative"
                style={{
                  background: isSelected ? "white" : "transparent",
                  boxShadow: isSelected
                    ? "0 4px 20px rgba(255, 107, 107, 0.15)"
                    : "none",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Circle frame with coral glow when selected */}
                <div className="relative">
                  {isSelected && (
                    <motion.div
                      className="absolute -inset-2 rounded-full"
                      style={{
                        background: "radial-gradient(circle, #FF6B6B30 0%, #FF6B6B08 70%)",
                        boxShadow: "0 0 20px #FF6B6B25, 0 0 40px #FF6B6B10",
                      }}
                      layoutId="glow"
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  )}
                  <div
                    className="w-[82px] h-[82px] rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, ${char.bodyColor}18, ${char.bodyColor}08)`
                        : "#F0ECF830",
                      border: isSelected
                        ? `3px solid #FF6B6B`
                        : "3px solid #E8E4F060",
                      boxShadow: isSelected
                        ? "0 0 0 4px #FF6B6B18"
                        : "none",
                      transition: "border 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <div className="-mb-3">
                      <CharacterAvatar char={char} size={70} />
                    </div>
                  </div>

                  {/* Selected checkmark */}
                  {isSelected && (
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: "#FF6B6B",
                        boxShadow: "0 2px 8px #FF6B6B40",
                      }}
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

                {/* Name */}
                <span
                  className="text-[0.78rem]"
                  style={{
                    color: isSelected ? "#FF6B6B" : "#8A8498",
                    fontWeight: isSelected ? 700 : 600,
                  }}
                >
                  {char.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 pb-8 relative z-10">
        <motion.button
          onClick={() => selectedId && onContinue(selectedId)}
          disabled={!selectedId}
          className="w-full py-4.5 rounded-2xl text-[1.05rem]"
          style={{
            background: selectedId
              ? "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)"
              : "#E8E4F0",
            color: selectedId ? "white" : "#C4BFD6",
            fontWeight: 800,
            fontFamily: "Nunito, sans-serif",
            boxShadow: selectedId ? "0 6px 20px rgba(255, 107, 107, 0.35)" : "none",
          }}
          whileTap={selectedId ? { scale: 0.97 } : {}}
        >
          {selectedId ? "Continue" : "Select a Buddy"}
        </motion.button>
      </div>
    </div>
  );
}