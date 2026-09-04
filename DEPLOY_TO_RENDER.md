# 🚀 Quick Deploy to Render (5 Minutes)

## Prerequisites
- GitHub account with this repo pushed
- Render account (free at render.com)

## Steps

### 1. Push code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Render Service
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect GitHub and select `Pranjal-Agrawal1402/GYM-WEBSITE`
4. Fill in:
   - **Name:** `titans-club-gym`
   - **Region:** Choose your region
   - **Branch:** `main`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### 3. Set Environment Variables
Before clicking Deploy, add these in the **Environment** section:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `SESSION_SECRET` | *Your random 64-char string from `.env`* |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD_HASH` | *Run `npm run set-admin-password` locally and copy the hash* |
| `PORT` | `3000` |

### 4. Deploy!
Click **Create Web Service** and wait ~2 minutes.

## ✅ Done!
Your site is now live at `https://titans-club-gym.onrender.com`

### Access Admin Dashboard
- URL: `https://titans-club-gym.onrender.com/admin`
- Username: `admin`
- Password: Whatever you set with `npm run set-admin-password`

## 🔐 Important Security Notes

⚠️ **DO NOT:**
- Commit `.env` file to Git
- Share your SESSION_SECRET or ADMIN_PASSWORD_HASH

✅ **DO:**
- Set environment variables only in Render's dashboard
- Use a strong admin password
- Monitor your logs for errors

## Updating After Deployment
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update site content"
   git push origin main
   ```
3. Render will auto-redeploy (takes ~2 minutes)

## Troubleshooting

**Contact form not saving?**
- Render free tier has ephemeral disk. Add a PostgreSQL database or use Render Disk.
- See DEPLOYMENT.md for details.

**Admin login not working?**
- Verify ADMIN_PASSWORD_HASH is set correctly in Environment Variables
- Restart the service: Dashboard → Service → **Restart**

**Site not loading?**
- Check logs: Dashboard → Service → **Logs** tab
- Look for error messages

**Custom domain?**
- Buy a domain from Namecheap, GoDaddy, or similar
- In Render, go to **Settings** → **Custom Domain**
- Follow the DNS setup instructions

---

Need more help? See the full **DEPLOYMENT.md** guide.
