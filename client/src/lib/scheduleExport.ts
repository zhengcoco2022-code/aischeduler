// Utility functions for exporting schedules

export interface Event {
  id: string;
  name: string;
  startTime: Date | string;
  endTime: Date | string;
  category: string;
  color?: string;
  description?: string;
}

export interface Schedule {
  title: string;
  week?: string;
  events: Event[];
  settings?: {
    sleepStart?: string;
    sleepEnd?: string;
    breakDuration?: number;
  };
}

/**
 * Export schedule as JSON file
 */
export function exportAsJSON(schedule: Schedule, filename: string = "schedule") {
  const dataStr = JSON.stringify(schedule, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  downloadFile(dataBlob, `${filename}.json`);
}

/**
 * Export schedule as CSV file
 */
export function exportAsCSV(schedule: Schedule, filename: string = "schedule") {
  let csv = "Event Name,Start Time,End Time,Category,Description\n";
  
  schedule.events.forEach(event => {
    const startTime = event.startTime instanceof Date 
      ? event.startTime.toLocaleString() 
      : event.startTime;
    const endTime = event.endTime instanceof Date 
      ? event.endTime.toLocaleString() 
      : event.endTime;
    const description = (event.description || "").replace(/"/g, '""');
    
    csv += `"${event.name}","${startTime}","${endTime}","${event.category}","${description}"\n`;
  });

  const dataBlob = new Blob([csv], { type: "text/csv" });
  downloadFile(dataBlob, `${filename}.csv`);
}

/**
 * Export schedule as iCalendar (.ics) format for calendar apps
 */
export function exportAsICalendar(schedule: Schedule, filename: string = "schedule") {
  let ics = "BEGIN:VCALENDAR\n";
  ics += "VERSION:2.0\n";
  ics += `PRODID:-//SmartSchedule//EN\n`;
  ics += `CALSCALE:GREGORIAN\n`;
  ics += `METHOD:PUBLISH\n`;
  
  schedule.events.forEach(event => {
    const startTime = event.startTime instanceof Date 
      ? event.startTime 
      : new Date(event.startTime);
    const endTime = event.endTime instanceof Date 
      ? event.endTime 
      : new Date(event.endTime);
    
    ics += "BEGIN:VEVENT\n";
    ics += `DTSTART:${formatICalDate(startTime)}\n`;
    ics += `DTEND:${formatICalDate(endTime)}\n`;
    ics += `SUMMARY:${event.name}\n`;
    ics += `DESCRIPTION:${event.category}\n`;
    ics += `UID:${event.id}@smartschedule.local\n`;
    ics += "END:VEVENT\n";
  });
  
  ics += "END:VCALENDAR";

  const dataBlob = new Blob([ics], { type: "text/calendar" });
  downloadFile(dataBlob, `${filename}.ics`);
}

/**
 * Print schedule as PDF (using browser's print functionality)
 */
export function exportAsPDF(schedule: Schedule, title: string = "Schedule") {
  // Create a new window for printing
  const printWindow = window.open("", "PRINT", "height=400,width=600");
  if (!printWindow) {
    alert("Please enable popups for this site to print your schedule.");
    return;
  }

  const html = generatePrintableHTML(schedule, title);
  
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  
  // Wait for images to load before printing
  setTimeout(() => {
    printWindow.print();
  }, 250);
}

/**
 * Create a shareable link for the schedule
 */
export async function createShareLink(schedule: Schedule, title: string = "My Schedule"): Promise<string> {
  try {
    const response = await fetch("/api/export/share", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schedule, title }),
    });

    if (!response.ok) {
      throw new Error("Failed to create share link");
    }

    const data = await response.json();
    return data.shareLink;
  } catch (error) {
    console.error("Error creating share link:", error);
    throw error;
  }
}

/**
 * Download a file to the user's device
 */
function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Format a date for iCalendar format
 */
function formatICalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Generate HTML for printing the schedule
 */
function generatePrintableHTML(schedule: Schedule, title: string): string {
  const eventsHTML = schedule.events
    .map(event => {
      const startTime = event.startTime instanceof Date 
        ? event.startTime.toLocaleTimeString() 
        : event.startTime;
      const endTime = event.endTime instanceof Date 
        ? event.endTime.toLocaleTimeString() 
        : event.endTime;
      
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${event.name}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${startTime}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${endTime}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${event.category}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          margin: 20px;
          color: #333;
        }
        h1 {
          color: #1f2937;
          margin-bottom: 24px;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 12px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        th {
          background-color: #f3f4f6;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          border-bottom: 2px solid #d1d5db;
        }
        td {
          padding: 12px;
        }
        .footer {
          margin-top: 24px;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        @media print {
          body {
            margin: 0;
          }
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          ${eventsHTML}
        </tbody>
      </table>
      <div class="footer">
        <p>Generated by SmartSchedule on ${new Date().toLocaleString()}</p>
        <p><strong>Note:</strong> This is a printable view of your schedule. Print or save as PDF using your browser's print dialog.</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Copy schedule to clipboard as formatted text
 */
export function copyScheduleToClipboard(schedule: Schedule): Promise<void> {
  let text = `Schedule: ${schedule.title}\n\n`;
  text += "Events:\n";
  text += "--------\n\n";
  
  schedule.events.forEach(event => {
    const startTime = event.startTime instanceof Date 
      ? event.startTime.toLocaleString() 
      : event.startTime;
    const endTime = event.endTime instanceof Date 
      ? event.endTime.toLocaleString() 
      : event.endTime;
    
    text += `${event.name}\n`;
    text += `  Time: ${startTime} - ${endTime}\n`;
    text += `  Category: ${event.category}\n\n`;
  });

  return navigator.clipboard.writeText(text);
}
