# KTELScheduler GitHub App Connector — README

Περιγραφή
- Αυτός ο connector (server) χρησιμοποιεί GitHub App authentication για να αποκτήσει installation token και να κάνει commits (create/update αρχείων) στο repo kardspi-star/ktrel.

Βήματα γρήγορης ρύθμισης
1. Δημιουργία GitHub App
   - GitHub → Settings → Developer settings → GitHub Apps → New GitHub App.
   - Name: ktrel-bot (ή ό,τι θες).
   - Homepage URL / Webhook URL: όρισε προσωρινά (π.χ. https://example.com/).
   - Permissions: Repositories → Contents: Read & write ; Metadata: Read-only.
   - Events: δεν είναι απαραίτητο να συμπεριλάβεις events αν δεν χρειάζεσαι webhooks.
   - Public: false.
   - Create app → Install app → Install to owner kardspi-star → επιλέγεις repo `ktrel` μόνο.
   - Κατέβασε το Private Key (.pem). Σημείωσε το App ID και Installation ID.

2. Περιβάλλον (π.χ. Heroku / Vercel / VPS)
   - Δημιούργησε env vars:
     GH_APP_ID= (αριθμός App ID)
     GH_INSTALLATION_ID= (αριθμός Installation ID)
     GH_PRIVATE_KEY= (το PEM πλήρες περιεχόμενο — περιέχει \n)
     PORT=3000 (προαιρετικό)
   - Φύλαξε το private key σε secrets του host.

3. Εγκατάσταση & εκτέλεση
   - npm ci
   - npm start
   - Το server εκθέτει POST /commit που δέχεται JSON:
       { "path": "relative/path.txt", "content": "file content", "message": "commit message", "branch": "branch-name" }
   - Ο connector θα δημιουργήσει ή θα ενημερώσει το αρχείο στο repo.

Ασφάλεια
- Περιορίστε ποιος μπορεί να καλεί το endpoint (API key, IP allow list, ή internal network).
- Μην ανεβάζετε το private key στο repo.
- Περιορίστε εγκατάσταση της App μόνο στο repo `ktrel`.
