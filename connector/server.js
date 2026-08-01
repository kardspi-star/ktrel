// server.js (Node.js connector for GitHub App)
// Requires: npm i express body-parser @octokit/auth-app @octokit/rest
const express = require('express');
const bodyParser = require('body-parser');
const { createAppAuth } = require('@octokit/auth-app');
const { Octokit } = require('@octokit/rest');

const APP_ID = process.env.GH_APP_ID; // number
const INSTALLATION_ID = process.env.GH_INSTALLATION_ID; // number
const PRIVATE_KEY = process.env.GH_PRIVATE_KEY; // PEM as multiline string
const OWNER = 'kardspi-star';
const REPO = 'ktrel';

if (!APP_ID || !INSTALLATION_ID || !PRIVATE_KEY) {
  console.error('Missing GH_APP_ID, GH_INSTALLATION_ID or GH_PRIVATE_KEY environment variables.');
  process.exit(1);
}

const auth = createAppAuth({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
  installationId: INSTALLATION_ID,
});

async function getInstallationOctokit() {
  const installationAuth = await auth({ type: 'installation' });
  return new Octokit({ auth: installationAuth.token });
}

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

// Simple healthcheck
app.get('/', (req, res) => res.send('ktrel connector running'));

// POST /commit
// body: { path, content, message, branch (optional) }
app.post('/commit', async (req, res) => {
  try {
    const { path, content, message = 'Automated commit from ktrel-bot', branch } = req.body;
    if (!path || typeof content === 'undefined') return res.status(400).json({ error: 'path and content required' });

    const octokit = await getInstallationOctokit();

    // Try to get existing file to obtain sha for update
    let sha;
    try {
      const getResp = await octokit.repos.getContent({
        owner: OWNER,
        repo: REPO,
        path,
        ref: branch,
      });
      // getResp.data may be an object (file) — sha present
      sha = getResp.data.sha;
    } catch (err) {
      if (err.status !== 404) throw err;
      sha = undefined;
    }

    const response = await octokit.repos.createOrUpdateFileContents({
      owner: OWNER,
      repo: REPO,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch,
    });

    return res.json({ ok: true, data: response.data });
  } catch (err) {
    console.error('commit error', err);
    return res.status(err.status || 500).json({ ok: false, message: err.message || String(err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ktrel connector listening on ${PORT}`));
