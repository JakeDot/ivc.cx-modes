## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2025-03-09 - [Reverse Proxy IP Resolution for Rate Limiting]
**Vulnerability:** [The application rate limiting mechanism was vulnerable to shared DoS because it was not configured to trust the reverse proxy. This caused all user requests to appear as coming from the proxy's IP, leading to global rate limits blocking legitimate users.]
**Learning:** [When deploying an Express application behind a reverse proxy (like Cloud Run), `req.ip` resolves to the proxy's IP unless `app.set('trust proxy', 1)` is explicitly configured.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` when deploying behind load balancers or reverse proxies to ensure correct IP resolution for rate limiting and accurate audit logging.]
