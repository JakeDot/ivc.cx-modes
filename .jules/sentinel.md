## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-10 - [Express Rate Limiting IP Spoofing Risk]
**Vulnerability:** [The application used IP-based rate limiting but failed to configure `trust proxy`, meaning all requests from a reverse proxy like Cloud Run would appear to come from the same IP, potentially causing a self-DoS or allowing spoofed IPs to bypass limits.]
**Learning:** [When deploying an Express application behind a reverse proxy, `req.ip` will return the proxy's IP unless `trust proxy` is explicitly configured to trust the immediate upstream proxy.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` when deploying behind a load balancer or reverse proxy to ensure accurate client IP resolution for security middleware.]
