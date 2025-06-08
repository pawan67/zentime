"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePomodoroStore } from "@/lib/store/pomodoro-store";
import { useTaskStore } from "@/lib/store/task-store";
import { Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  settings: {
    theme: "light" | "dark" | "system";
    soundEnabled: boolean;
    notificationsEnabled: boolean;
  };
  setSettings: (settings: SettingsState["settings"]) => void;
}

const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        theme: "system",
        soundEnabled: true,
        notificationsEnabled: true,
      },
      setSettings: (settings) => set({ settings }),
    }),
    {
      name: "settings-storage",
    }
  )
);

interface ImportedData {
  version: string;
  tasks: Array<{
    title: string;
    notes: string;
    estimatedPomodoros: number;
  }>;
  completedPomodoros: number;
  settings: SettingsState["settings"];
  exportDate: string;
}

export function DataManagement() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
  const { completedPomodoros, incrementCompletedPomodoros } =
    usePomodoroStore();
  const { settings, setSettings } = useSettingsStore();

  const exportData = () => {
    const data: ImportedData = {
      tasks: tasks.map(({ title, notes, estimatedPomodoros }) => ({
        title,
        notes,
        estimatedPomodoros,
      })),
      completedPomodoros,
      settings,
      version: "1.0",
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `zentime-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Data exported successfully");
  };

  const importData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text) as ImportedData;

      // Validate data structure
      if (
        !data.version ||
        !Array.isArray(data.tasks) ||
        typeof data.completedPomodoros !== "number" ||
        !data.settings
      ) {
        throw new Error("Invalid backup file format");
      }

      // Validate settings structure
      if (
        !data.settings.theme ||
        typeof data.settings.soundEnabled !== "boolean" ||
        typeof data.settings.notificationsEnabled !== "boolean"
      ) {
        throw new Error("Invalid settings format in backup file");
      }

      // Clear existing tasks
      tasks.forEach((task) => deleteTask(task.id));

      // Add imported tasks
      data.tasks.forEach((task) => {
        if (
          typeof task.title === "string" &&
          typeof task.notes === "string" &&
          typeof task.estimatedPomodoros === "number"
        ) {
          addTask({
            title: task.title,
            notes: task.notes,
            estimatedPomodoros: task.estimatedPomodoros,
          });
        }
      });

      // Update completed pomodoros
      for (let i = 0; i < data.completedPomodoros; i++) {
        incrementCompletedPomodoros();
      }

      // Update settings
      setSettings({
        theme: data.settings.theme,
        soundEnabled: data.settings.soundEnabled,
        notificationsEnabled: data.settings.notificationsEnabled,
      });

      toast.success("Data imported successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to import data. Invalid file format."
      );
      console.error("Import error:", error);
    }

    // Reset file input
    event.target.value = "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>
          Export your data to backup or transfer to another device
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className=" grid grid-cols-2 gap-4  ">
          <Button variant="outline" className="flex-1" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <div className="flex-1">
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
              id="import-file"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById("import-file")?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Import Data
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          This will export/import all your tasks, pomodoro history, and
          settings. Use this to backup your data or transfer it to another
          device.
        </p>
      </CardContent>
    </Card>
  );
}
