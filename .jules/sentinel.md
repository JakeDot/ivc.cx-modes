## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2025-03-09 - IP-based Rate Limiting Bypass via Reverse Proxy
**Vulnerability:** Express IP-based rate limiting was easily bypassed because `req.ip` resolved to the IP address of the reverse proxy (Cloud Run) rather than the original client.
**Learning:** When deploying behind a load balancer or reverse proxy, Express defaults to using the connection IP (the proxy) rather than parsing the `X-Forwarded-For` headers. This makes IP rate limiting globally block all users or bypass individual limits.
**Prevention:** Always use `app.set('trust proxy', 1)` in Express when deploying behind a known reverse proxy, ensuring `req.ip` correctly reflects the original client IP.
