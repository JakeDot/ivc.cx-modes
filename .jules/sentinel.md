## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Content-Security-Policy (CSP) Header]
**Vulnerability:** [The application lacked a Content-Security-Policy, leaving it vulnerable to XSS and data injection attacks if input validation were ever bypassed.]
**Learning:** [When configuring CSP for modern frameworks like Vite, you must explicitly allow 'unsafe-inline'/'unsafe-eval' for scripts and styles, as well as ws: and wss: for HMR to avoid breaking the local development environment.]
**Prevention:** [Always implement a strict CSP by default, systematically whitelisting only the necessary external APIs (like GitHub) and CDNs required by the application.]
