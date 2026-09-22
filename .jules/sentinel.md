## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Fix IP resolution for rate limiting]
**Vulnerability:** [The rate limiting middleware used req.ip which resolves to the reverse proxy's IP instead of the client's IP, effectively rate limiting all users as one entity.]
**Learning:** [Express requires 'trust proxy' to be configured to parse the X-Forwarded-For headers when running behind a reverse proxy like Cloud Run.]
**Prevention:** [Always configure app.set('trust proxy', 1) when deploying an Express application behind a reverse proxy to ensure accurate IP resolution for security features like rate limiting.]
