## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2026-10-11 - [Missing Trust Proxy Configuration for Rate Limiting]
**Vulnerability:** [The Express application was running behind a reverse proxy (Cloud Run) without `app.set('trust proxy', 1)`. This caused all incoming requests to appear as originating from the proxy's IP address, leading to a shared rate limiting Denial of Service (DoS) where all legitimate users could be blocked if the aggregate request rate exceeded the limit.]
**Learning:** [When deploying Express apps behind reverse proxies, IP-based middleware (like the custom rate limiter using `req.ip`) will fail to accurately identify users unless the proxy is explicitly trusted to parse the `X-Forwarded-For` headers.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` or appropriate trust settings when deploying Express applications behind load balancers or reverse proxies to ensure accurate client IP resolution.]
