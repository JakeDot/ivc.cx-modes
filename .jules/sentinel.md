## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2024-05-24 - [Rate Limiting IP Bypass Behind Proxy]
**Vulnerability:** IP-based rate limiting on the `/api/chat` endpoint could be bypassed or incorrectly applied because Express was not configured to trust the reverse proxy (Cloud Run).
**Learning:** Without `app.set('trust proxy', 1)`, Express uses the immediate socket's remote address, which is the proxy's IP, instead of the client's actual IP provided in the `X-Forwarded-For` header.
**Prevention:** Always set `app.set('trust proxy', 1)` (or appropriate trust level) when running Express applications with IP-dependent middleware behind a reverse proxy.
