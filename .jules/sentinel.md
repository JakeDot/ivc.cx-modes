## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [IP Spoofing / Rate Limiting Bypass behind Proxy]
**Vulnerability:** [The Express application did not have app.set('trust proxy', 1) configured while running behind a reverse proxy (Cloud Run). This causes req.ip to incorrectly resolve to the proxy's IP instead of the actual client IP, which breaks IP-based rate limiting and potentially blocks all users if one user triggers the limit.]
**Learning:** [When implementing IP-based rate limiting on an application deployed behind a load balancer or reverse proxy, the originating client IP must be extracted from the X-Forwarded-For header, which Express handles via the trust proxy setting.]
**Prevention:** [Always configure app.set('trust proxy', 1) (or the specific proxy IP/subnet) when deploying Node.js/Express applications behind reverse proxies to ensure security middleware relying on client IPs works correctly.]
