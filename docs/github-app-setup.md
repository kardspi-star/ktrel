# GitHub App setup for KTEL Scheduler (ktrel)

Αυτό το έγγραφο περιγράφει τα βήματα για να ρυθμίσετε το GitHub App και τον connector για το repository kardspi-star/ktrel.

1) Δημιουργία GitHub App
- GitHub → Settings → Developer settings → GitHub Apps → New GitHub App.
- Name: ktrel-bot
- Homepage URL: https://example.com/ (μπορεί να είναι placeholder)
- Webhook URL: https://example.com/webhook (αν δεν θα χρησιμοποιήσετε webhooks, μπορείτε να αφήσετε placeholder)
- Permissions (Only the necessary ones):
  - Repository contents: Read & write
  - Metadata: Read-only
- Events: none required
- Public: false
- Create app.
- Install app → Install to owner kardspi-star → select repository `ktrel` only.
- Download the private key and note the App ID and Installation ID.

2) Hosting the connector
- Επιλέξτε έναν host (Heroku, Vercel, fly.io, VPS).
- Ρυθμίστε τις ENV variables: GH_APP_ID, GH_INSTALLATION_ID, GH_PRIVATE_KEY, PORT
- Φυλάξτε το private key σε secrets of the host.

3) Usage
- Το connector προσφέρει ένα endpoint POST /commit που δέχεται JSON:
  { "path": "docs/hello.txt", "content": "Hello world", "message": "Add file", "branch": "main" }
- Example curl:
  curl -X POST https://your-connector.example.com/commit \
    -H "Content-Type: application/json" \
    -d '{"path":"docs/hello.txt","content":"Hello KTEL\n","message":"Add hello file from connector","branch":"main"}'

4) Security recommendations
- Protect the endpoint with an API key or IP allowlist.
- Limit the App installation to the repository `ktrel` only.
- Revoke the App or the installation if you detect misuse.
