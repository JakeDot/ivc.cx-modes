## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.
## 2025-03-10 - [Missing Trust Proxy Configuration for Rate Limiting]
**Vulnerability:** [The application did not configure `trust proxy` while running behind a reverse proxy (Cloud Run). This caused all requests to appear as coming from the proxy's IP, leading to shared rate limiting DoS where legitimate users are blocked, or attackers bypassing limits.]
**Learning:** [When deploying Express applications behind reverse proxies, `req.ip` defaults to the proxy's IP unless explicitly told to trust the proxy's headers (like `X-Forwarded-For`).]
**Prevention:** [Always configure `app.set('trust proxy', 1)` (or appropriate trust level) in Express applications deployed behind load balancers or reverse proxies when relying on IP-based security measures.]
