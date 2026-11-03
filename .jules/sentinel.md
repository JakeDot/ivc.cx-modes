## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2026-11-03 - Missing Content-Security-Policy Header
**Vulnerability:** The application lacked a Content-Security-Policy (CSP) header, which could allow execution of malicious scripts (XSS) or loading resources from untrusted external sources.
**Learning:** During initial development, standard Express security headers were added (like X-XSS-Protection), but CSP was omitted, likely due to complexity with Vite/React HMR and external assets.
**Prevention:** Always implement a robust baseline CSP header and explicitly whitelist necessary external domains (`api.github.com`, `avatars.githubusercontent.com`).
