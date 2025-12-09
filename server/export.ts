import { Router } from "express";
import { nanoid } from "nanoid";

const router = Router();

// In-memory storage for shareable schedules (in production, use database)
const shareableSchedules = new Map<string, any>();

// Export schedule as JSON
router.post("/api/export/json", (req, res) => {
  try {
    const { schedule, filename = "schedule" } = req.body;

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}.json"`);
    res.json(schedule);
  } catch (error) {
    console.error("Export JSON error:", error);
    res.status(500).json({ error: "Failed to export schedule" });
  }
});

// Export schedule as CSV
router.post("/api/export/csv", (req, res) => {
  try {
    const { events, filename = "schedule" } = req.body;

    // Convert events to CSV format
    let csv = "Event Name,Start Time,End Time,Category,Color\n";
    
    if (Array.isArray(events)) {
      events.forEach(event => {
        const startDate = new Date(event.startTime).toLocaleString();
        const endDate = new Date(event.endTime).toLocaleString();
        csv += `"${event.name}","${startDate}","${endDate}","${event.category || ""}","${event.color || "blue"}"\n`;
      });
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}.csv"`);
    res.send(csv);
  } catch (error) {
    console.error("Export CSV error:", error);
    res.status(500).json({ error: "Failed to export schedule" });
  }
});

// Create a shareable link for the schedule
router.post("/api/export/share", (req, res) => {
  try {
    const { schedule, title = "My Schedule" } = req.body;
    const shareId = nanoid(10);

    const shareableSchedule = {
      id: shareId,
      title,
      schedule,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    };

    shareableSchedules.set(shareId, shareableSchedule);

    const shareLink = `${process.env.BASE_URL || "http://localhost:5000"}/share/${shareId}`;
    
    res.json({
      success: true,
      shareId,
      shareLink,
      expiresAt: shareableSchedule.expiresAt,
    });
  } catch (error) {
    console.error("Share schedule error:", error);
    res.status(500).json({ error: "Failed to create share link" });
  }
});

// Get a shareable schedule by ID
router.get("/api/share/:shareId", (req, res) => {
  try {
    const { shareId } = req.params;
    const shareableSchedule = shareableSchedules.get(shareId);

    if (!shareableSchedule) {
      return res.status(404).json({ error: "Share not found" });
    }

    if (shareableSchedule.expiresAt < new Date()) {
      shareableSchedules.delete(shareId);
      return res.status(410).json({ error: "Share link has expired" });
    }

    res.json({
      title: shareableSchedule.title,
      schedule: shareableSchedule.schedule,
      createdAt: shareableSchedule.createdAt,
    });
  } catch (error) {
    console.error("Fetch share error:", error);
    res.status(500).json({ error: "Failed to fetch shared schedule" });
  }
});

// Generate PDF (would require pdf-lib or similar in production)
router.post("/api/export/pdf", (req, res) => {
  try {
    const { events, title = "Schedule", filename = "schedule" } = req.body;

    // In a production environment, use a PDF library like pdf-lib or puppeteer
    // For now, return an error indicating the user should use the web UI to print
    res.json({
      success: false,
      message: "PDF export is available through your browser's Print function. Press Ctrl+P (Cmd+P on Mac) and select 'Save as PDF'",
      alternative: "Use the Print to PDF option from your browser",
    });
  } catch (error) {
    console.error("Export PDF error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

export default router;
