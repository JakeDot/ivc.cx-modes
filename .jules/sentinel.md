## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2023-09-23 - Rate Limiting Bypass via IP Spoofing
**Vulnerability:** The application was missing `app.set('trust proxy', 1)`, meaning `req.ip` returned the proxy's IP or could be trivially spoofed via `X-Forwarded-For` headers by malicious users, breaking the IP-based rate limiter.
**Learning:** When running an Express backend behind a reverse proxy (like Cloud Run), Express cannot securely resolve the true client IP without explicit trust proxy configuration.
**Prevention:** Always configure `app.set('trust proxy', 1)` in Express applications deployed behind a known reverse proxy before implementing IP-based rate limiting or logging.
