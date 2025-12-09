import { TaskPanel } from "@/components/TaskPanel";

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">Tasks</h1>
        <p className="text-muted-foreground mt-1">
          Manage your tasks and let the AI find the best time slots for them.
        </p>
      </div>
      <TaskPanel />
    </div>
  );
}
