## 2026-09-05 - Missing Trust Proxy Configuration Behind Reverse Proxy
**Vulnerability:** The application was deployed behind a reverse proxy (Cloud Run) but lacked `app.set('trust proxy', 1)`. This caused Express to identify the proxy's IP as the originating client IP for all requests. As a result, the IP-based rate limiting was ineffective (all users shared the same rate limit) and could easily be abused, leading to a global Denial of Service (DoS) where a single attacker could exhaust the quota for the entire user base.
**Learning:** IP-based security mechanisms (like rate limiting, auditing, or fraud detection) in Express are fundamentally broken behind reverse proxies unless `trust proxy` is explicitly configured. Without it, the application only sees the proxy's internal IP.
**Prevention:** Always ensure `app.set('trust proxy', 1)` (or a specific list of trusted proxy IPs/subnets) is configured when deploying Express applications behind load balancers, CDNs, or reverse proxies like Cloud Run, Nginx, or AWS ALB.

## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
