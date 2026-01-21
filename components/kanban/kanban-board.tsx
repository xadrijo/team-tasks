"use client";

import { useState } from "react";
import { Task, Column, TaskStatus } from "./types";
import { KanbanColumn } from "./kanban-column";

const columns: Column[] = [
  { id: "todo", title: "Todo" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Set up project structure",
    description: "Initialize the Next.js project with TypeScript and Tailwind",
    status: "done",
    priority: "high",
    assignee: "Alice",
  },
  {
    id: "2",
    title: "Design database schema",
    description: "Create ERD and define relationships",
    status: "done",
    priority: "high",
    assignee: "Bob",
  },
  {
    id: "3",
    title: "Implement authentication",
    description: "Set up NextAuth.js with OAuth providers",
    status: "in-progress",
    priority: "high",
    assignee: "Alice",
  },
  {
    id: "4",
    title: "Create API endpoints",
    description: "Build REST API for task management",
    status: "in-progress",
    priority: "medium",
    assignee: "Charlie",
  },
  {
    id: "5",
    title: "Build dashboard UI",
    description: "Create main dashboard with statistics",
    status: "todo",
    priority: "medium",
    assignee: "Diana",
  },
  {
    id: "6",
    title: "Add drag and drop",
    description: "Implement drag and drop functionality for tasks",
    status: "todo",
    priority: "low",
  },
  {
    id: "7",
    title: "Write unit tests",
    description: "Add comprehensive test coverage",
    status: "todo",
    priority: "medium",
    assignee: "Bob",
  },
  {
    id: "8",
    title: "Performance optimization",
    description: "Optimize bundle size and loading times",
    status: "todo",
    priority: "low",
  },
];

export function KanbanBoard() {
  const [tasks] = useState<Task[]>(initialTasks);

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="flex h-full w-full gap-6">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={getTasksByStatus(column.id)}
        />
      ))}
    </div>
  );
}
