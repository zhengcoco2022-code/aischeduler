import { ScheduleUpload } from "@/components/ScheduleUpload";

export default function Upload() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">Upload Schedule</h1>
        <p className="text-muted-foreground mt-1">
          Upload a photo or screenshot of your class schedule. Our AI will extract the information automatically.
        </p>
      </div>
      <ScheduleUpload />
    </div>
  );
}
