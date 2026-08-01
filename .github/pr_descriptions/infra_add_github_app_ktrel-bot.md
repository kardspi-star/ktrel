# Pull Request: infra: add GitHub App connector (ktrel-bot)

This PR adds a simple connector that uses a GitHub App to authenticate and create/update files in the repository. Files added in branch infra/add-github-app-2:

- github_app_manifest.yml
- connector/server.js
- connector/package.json
- connector/README.md
- docs/github-app-setup.md

Why
- Provide a least-privilege integration for external automation to perform committed edits to this repo.
- Includes README/docs for setup and security guidance.

Notes
- The connector requires a hosted service and the GitHub App private key (GH_PRIVATE_KEY), GH_APP_ID and GH_INSTALLATION_ID set as environment variables.
- I recommend reviewing the README and disabling public access to the connector endpoint.

Next steps
- Create the GitHub App (or use the manifest) and install it on the `ktrel` repo.
- Host the connector and secure the endpoint.
- Optionally, update the manifest URLs and webhook settings to your hosted connector.
