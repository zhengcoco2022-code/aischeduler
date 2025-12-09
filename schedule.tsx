import { WeeklyCalendar } from "@/components/WeeklyCalendar";

export default function Schedule() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">Weekly Schedule</h1>
        <p className="text-muted-foreground mt-1">
          View and manage your weekly schedule. Drag and drop tasks to rearrange them.
        </p>
      </div>
      <WeeklyCalendar />
    </div>
  );
}
