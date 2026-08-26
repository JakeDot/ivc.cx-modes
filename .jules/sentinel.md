## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2026-08-26 - [Weak Random Number Generation for Security Purposes]
**Vulnerability:** [The application used `Math.random()` to generate session IDs (`anonymousSessionId`) meant for cryptographic token isolation in an anonymous PRIVMSG tunnel.]
**Learning:** [While `Math.random()` is sufficient for non-critical random features, its use for any security, session generation, or token generation purposes is predictable and insecure. It is often mistakenly used because of its simplicity.]
**Prevention:** [Always use `window.crypto.randomUUID()` or `window.crypto.getRandomValues()` in the browser (or `crypto.randomBytes()` in Node.js) whenever generating IDs, tokens, or any value needing cryptographic randomness.]
