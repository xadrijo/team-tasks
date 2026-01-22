"use client";

import { useState } from "react";
import { Task, Column, TaskStatus } from "./types";
import { KanbanColumn } from "./kanban-column";
import { TaskDialog, TaskFormValues } from "./task-dialog";
import { assignees } from "@/lib/data";

const columns: Column[] = [
  { id: "todo", title: "Todo" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const teamMembers = assignees.map((a) => a.name);

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Set up project structure",
    description: "Initialize the Next.js project with TypeScript and Tailwind",
    status: "done",
    priority: "high",
    assignee: "Alice Johnson",
  },
  {
    id: "2",
    title: "Design database schema",
    description: "Create ERD and define relationships",
    status: "done",
    priority: "high",
    assignee: "Bob Smith",
  },
  {
    id: "3",
    title: "Implement authentication",
    description: "Set up NextAuth.js with OAuth providers",
    status: "in-progress",
    priority: "high",
    assignee: "Alice Johnson",
  },
  {
    id: "4",
    title: "Create API endpoints",
    description: "Build REST API for task management",
    status: "in-progress",
    priority: "medium",
    assignee: "Charlie Brown",
  },
  {
    id: "5",
    title: "Build dashboard UI",
    description: "Create main dashboard with statistics",
    status: "todo",
    priority: "medium",
    assignee: "Diana Prince",
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
    assignee: "Bob Smith",
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
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("todo");

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleAssigneeChange = (taskId: string, assignee: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, assignee: assignee || undefined }
          : task
      )
    );
  };

  const handleAddTask = (status: TaskStatus) => {
    setEditingTask(null);
    setDefaultStatus(status);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleSubmit = (data: TaskFormValues & { id?: string; status: TaskStatus }) => {
    if (data.id) {
      // Update existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === data.id
            ? {
                ...task,
                title: data.title,
                description: data.description || undefined,
                assignee: data.assignee || undefined,
              }
            : task
        )
      );
    } else {
      // Create new task
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description || undefined,
        assignee: data.assignee || undefined,
        status: data.status,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  return (
    <>
      <div className="flex h-full w-full gap-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={getTasksByStatus(column.id)}
            onAssigneeChange={handleAssigneeChange}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
            teamMembers={teamMembers}
          />
        ))}
      </div>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        onSubmit={handleSubmit}
        teamMembers={teamMembers}
        defaultStatus={defaultStatus}
      />
    </>
  );
}
