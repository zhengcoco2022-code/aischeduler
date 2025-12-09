// localStorage utility for offline schedule management
import type { Schedule, Event } from "./scheduleExport";

const STORAGE_KEYS = {
  SCHEDULE: "smartschedule_schedule",
  EVENTS: "smartschedule_events",
  TASKS: "smartschedule_tasks",
  SETTINGS: "smartschedule_settings",
  LAST_SYNC: "smartschedule_last_sync",
  DRAFTS: "smartschedule_drafts",
};

/**
 * Save schedule to localStorage
 */
export function saveScheduleLocal(schedule: Schedule): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
    updateLastSync();
  } catch (error) {
    console.error("Failed to save schedule to localStorage:", error);
    // Handle quota exceeded error
    if (error instanceof DOMException && error.code === 22) {
      console.warn("localStorage quota exceeded");
    }
  }
}

/**
 * Load schedule from localStorage
 */
export function loadScheduleLocal(): Schedule | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load schedule from localStorage:", error);
    return null;
  }
}

/**
 * Save events to localStorage
 */
export function saveEventsLocal(events: Event[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    updateLastSync();
  } catch (error) {
    console.error("Failed to save events to localStorage:", error);
  }
}

/**
 * Load events from localStorage
 */
export function loadEventsLocal(): Event[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load events from localStorage:", error);
    return [];
  }
}

/**
 * Save tasks to localStorage
 */
export function saveTasksLocal(tasks: any[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    updateLastSync();
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
}

/**
 * Load tasks from localStorage
 */
export function loadTasksLocal(): any[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
}

/**
 * Save settings to localStorage
 */
export function saveSettingsLocal(settings: any): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    updateLastSync();
  } catch (error) {
    console.error("Failed to save settings to localStorage:", error);
  }
}

/**
 * Load settings from localStorage
 */
export function loadSettingsLocal(): any {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load settings from localStorage:", error);
    return null;
  }
}

/**
 * Save draft task to localStorage
 */
export function saveDraftTask(taskDraft: any): void {
  try {
    const drafts = loadDrafts();
    drafts.push({
      ...taskDraft,
      draftId: Date.now().toString(),
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  } catch (error) {
    console.error("Failed to save draft task:", error);
  }
}

/**
 * Load draft tasks from localStorage
 */
export function loadDrafts(): any[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load drafts:", error);
    return [];
  }
}

/**
 * Delete draft task
 */
export function deleteDraft(draftId: string): void {
  try {
    const drafts = loadDrafts();
    const filtered = drafts.filter(d => d.draftId !== draftId);
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(filtered));
  } catch (error) {
    console.error("Failed to delete draft:", error);
  }
}

/**
 * Clear all drafts
 */
export function clearDrafts(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.DRAFTS);
  } catch (error) {
    console.error("Failed to clear drafts:", error);
  }
}

/**
 * Get last sync timestamp
 */
export function getLastSync(): Date | null {
  try {
    const timestamp = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    return timestamp ? new Date(timestamp) : null;
  } catch (error) {
    console.error("Failed to get last sync:", error);
    return null;
  }
}

/**
 * Update last sync timestamp
 */
function updateLastSync(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
  } catch (error) {
    console.error("Failed to update last sync:", error);
  }
}

/**
 * Clear all local data (careful!)
 */
export function clearAllLocal(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Failed to clear local storage:", error);
  }
}

/**
 * Export all local data as JSON
 */
export function exportAllLocal(): string {
  try {
    const data = {
      schedule: loadScheduleLocal(),
      events: loadEventsLocal(),
      tasks: loadTasksLocal(),
      settings: loadSettingsLocal(),
      drafts: loadDrafts(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error("Failed to export local data:", error);
    return "";
  }
}

/**
 * Import local data from JSON
 */
export function importLocal(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.schedule) saveScheduleLocal(data.schedule);
    if (data.events) saveEventsLocal(data.events);
    if (data.tasks) saveTasksLocal(data.tasks);
    if (data.settings) saveSettingsLocal(data.settings);
    
    return true;
  } catch (error) {
    console.error("Failed to import local data:", error);
    return false;
  }
}

/**
 * Get localStorage usage info
 */
export function getStorageInfo(): {
  used: number;
  available: number;
  percentage: number;
  items: number;
} {
  try {
    let used = 0;
    let items = 0;
    
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        used += localStorage[key].length + key.length;
        items++;
      }
    }
    
    // Typical localStorage limit is 5-10MB (5-10 million bytes)
    const available = 5 * 1024 * 1024; // 5MB default
    const percentage = (used / available) * 100;
    
    return { used, available, percentage: Math.round(percentage), items };
  } catch (error) {
    console.error("Failed to get storage info:", error);
    return { used: 0, available: 0, percentage: 0, items: 0 };
  }
}

/**
 * Sync offline changes with server
 */
export async function syncOfflineChanges(): Promise<boolean> {
  try {
    const schedule = loadScheduleLocal();
    const tasks = loadTasksLocal();
    const events = loadEventsLocal();
    const settings = loadSettingsLocal();
    
    if (!schedule && !tasks && !events && !settings) {
      return true; // Nothing to sync
    }

    const response = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        schedule,
        tasks,
        events,
        settings,
        syncedAt: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      updateLastSync();
      return true;
    }

    return false;
  } catch (error) {
    console.error("Failed to sync offline changes:", error);
    return false;
  }
}

/**
 * Check if offline data is newer than server data
 */
export function isOfflineDataNewer(serverLastModified: Date): boolean {
  const lastSync = getLastSync();
  if (!lastSync) return false;
  
  return lastSync > serverLastModified;
}

/**
 * Create a backup of all local data
 */
export function createBackup(): {
  data: string;
  timestamp: string;
  filename: string;
} {
  const data = exportAllLocal();
  const timestamp = new Date().toISOString();
  const filename = `smartschedule-backup-${timestamp.split("T")[0]}.json`;
  
  return { data, timestamp, filename };
}

/**
 * Restore from backup
 */
export function restoreFromBackup(backupData: string): boolean {
  try {
    return importLocal(backupData);
  } catch (error) {
    console.error("Failed to restore from backup:", error);
    return false;
  }
}
