# 🚀 Vercel Deployment Instructions

Your Titans Club Gym Website code has been pushed to GitHub at:
```
https://github.com/Pranjal-Agrawal1402/GYM-WEBSITE/tree/pranjal-agrawal1402-publish-gym-website
```

## Step 1: Import Project to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Select **"Import Git Repository"**
4. Enter: `https://github.com/Pranjal-Agrawal1402/GYM-WEBSITE`
5. Click **"Import"**

## Step 2: Configure Project

**Framework Preset:** Node.js  
**Root Directory:** `./` (default)

## Step 3: Add Environment Variables ⚠️ IMPORTANT

Before deploying, click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `SESSION_SECRET` | Generate a new long random value locally. |
| `ADMIN_USERNAME` | `admin` |
| `ADMIN_PASSWORD_HASH` | Generate a bcrypt hash locally with `npm run set-admin-password`. |
| `PORT` | `3000` |

## Step 4: Deploy!

Click **"Deploy"** button.

Your site will be live at:
```
https://gym-website.vercel.app
```
(or your custom domain if configured)

---

## ⚠️ Important: Data Persistence Issue

Vercel's serverless functions have ephemeral storage, meaning `data/entries.json` (contact form submissions) **WILL BE LOST** after 24-48 hours.

### Solution Options:

**Option A: Use Vercel's PostgreSQL (Recommended)**
1. In Vercel dashboard, go to **"Storage"** → **"Create Database"**
2. Select **"Postgres"**
3. Copy the connection string
4. Update `src/db.js` to use PostgreSQL instead of JSON
5. Redeploy

**Option B: Use a Third-Party Database**
- MongoDB Atlas (Free tier available)
- Firebase Realtime Database
- Supabase (PostgreSQL hosted)

**Option C: Deploy to Render Instead**
- Render has persistent storage by default
- See `DEPLOY_TO_RENDER.md` for instructions

---

## ✅ Next Steps

1. **Deploy** following steps 1-4 above
2. **Test** at your Vercel URL:
   - Visit homepage
   - Test contact form
   - Access admin at `/admin`
   - Log in with the configured admin username and password
3. **Fix data persistence** using one of the options above
4. **Configure custom domain** (optional, in Vercel settings)

---

Your website is now live! 🎉
