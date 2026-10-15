## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Trust Proxy Configuration]
**Vulnerability:** [The application was not configured to trust the reverse proxy, which means `req.ip` would return the proxy's IP address instead of the originating client's IP. This could lead to a shared rate-limiting Denial of Service (DoS) where all clients are blocked when one client hits the limit.]
**Learning:** [When deploying an Express application with IP-based rate limiting behind a reverse proxy (like Cloud Run), it's crucial to explicitly configure the app to trust the proxy for correct IP resolution.]
**Prevention:** [Always add `app.set('trust proxy', 1);` (or the appropriate proxy setting) when implementing IP-based security measures behind reverse proxies.]
