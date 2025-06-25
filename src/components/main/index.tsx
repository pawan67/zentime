"use client";
import { useState } from "react";
import { PomodoroTimer } from "../pomodoro/timer";
import { PomodoroSettings } from "../settings/settings";
import { TaskList } from "../pomodoro/task-list";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Header from "../shared/header";
import { ThemeToggle } from "../theme/theme-toggle";
import Info from "./info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MainScreen = () => {
  return (
    <div>
      <PomodoroTimer />
      <div className="mt-5">
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="info">About Pomodoro</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            <TaskList />
          </TabsContent>

          <TabsContent value="info">
            <Info />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MainScreen;
