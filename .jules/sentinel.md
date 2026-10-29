## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2024-10-29 - Fix Shared Rate Limiting DoS behind Reverse Proxy
**Vulnerability:** IP-based rate limiting failed to resolve originating client IPs because the application runs behind a reverse proxy (Cloud Run) without `trust proxy` configured. This resulted in all requests sharing the same rate limit bucket, enabling a trivial DoS against all users.
**Learning:** Express's `req.ip` defaults to the immediate upstream IP. In cloud environments with reverse proxies, this is the proxy's IP. Security mechanisms relying on IP must account for the proxy topology.
**Prevention:** Always explicitly set `app.set('trust proxy', 1)` (or the appropriate proxy depth) in Express applications deployed behind a reverse proxy when using IP-based rate limiting or logging.
