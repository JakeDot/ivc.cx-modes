## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - Missing Trust Proxy Configuration Behind Reverse Proxy
**Vulnerability:** IP-based rate limiting on `/api/chat` was using the proxy's IP address rather than the client's actual IP, leading to a potential shared rate limiting Denial of Service (DoS) for all users.
**Learning:** Express applications deployed behind reverse proxies (like Cloud Run) default to using the immediate socket address. `app.set('trust proxy', 1)` must be explicitly set to properly parse `X-Forwarded-For` headers.
**Prevention:** Always configure `trust proxy` correctly when utilizing IP-based security middleware (like rate limiting) behind a reverse proxy or load balancer.
