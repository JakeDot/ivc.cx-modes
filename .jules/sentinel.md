## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Reverse Proxy Trust for Rate Limiting]
**Vulnerability:** [The Express backend did not configure `trust proxy`, causing `req.ip` to resolve to the reverse proxy's IP. This caused the rate limiter to pool all incoming requests under a single IP, leading to a shared Denial of Service.]
**Learning:** [When deploying an application behind a reverse proxy (like Cloud Run or an Ingress Controller), rate limiting and IP-based security middleware will fail or misbehave if the originating client IP isn't accurately resolved.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` or specify trusted proxy IPs when relying on `req.ip` for security controls.]
