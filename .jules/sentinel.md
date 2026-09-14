## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Trust Proxy Configuration for Rate Limiting]
**Vulnerability:** [The application lacked `app.set('trust proxy', 1)`, causing the rate limiter to use the reverse proxy's IP instead of the client's IP, which could lead to a global DoS (blocking all users) or spoofing.]
**Learning:** [Express needs explicit configuration when running behind a reverse proxy (like Cloud Run) to correctly parse `X-Forwarded-For` headers and accurately resolve the originating IP address.]
**Prevention:** [Always configure `trust proxy` when deploying Express applications behind load balancers or reverse proxies to ensure security middleware like rate limiters function correctly.]
