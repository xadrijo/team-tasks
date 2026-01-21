export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: "low" | "medium" | "high";
  assignee?: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
}
