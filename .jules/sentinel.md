## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Trust Proxy for Rate Limiting Behind Reverse Proxy]
**Vulnerability:** [The Express application is deployed behind a reverse proxy (Cloud Run), but did not configure `trust proxy`. This causes the IP-based rate limiter to block all users based on the proxy's IP instead of the originating client IP, leading to a shared rate limiting Denial of Service.]
**Learning:** [Express uses the connection's remote IP address by default for `req.ip`, unless `app.set('trust proxy', 1)` is configured to parse `X-Forwarded-For` headers correctly.]
**Prevention:** [Always configure `trust proxy` in Express applications that rely on IP-based rate limiting and are deployed behind reverse proxies.]
