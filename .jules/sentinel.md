## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2026-10-20 - [Missing Trust Proxy Configuration]
**Vulnerability:** [The application lacked `app.set('trust proxy', 1)` while running behind a reverse proxy (Cloud Run). This caused `req.ip` to resolve to the proxy's IP, leading to shared rate limiting and potential DoS for all users.]
**Learning:** [Express.js requires explicit configuration to trust headers like X-Forwarded-For from proxies, otherwise IP-based security controls (like rate limiting) fail to operate correctly by grouping all users under one IP.]
**Prevention:** [Always ensure `app.set('trust proxy', 1)` (or similar proxy trust level) is configured when deploying Express applications behind load balancers or reverse proxies that rely on IP-based rate limiting.]
