Contact email setup
===================

This project uses an SMTP server to forward messages submitted via the frontend contact form to the configured admin email.

Required environment variables (set in your .env):

- EMAIL_HOST - SMTP host (e.g., smtp.gmail.com)
- EMAIL_PORT - SMTP port (e.g., 587)
- EMAIL_SECURE - "true" or "false"; true for port 465
- EMAIL_USER - SMTP username (optional for some transports)
- EMAIL_PASS - SMTP password (optional for some transports)
- ADMIN_EMAIL - the email address that should receive contact messages. If not set, the backend will default to `tamanna.shar12@gmail.com`.
- ADMIN_EMAIL - the email address that should receive contact messages. If not set, the backend will default to `tamanna.shar12@gmail.com`.
- SENDGRID_API_KEY - (optional) if provided the backend will use SendGrid's HTTP API to send messages. This is preferred for production.

Example .env lines:

```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your@mail.com
EMAIL_PASS=yourpassword
ADMIN_EMAIL=your@mail.com
```

Install new dependency and restart server:

```
cd backend
npm install
npm run dev
```

Note: For Gmail you may need an app password or configure OAuth2; direct SMTP with username/password may be blocked.
