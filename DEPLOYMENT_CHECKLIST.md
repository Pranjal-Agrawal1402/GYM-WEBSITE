# 📋 Deployment Checklist for Titans Club Gym Website

## Pre-Deployment Setup (Complete These First)

### Local Development
- [ ] Clone repository and run `npm install`
- [ ] Create `.env` file from `.env.example` (✅ Already created)
- [ ] Generate SESSION_SECRET using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Set admin password: `npm run set-admin-password`
- [ ] Test locally: `npm start` → Visit `http://localhost:3000`
- [ ] Verify admin login: Go to `http://localhost:3000/admin`
- [ ] Test contact form submission
- [ ] Verify contact appears in admin dashboard
- [ ] Check all pages load correctly (Home, About, Services, Classes, Schedule, Pricing, Gallery)

### Content Review
- [ ] Update gym name, address, phone in `src/siteData.js`
- [ ] Add social media links (Facebook, Instagram, Twitter)
- [ ] Update class names and times
- [ ] Verify pricing plans are correct
- [ ] Add team member info and gallery images
- [ ] Check footer links and copyright year

### Security Review
- [ ] Generate secure SESSION_SECRET (don't reuse dev value)
- [ ] Set a strong admin password (min 12 chars, mix of upper/lower/numbers/symbols)
- [ ] Verify rate limiting is enabled (10 login attempts per 15 min)
- [ ] Check honeypot field in contact form (`website` field)
- [ ] Verify HTTPS will be enforced (auto on Render/Railway/Fly.io)

---

## Choose Your Hosting Platform

### Option A: Render (Recommended - Easiest)
- [ ] Create Render account at render.com
- [ ] Follow **DEPLOY_TO_RENDER.md**
- [ ] Set all environment variables in Render dashboard
- [ ] Add Render Disk for persistent storage (`/app/data` → 1GB)
- [ ] Configure custom domain (if needed)
- [ ] Enable auto-deploy from GitHub main branch
- [ ] Test live site: Visit your Render URL
- [ ] Test admin login on live site
- [ ] Submit test contact form on live site

### Option B: Railway
- [ ] Create Railway account at railway.app
- [ ] Connect GitHub
- [ ] Set environment variables in Variables tab
- [ ] Add PostgreSQL or MongoDB for persistent storage (or use Railway Volumes)
- [ ] Deploy and test
- [ ] Configure custom domain (if needed)

### Option C: Fly.io
- [ ] Install Fly CLI
- [ ] Run `flyctl launch`
- [ ] Set secrets via `flyctl secrets set`
- [ ] Create volume for data persistence
- [ ] Deploy and test
- [ ] Configure custom domain

### Option D: VPS (DigitalOcean, Linode, AWS)
- [ ] Provision server (Ubuntu 22.04 LTS recommended)
- [ ] Install Node.js 18+
- [ ] Clone repository
- [ ] Set up `.env` with production values
- [ ] Install PM2 for process management
- [ ] Configure Nginx reverse proxy
- [ ] Set up SSL with Let's Encrypt
- [ ] Configure automatic backups for `data/` directory
- [ ] Set up monitoring/alerting

---

## After Deployment

### Verification
- [ ] Site loads on custom domain
- [ ] All pages accessible (home, about, services, etc.)
- [ ] Contact form works and saves submissions
- [ ] Admin dashboard accessible and working
- [ ] Admin can view, search, and export contact entries
- [ ] Mobile responsive layout works
- [ ] Images load correctly
- [ ] CSS and JavaScript load without errors
- [ ] No 404 errors in logs
- [ ] Performance acceptable (< 3s page load)

### Monitoring Setup
- [ ] Check logs daily first week, then weekly
- [ ] Monitor contact form submission rate
- [ ] Set up email notifications for errors (platform-specific)
- [ ] Test admin login rate limiting behavior

### SEO & Search
- [ ] Verify sitemap.xml exists at `/sitemap.xml`
- [ ] Verify robots.txt exists at `/robots.txt`
- [ ] Check `/robots.txt` excludes `/admin`
- [ ] Verify SEO meta tags in page headers
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

### Backups & Disaster Recovery
- [ ] Contact form data backed up regularly
- [ ] Test restore procedure
- [ ] Document backup location and recovery steps
- [ ] Set up automated backups if platform supports

---

## Ongoing Maintenance

### Weekly
- [ ] Review new contact form submissions in admin
- [ ] Check error logs for issues
- [ ] Verify site is still loading correctly

### Monthly
- [ ] Review admin dashboard for trends
- [ ] Update content if needed
- [ ] Test contact form submission (send yourself a test message)
- [ ] Verify admin login still works

### Quarterly
- [ ] Update dependencies: `npm update`
- [ ] Check Node.js for security updates
- [ ] Review and update content (classes, pricing, team info)
- [ ] Audit admin password (consider rotation)
- [ ] Test full backup/restore procedure

---

## Environment Variables (Reference)

These MUST be set on your production platform:

```
NODE_ENV=production
PORT=3000
SESSION_SECRET=[long random string]
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=[bcrypt hash - don't modify]
```

**Never commit `.env` to Git!** ⚠️

---

## Troubleshooting Guide

| Issue | Solution |
|-------|----------|
| Admin login fails | Verify ADMIN_PASSWORD_HASH is set in environment |
| Contact form doesn't save | Ensure persistent storage is configured |
| Site loads slowly | Check file size limits, database performance |
| 404 errors | Check nginx/proxy configuration for static file paths |
| HTTPS not working | Verify SSL cert generation (auto on cloud platforms) |
| Session keeps logging out | Increase SESSION_TIMEOUT or verify SESSION_SECRET |

---

## Support Resources

- **Main README:** README.md (general info)
- **Deployment Guide:** DEPLOYMENT.md (detailed instructions)
- **Render Quick Start:** DEPLOY_TO_RENDER.md (5-minute setup)
- **GitHub Issues:** Report bugs or request features
- **Contact Form:** Users can send messages through the site

---

## Sign-Off

- [ ] All items above completed
- [ ] Site tested and working in production
- [ ] Admin dashboard verified functional
- [ ] Backup/restore procedure documented
- [ ] Monitoring alerts configured
- [ ] Team trained on admin dashboard usage

**Site is ready for production! 🎉**

Last Updated: [Date of deployment]
Deployed By: [Your name/team]
Production URL: [Your site URL]
