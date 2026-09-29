## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Shared Rate Limit DoS behind Reverse Proxy]
**Vulnerability:** The application is deployed behind a reverse proxy (Cloud Run), but Express was not configured to trust the proxy. This caused `req.ip` to incorrectly resolve to the proxy's IP, meaning the rate limiter shared limits across all users (DoS risk).
**Learning:** When using IP-based security mechanisms (like rate limiting) in Express behind a load balancer or reverse proxy, the proxy must be explicitly trusted to parse the `X-Forwarded-For` header correctly and securely.
**Prevention:** Always configure `app.set('trust proxy', 1)` (or appropriate trust level) when deploying Express applications behind a reverse proxy to ensure accurate client IP resolution.
