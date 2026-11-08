## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-10-25 - Missing Content-Security-Policy (CSP) Header
**Vulnerability:** The Express backend lacked a Content-Security-Policy (CSP) header, leaving the frontend susceptible to Cross-Site Scripting (XSS) and unauthorized data transmission.
**Learning:** For a Vite-based React application with an Express backend, CSP must be carefully configured to allow 'ws:'/'wss:' for Hot Module Replacement (HMR) and 'unsafe-inline'/'unsafe-eval' for development scripts, alongside explicit whitelisting of external APIs (e.g., https://api.github.com) and image sources (e.g., https://avatars.githubusercontent.com).
**Prevention:** Always implement a comprehensive CSP header in the backend middleware that balances strict security with the operational requirements of the frontend framework and external services.
