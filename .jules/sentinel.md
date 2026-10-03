## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2025-03-09 - [Missing Trust Proxy Configuration]
**Vulnerability:** [The Express application did not have `app.set('trust proxy', 1)` configured, which means `req.ip` would resolve to the reverse proxy's IP. This causes all users to share the same IP-based rate limit, leading to a denial of service (DoS) for legitimate users once the global rate limit is hit.]
**Learning:** [When deploying an Express application behind a reverse proxy (like Cloud Run or an API Gateway), IP-based rate limiting relies on `req.ip`, which requires `trust proxy` to parse the `X-Forwarded-For` header correctly.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` when deploying Express apps behind reverse proxies, or use a robust rate-limiting library that handles this automatically based on specific deployment environments.]
