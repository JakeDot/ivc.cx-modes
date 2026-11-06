## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Content-Security-Policy Header]
**Vulnerability:** [The application was missing a Content-Security-Policy (CSP) header, leaving it vulnerable to Cross-Site Scripting (XSS) and data injection attacks.]
**Learning:** [In a Vite development environment, CSP configurations must balance security with development needs (like HMR via websockets and inline scripts for hot-reloading), requiring specific whitelist adjustments for external domains used by the application.]
**Prevention:** [Always define a strict Content-Security-Policy header for web applications that explicitly lists authorized external sources and restricts script execution scopes.]
