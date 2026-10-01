## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [IP-based Rate Limiting Behind Reverse Proxy]
**Vulnerability:** [The application backend runs on Cloud Run behind a reverse proxy, but Express was not configured to trust the proxy. This causes `req.ip` to resolve to the proxy's IP, leading to a shared rate limit across all users, effectively creating a DoS condition.]
**Learning:** [When deploying an Express application behind a reverse proxy (like Cloud Run or a load balancer), IP-based rate limiting requires configuring Express to trust the proxy.]
**Prevention:** [Always add `app.set('trust proxy', 1);` when deploying behind a single reverse proxy to accurately resolve originating client IPs.]
