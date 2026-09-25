## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2023-10-25 - Rate Limiting Bypass Behind Reverse Proxy
**Vulnerability:** Express `req.ip` always returned the proxy IP instead of the client IP because `trust proxy` was not configured. This caused all users to share the same rate limit bucket, leading to accidental DoS or rate limit evasion.
**Learning:** When deploying Express applications behind a reverse proxy (like Cloud Run), Express middleware cannot accurately resolve originating client IPs without explicit trust configuration.
**Prevention:** Always configure `app.set('trust proxy', 1)` when running behind a known proxy to securely resolve X-Forwarded-For headers.
