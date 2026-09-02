## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2026-09-02 - Express Trust Proxy Misconfiguration
**Vulnerability:** The application is deployed behind a reverse proxy (Cloud Run), but `app.set('trust proxy', 1)` was missing. This caused the IP-based rate limiter to mistakenly attribute all incoming requests to the proxy's IP instead of the originating clients, creating a high risk of accidental, widespread Denial of Service (DoS).
**Learning:** When using IP-based security middleware in Express environments behind reverse proxies or load balancers, the proxy must be explicitly trusted for `req.ip` to reflect the true client.
**Prevention:** Always verify reverse proxy / load balancer architectures and configure `trust proxy` appropriately when implementing rate limiters or IP auditing logic.
