## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2024-03-24 - Helmet Implementation & Request Validation
**Vulnerability:** Express app missing comprehensive HTTP security headers and rigorous input validation on the `/api/chat` route.
**Learning:** Manual setting of basic headers (X-Content-Type-Options, etc) provides minimal coverage and is prone to errors/omissions. Utilizing an established library like `helmet` offers robust defense-in-depth against XSS, clickjacking, and content sniffing.  Additionally, relying solely on TypeScript types for request body validation leaves the application vulnerable to malformed payloads at runtime.
**Prevention:** Always integrate `helmet` as a foundational middleware for Express applications to ensure secure defaults.  Implement rigorous runtime validation for all user-supplied data in request payloads to prevent injection or application crashes.
