import AboutCard from "@/components/settings/about-card";
import { DataManagement } from "@/components/settings/data-management";
import { PomodoroSettings } from "@/components/settings/settings";
import { TaskSettings } from "@/components/settings/task-settings";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Customize your ZenTime experience
        </p>
      </div>

      <div className="space-y-6">
        <PomodoroSettings />
        <TaskSettings />
        <DataManagement />
        <AboutCard />
      </div>
    </div>
  );
}
