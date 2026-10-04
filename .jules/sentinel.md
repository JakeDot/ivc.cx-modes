## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2023-10-24 - Shared IP Rate Limiting DoS (Missing Trust Proxy)
**Vulnerability:** Express app didn't trust proxy headers, causing the rate limiter to use the reverse proxy's IP for all clients, leading to a shared rate limit bucket and global DoS.
**Learning:** Cloud Run and similar platforms run Express behind a reverse proxy. Without `app.set('trust proxy', 1)`, `req.ip` returns the proxy IP, effectively pooling all users into one rate limit bucket. This allows a single active user to block the entire application.
**Prevention:** Always configure `app.set('trust proxy', 1)` when deploying Express behind load balancers or reverse proxies to ensure IP-based security middleware functions correctly.
