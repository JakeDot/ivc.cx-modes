## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - Missing Trust Proxy Configuration
**Vulnerability:** The Express server did not have `trust proxy` configured while running behind a reverse proxy, causing the IP-based rate limiter to use the proxy's IP for all requests.
**Learning:** When deploying Node.js apps behind a proxy (like Cloud Run), `req.ip` defaults to the immediate connection's IP. This breaks IP-based rate limiting and can lead to accidental DoS for all users.
**Prevention:** Always configure `app.set('trust proxy', 1)` (or appropriate trust level) when relying on client IPs for security controls like rate limiting in proxy environments.
