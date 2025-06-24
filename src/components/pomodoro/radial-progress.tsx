"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const getModeColor = (mode: string) => {
  switch (mode.toLowerCase()) {
    case "pomodoro":
      return "bg-violet-600"; // Tomato color
    case "short break":
      return "bg-green-600";
    case "long break":
      return "bg-blue-600";
    default:
      return "bg-indigo-600";
  }
};

export function RadialProgress({
  mode,
  timeLeft,
  onClick,
  isRunning,
}: {
  mode?: string;
  timeLeft?: number;
  onClick?: () => void;
  isRunning?: boolean;
}) {
  const color = getModeColor(mode || "pomodoro");
  if (!mode) {
    return null; // Return null if mode is not provided
  }

  return (
    <div
      className="flex flex-col my-10  rounded-full cursor-pointer hover:opacity-90 transition-opacity"
      onClick={onClick}
    >
      <div className="flex-1  pb-0">
        <div className="relative w-[250px]  h-[250px] mx-auto">
          {/* Timer Display */}

          <div className="absolute inset-0 flex   items-center justify-center">
            <div className="text-8xl font-bold">
              {timeLeft
                ? `${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                    .toString()
                    .padStart(2, "0")}`
                : "0:00"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
