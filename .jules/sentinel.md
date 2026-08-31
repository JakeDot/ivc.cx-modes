## 2026-08-31 - [Rate Limiter IP Spoofing / DoS via Reverse Proxy]
**Vulnerability:** IP-based rate limiting was configured, but Express `req.ip` returned the reverse proxy's IP (Cloud Run) because `trust proxy` wasn't set.
**Learning:** Without `app.set('trust proxy', 1)`, Express considers the immediate upstream socket as the client. When behind a load balancer or ingress proxy, this means all legitimate users share a single IP and rate limit pool, easily causing an accidental DoS for valid users. Additionally, if an attacker can manipulate `X-Forwarded-For` without `trust proxy` explicitly dropping invalid proxies, they might bypass limits entirely.
**Prevention:** Always set `app.set('trust proxy', x)` (where x is the number of trusted hops) when deploying Express apps behind reverse proxies if you rely on IP addresses for security controls.

## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
