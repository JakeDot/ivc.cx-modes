## 2026-09-01 - [Express Trust Proxy Misconfiguration]
**Vulnerability:** [The application's rate limit was based on `req.ip`, but because the backend runs behind a reverse proxy (e.g., Cloud Run), `req.ip` always resolved to the proxy's IP. This meant a single global rate limit applied to all users, causing legitimate users to be blocked (Denial of Service).]
**Learning:** [When deploying Node/Express applications behind proxies, middleware that relies on IP addresses (like rate limiting) will fail unless Express is explicitly configured to trust the proxy headers (e.g., `X-Forwarded-For`).]
**Prevention:** [Always add `app.set('trust proxy', 1)` (or the appropriate proxy depth) when deploying Express apps behind reverse proxies.]
## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
