## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2025-03-09 - [Content-Security-Policy Implementation]
**Vulnerability:** [The application lacked a Content-Security-Policy (CSP) header, which is a critical defense-in-depth mitigation against Cross-Site Scripting (XSS) and data injection attacks.]
**Learning:** [While some security headers (like X-Frame-Options) were present, CSP was omitted, likely due to the complexity of configuring it for dynamic React/Vite environments. This leaves the app vulnerable if an XSS flaw exists.]
**Prevention:** [Always include a baseline CSP header tailored to the application's needs, restricting `script-src`, `connect-src`, and `object-src`.]
