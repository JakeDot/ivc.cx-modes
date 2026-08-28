## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2024-05-24 - Missing Input Validations and Rate Limit Bypass in /api/chat
**Vulnerability:** The `/api/chat` endpoint was missing validations for `message` presence/type, `history` array type, and was logging the full error object upon failure. The application was missing `app.set('trust proxy', 1);`, which meant the Express rate limiter didn't correctly use the client IP. HSTS header was missing.
**Learning:** We need to ensure that every property extracted from incoming JSON is strictly typed/validated before use. We must not log raw error objects because they can leak internal paths or secrets via stack traces. When using rate limiting middleware on Express running behind a proxy, `app.set('trust proxy', 1)` is required to track actual client IPs correctly instead of the proxy IP. Always implement HSTS in security headers.
**Prevention:**
- Always explicitly check for presence, type, and bounds on all fields in `req.body`.
- Use `.message` or a generic message in `console.error` rather than raw error objects.
- Ensure `trust proxy` is configured for any app employing IP-based rate limiting.
- Include Strict-Transport-Security in security headers by default.
