## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2024-10-24 - Shared Rate Limit DoS via Proxy Trust
**Vulnerability:** The Express app was deployed behind a reverse proxy without `app.set('trust proxy', 1)`, causing `req.ip` to resolve to the proxy's IP for all requests.
**Learning:** This misconfiguration makes IP-based rate limiting ineffective, as all users share the proxy's IP, leading to a global shared rate limit bucket (DoS).
**Prevention:** Always explicitly configure Express to trust the reverse proxy when deployed behind one (e.g., Cloud Run) to accurately resolve originating client IPs.
