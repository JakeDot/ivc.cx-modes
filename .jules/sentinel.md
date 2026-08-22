## 2025-03-01 - [Missing Rate Limiting on LLM Endpoint]
**Vulnerability:** Missing rate limiting on the `/api/chat` route in `server.ts`.
**Learning:** The Express backend consumes a third-party GenAI API, which is susceptible to resource exhaustion or financial DoS if left open without rate controls.
**Prevention:** Implement endpoint-specific rate limiting (using Maps with periodic cleanup or Redis) for any endpoints interacting with expensive resources (APIs, LLMs, DB-heavy tasks).
## 2025-03-05 - Missing Security Headers and Message Input Validation
**Vulnerability:** Missing standard HTTP security headers (X-Frame-Options, X-Content-Type-Options, etc.) and missing input length validation on the `/api/chat` route.
**Learning:** In a fast-paced prototype or API-focused Express app, global security headers are often overlooked if a library like `helmet` isn't used by default. Similarly, endpoints forwarding data to external AI APIs can become DoS vectors if input bounds aren't explicitly enforced.
**Prevention:** Include a basic security headers middleware or a package like `helmet` as part of the standard server boilerplate, and always validate and bound the length of strings coming from user input before processing them.
