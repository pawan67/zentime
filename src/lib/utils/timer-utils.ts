export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export const calculateProgress = (total: number, current: number): number => {
  return ((total - current) / total) * 100;
};

export const getModeLabel = (
  mode: "pomodoro" | "shortBreak" | "longBreak"
): string => {
  switch (mode) {
    case "pomodoro":
      return "Focus Time";
    case "shortBreak":
      return "Short Break";
    case "longBreak":
      return "Long Break";
    default:
      return "";
  }
};

export const getNextMode = (
  currentMode: "pomodoro" | "shortBreak" | "longBreak",
  completedPomodoros: number,
  longBreakInterval: number
): "pomodoro" | "shortBreak" | "longBreak" => {
  if (currentMode === "pomodoro") {
    return completedPomodoros % longBreakInterval === 0
      ? "longBreak"
      : "shortBreak";
  }
  return "pomodoro";
};
