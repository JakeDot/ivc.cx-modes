## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-02-28 - Missing Trust Proxy Configuration
**Vulnerability:** IP-based rate limiting failed to distinguish users when deployed behind a reverse proxy (like Cloud Run). All requests shared the proxy's IP.
**Learning:** `req.ip` returns the proxy IP unless Express is explicitly configured to trust the proxy. This effectively disables per-user rate limiting and creates a global denial of service risk.
**Prevention:** Always configure `app.set('trust proxy', 1)` when deploying Express applications with IP-dependent security controls behind reverse proxies.
