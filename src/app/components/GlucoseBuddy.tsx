import { motion } from "motion/react";
import { useMemo } from "react";

type GlucoseState = "low" | "inRange" | "high" | "veryHigh";

function getGlucoseState(glucose: number): GlucoseState {
  if (glucose < 70) return "low";
  if (glucose <= 180) return "inRange";
  if (glucose <= 250) return "high";
  return "veryHigh";
}

function getStateLabel(state: GlucoseState): string {
  switch (state) {
    case "low": return "Feeling dizzy...";
    case "inRange": return "Feeling great!";
    case "high": return "A bit warm...";
    case "veryHigh": return "Need to rest...";
  }
}

function getStateEmoji(state: GlucoseState): string {
  switch (state) {
    case "low": return "😵‍💫";
    case "inRange": return "✨";
    case "high": return "🥵";
    case "veryHigh": return "😴";
  }
}

interface GlucoseBuddyProps {
  glucose: number;
  name?: string;
  color?: string;
}

export function GlucoseBuddy({ glucose, name = "Buddy", color = "#FF6B6B" }: GlucoseBuddyProps) {
  const state = getGlucoseState(glucose);

  const bodyColor = useMemo(() => {
    switch (state) {
      case "low": return "#D4D4E8";
      case "inRange": return color;
      case "high": return "#FF9A8B";
      case "veryHigh": return "#C9B8D4";
    }
  }, [state, color]);

  const cheekColor = useMemo(() => {
    switch (state) {
      case "low": return "#B8B8D0";
      case "inRange": return "#FFB4B4";
      case "high": return "#FF6B6B";
      case "veryHigh": return "#B0A0C0";
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        className="relative"
        animate={
          state === "inRange"
            ? { y: [0, -8, 0] }
            : state === "low"
            ? { x: [-3, 3, -3] }
            : state === "high"
            ? { rotate: [-2, 2, -2] }
            : { y: 0 }
        }
        transition={{
          duration: state === "inRange" ? 2 : state === "low" ? 0.5 : 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow effect for in-range */}
        {state === "inRange" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
              transform: "scale(1.4)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1.3, 1.5, 1.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        <svg
          width="220"
          height="240"
          viewBox="0 0 220 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body */}
          <motion.ellipse
            cx="110"
            cy={state === "veryHigh" ? 160 : 130}
            rx={state === "veryHigh" ? 80 : 65}
            ry={state === "veryHigh" ? 50 : 70}
            fill={bodyColor}
            animate={
              state === "veryHigh"
                ? { ry: [50, 48, 50], rx: [80, 82, 80] }
                : state === "inRange"
                ? { ry: [70, 72, 70] }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity }}
            stroke={`${bodyColor}88`}
            strokeWidth="3"
          />

          {/* Belly highlight */}
          <ellipse
            cx="110"
            cy={state === "veryHigh" ? 155 : 140}
            rx={state === "veryHigh" ? 50 : 40}
            ry={state === "veryHigh" ? 30 : 40}
            fill="white"
            opacity="0.3"
          />

          {/* Left ear */}
          <circle
            cx={state === "veryHigh" ? 50 : 65}
            cy={state === "veryHigh" ? 130 : 75}
            r="18"
            fill={bodyColor}
            stroke={`${bodyColor}88`}
            strokeWidth="3"
          />
          <circle
            cx={state === "veryHigh" ? 50 : 65}
            cy={state === "veryHigh" ? 130 : 75}
            r="10"
            fill={cheekColor}
            opacity="0.5"
          />

          {/* Right ear */}
          <circle
            cx={state === "veryHigh" ? 170 : 155}
            cy={state === "veryHigh" ? 130 : 75}
            r="18"
            fill={bodyColor}
            stroke={`${bodyColor}88`}
            strokeWidth="3"
          />
          <circle
            cx={state === "veryHigh" ? 170 : 155}
            cy={state === "veryHigh" ? 130 : 75}
            r="10"
            fill={cheekColor}
            opacity="0.5"
          />

          {/* Eyes */}
          {state === "low" ? (
            <>
              {/* Dizzy spiral eyes */}
              <motion.g
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "90px 115px" }}
              >
                <circle cx="90" cy="115" r="10" stroke="#6B6B99" strokeWidth="2.5" fill="none" />
                <circle cx="90" cy="115" r="5" stroke="#6B6B99" strokeWidth="2" fill="none" />
              </motion.g>
              <motion.g
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "130px 115px" }}
              >
                <circle cx="130" cy="115" r="10" stroke="#6B6B99" strokeWidth="2.5" fill="none" />
                <circle cx="130" cy="115" r="5" stroke="#6B6B99" strokeWidth="2" fill="none" />
              </motion.g>
            </>
          ) : state === "veryHigh" ? (
            <>
              {/* Closed sleeping eyes */}
              <path d="M75 148 Q85 155 95 148" stroke="#6B6B99" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M125 148 Q135 155 145 148" stroke="#6B6B99" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Z's */}
              <motion.g
                animate={{ opacity: [0, 1, 0], y: [0, -20], x: [0, 10] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <text x="160" y="120" fill="#A29BFE" fontSize="18" fontFamily="Nunito" fontWeight="800">Z</text>
              </motion.g>
              <motion.g
                animate={{ opacity: [0, 1, 0], y: [0, -25], x: [0, 15] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              >
                <text x="175" y="110" fill="#A29BFE" fontSize="14" fontFamily="Nunito" fontWeight="800">z</text>
              </motion.g>
            </>
          ) : state === "high" ? (
            <>
              {/* Half-lidded tired eyes */}
              <ellipse cx="90" cy="118" rx="10" ry="8" fill="white" stroke="#6B6B99" strokeWidth="2" />
              <circle cx="90" cy="120" r="5" fill="#4A4A6A" />
              <rect x="80" y="108" width="20" height="8" fill={bodyColor} rx="2" />
              <ellipse cx="130" cy="118" rx="10" ry="8" fill="white" stroke="#6B6B99" strokeWidth="2" />
              <circle cx="130" cy="120" r="5" fill="#4A4A6A" />
              <rect x="120" y="108" width="20" height="8" fill={bodyColor} rx="2" />
              {/* Sweat drop */}
              <motion.g
                animate={{ y: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path d="M160 95 Q163 105 160 110 Q157 105 160 95Z" fill="#87CEEB" />
              </motion.g>
            </>
          ) : (
            <>
              {/* Happy sparkly eyes */}
              <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <circle cx="90" cy="115" r="10" fill="white" stroke="#4A4A6A" strokeWidth="2" />
                <circle cx="92" cy="113" r="6" fill="#4A4A6A" />
                <circle cx="95" cy="110" r="2.5" fill="white" />
              </motion.g>
              <motion.g animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
                <circle cx="130" cy="115" r="10" fill="white" stroke="#4A4A6A" strokeWidth="2" />
                <circle cx="132" cy="113" r="6" fill="#4A4A6A" />
                <circle cx="135" cy="110" r="2.5" fill="white" />
              </motion.g>
              {/* Sparkles */}
              <motion.g
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ transformOrigin: "55px 90px" }}
              >
                <path d="M55 85 L57 90 L55 95 L53 90Z" fill="#FED766" />
                <path d="M50 90 L55 88 L60 90 L55 92Z" fill="#FED766" />
              </motion.g>
              <motion.g
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                style={{ transformOrigin: "165px 85px" }}
              >
                <path d="M165 80 L167 85 L165 90 L163 85Z" fill="#FED766" />
                <path d="M160 85 L165 83 L170 85 L165 87Z" fill="#FED766" />
              </motion.g>
            </>
          )}

          {/* Mouth */}
          {state === "inRange" ? (
            <path d="M95 140 Q110 158 125 140" stroke="#4A4A6A" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : state === "low" ? (
            <ellipse cx="110" cy="140" rx="8" ry="6" fill="#4A4A6A" opacity="0.7" />
          ) : state === "high" ? (
            <path d="M95 142 Q110 148 125 142" stroke="#4A4A6A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          ) : (
            <path d="M95 163 Q110 168 125 163" stroke="#6B6B99" strokeWidth="2" strokeLinecap="round" fill="none" />
          )}

          {/* Cheeks */}
          <ellipse
            cx={state === "veryHigh" ? 72 : 75}
            cy={state === "veryHigh" ? 158 : 135}
            rx="12"
            ry="8"
            fill={cheekColor}
            opacity="0.6"
          />
          <ellipse
            cx={state === "veryHigh" ? 148 : 145}
            cy={state === "veryHigh" ? 158 : 135}
            rx="12"
            ry="8"
            fill={cheekColor}
            opacity="0.6"
          />

          {/* Arms */}
          {state === "veryHigh" ? (
            <>
              <path d="M35 165 Q25 170 30 180" stroke={bodyColor} strokeWidth="12" strokeLinecap="round" fill="none" />
              <path d="M185 165 Q195 170 190 180" stroke={bodyColor} strokeWidth="12" strokeLinecap="round" fill="none" />
            </>
          ) : state === "high" ? (
            <>
              {/* Fanning arm */}
              <motion.g
                animate={{ rotate: [-15, 15, -15] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ transformOrigin: "170px 130px" }}
              >
                <path d="M170 130 Q190 115 200 100" stroke={bodyColor} strokeWidth="12" strokeLinecap="round" fill="none" />
                {/* Fan/hand */}
                <rect x="192" y="85" width="20" height="25" rx="5" fill="#FED766" opacity="0.8" />
              </motion.g>
              <path d="M50 130 Q30 140 25 155" stroke={bodyColor} strokeWidth="12" strokeLinecap="round" fill="none" />
            </>
          ) : (
            <>
              <motion.path
                d="M50 130 Q30 125 20 115"
                stroke={bodyColor}
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                animate={state === "inRange" ? { d: ["M50 130 Q30 125 20 115", "M50 130 Q25 115 15 100", "M50 130 Q30 125 20 115"] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.path
                d="M170 130 Q190 125 200 115"
                stroke={bodyColor}
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                animate={state === "inRange" ? { d: ["M170 130 Q190 125 200 115", "M170 130 Q195 115 205 100", "M170 130 Q190 125 200 115"] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </>
          )}

          {/* Feet */}
          <ellipse
            cx={state === "veryHigh" ? 85 : 90}
            cy={state === "veryHigh" ? 205 : 195}
            rx="18"
            ry="10"
            fill={bodyColor}
            stroke={`${bodyColor}88`}
            strokeWidth="2"
          />
          <ellipse
            cx={state === "veryHigh" ? 135 : 130}
            cy={state === "veryHigh" ? 205 : 195}
            rx="18"
            ry="10"
            fill={bodyColor}
            stroke={`${bodyColor}88`}
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Status label */}
      <motion.div
        className="flex items-center gap-2 px-5 py-2 rounded-full"
        style={{
          backgroundColor:
            state === "inRange"
              ? "#4ECDC420"
              : state === "low"
              ? "#A29BFE20"
              : state === "high"
              ? "#FED76630"
              : "#A29BFE20",
        }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <span className="text-[1.25rem]">{getStateEmoji(state)}</span>
        <span
          className="text-[0.95rem]"
          style={{
            color:
              state === "inRange"
                ? "#2DA89E"
                : state === "low"
                ? "#7B73E0"
                : state === "high"
                ? "#D4A017"
                : "#7B73E0",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
          }}
        >
          {name} says: "{getStateLabel(state)}"
        </span>
      </motion.div>
    </div>
  );
}
