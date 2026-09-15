## 2025-03-09 - [Missing Security Headers and Input Length Validation]
**Vulnerability:** [The application lacked basic security headers (CSP, X-Frame-Options) and the `/api/chat` endpoint did not enforce any length limits on the `message` input, opening it to DoS attacks.]
**Learning:** [These basic protections were likely missed during initial development when the focus was on core functionality and prototyping.]
**Prevention:** [Implement a robust baseline of security headers (like Helmet or manual injection) and enforce input size bounds directly at API boundaries.]
## 2025-02-28 - Restrict Express Middleware Defaults
**Vulnerability:** Overly permissive defaults on `express.json()` and `cors()` in Express setup.
**Learning:** By default, `express.json()` allows unlimited payload sizes, which can lead to DoS attacks via memory exhaustion. Similarly, `cors()` without options allows all origins, which can lead to unauthorized cross-origin requests.
**Prevention:** Always configure `express.json({ limit: '...' })` and define a strict `origin` array/function for `cors()`.

## 2024-03-24 - Rate Limiting IP Resolution Gap Behind Reverse Proxy
**Vulnerability:** The application was implementing IP-based rate limiting on sensitive API endpoints without trusting the reverse proxy. In a Cloud Run environment, this causes `req.ip` to resolve to the proxy's IP rather than the originating client's IP, effectively grouping all users under a single IP and leading to a self-inflicted Denial of Service (DoS) when the limit is reached.
**Learning:** When using Express middleware that relies on IP addresses (like rate limiting) behind a load balancer or reverse proxy, the `trust proxy` setting is critical for accurate IP resolution. Without it, the security mechanism inadvertently becomes an availability risk.
**Prevention:** Always verify the deployment environment architecture. If the application sits behind a proxy, explicitly set `app.set('trust proxy', 1)` in Express to ensure `req.ip` accurately reflects the client's IP address and rate limits are applied correctly per user.
