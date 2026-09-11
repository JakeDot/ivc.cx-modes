## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Trust Proxy Configuration for Rate Limiter]
**Vulnerability:** The application was deployed behind a reverse proxy (e.g. Cloud Run) without configuring `trust proxy` in Express. This caused `req.ip` to resolve to the proxy's IP address rather than the originating client's IP.
**Learning:** Because the rate limiter maps requests by IP, all users were bucketed under the same proxy IP. When traffic reached the limit (30 requests/min), a global Denial of Service (DoS) occurred, affecting all users simultaneously.
**Prevention:** Always configure `app.set('trust proxy', 1)` when deploying an Express app behind a reverse proxy (like Cloud Run, Nginx, or AWS ALB) to ensure IP-dependent middleware (like rate limiting) functions correctly and targets individual actors instead of the infrastructure.
