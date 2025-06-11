import { useEffect, useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { usePomodoroStore, TimerMode } from "@/lib/store/pomodoro-store";
import { useTaskStore } from "@/lib/store/task-store";
import {
  formatTime,
  calculateProgress,
  getModeLabel,
  getNextMode,
} from "@/lib/utils/timer-utils";
import { playNotificationSound } from "@/lib/utils/sound-utils";
import { RadialProgress } from "./radial-progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CirclePlay, Pause, Play, RefreshCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PomodoroTimer = () => {
  const {
    mode,
    timeLeft,
    isRunning,
    sessions,
    completedPomodoros,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    setTimeLeft,
    setIsRunning,
    setMode,
    incrementSessions,
    incrementCompletedPomodoros,
    resetTimer,
  } = usePomodoroStore();

  const { tasks, incrementCompletedPomodoros: incrementTaskPomodoros } =
    useTaskStore();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number>(null);
  const accumulatedTimeRef = useRef<number>(0);

  const totalDuration =
    mode === "pomodoro"
      ? pomodoroDuration
      : mode === "shortBreak"
      ? shortBreakDuration
      : longBreakDuration;

  // Update document title with current timer
  useEffect(() => {
    let titleInterval: NodeJS.Timeout;
    let backgroundInterval: NodeJS.Timeout;
    let lastUpdateTime = Date.now();

    const updateTitle = () => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      const modeLabel = getModeLabel(mode);
      document.title = `${timeString} - ${modeLabel} | ZenTime`;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear the regular interval when tab is hidden
        clearInterval(titleInterval);

        // Start a background interval that runs less frequently
        backgroundInterval = setInterval(() => {
          const now = Date.now();
          const timePassed = Math.floor((now - lastUpdateTime) / 1000);
          if (timePassed > 0 && isRunning) {
            const newTimeLeft = Math.max(0, timeLeft - timePassed);
            setTimeLeft(newTimeLeft);
            updateTitle();
          }
          lastUpdateTime = now;
        }, 1000);
      } else {
        // Clear background interval and restart regular interval
        clearInterval(backgroundInterval);
        lastUpdateTime = Date.now();
        titleInterval = setInterval(updateTitle, 1000);
      }
    };

    // Initial setup
    updateTitle();
    titleInterval = setInterval(updateTitle, 1000);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(titleInterval);
      clearInterval(backgroundInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [timeLeft, mode, isRunning]);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const deltaTime = now - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = now;

      if (isRunning && timeLeft > 0) {
        accumulatedTimeRef.current += deltaTime;

        // Only update when we've accumulated at least 1000ms (1 second)
        if (accumulatedTimeRef.current >= 1000) {
          const secondsToSubtract = Math.floor(
            accumulatedTimeRef.current / 1000
          );
          accumulatedTimeRef.current = accumulatedTimeRef.current % 1000;

          const newTimeLeft = Math.max(0, timeLeft - secondsToSubtract);
          setTimeLeft(newTimeLeft);

          if (newTimeLeft === 0) {
            setIsRunning(false);
            playNotificationSound();
            if (mode === "pomodoro") {
              incrementCompletedPomodoros();
              if (selectedTaskId) {
                incrementTaskPomodoros(selectedTaskId);
              }
            }
            incrementSessions();
            const nextMode = getNextMode(
              mode,
              completedPomodoros + 1,
              longBreakInterval
            );
            setMode(nextMode);
            resetTimer();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateTimer);
    };

    if (isRunning) {
      lastUpdateTimeRef.current = Date.now();
      accumulatedTimeRef.current = 0;
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, timeLeft, mode]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    resetTimer();
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    resetTimer();
  };

  const activeTasks = tasks.filter((task) => !task.isCompleted);

  return (
    <div className="flex flex-col items-center space-y-5 ">
      <Tabs
        defaultValue={mode}
        value={mode}
        onValueChange={(value) => handleModeChange(value as TimerMode)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
          <TabsTrigger value="longBreak">Long Break</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className=" flex justify-between w-full">
        <div>
          {mode === "pomodoro" && (
            <div className="w-full space-y-2">
              <Select
                value={selectedTaskId || ""}
                onValueChange={setSelectedTaskId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a task" />
                </SelectTrigger>
                <SelectContent>
                  {activeTasks.map((task) => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title} ({task.completedPomodoros}/
                      {task.estimatedPomodoros})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <Button
          onClick={handleReset}
          className=" p-4"
          variant="outline"
          size="icon"
        >
          <RefreshCcw />
        </Button>
      </div>

      <RadialProgress
        isRunning={isRunning}
        timeLeft={timeLeft}
        mode={getModeLabel(mode)}
        onClick={handleStartPause}
      />

      <div className="flex space-x-4">
        <Button
          onClick={handleStartPause}
          className={` ${
            !isRunning ? "border-b-6  " : " bg-primary/90"
          }   border-secondary box-content    `}
          size="lg"
        >
          {isRunning ? <Pause /> : <CirclePlay />}
          {isRunning ? "Pause" : "Start"}
        </Button>
      </div>

      <div className="text-sm font-semibold text-muted-foreground">
        Completed Pomodoros: {completedPomodoros} | Sessions: {sessions}
      </div>
    </div>
  );
};
