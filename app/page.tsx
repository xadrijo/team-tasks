import { ThemeToggle } from "@/components/theme-toggle";
import { KanbanBoard } from "@/components/kanban/kanban-board";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Team Tasks</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <KanbanBoard />
      </main>
    </div>
  );
}
