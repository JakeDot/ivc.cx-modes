## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Trust Proxy Configuration for Rate Limiting]
**Vulnerability:** [The application lacked `app.set('trust proxy', 1)` while using IP-based rate limiting behind a reverse proxy (Cloud Run). This causes all incoming requests to share the proxy's IP, leading to shared rate limits and potential Denial of Service (DoS) for all users.]
**Learning:** [When deploying an Express app behind a reverse proxy or load balancer, IP-based rate limiting or logging requires explicit configuration to trust the proxy, otherwise `req.ip` returns the proxy's IP.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` (or appropriate trust settings) when implementing IP-based middleware in environments utilizing reverse proxies.]
