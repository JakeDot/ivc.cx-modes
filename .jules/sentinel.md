## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [IP Spoofing and Rate Limit Bypass in Reverse Proxy]
**Vulnerability:** [The application used IP-based rate limiting but lacked `app.set('trust proxy', 1)`. Behind a reverse proxy (like Cloud Run), all requests appear to come from the proxy's IP, rendering the rate limiter ineffective and vulnerable to IP spoofing via X-Forwarded-For headers.]
**Learning:** [Express middleware requires explicit configuration to trust reverse proxies; without it, `req.ip` returns the proxy IP or can be easily spoofed if untrusted headers are processed manually.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` when deploying Express applications behind load balancers or reverse proxies if IP address resolution is required for security controls.]
