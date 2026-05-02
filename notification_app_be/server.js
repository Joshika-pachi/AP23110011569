import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Log from "../logging_middleware/log.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health route
app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Health check hit");
  res.send("Backend running");
});

// Main API (simple notification)
app.post("/notify", async (req, res) => {
  try {
    await Log("backend", "info", "controller", "Notify request received");

    const { message } = req.body;

    if (!message) {
      await Log("backend", "error", "handler", "Message missing");
      return res.status(400).json({ error: "Message required" });
    }

    // “Business logic” (keep it simple)
    await Log("backend", "info", "service", "Processing notification");

    return res.json({ success: true, message });
  } catch (e) {
    await Log("backend", "fatal", "controller", "Unhandled error in /notify");
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});