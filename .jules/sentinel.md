## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2026-10-10 - [Missing Trust Proxy Configuration]
**Vulnerability:** The application is deployed behind a reverse proxy (Cloud Run) but does not configure Express to trust the proxy. This causes `req.ip` to resolve to the proxy's IP, leading to a shared rate-limiting DoS where one user's traffic can block all other users.
**Learning:** Express defaults to ignoring the `X-Forwarded-For` header for security reasons, so rate limiting middleware will use the immediate connecting IP (the proxy) unless explicitly configured otherwise.
**Prevention:** Always configure `app.set('trust proxy', 1)` (or appropriate trust levels) when deploying Express applications behind load balancers or reverse proxies that handle rate limiting by IP.
