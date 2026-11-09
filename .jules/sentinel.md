## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Content-Security-Policy Configuration with Vite HMR]
**Vulnerability:** Missing Content-Security-Policy (CSP) allowed potential cross-site scripting (XSS) and unrestricted data fetching.
**Learning:** When configuring CSP for Vite applications, the development server's Hot Module Replacement (HMR) requires `ws:` and `wss:` in `connect-src`. Additionally, these schemes must be unquoted to prevent browser parsing errors. External APIs (like `https://api.github.com`) and image sources (`https://avatars.githubusercontent.com`) must also be explicitly whitelisted.
**Prevention:** Always implement a strict CSP that explicitly whitelists only required external domains and explicitly handles the websocket connections needed for development tooling.
