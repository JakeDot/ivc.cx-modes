## 2025-03-01 - [Missing Rate Limiting on LLM Endpoint]
**Vulnerability:** Missing rate limiting on the `/api/chat` route in `server.ts`.
**Learning:** The Express backend consumes a third-party GenAI API, which is susceptible to resource exhaustion or financial DoS if left open without rate controls.
**Prevention:** Implement endpoint-specific rate limiting (using Maps with periodic cleanup or Redis) for any endpoints interacting with expensive resources (APIs, LLMs, DB-heavy tasks).
