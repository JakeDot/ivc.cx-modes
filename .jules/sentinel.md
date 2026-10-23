## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2023-10-24 - [Trust Proxy Configuration for IP Resolution]
**Vulnerability:** [The application was deployed behind a reverse proxy (Cloud Run) without `app.set('trust proxy', 1)`. This caused `req.ip` to resolve to the proxy's IP rather than the originating client IP, leading to shared rate limiting and potential DoS for all users if one user hits the rate limit.]
**Learning:** [Express defaults to ignoring proxy headers for security reasons, so explicit configuration is required when deploying behind a trusted reverse proxy.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` (or the specific subnet of the proxy) in Express applications deployed behind a reverse proxy, especially when relying on IP-based rate limiting or logging.]
