## Titans Club — Gym Website

A gym website with a working contact form, an admin dashboard for viewing enquiries, and a proper multi-page structure. Originally a static single-page template; now a small Node.js app so form submissions actually go somewhere.

{LIVE DEMO}(https://gymwebsite-pj548fyko-pranjal13.vercel.app/)

## Technologies Used

* Node.js + Express
* EJS templates
* HTML5 / CSS3 / vanilla JS (front end)
* A small JSON-file database for storing contact form entries (no external database needed)

### Site Features

* Multi-page site: Home, About, Services, Classes, Schedule, Pricing, Gallery, Contact — each with its own URL instead of one long scrolling page.
* A working contact form (validated, spam-protected with a honeypot field, rate-limited) that actually saves submissions.
* "Join Now" buttons on pricing plans link to the contact form with the plan pre-filled.
* A password-protected **admin dashboard** to view, search, mark read/unread, delete, and export (CSV) every contact form submission.
* Responsive design, including a mobile card layout for the admin entries table.
* `robots.txt` / `sitemap.xml` included, with `/admin` excluded from indexing.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example env file:

```bash
cp .env.example .env
```

Open `.env` and set:
- `SESSION_SECRET` — any long random string (the example file shows a one-line command to generate one).
- `ADMIN_USERNAME` — the username you'll use to log into `/admin`.

Then generate your admin password (this writes a bcrypt hash into `.env` — the real password is never stored in plain text):

```bash
npm run set-admin-password
```

You'll be prompted for a password (or pass one directly: `npm run set-admin-password -- "MyPassword123"`).

### 3. Run it

```bash
npm start
```

Visit `http://localhost:3000`. The admin dashboard is at `http://localhost:3000/admin` (there's also a small "ADMIN" link tucked in the footer's bottom corner).

For development with auto-restart on file changes:

```bash
npm run dev
```

---

## How Contact Entries Work

Submissions from the `/contact` page are validated on the server, checked against a hidden honeypot field to filter out basic bots, and saved to `data/entries.json`. That file is created automatically on first run and is git-ignored by default since it will contain real visitor contact details.

The admin dashboard (`/admin`) reads from that same file to show:
- Total enquiries, unread count, enquiries this week, and how many named a pricing plan
- A searchable, sortable table of every entry
- Mark as read/unread, delete, and a CSV export for importing into a spreadsheet

If you outgrow a single JSON file (very high traffic, multiple servers, etc.), swap `src/db.js` for a real database — every route calls through that one module, so nothing else needs to change.

---

## Project Structure

```
server.js                 Express app entry point
src/
  siteData.js              All editable site content (nav, plans, classes, schedule, contact info)
  db.js                    Reads/writes data/entries.json
  auth.js                  Admin credential verification
  middleware/requireAdmin.js
  routes/
    pages.js                Public marketing pages
    contact.js               Contact form + validation
    admin.js                 Login, dashboard, entry actions, CSV export
views/                     EJS templates (one per page, plus partials/ and admin/)
public/                   Static assets served as-is (css, js, images)
data/entries.json          Contact form submissions (created automatically)
scripts/set-password.js    CLI helper to (re)set the admin password
```

## Customization

Most day-to-day content changes — pricing plans, class list, weekly schedule, gym address/phone/social links — live in one place: `src/siteData.js`. Editing that file updates every page that uses it.

For visual changes:
- `public/css/style.css` — the original template styles (colors, layout, animations).
- `public/css/site-extra.css` — additions on top of it (page headers, footer, contact form states, 404 page).
- `public/css/admin.css` — admin login screen and dashboard only.

---

## Deployment Note

This is now a Node.js application, not a static site — it needs a host that can run `node server.js` continuously (e.g. Render, Railway, Fly.io, a VPS), rather than static hosting like GitHub Pages. Set the same environment variables from `.env` on whatever host you use, and make sure `data/` is on persistent storage (not wiped on each deploy) so entries aren't lost.

### Contributing

If you find any issues with the website or have suggestions for improvement, please feel free to submit a pull request or open an issue in this repository. Your contributions are welcome!

### License

This gym website is available under the [MIT License](LICENCE.md).
