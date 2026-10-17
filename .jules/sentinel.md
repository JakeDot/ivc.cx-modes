## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2026-10-17 - Missing Trust Proxy Configuration
**Vulnerability:** The application used IP-based rate limiting but lacked `app.set('trust proxy', 1)`. Behind a reverse proxy (like Cloud Run), `req.ip` defaults to the proxy's IP, causing all users to share the same rate limit bucket.
**Learning:** IP-based rate limiting implementations must be aware of their deployment environment. If behind a reverse proxy, failing to configure trust proxy leads to a shared rate limiting DoS for legitimate users.
**Prevention:** Always configure `app.set('trust proxy', 1)` in Express when deploying behind reverse proxies, especially when utilizing IP-based rate limiting or logging.
