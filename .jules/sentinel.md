## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2025-10-24 - [Trust Proxy Configuration for IP-based Rate Limiting]
**Vulnerability:** [The application lacked `app.set('trust proxy', 1)`, causing `req.ip` to resolve to the reverse proxy's IP. This leads to a shared rate limiting DoS where one user can exhaust the limit for all legitimate users.]
**Learning:** [When running behind a reverse proxy like Cloud Run, Express does not automatically trust the `X-Forwarded-For` headers. Explicitly enabling proxy trust is required for correct IP resolution in rate limiting middleware.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` or pass a specific trusted subnet when an Express application is deployed behind a load balancer or reverse proxy.]
