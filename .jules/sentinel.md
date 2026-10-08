## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-10-08 - Missing Trust Proxy Configuration
**Vulnerability:** The Express application was missing the `trust proxy` setting while being deployed behind a reverse proxy. This caused `req.ip` to incorrectly resolve to the proxy's IP address, leading to shared rate limiting across all users and enabling a DoS against legitimate users by exhausting the limit.
**Learning:** Express does not automatically trust `X-Forwarded-*` headers. Relying on `req.ip` without configuring `trust proxy` in a proxied environment results in incorrect IP resolution.
**Prevention:** Always configure `app.set('trust proxy', 1)` (or similar proxy trust level) when an application runs behind a reverse proxy to guarantee accurate client IP identification.
