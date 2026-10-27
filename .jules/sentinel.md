## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - Shared IP Rate Limiting DoS (Missing Trust Proxy)
**Vulnerability:** IP-based rate limiting was using `req.ip`, which resolves to the reverse proxy's IP when running on Cloud Run, causing all users to share the same rate limit and enabling a single malicious user to block everyone.
**Learning:** Express does not trust `X-Forwarded-For` headers by default. When deployed behind a reverse proxy or load balancer, `trust proxy` must be explicitly configured.
**Prevention:** Always set `app.set('trust proxy', 1)` when implementing IP-based middleware in proxy environments.
