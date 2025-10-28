import { motion } from "framer-motion";

const modes = [
  { id: "pomodoro", label: "pomodoro" },
  { id: "shortBreak", label: "kısa mola" },
  { id: "longBreak", label: "uzun mola" },
] as const;

type ModeId = (typeof modes)[number]["id"];

interface ModeSwitcherProps {
  activeMode: ModeId;
  onModeChange: (mode: ModeId) => void;
}

export default function ModeSwitcher({
  activeMode,
  onModeChange,
}: ModeSwitcherProps) {
  return (
    <div className="flex space-x-2 bg-slate-800 p-2 rounded-xl shadow-md mb-8">
      {modes.map((mode) => {
        const isActive = activeMode === mode.id;

        const activeTextColor =
          mode.id === "pomodoro"
            ? "text-emerald-600"
            : mode.id === "shortBreak"
            ? "text-sky-600"
            : "text-orange-600";

        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`relative py-2 px-5 rounded-lg text-sm sm:text-base font-semibold transition-colors
              ${
                isActive
                  ? ""
                  : "text-slate-400 hover:text-white"
              }
            `}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-white rounded-lg z-[-1]"
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}

            <span
              className={`relative z-10 ${isActive ? activeTextColor : ""}`}
            >
              {mode.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
