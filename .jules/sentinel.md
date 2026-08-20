## 2025-03-08 - Fix Missing Input Validation & Secure Error Messages
**Vulnerability:** The `/api/chat` endpoint lacked input validation for `req.body`, `model`, and `message`, making it susceptible to DoS attacks via type confusion (e.g., passing a number causing `.replace` to throw a `TypeError`). Additionally, the catch block returned raw `error.message` strings to the client.
**Learning:** Missing basic type checking on external input and returning detailed error strings can lead to application crashes and potential leakage of internal system details.
**Prevention:** Always validate the existence and types of expected input properties before operating on them, and consistently return sanitized, generic error messages for server faults.
