"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Clock,
  PauseCircle,
  PlayCircle,
  PlusCircle,
  RotateCcw,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [customTime, setCustomTime] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      toast.success("Pomodoro session completed!");
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  const adjustTimer = (seconds: number) => {
    setTime((prevTime) => Math.max(0, prevTime + seconds));
  };

  const handleCustomTime = () => {
    const timeParts = customTime.split(":");

    if (timeParts.length === 1) {
      const seconds = parseInt(timeParts[0]) || 0;
      setTime(seconds);
    } else if (timeParts.length === 2) {
      const minutes = parseInt(timeParts[0]) || 0;
      const seconds = parseInt(timeParts[1]) || 0;
      const totalSeconds = minutes * 60 + seconds;
      setTime(totalSeconds);
    }

    setCustomTime("");
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    } else {
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
  };

  const startShortBreak = () => {
    resetTimer();
    setTime(5 * 60);
    setIsActive(true);
  };

  const startLongBreak = () => {
    resetTimer();
    setTime(10 * 60);
    setIsActive(true);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          Pomodoro Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-6xl font-bold text-center">{formatTime(time)}</div>
        <div className="flex justify-center space-x-4">
          <Button onClick={toggleTimer}>
            {isActive ? (
              <PauseCircle className="mr-2 h-4 w-4" />
            ) : (
              <PlayCircle className="mr-2 h-4 w-4" />
            )}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={resetTimer} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <Button onClick={() => adjustTimer(10 * 60)} variant="outline">
            +10 min
          </Button>
          <Button onClick={() => adjustTimer(5 * 60)} variant="outline">
            +5 min
          </Button>
          <Button onClick={() => adjustTimer(-5 * 60)} variant="outline">
            -5 min
          </Button>
          <Button onClick={() => adjustTimer(-10 * 60)} variant="outline">
            -10 min
          </Button>
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          <Input
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            placeholder="MM:SS or SS"
            className="w-32"
          />
          <Button onClick={handleCustomTime} variant="outline">
            Set Time
          </Button>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <Button onClick={startShortBreak} variant="outline">
            Short Break (5 min)
          </Button>
          <Button onClick={startLongBreak} variant="outline">
            Long Break (10 min)
          </Button>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Tasks</h3>
          <div className="flex space-x-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            <Button onClick={addTask}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleTask(task.id)}
                >
                  <CheckCircle2
                    className={`h-4 w-4 ${
                      task.completed ? "text-green-500" : "text-gray-300"
                    }`}
                  />
                </Button>
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
