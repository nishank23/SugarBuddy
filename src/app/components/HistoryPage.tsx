import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GlucoseEntry {
  time: string;
  glucose: number;
  context: string;
  note?: string;
}

interface DayGroup {
  date: string;
  label: string;
  entries: GlucoseEntry[];
}

const historyData: DayGroup[] = [
  {
    date: "2026-02-24",
    label: "Today, Feb 24",
    entries: [
      { time: "8:30 AM", glucose: 95, context: "Fasting" },
      { time: "10:15 AM", glucose: 165, context: "After Meal" },
      { time: "12:45 PM", glucose: 110, context: "Before Meal" },
      { time: "2:30 PM", glucose: 185, context: "After Meal", note: "Had pasta" },
      { time: "5:00 PM", glucose: 130, context: "Snack" },
      { time: "7:15 PM", glucose: 98, context: "Before Meal" },
      { time: "9:00 PM", glucose: 155, context: "After Meal" },
    ],
  },
  {
    date: "2026-02-23",
    label: "Yesterday, Feb 23",
    entries: [
      { time: "7:45 AM", glucose: 88, context: "Fasting" },
      { time: "10:00 AM", glucose: 172, context: "After Meal" },
      { time: "12:30 PM", glucose: 105, context: "Before Meal" },
      { time: "2:00 PM", glucose: 198, context: "After Meal", note: "Birthday cake!" },
      { time: "6:00 PM", glucose: 62, context: "Exercise", note: "Soccer practice" },
      { time: "9:30 PM", glucose: 140, context: "Bedtime" },
    ],
  },
  {
    date: "2026-02-22",
    label: "Saturday, Feb 22",
    entries: [
      { time: "9:00 AM", glucose: 102, context: "Fasting" },
      { time: "11:30 AM", glucose: 145, context: "After Meal" },
      { time: "3:00 PM", glucose: 220, context: "Snack", note: "Ice cream" },
      { time: "7:00 PM", glucose: 115, context: "Before Meal" },
      { time: "10:00 PM", glucose: 132, context: "Bedtime" },
    ],
  },
];

const weekData = [
  { day: "Mon", avg: 135 },
  { day: "Tue", avg: 142 },
  { day: "Wed", avg: 128 },
  { day: "Thu", avg: 120 },
  { day: "Fri", avg: 155 },
  { day: "Sat", avg: 148 },
  { day: "Sun", avg: 130 },
];

function getDotColor(glucose: number): string {
  if (glucose < 70) return "#5B8DEF";     // blue for low
  if (glucose <= 180) return "#4ECDC4";    // green for in range
  if (glucose <= 250) return "#F5A623";    // amber for high
  return "#FF6B6B";                         // red-coral for very high
}

function getRangeLabel(glucose: number): string {
  if (glucose < 70) return "Low";
  if (glucose <= 180) return "In Range";
  if (glucose <= 250) return "High";
  return "Very High";
}

function getWeeklyAvgColor(avg: number): { bg: string; border: string; text: string } {
  if (avg < 70) return { bg: "#EBF0FF", border: "#5B8DEF40", text: "#5B8DEF" };
  if (avg <= 140) return { bg: "#E8FBF9", border: "#4ECDC440", text: "#2DA89E" };
  if (avg <= 180) return { bg: "#FFF8E1", border: "#F5A62340", text: "#D4A017" };
  return { bg: "#FFF0F0", border: "#FF6B6B40", text: "#E04545" };
}

export function HistoryPage() {
  const [currentWeekOffset] = useState(0);

  const weeklyAvg = Math.round(weekData.reduce((s, d) => s + d.avg, 0) / weekData.length);
  const weeklyColor = getWeeklyAvgColor(weeklyAvg);
  const inRangeCount = weekData.filter((d) => d.avg >= 70 && d.avg <= 180).length;
  const inRangePercent = Math.round((inRangeCount / weekData.length) * 100);

  return (
    <div
      className="min-h-screen pb-24 overflow-y-auto"
      style={{
        background: "linear-gradient(180deg, #F8F6FF 0%, #FFF5F5 40%, #F0FFFE 100%)",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-6 pb-2">
        <h1 className="text-[1.4rem]" style={{ color: "#4A4A6A", fontWeight: 800 }}>
          History
        </h1>
        <p className="text-[0.82rem]" style={{ color: "#B0A8C0" }}>
          Your glucose journey
        </p>
      </div>

      {/* Weekly Average Card */}
      <motion.div
        className="mx-5 mt-2 mb-5 rounded-3xl overflow-hidden"
        style={{
          background: weeklyColor.bg,
          border: `2px solid ${weeklyColor.border}`,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Week navigation */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "white" }}>
            <ChevronLeft size={16} color="#B0A8C0" />
          </button>
          <span className="text-[0.82rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
            {currentWeekOffset === 0 ? "This Week" : "Last Week"}
          </span>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "white" }}>
            <ChevronRight size={16} color="#B0A8C0" />
          </button>
        </div>

        {/* Average Display */}
        <div className="flex items-center justify-center gap-4 px-5 py-3">
          <div className="text-center">
            <p className="text-[2.4rem]" style={{ color: weeklyColor.text, fontWeight: 800, lineHeight: 1 }}>
              {weeklyAvg}
            </p>
            <p className="text-[0.7rem] mt-0.5" style={{ color: weeklyColor.text, fontWeight: 600, opacity: 0.7 }}>
              avg mg/dL
            </p>
          </div>
          <div className="w-px h-12" style={{ background: weeklyColor.border }} />
          <div className="text-center">
            <p className="text-[2.4rem]" style={{ color: weeklyColor.text, fontWeight: 800, lineHeight: 1 }}>
              {inRangePercent}%
            </p>
            <p className="text-[0.7rem] mt-0.5" style={{ color: weeklyColor.text, fontWeight: 600, opacity: 0.7 }}>
              in range
            </p>
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="flex items-end justify-between gap-1.5 px-5 pb-4 h-16">
          {weekData.map((day, i) => (
            <div key={day.day} className="flex flex-col items-center gap-1 flex-1">
              <motion.div
                className="w-full rounded-lg"
                style={{
                  background: getDotColor(day.avg),
                  opacity: 0.7,
                  minHeight: 6,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(((day.avg - 60) / 200) * 100, 10)}%` }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              />
              <span
                className="text-[0.58rem]"
                style={{
                  color: "#B0A8C0",
                  fontWeight: day.day === "Sun" || day.day === "Sat" ? 700 : 600,
                }}
              >
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Color legend */}
      <div className="flex items-center justify-center gap-4 px-5 mb-4">
        {[
          { label: "Low", color: "#5B8DEF" },
          { label: "In Range", color: "#4ECDC4" },
          { label: "High", color: "#F5A623" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
            <span className="text-[0.62rem]" style={{ color: "#B0A8C0", fontWeight: 600 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Grouped by Day */}
      {historyData.map((dayGroup, gi) => (
        <motion.div
          key={dayGroup.date}
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.1 }}
        >
          {/* Day header */}
          <div className="flex items-center gap-3 px-5 mb-2">
            <span className="text-[0.82rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
              {dayGroup.label}
            </span>
            <div className="flex-1 h-px" style={{ background: "#E8E4F0" }} />
            <span className="text-[0.65rem]" style={{ color: "#B0A8C0" }}>
              {dayGroup.entries.length} entries
            </span>
          </div>

          {/* Entries */}
          <div className="px-5 space-y-1.5">
            {dayGroup.entries.map((entry, i) => {
              const dotColor = getDotColor(entry.glucose);
              const rangeText = getRangeLabel(entry.glucose);
              return (
                <motion.div
                  key={`${dayGroup.date}-${i}`}
                  className="flex items-center gap-3 p-3.5 rounded-2xl"
                  style={{
                    background: "white",
                    boxShadow: "0 2px 8px rgba(162, 155, 254, 0.05)",
                  }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: gi * 0.1 + i * 0.03 }}
                >
                  {/* Colored dot indicator */}
                  <div className="flex flex-col items-center gap-0.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{
                        background: dotColor,
                        boxShadow: `0 0 8px ${dotColor}40`,
                      }}
                    />
                  </div>

                  {/* Time & context */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.78rem]" style={{ color: "#4A4A6A", fontWeight: 700 }}>
                        {entry.time}
                      </span>
                      <span
                        className="text-[0.62rem] px-2 py-0.5 rounded-full"
                        style={{
                          background: `${dotColor}12`,
                          color: dotColor,
                          fontWeight: 600,
                        }}
                      >
                        {entry.context}
                      </span>
                    </div>
                    {entry.note && (
                      <p className="text-[0.65rem] mt-0.5 truncate" style={{ color: "#B0A8C0" }}>
                        {entry.note}
                      </p>
                    )}
                  </div>

                  {/* Glucose value */}
                  <div className="text-right shrink-0">
                    <span
                      className="text-[1.15rem]"
                      style={{ color: dotColor, fontWeight: 800 }}
                    >
                      {entry.glucose}
                    </span>
                    <p className="text-[0.55rem] -mt-0.5" style={{ color: "#C4BFD6" }}>
                      {rangeText}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      <div className="h-4" />
    </div>
  );
}
