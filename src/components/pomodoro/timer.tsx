import { useEffect, useState } from "react";
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

  const totalDuration =
    mode === "pomodoro"
      ? pomodoroDuration
      : mode === "shortBreak"
      ? shortBreakDuration
      : longBreakDuration;

  // Update document title with current timer
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    const modeLabel = getModeLabel(mode);
    document.title = `${timeString} - ${modeLabel} | ZenTime`;
  }, [timeLeft, mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      playNotificationSound(); // Play sound when timer ends
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

    return () => clearInterval(interval);
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

      {mode === "pomodoro" && (
        <div className="w-full space-y-2">
          <label className="text-sm font-medium">Select Task</label>
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

      <RadialProgress
        isRunning={isRunning}
        timeLeft={timeLeft}
        mode={getModeLabel(mode)}
        onClick={handleStartPause}
      />

      <div className="flex space-x-4">
        <Button onClick={handleStartPause} size="lg">
          {isRunning ? <Pause /> : <CirclePlay />}
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg">
          <RefreshCcw /> Reset
        </Button>
      </div>

      <div className="text-sm font-semibold text-muted-foreground">
        Completed Pomodoros: {completedPomodoros} | Sessions: {sessions}
      </div>
    </div>
  );
};
