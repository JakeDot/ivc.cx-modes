## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-09 - [Missing Trust Proxy Configuration Behind Reverse Proxy]
**Vulnerability:** [The Express application was missing the `trust proxy` setting while running behind a reverse proxy (Cloud Run). This caused `req.ip` to always return the proxy's IP, leading to a shared rate-limiting state where one user could DoS all other users or legitimate users could be falsely rate-limited.]
**Learning:** [When deploying Node/Express applications behind load balancers or API gateways, IP-based protections like rate limiting are ineffective or harmful unless the proxy is explicitly trusted to parse the `X-Forwarded-For` headers.]
**Prevention:** [Always configure `app.set('trust proxy', 1)` (or the appropriate proxy trust level) when setting up an Express server that utilizes IP-based rate limiting or logging behind a proxy.]
