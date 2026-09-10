## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - IP Resolution Behind Reverse Proxies
**Vulnerability:** Express IP-based rate limiting was using the reverse proxy's IP instead of the originating client's IP.
**Learning:** By default, `req.ip` in Express returns the IP of the reverse proxy (e.g., Cloud Run load balancer). If not configured, rate limits apply globally to all users behind the proxy, causing DoS to legitimate users when a single user hits the limit.
**Prevention:** Always set `app.set('trust proxy', 1);` when deploying behind a reverse proxy to accurately resolve and rate limit client IPs.
