## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - IP Spoofing and Rate Limiting Bypass behind Reverse Proxies
**Vulnerability:** The application was vulnerable to rate limiting bypass and IP spoofing because Express did not trust the reverse proxy (Cloud Run). `req.ip` returned the proxy's IP instead of the client's.
**Learning:** When deploying Node.js/Express applications behind reverse proxies or load balancers, rate limiters that rely on `req.ip` will apply the limit to the proxy IP, effectively DoS'ing all users simultaneously or failing to rate-limit individual attackers.
**Prevention:** Always configure `app.set('trust proxy', 1)` (or appropriate trust level) in Express when deploying behind a known reverse proxy, to properly resolve the `X-Forwarded-For` header.
