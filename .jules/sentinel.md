## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Fix IP-based Rate Limiting Behind Proxy]
**Vulnerability:** The application is running behind a reverse proxy (Cloud Run) but was not configured to trust it. The rate limiting middleware was using the proxy's IP for all requests, making it trivial to trigger a global Denial of Service for all users.
**Learning:** Express requires `app.set('trust proxy', 1)` to correctly parse the `X-Forwarded-For` header and provide the actual client IP on `req.ip`.
**Prevention:** Always ensure `app.set('trust proxy', ...)` is correctly configured when deploying Node.js apps behind load balancers or proxies, especially when security controls depend on IP addresses.
