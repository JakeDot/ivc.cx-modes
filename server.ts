import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // AI Chat Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { model, message, history } = req.body;
      
      // Mock other models and harnesses for IVC integration simulation
      if (['claude.ai', 'duck.ai', 'pi.dev'].includes(model)) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        const harnessName = model === 'pi.dev' ? 'Pi.dev Harness' : model;
        const msg = `[Simulated response from ${harnessName} IVC endpoint]\nReceived your payload: "${message}". Operating normally.`;
        
        const chunks = msg.split(' ');
        for (let i = 0; i < chunks.length; i++) {
          res.write(`data: ${JSON.stringify({ text: chunks[i] + (i === chunks.length - 1 ? '' : ' ') })}\n\n`);
          await new Promise(r => setTimeout(r, 60)); // Simulate processing delay
        }
        res.write("data: [DONE]\n\n");
        res.end();
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is required.");
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const chat = ai.chats.create({
        model: model || "gemini-3.7-flash",
        history: history || [],
      });

      const stream = await chat.sendMessageStream({ message });

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          res.write(`data: ${JSON.stringify({ text: c.text })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || "Failed to communicate with AI model" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
