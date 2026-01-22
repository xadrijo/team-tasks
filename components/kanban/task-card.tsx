"use client";

import { useState } from "react";
import { Task } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { assignees, getAssigneeByName } from "@/lib/data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Pencil, Trash2, User, Flag } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onAssigneeChange?: (taskId: string, assignee: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  teamMembers?: string[];
}

const priorityConfig = {
  low: {
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
    icon: "bg-emerald-500",
  },
  medium: {
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
    icon: "bg-amber-500",
  },
  high: {
    color: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-400",
    icon: "bg-rose-500",
  },
};

const defaultTeamMembers = assignees.map((a) => a.name);

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-orange-500",
  ];
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
}

export function TaskCard({
  task,
  onAssigneeChange,
  onEdit,
  onDelete,
  teamMembers = defaultTeamMembers,
}: TaskCardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState(task.assignee || "");

  const handleAssigneeChange = (value: string) => {
    const newAssignee = value === "unassigned" ? "" : value;
    setSelectedAssignee(newAssignee);
    onAssigneeChange?.(task.id, newAssignee);
    setIsPopoverOpen(false);
  };

  return (
    <Card className="group cursor-pointer border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-200 hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
      <CardHeader className="space-y-2 p-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="line-clamp-2 flex-1 text-sm font-semibold leading-tight text-foreground">
            {task.title}
          </CardTitle>
          <div className="flex shrink-0 items-center gap-2">
            {task.priority && (
              <div
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
                  priorityConfig[task.priority].color
                )}
              >
                <Flag className="h-3 w-3" />
                {task.priority}
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Task options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => onEdit?.(task)}>
                  <Pencil className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => onDelete?.(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {task.description && (
          <CardDescription className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="border-t border-border/30 p-4 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {task.assignee ? (
              <>
                <Avatar className="h-7 w-7 ring-2 ring-background">
                  <AvatarImage
                    src={getAssigneeByName(task.assignee)?.avatar}
                    alt={task.assignee}
                  />
                  <AvatarFallback
                    className={cn(
                      "text-[10px] font-semibold text-white",
                      getAvatarColor(task.assignee)
                    )}
                  >
                    {getInitials(task.assignee)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-foreground/80">
                  {task.assignee}
                </span>
              </>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs italic">Unassigned</span>
              </div>
            )}
          </div>

          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent"
                onClick={(e) => e.stopPropagation()}
              >
                <Pencil className="h-3.5 w-3.5" />
                <span className="sr-only">Edit assignee</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-64 p-3"
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Assign Task</h4>
                  <p className="text-xs text-muted-foreground">
                    Select a team member for this task
                  </p>
                </div>
                <Select
                  value={selectedAssignee || "unassigned"}
                  onValueChange={handleAssigneeChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-muted-foreground/50">
                          <User className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span className="text-muted-foreground">Unassigned</span>
                      </div>
                    </SelectItem>
                    {teamMembers.map((member) => {
                      const assignee = getAssigneeByName(member);
                      return (
                        <SelectItem key={member} value={member}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={assignee?.avatar} alt={member} />
                              <AvatarFallback
                                className={cn(
                                  "text-[10px] font-semibold text-white",
                                  getAvatarColor(member)
                                )}
                              >
                                {getInitials(member)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{member}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
