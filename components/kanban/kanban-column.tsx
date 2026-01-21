"use client";

import { Task, TaskStatus } from "./types";
import { TaskCard } from "./task-card";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

const columnColors: Record<TaskStatus, string> = {
  todo: "border-t-blue-500",
  "in-progress": "border-t-yellow-500",
  done: "border-t-green-500",
};

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[500px] w-full flex-col rounded-lg border border-t-4 bg-muted/30",
        columnColors[id]
      )}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold">{title}</h2>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}
