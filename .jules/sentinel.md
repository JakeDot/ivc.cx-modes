## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - Fix reverse proxy IP spoofing and DoS
**Vulnerability:** The application is running behind a reverse proxy (Cloud Run) but was missing `app.set('trust proxy', 1)`. This caused Express to use the reverse proxy's IP for `req.ip` in rate limiting, which could lead to all traffic being blocked (DoS) or a malicious user bypassing rate limits.
**Learning:** Cloud Run and other serverless environments place apps behind reverse proxies, meaning `req.ip` will be incorrect unless Express is configured to trust the proxy headers (like `X-Forwarded-For`).
**Prevention:** Always set `app.set('trust proxy', 1)` when deploying Express apps to PaaS or Serverless platforms like Cloud Run.
