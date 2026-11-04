## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Content-Security-Policy (CSP)]
**Vulnerability:** [The application lacked a Content-Security-Policy header in the Express backend, leaving it vulnerable to XSS attacks.]
**Learning:** [Baseline security headers were partially implemented (like X-XSS-Protection), but a robust CSP was omitted, likely to avoid friction with external data sources like GitHub's API during development.]
**Prevention:** [Implement a robust baseline of security headers including CSP. Ensure that required external domains (like `https://api.github.com` and `https://avatars.githubusercontent.com`) are explicitly whitelisted in the `connect-src` and `img-src` directives rather than omitting the CSP entirely.]
