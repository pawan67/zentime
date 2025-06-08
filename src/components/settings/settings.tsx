import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePomodoroStore } from "@/lib/store/pomodoro-store";
import { toast } from "sonner";

export const PomodoroSettings = () => {
  const {
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    updateSettings,
  } = usePomodoroStore();

  const [settings, setSettings] = useState({
    pomodoro: pomodoroDuration / 60,
    shortBreak: shortBreakDuration / 60,
    longBreak: longBreakDuration / 60,
    interval: longBreakInterval,
  });

  const handleSave = () => {
    updateSettings({
      pomodoroDuration: settings.pomodoro * 60,
      shortBreakDuration: settings.shortBreak * 60,
      longBreakDuration: settings.longBreak * 60,
      longBreakInterval: settings.interval,
    });

    toast.success("Settings saved successfully!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Timer Settings</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pomodoro">Pomodoro Duration (minutes)</Label>
          <Input
            id="pomodoro"
            type="number"
            min="1"
            value={settings.pomodoro}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                pomodoro: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortBreak">Short Break Duration (minutes)</Label>
          <Input
            id="shortBreak"
            type="number"
            min="1"
            value={settings.shortBreak}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                shortBreak: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="longBreak">Long Break Duration (minutes)</Label>
          <Input
            id="longBreak"
            type="number"
            min="1"
            value={settings.longBreak}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                longBreak: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interval">Long Break Interval (pomodoros)</Label>
          <Input
            id="interval"
            type="number"
            min="1"
            value={settings.interval}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                interval: Number(e.target.value),
              }))
            }
          />
        </div>
      </div>

      <Button onClick={handleSave} className="w-full mt-5">
        Save Settings
      </Button>
    </div>
  );
};
