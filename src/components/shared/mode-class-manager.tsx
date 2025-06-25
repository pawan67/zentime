"use client";
import { useEffect } from "react";
import { usePomodoroStore } from "@/lib/store/pomodoro-store";

export function ModeClassManager() {
  const { mode } = usePomodoroStore();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("pomodoro", "break", "long-break");
    if (mode === "pomodoro") html.classList.add("pomodoro");
    else if (mode === "shortBreak") html.classList.add("break");
    else if (mode === "longBreak") html.classList.add("long-break");
    return () => {
      html.classList.remove("pomodoro", "break", "long-break");
    };
  }, [mode]);

  return null;
}
