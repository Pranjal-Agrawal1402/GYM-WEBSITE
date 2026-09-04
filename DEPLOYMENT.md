# 🏋️ Titans Club Gym Website — Deployment Guide

This document walks you through publishing the Titans Club gym website with the admin dashboard to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Node.js 18+ installed
- [ ] A hosting platform account (Render, Railway, Fly.io, or a VPS)
- [ ] Git access to this repository
- [ ] Admin username and password ready

---

## 🚀 Quick Start (Local Testing)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

A `.env` file has been created with a generated `SESSION_SECRET`. Now set the admin password:

```bash
npm run set-admin-password
```

You'll be prompted for a password. It will be hashed and stored in `.env`.

**Alternatively, set it directly:**

```bash
npm run set-admin-password -- "YourSecurePassword123"
```

### 3. Start the Server

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

- **Public site:** All pages (Home, About, Services, Classes, Schedule, Pricing, Gallery, Contact)
- **Admin dashboard:** `http://localhost:3000/admin`
  - Username: `admin` (or whatever you set in `.env`)
  - Password: The password you just set

---

## 🌐 Deployment to Production

### Option 1: **Render** (Recommended for Node.js)

#### Step 1: Push to GitHub

Ensure all changes are committed and pushed to your repository:

```bash
git add .
git commit -m "Initial publish with admin dashboard"
git push origin main
```

#### Step 2: Connect to Render

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account and select this repository
4. Configure:
   - **Name:** `titans-club-gym`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Region:** Choose closest to your users

#### Step 3: Set Environment Variables

In the Render dashboard, go to the service's **"Environment"** tab and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `SESSION_SECRET` | *(copy from your local `.env`)* |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD_HASH` | *(copy from your local `.env` after running `npm run set-admin-password`)* |
| `PORT` | `3000` |

⚠️ **IMPORTANT:** Never commit `.env` to Git. Only copy values to your hosting platform's environment settings.

#### Step 4: Deploy

Click **"Deploy"** on Render. Your site will be live at `https://titans-club-gym.onrender.com` (or your custom domain).

---

### Option 2: **Railway**

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select this repository
4. In the **"Variables"** tab, add all environment variables (same as Render, above)
5. Railway will auto-detect `package.json` and start the server
6. Connect a custom domain in **"Domains"**

---

### Option 3: **Fly.io**

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Run: `flyctl launch` and follow the prompts
3. Set environment variables:
   ```bash
   flyctl secrets set NODE_ENV=production SESSION_SECRET=your-secret ADMIN_USERNAME=admin ADMIN_PASSWORD_HASH=your-hash
   ```
4. Deploy: `flyctl deploy`

---

### Option 4: **Traditional VPS** (DigitalOcean, Linode, AWS EC2, etc.)

#### Setup

1. SSH into your server
2. Install Node.js 18+:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. Clone the repository:
   ```bash
   cd /var/www
   git clone https://github.com/Pranjal-Agrawal1402/GYM-WEBSITE.git
   cd GYM-WEBSITE
   npm install
   ```

#### Configure Environment

Create `/var/www/GYM-WEBSITE/.env`:

```bash
sudo nano .env
```

Add all environment variables (same as above).

#### Run with PM2 (Process Manager)

```bash
sudo npm install -g pm2
pm2 start server.js --name "titans-club"
pm2 startup
pm2 save
```

#### Reverse Proxy (Nginx)

Create `/etc/nginx/sites-available/titans-club`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/titans-club /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 📦 Data Persistence

Contact form submissions are stored in `data/entries.json`. 

**Important for production:**

- If using **Render/Railway/Fly.io:** These platforms may not have persistent storage by default. Add a persistent volume:
  - **Render:** Add a **"Disk"** in the dashboard pointing to `/app/data`
  - **Railway:** Add a **"Volume"** mounted to `/app/data`
  - **Fly.io:** Add a volume with `flyctl volumes create data --size 1`

- If using a **VPS:** Ensure `data/` is on persistent storage (part of your main filesystem)

---

## 🔐 Security Best Practices

1. **Session Secret:** Generate a strong, unique secret for each deployment:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Admin Password:** Use a strong password and regenerate:
   ```bash
   npm run set-admin-password
   ```

3. **HTTPS:** Always use HTTPS in production. Enable automatic redirects (Render/Railway/Fly.io do this; for VPS, use Let's Encrypt).

4. **Environment Variables:** Never commit `.env`. Set them via your hosting platform's dashboard.

5. **Contact Form:** Already includes:
   - Rate limiting (10 attempts per 15 minutes per IP)
   - Honeypot field (catches basic bots)
   - Server-side validation
   - CSRF protection via session

6. **Admin Dashboard:** 
   - Login rate-limited to 10 attempts per 15 minutes
   - Sessions expire after 8 hours
   - Cookies are `httpOnly` and `secure` (HTTPS only in production)

---

## 🛠️ Troubleshooting

### Admin login not working?

**Error:** "ADMIN_PASSWORD_HASH is not set"

**Fix:** Run locally first:
```bash
npm run set-admin-password -- "YourPassword"
```
Copy the `ADMIN_PASSWORD_HASH` value from `.env` to your production environment variables.

---

### Contact form not saving submissions?

**Error:** `data/entries.json` not found or not writable

**Fix:** 
- For **cloud platforms:** Ensure you've added persistent storage/volumes (see "Data Persistence" above)
- For **VPS:** Check file permissions: `chmod 755 /var/www/GYM-WEBSITE/data`

---

### "Too many login attempts" error?

**Why:** Rate limiting is working. Wait 15 minutes or contact support.

---

### Custom domain not working?

**Steps:**
1. Update your domain's DNS to point to your hosting platform's IP/nameservers
2. Configure the domain in your hosting dashboard (Render/Railway/Fly.io)
3. Wait 5–30 minutes for DNS propagation

---

## 📊 Monitoring & Logs

### Render
- View logs: Dashboard → Service → **"Logs"** tab

### Railway
- View logs: Dashboard → Project → **"Logs"** tab

### VPS (with PM2)
```bash
pm2 logs titans-club
pm2 monit
```

### Nginx logs (VPS)
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 📞 Support & Customization

### Change Site Content

Edit `src/siteData.js` to update:
- Gym name, address, phone, social links
- Pricing plans
- Classes and schedules
- About section content

Then commit and redeploy.

### Add More Pages

1. Create a new `.ejs` template in `views/`
2. Add a route in `src/routes/pages.js`
3. Add nav link in `src/siteData.js`
4. Commit and redeploy

### Migrate to a Real Database

Currently, `src/db.js` uses a JSON file. To use PostgreSQL, MongoDB, etc., update the `db.js` module — no other code needs to change.

---

## ✅ You're Live!

Congratulations! Your Titans Club website is now published with:

✨ Multi-page responsive site  
✨ Working contact form with spam protection  
✨ Admin dashboard to manage submissions  
✨ Secure login with rate limiting  
✨ SEO-friendly (robots.txt, sitemap.xml)  

For questions or issues, check the main **README.md** or open an issue on GitHub.

Happy training! 💪
