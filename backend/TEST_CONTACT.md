# Testing the Contact Endpoint

Use the following curl command to test the contact endpoint locally. This will POST the contact payload to the backend which will forward the message to the configured `ADMIN_EMAIL` (falls back to `tamanna.shar12@gmail.com` if not set).

Replace host/port if your server runs somewhere else.

```bash
curl -X POST http://localhost:4000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"tester@example.com","subject":"Hello from curl","message":"This is a test message"}'
```

Expected behavior:
- If SMTP env vars are configured (see `.env.example`) the message will be sent to `ADMIN_EMAIL`.
- If SMTP is not configured, the server will create an Ethereal test account and return a `previewUrl` in the JSON response you can open in the browser to view the message.

Troubleshooting:
- For Gmail, use an App Password (recommended) and ensure the account allows SMTP access.
- If you're behind a firewall or blocked port, try port 465 with `EMAIL_SECURE=true`.
