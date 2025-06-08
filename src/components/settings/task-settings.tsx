"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTaskStore } from "@/lib/store/task-store";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function TaskSettings() {
  const { tasks, deleteTask } = useTaskStore();

  const handleClearCompletedTasks = () => {
    const completedTasks = tasks.filter((task) => task.isCompleted);
    completedTasks.forEach((task) => deleteTask(task.id));
    toast.success("Cleared completed tasks");
  };

  const handleClearAllTasks = () => {
    tasks.forEach((task) => deleteTask(task.id));
    toast.success("Cleared all tasks");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Settings</CardTitle>
        <CardDescription>Manage your task preferences and data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Clear Completed Tasks</Label>
              <p className="text-sm text-muted-foreground">
                Remove all completed tasks from your list
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Completed Tasks</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your completed tasks. This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearCompletedTasks}>
                    Clear Tasks
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Clear All Tasks</Label>
              <p className="text-sm text-muted-foreground">
                Remove all tasks from your list
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear All Tasks</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your tasks. This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAllTasks}>
                    Clear All Tasks
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
