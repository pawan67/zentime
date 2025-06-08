import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

interface PomodoroState {
  // Timer settings
  mode: TimerMode;
  timeLeft: number;
  isRunning: boolean;
  sessions: number;
  completedPomodoros: number;

  // Configuration
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number;

  // Actions
  setMode: (mode: TimerMode) => void;
  setTimeLeft: (time: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  incrementSessions: () => void;
  incrementCompletedPomodoros: () => void;
  resetTimer: () => void;
  updateSettings: (settings: {
    pomodoroDuration?: number;
    shortBreakDuration?: number;
    longBreakDuration?: number;
    longBreakInterval?: number;
  }) => void;
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set) => ({
      // Initial state
      mode: "pomodoro",
      timeLeft: 25 * 60, // 25 minutes in seconds
      isRunning: false,
      sessions: 0,
      completedPomodoros: 0,

      // Default settings
      pomodoroDuration: 25 * 60,
      shortBreakDuration: 5 * 60,
      longBreakDuration: 15 * 60,
      longBreakInterval: 4,

      // Actions
      setMode: (mode) => set({ mode }),
      setTimeLeft: (time) => set({ timeLeft: time }),
      setIsRunning: (isRunning) => set({ isRunning }),
      incrementSessions: () =>
        set((state) => ({ sessions: state.sessions + 1 })),
      incrementCompletedPomodoros: () =>
        set((state) => ({ completedPomodoros: state.completedPomodoros + 1 })),
      resetTimer: () =>
        set((state) => ({
          timeLeft:
            state.mode === "pomodoro"
              ? state.pomodoroDuration
              : state.mode === "shortBreak"
              ? state.shortBreakDuration
              : state.longBreakDuration,
          isRunning: false,
        })),
      updateSettings: (settings) =>
        set((state) => ({
          ...state,
          ...settings,
          timeLeft:
            state.mode === "pomodoro"
              ? settings.pomodoroDuration ?? state.pomodoroDuration
              : state.mode === "shortBreak"
              ? settings.shortBreakDuration ?? state.shortBreakDuration
              : settings.longBreakDuration ?? state.longBreakDuration,
        })),
    }),
    {
      name: "pomodoro-storage",
    }
  )
);
