## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [IP Spoofing / Collective Rate Limiting due to missing Trust Proxy]
**Vulnerability:** [The application used IP-based rate limiting on sensitive endpoints (`/api/chat`) but lacked `app.set('trust proxy', 1)`. Behind a reverse proxy (like Cloud Run), `req.ip` resolves to the proxy's IP. This allowed single malicious actors to spoof IPs, or inadvertently block all legitimate users who share the proxy's IP.]
**Learning:** [When deploying an Express application with rate limiting behind a reverse proxy, the proxy's configuration must be acknowledged by the application to correctly parse the `X-Forwarded-For` header for the true client IP.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` (or the appropriate trust level) when relying on client IP addresses for security controls like rate limiting or auditing.]
