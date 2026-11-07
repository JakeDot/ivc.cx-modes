## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-05 - Missing Content-Security-Policy (CSP) Header
**Vulnerability:** The application was missing a Content-Security-Policy (CSP) header, which could allow unauthorized execution of scripts (XSS) and fetching of untrusted external resources.
**Learning:** The Express backend implemented foundational security headers like `X-XSS-Protection` and `X-Frame-Options`, but lacked a robust CSP. A CSP is a critical defense-in-depth mechanism against XSS and data injection attacks. The configuration needs to explicitly permit necessary Vite dev server features (`'unsafe-inline'`, `'unsafe-eval'`, `ws:`, `wss:`) and specific external domains (`api.github.com`, `avatars.githubusercontent.com`).
**Prevention:** Always implement a strict CSP from the start of a project, whitelisting only the necessary external resources and inline execution permissions required by the application and development environment.
