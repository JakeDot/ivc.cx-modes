## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2026-10-16 - [Missing Trust Proxy Configuration for Rate Limiting]
**Vulnerability:** [The application backend runs behind a reverse proxy (Cloud Run), but Express was not configured to trust the proxy. This causes all requests to appear as coming from the proxy's IP, leading to shared rate limiting and potential Denial of Service (DoS) for all users.]
**Learning:** [When deploying behind a reverse proxy, Express needs explicit configuration (`app.set('trust proxy', 1)`) to correctly parse the `X-Forwarded-For` header and resolve the actual client IP.]
**Prevention:** [Always configure `trust proxy` in Express applications that rely on client IPs (like rate limiting) and are deployed behind reverse proxies.]
