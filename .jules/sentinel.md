## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [IP-Based Rate Limiting Bypass behind Reverse Proxy]
**Vulnerability:** [The application runs behind a reverse proxy (Cloud Run), but `express` wasn't configured to trust it. Thus, `req.ip` returned the proxy's IP for all requests. This meant all users shared the same rate limit bucket, which could cause a global DoS or allow actual attackers to easily bypass individual limits.]
**Learning:** [When deploying an Express app behind a reverse proxy or load balancer, IP-based mechanisms (like rate limiting, logging, or geolocation) require `app.set('trust proxy', 1)` to correctly parse the `X-Forwarded-For` headers.]
**Prevention:** [Always set `trust proxy` in Express when deploying to containerized or cloud environments that utilize a reverse proxy to ensure accurate client IP resolution.]
