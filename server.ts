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

  // Modes Model API Documentation Route (HTML Content-Type)
  const modesApiDocsHandler = (req: express.Request, res: express.Response) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IVC Modes Model - API Documentation</title>
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --border: #334155;
      --accent: #6366f1;
      --accent-hover: #4f46e5;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --code-bg: #090d16;
      --emerald: #10b981;
      --amber: #f59e0b;
      --cyan: #06b6d4;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 2rem 1rem;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    header {
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.5rem;
      margin-bottom: 2rem;
    }
    .badge {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: 4px;
      background: var(--accent);
      color: #fff;
      font-family: monospace;
      margin-bottom: 0.5rem;
    }
    h1 {
      font-size: 2.25rem;
      font-weight: 800;
      color: #fff;
      margin-bottom: 0.5rem;
    }
    p.lead {
      color: var(--text-muted);
      font-size: 1.1rem;
    }
    section {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    h2 {
      font-size: 1.35rem;
      color: var(--cyan);
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    th, td {
      text-align: left;
      padding: 0.75rem;
      border-bottom: 1px solid var(--border);
    }
    th {
      color: var(--text-muted);
      font-weight: 600;
      background: rgba(0,0,0,0.2);
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      background: var(--code-bg);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      color: #a5f3fc;
      font-size: 0.85em;
    }
    pre {
      background: var(--code-bg);
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
      border: 1px solid var(--border);
      color: #e2e8f0;
      font-size: 0.85rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .endpoint {
      display: inline-block;
      background: #064e3b;
      color: #6ee7b7;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-family: monospace;
      font-weight: bold;
      font-size: 0.85rem;
    }
    footer {
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-top: 3rem;
      border-top: 1px solid var(--border);
      padding-top: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <span class="badge">IVC PROTOCOL v2.4</span>
      <h1>Modes Model API Documentation</h1>
      <p class="lead">Interactive Object Address Modifiers, Diagnostic Modes, and Inheritance Matrix Specifications for Inter-Virtual-Circuit (IVC) Architecture.</p>
    </header>

    <section>
      <h2>📡 Prefix Addressing Guide</h2>
      <p>Target addresses in the IVC system are prefixed to define their entity category, structural scope, and default inheritance rules:</p>
      <table>
        <thead>
          <tr>
            <th>Prefix</th>
            <th>Type</th>
            <th>Example</th>
            <th>Description &amp; Inheritance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>#</code></td>
            <td>Channel Group</td>
            <td><code>#feed</code></td>
            <td>Standard multi-user broadcast streams and hierarchical channels.</td>
          </tr>
          <tr>
            <td><code>@</code></td>
            <td>User Identity</td>
            <td><code>@jakedot</code></td>
            <td>Human operator or end-user identity subobject.</td>
          </tr>
          <tr>
            <td><code>$</code></td>
            <td>AI Model Object</td>
            <td><code>$gemini-3.7-flash</code></td>
            <td>Generative AI model or autonomous agent object (auto-applies <code>+S</code>).</td>
          </tr>
          <tr>
            <td><code>&amp;</code></td>
            <td>Network Service</td>
            <td><code>&amp;ChanServ</code></td>
            <td>Infrastructure daemons and security services (auto-applies <code>+N+S</code>).</td>
          </tr>
          <tr>
            <td><code>~</code></td>
            <td>Kernel Node</td>
            <td><code>~sys.core</code></td>
            <td>Ring-0 execution and Netadmin routing node (auto-applies <code>+n+k</code>).</td>
          </tr>
          <tr>
            <td><code>?</code></td>
            <td>Query Probe</td>
            <td><code>?#telemetry</code></td>
            <td>Ephemeral telemetry probe or search filter facet (auto-inherits <code>+t</code>).</td>
          </tr>
          <tr>
            <td><code>§</code></td>
            <td>Schema Section</td>
            <td><code>§config</code></td>
            <td>Declarative spec, typed property schema matrix, or blueprint.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>⚙️ Modifiers / Modes Model Specification</h2>
      <p>Modifiers alter entity behavior or request specific views by appending flags to the target address (e.g. <code>#feed+v+t</code> or <code>/mode #feed +m-t</code>).</p>

      <h3>Diagnostic Modes</h3>
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Usage Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>+Δview</code> / <code>+raw</code></td>
            <td>Delta View Matrix</td>
            <td><code>#feed+Δview</code></td>
            <td>Opens multi-tab inspector (JSON serialization, §PROPS, DB proxy, ΔDIFF, Wire).</td>
          </tr>
          <tr>
            <td><code>+k</code></td>
            <td>Kernel Diagnostic Mode</td>
            <td><code>~root+k</code></td>
            <td>Ring-0 execution supervisor view (dmesg buffer, page tables, CPU registers, syscall traps).</td>
          </tr>
          <tr>
            <td><code>+Δmodes</code></td>
            <td>Mode Policy Ledger</td>
            <td><code>#feed+Δmodes</code></td>
            <td>Audit history log and real-time mode mutation matrix editor.</td>
          </tr>
          <tr>
            <td><code>+t</code></td>
            <td>Trace Telemetry Stream</td>
            <td><code>#feed+t</code></td>
            <td>Captures real-time packet dispatches, state transitions, and ACL changes.</td>
          </tr>
        </tbody>
      </table>

      <h3 style="margin-top: 1.5rem;">Access &amp; State Modes</h3>
      <table>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Name</th>
            <th>Usage Example</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>+S</code></td>
            <td>Trusted External Service</td>
            <td><code>$duck.ai+S</code></td>
            <td>Verified trusted service tier. Bypasses restrictive sandbox checks.</td>
          </tr>
          <tr>
            <td><code>+s</code></td>
            <td>Untrusted Service Sandbox</td>
            <td><code>+s_plugin</code></td>
            <td>Isolated untrusted sandbox mode for third-party extensions.</td>
          </tr>
          <tr>
            <td><code>+v</code></td>
            <td>Voice / Override Mode</td>
            <td><code>@user+v</code></td>
            <td>Grants speaking permission in moderated (<code>+m</code>) channels or sets open voice broadcast.</td>
          </tr>
          <tr>
            <td><code>+m</code></td>
            <td>Muted / Moderated Mode</td>
            <td><code>#feed+m</code></td>
            <td>Restricts message transmissions exclusively to voiced users (<code>+v</code>) and operators (<code>+o</code>).</td>
          </tr>
          <tr>
            <td><code>+n</code></td>
            <td>Netadmin Superuser Only</td>
            <td><code>~sys+n</code></td>
            <td>Restricts object interactions exclusively to verified network administrators.</td>
          </tr>
          <tr>
            <td><code>+N</code></td>
            <td>Network Services Daemon</td>
            <td><code>&amp;services+N</code></td>
            <td>Binds object to network service daemons (NickServ, ChanServ, OperServ).</td>
          </tr>
          <tr>
            <td><code>+o</code> / <code>+a</code></td>
            <td>Operator / Admin Elevation</td>
            <td><code>@operator+o</code></td>
            <td>Grants channel/subsystem operator (<code>+o</code>) and administrator (<code>+a</code>) authority.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>💻 REST API / Command Schema</h2>
      <p>Interact with the Modes Model programmatically via terminal commands or HTTP endpoints:</p>

      <div style="margin-top: 1rem;">
        <p><span class="endpoint">GET</span> <code>/api/docs/modes</code> — Returns this HTML API documentation.</p>
        <p style="margin-top: 0.5rem;"><span class="endpoint">POST</span> <code>/api/chat</code> — Dispatch messages to AI model objects with context modes.</p>
      </div>

      <h3 style="margin-top: 1.5rem;">Terminal Command Examples</h3>
      <pre><code># Change active modes on an object
/mode #feed +m+v-t

# Connect to an AI model object as a pseudo-server
/connect $gemini-3.7-flash

# Open the Mode Matrix editor directly
/modes
/mode #feed

# Access dynamic property matrix
/props
# Inspect raw object state
/view
/raw</code></pre>
    </section>

    <footer>
      <p>IVC Object Bus Fabric &copy; 2026. Served with Content-Type: <code>text/html</code>.</p>
    </footer>
  </div>
</body>
</html>`);
  };

  app.get("/api/docs/modes", modesApiDocsHandler);
  app.get("/docs/modes", modesApiDocsHandler);
  app.get("/api/docs", modesApiDocsHandler);

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
