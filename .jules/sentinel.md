## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Trust Proxy Configuration]
**Vulnerability:** [The Express application was running behind a reverse proxy (Cloud Run) without `trust proxy` configured. This caused IP-based rate limiting to use the proxy's IP for all clients, leading to a shared rate-limiting Denial of Service (DoS) for all users.]
**Learning:** [When deploying an application behind a reverse proxy or load balancer, Express relies on the proxy to pass the original client IP. Without explicitly trusting the proxy, `req.ip` resolves to the proxy's address.]
**Prevention:** [Always set `app.set('trust proxy', 1);` (or appropriately depending on proxy layers) in Express applications when deployed in cloud environments to ensure correct IP resolution and reliable rate limiting.]
## 2025-03-09 - [Risky Trust Proxy and Missing CSP]
**Vulnerability:** [Blindly setting `trust proxy` in Express without knowing the exact deployment architecture allows attackers to easily spoof their IP using the `X-Forwarded-For` header. Additionally, the application lacked a Content-Security-Policy (CSP) header.]
**Learning:** [You cannot safely set `trust proxy` unless you are definitively behind a reverse proxy that guarantees it strips untrusted headers. For CSP, defense-in-depth requires explicit policies for resource loading.]
**Prevention:** [Never globally configure `trust proxy` without architectural verification. Always implement a baseline `Content-Security-Policy` header to mitigate XSS and data injection.]
