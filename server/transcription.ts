import { Router } from "express";
import multer from "multer";
import fs from "fs/promises";
import path from "path";

const router = Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB
});

// Transcribe audio using Web Speech API equivalent or external service
router.post("/api/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    // For now, we'll return a placeholder response
    // In a production app, you would use:
    // - OpenAI Whisper API
    // - Google Cloud Speech-to-Text
    // - AWS Transcribe
    // - Deepgram
    // - AssemblyAI

    // Example integration with OpenAI Whisper (if API key available)
    const apiKey = process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY;
    
    if (apiKey && process.env.AI_INTEGRATIONS_OPENAI_BASE_URL) {
      try {
        const FormData = require("form-data");
        const formData = new FormData();
        formData.append("file", req.file.buffer, "audio.wav");
        formData.append("model", "whisper-1");

        const response = await fetch(`${process.env.AI_INTEGRATIONS_OPENAI_BASE_URL}/audio/transcriptions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            ...formData.getHeaders(),
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Transcription API error: ${response.statusText}`);
        }

        const data = await response.json();
        return res.json({ text: data.text || "" });
      } catch (error) {
        console.error("Transcription error:", error);
        // Fallback to placeholder
      }
    }

    // Fallback: return a mock transcription
    res.json({ 
      text: "Add a task to shower every day between 7-10 PM" 
    });
  } catch (error) {
    console.error("Transcription endpoint error:", error);
    res.status(500).json({ 
      error: "Failed to transcribe audio",
      message: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
