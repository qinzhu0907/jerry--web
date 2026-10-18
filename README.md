# PlayPerks — 手游 CPS 折扣推广网站

A bilingual Chinese/English mobile-game offer directory, designed for Cloudflare Pages Functions + D1.

## What is included

- Responsive light UI, Chinese/English toggle, category filters and search
- Game detail dialog with summary, gameplay, offer terms and CPS link
- Admin login, add/edit/unpublish/delete game workflows
- Cloudflare Pages Functions API and D1 persistence
- Empty initial catalog: add only real games and valid offer links you control

## Important: this is a sub-project

These files live in `games-cps/` so the existing Jerry water-bottle / WeChat demo files at the repository root remain unchanged.

## Deploy with Cloudflare Pages

1. Open **Workers & Pages** in Cloudflare Dashboard. Select the Pages project connected to `qinzhu0907/jerry--web` (or create a separate Pages project connected to this repository if you do not want to change the existing project's current website).
2. In **Settings → Builds & deployments**, set **Root directory** to `games-cps`. Set the production branch to `main`. Leave the build command blank and set the build output directory to `.` (or `/ ` if the UI formats it that way). This is a plain static site plus Pages Functions, no npm build is needed.
3. Create a D1 database in Cloudflare Dashboard → **Storage & databases → D1 SQL database**, for example `playperks-db`.
4. Open that D1 database's console and run the SQL from `schema.sql` (this folder's file).
5. In the Pages project, open **Settings → Functions → D1 database bindings** and add a binding:
   - Variable name: `DB`
   - D1 database: your newly created `playperks-db`
6. In **Settings → Variables and Secrets**, add these as **Secrets**, not public vars:
   - `ADMIN_PASSWORD`: a unique password with at least 16 characters. Do not reuse your GitHub or email password.
   - `SESSION_SECRET`: a separate random secret, at least 32 characters. Generate it locally with a password manager or a trusted cryptographic generator. Never commit either secret to GitHub.
7. Save and trigger a new deployment. If this is an existing Pages project, changing its root directory changes what that project serves. To keep the existing water-bottle demo live, create a separate Pages project instead.
8. In **Custom domains**, attach the domain or a subdomain you want to use. If your domain is already attached to the old Pages project, do not remove or repoint it until you decide which site should be live there.

Cloudflare Git integration automatically builds and deploys changes pushed to the connected branch. Because the root directory is `games-cps`, commits to the new folder become this site's deployment source.

## Admin usage

1. Open the deployed site and choose **管理员登录 / Admin login**.
2. Enter the `ADMIN_PASSWORD` secret.
3. Fill in Chinese and English names and summaries, category, offer headline, and the actual CPS promotion URL. Add gameplay notes, terms and an optional HTTPS cover image URL if available.
4. Select **公开显示 / Publicly visible** to publish. Uncheck it to take the game off the public site without deleting its data.
5. Use **Edit** to update an existing listing or **Delete** to permanently remove it.

Changes are stored in D1 and appear without a site rebuild. Keep promotional claims accurate and explain relevant eligibility, expiry dates, region limits and purchase conditions. The public site includes a disclosure that some outbound links may be affiliate links.

## Security and limitations

- Admin sessions are signed using `SESSION_SECRET`, stored in an HttpOnly, SameSite=Strict cookie and expire after eight hours.
- Admin routes require the session cookie. Keep Cloudflare secrets private.
- This first version uses a single admin password, not multiple user accounts or role-based permissions. Use a long unique password and do not share it.
- D1 must be bound as `DB`; without it the API intentionally returns a configuration error.
- The site does not invent sample offers or CPS URLs. Add verified campaign data from your affiliate program.
- Test login, add/edit, unpublish/delete and outbound links in the Pages preview deployment before switching your main domain.
