import { useState } from "react";
import { useTaskStore, Task } from "@/lib/store/task-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TaskList = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskCompletion } =
    useTaskStore();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    notes: "",
    estimatedPomodoros: 1,
  });

  console.log("Editing Task:", editingTask);
  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask(newTask);
      setNewTask({ title: "", notes: "", estimatedPomodoros: 1 });
      setIsAddingTask(false);
    }
  };

  const handleUpdateTask = () => {
    if (editingTask) {
      updateTask(editingTask.id, editingTask);
      setEditingTask(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title">Title</label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="notes">Notes</label>
                <Textarea
                  id="notes"
                  value={newTask.notes}
                  onChange={(e) =>
                    setNewTask({ ...newTask, notes: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="pomodoros">Estimated Pomodoros</label>
                <Input
                  id="pomodoros"
                  type="number"
                  min="1"
                  value={newTask.estimatedPomodoros}
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      estimatedPomodoros: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>
              <Button onClick={handleAddTask} className="w-full">
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card className="p-2 " key={task.id}>
            <CardContent className=" p-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Checkbox
                    checked={task.isCompleted}
                    className="mt-1"
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                  />
                  <div className="space-y-1">
                    <h3
                      className={`font-medium ${
                        task.isCompleted
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.notes && (
                      <p className="text-sm text-muted-foreground">
                        {task.notes}
                      </p>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>
                        {task.completedPomodoros}/{task.estimatedPomodoros}{" "}
                        pomodoros
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Dialog
                    onOpenChange={(open) => {
                      if (!open) setEditingTask(null);
                    }}
                    open={editingTask?.id === task.id}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingTask(task)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby="edit-task-dialog">
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label htmlFor="edit-title">Title</label>
                          <Input
                            id="edit-title"
                            value={editingTask?.title || ""}
                            onChange={(e) =>
                              setEditingTask(
                                editingTask
                                  ? { ...editingTask, title: e.target.value }
                                  : null
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="edit-notes">Notes</label>
                          <Textarea
                            id="edit-notes"
                            value={editingTask?.notes || ""}
                            onChange={(e) =>
                              setEditingTask(
                                editingTask
                                  ? { ...editingTask, notes: e.target.value }
                                  : null
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="edit-pomodoros">
                            Estimated Pomodoros
                          </label>
                          <Input
                            id="edit-pomodoros"
                            type="number"
                            min="1"
                            value={editingTask?.estimatedPomodoros || 1}
                            onChange={(e) =>
                              setEditingTask(
                                editingTask
                                  ? {
                                      ...editingTask,
                                      estimatedPomodoros:
                                        parseInt(e.target.value) || 1,
                                    }
                                  : null
                              )
                            }
                          />
                        </div>
                        <Button onClick={handleUpdateTask} className="w-full">
                          Update Task
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
