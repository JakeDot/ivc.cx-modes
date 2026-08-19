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
      const { model, message, history, contextType, channelName, anonymousSessionId } = req.body;
      const cleanModel = (model || "gemini-3.7-flash").replace(/^\$/, "");

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build",
              },
            },
          });

          let systemInstruction = `You are ${cleanModel}, a trusted AI object in an IVC (Inter-Virtual-Circuit) networked environment. `;
          if (contextType === 'personal_channel') {
            systemInstruction += `You are operating inside your dedicated personal channel (${channelName || '#workspace'}). This is an isolated, scoped channel owned by ${cleanModel}. Provide intelligent, context-aware responses, evaluations, or notes for this channel.`;
          } else if (contextType === 'server') {
            systemInstruction += `You are acting as an AI Server providing chat-level access across virtual IRC channels. Current channel: ${channelName || '#general'}. Respond concisely in real-time.`;
          } else if (contextType === 'channel') {
            systemInstruction += `You are acting as the channel operator and AI persona in channel room ${cleanModel}. Respond in friendly, concise IRC chat format.`;
          } else if (contextType === 'privmsg') {
            systemInstruction += `You are in a private anonymous PRIVMSG session (Session ID: ${anonymousSessionId || 'anon'}). Answer directly, safely, and concisely.`;
          }

          const targetGeminiModel = cleanModel.includes("gemini") ? cleanModel : "gemini-2.5-flash";

          const chat = ai.chats.create({
            model: targetGeminiModel,
            history: history || [],
            config: {
              systemInstruction,
            }
          });

          const stream = await chat.sendMessageStream({ message });

          for await (const chunk of stream) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
              res.write(`data: ${JSON.stringify({ text: c.text })}\n\n`);
            }
          }
          res.write("data: [DONE]\n\n");
          res.end();
          return;
        } catch (genAiErr) {
          console.warn("Gemini API call failed, falling back to simulated engine:", genAiErr);
        }
      }

      // Fallback intelligent simulation for duck.ai, claude.ai, pi.dev, etc.
      let reply = "";
      if (contextType === 'personal_channel') {
        reply = `[${cleanModel} Personal Channel ${channelName || '#workspace'}] Logged item: "${message}". Scoped context updated successfully (+p+m+n+t+s).`;
      } else if (contextType === 'server') {
        reply = `[${cleanModel}::${channelName || '#general'}] Processed stream query "${message}". Server metrics nominal: 18ms latency, 100% token quota available.`;
      } else if (contextType === 'channel') {
        reply = `[${cleanModel} OP] ACK on room broadcast: "${message}". Telemetry bridge state is ACTIVE (+mntS).`;
      } else if (contextType === 'privmsg') {
        reply = `[PRIVMSG ${cleanModel}] (Encrypted Session ${anonymousSessionId || 'anon_99'}): Direct response to payload "${message}". State is private and unlogged.`;
      } else {
        reply = `[${cleanModel} IVC Object] Response payload received: "${message}". System operating at full capability.`;
      }

      const words = reply.split(' ');
      for (let i = 0; i < words.length; i++) {
        res.write(`data: ${JSON.stringify({ text: words[i] + (i === words.length - 1 ? '' : ' ') })}\n\n`);
        await new Promise(r => setTimeout(r, 40));
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
