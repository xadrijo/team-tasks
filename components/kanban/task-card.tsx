"use client";

import { Task } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="cursor-pointer transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
          {task.priority && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                priorityColors[task.priority]
              )}
            >
              {task.priority}
            </span>
          )}
        </div>
        {task.description && (
          <CardDescription className="text-xs">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      {task.assignee && (
        <CardContent className="pt-0">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {task.assignee.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-muted-foreground">{task.assignee}</span>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
