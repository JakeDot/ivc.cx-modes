## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2026-09-06 - [Reverse Proxy Rate Limiting Bypass & Global DoS Risk]
**Vulnerability:** [The application sits behind a reverse proxy (e.g. Cloud Run), but Express did not trust proxies. Consequently, `req.ip` resolved to the proxy's IP address instead of the originating client. This caused the IP-based rate limiter to mistakenly track all traffic as coming from a single IP, risking a global denial-of-service (DoS) for all users once the limit was reached, or effectively bypassing rate limits entirely if the proxy IPs rotated.]
**Learning:** [When deploying an Express application in modern containerized environments or behind load balancers/CDNs, middleware that relies on client IPs (like rate limiters) requires explicit configuration to trust the proxy, otherwise they will fail open or fail globally.]
**Prevention:** [Always configure `app.set('trust proxy', 1);` (or the appropriate number of hops) when hosting Express applications behind known reverse proxies.]
