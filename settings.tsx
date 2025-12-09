import { SettingsPanel } from "@/components/SettingsPanel";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold" data-testid="text-page-title">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your scheduling preferences to create a healthy, balanced schedule.
        </p>
      </div>
      <SettingsPanel />
    </div>
  );
}
