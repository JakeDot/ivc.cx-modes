## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-10-09 - [Missing Trust Proxy Configuration]
**Vulnerability:** The Express backend lacked `app.set('trust proxy', 1)` while running behind a reverse proxy.
**Learning:** Without trusting the proxy, `req.ip` falls back to the proxy's IP address. This causes all users to share the same IP for rate limiting, resulting in a shared rate-limiting Denial of Service (DoS) for the entire application.
**Prevention:** Always configure `trust proxy` settings in Express when deploying behind load balancers or reverse proxies (e.g., Cloud Run, Nginx) so client IPs are accurately resolved from the `X-Forwarded-For` header.
