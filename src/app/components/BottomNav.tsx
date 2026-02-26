import { Home, ClipboardPlus, History, Lightbulb } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";

const navItems = [
  { path: "/app", icon: Home, label: "Home" },
  { path: "/app/log", icon: ClipboardPlus, label: "Log" },
  { path: "/app/history", icon: History, label: "History" },
  { path: "/app/insights", icon: Lightbulb, label: "Insights" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "white",
        borderTop: "2px solid #F0E6FF",
        paddingBottom: "env(safe-area-inset-bottom, 8px)",
      }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-2xl relative min-w-[64px]"
              style={{
                background: isActive ? "#FF6B6B15" : "transparent",
                transition: "background 0.2s",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
                  style={{ background: "#FF6B6B" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                color={isActive ? "#FF6B6B" : "#B0A8C0"}
              />
              <span
                className="text-[0.7rem]"
                style={{
                  color: isActive ? "#FF6B6B" : "#B0A8C0",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}