## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Trust Proxy Configuration for Rate Limiter]
**Vulnerability:** [The application implemented IP-based rate limiting but failed to configure Express to trust the reverse proxy (e.g., Cloud Run). This causes all incoming traffic to appear as originating from the proxy's IP address.]
**Learning:** [Without `app.set('trust proxy', 1)`, `req.ip` returns the proxy's IP instead of the client's. A single malicious user could exhaust the rate limit for the proxy's IP, effectively causing a Denial of Service (DoS) for all legitimate users sharing that proxy connection.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` when deploying Express applications behind reverse proxies or load balancers, especially when relying on IP addresses for security controls like rate limiting or audit logging.]
