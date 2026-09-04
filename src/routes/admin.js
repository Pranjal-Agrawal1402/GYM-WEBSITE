const express = require('express');
const router = express.Router();
const site = require('../siteData');
const db = require('../db');
const requireAdmin = require('../middleware/requireAdmin');
const { verifyAdminCredentials } = require('../auth');

function popFlash(req) {
  const flash = req.session.flash;
  delete req.session.flash;
  return flash || null;
}

function setFlash(req, type, message) {
  req.session.flash = { type, message };
}

// ---- Login ----

router.get('/admin/login', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin');
  }
  res.render('admin/login', {
    pageTitle: `Staff Login — ${site.gymName} ${site.gymNameAccent}`,
    site,
    flash: popFlash(req),
    layout: 'bare',
  });
});

router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const ok = await verifyAdminCredentials(username, password);

  if (!ok) {
    setFlash(req, 'error', 'Incorrect username or password.');
    return res.redirect('/admin/login');
  }

  req.session.regenerate((err) => {
    if (err) {
      console.error('[admin] session regenerate failed:', err);
      setFlash(req, 'error', 'Could not start a session. Please try again.');
      return res.redirect('/admin/login');
    }
    req.session.isAdmin = true;
    req.session.adminUsername = username;
    const redirectTo = req.session.redirectAfterLogin || '/admin';
    delete req.session.redirectAfterLogin;
    res.redirect(redirectTo);
  });
});

router.post('/admin/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

// ---- Dashboard ----

router.get('/admin', requireAdmin, (req, res) => {
  res.render('admin/dashboard', {
    pageTitle: `Admin Dashboard — ${site.gymName} ${site.gymNameAccent}`,
    site,
    entries: db.getAllEntries(),
    stats: db.getStats(),
    adminUsername: req.session.adminUsername,
    flash: popFlash(req),
    layout: 'bare',
  });
});

router.post('/admin/entries/:id/read', requireAdmin, async (req, res) => {
  const entry = await db.setRead(req.params.id, true);
  if (!entry) {
    setFlash(req, 'error', 'That entry no longer exists.');
  }
  res.redirect('/admin');
});

router.post('/admin/entries/:id/unread', requireAdmin, async (req, res) => {
  const entry = await db.setRead(req.params.id, false);
  if (!entry) {
    setFlash(req, 'error', 'That entry no longer exists.');
  }
  res.redirect('/admin');
});

router.post('/admin/entries/:id/delete', requireAdmin, async (req, res) => {
  const removed = await db.deleteEntry(req.params.id);
  setFlash(req, removed ? 'success' : 'error', removed ? 'Entry deleted.' : 'That entry no longer exists.');
  res.redirect('/admin');
});

// ---- CSV export ----

function csvEscape(value) {
  const str = String(value ?? '');
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

router.get('/admin/entries/export.csv', requireAdmin, (req, res) => {
  const entries = db.getAllEntries();
  const header = ['Name', 'Email', 'Mobile', 'Plan', 'Message', 'Submitted At', 'Read'];
  const rows = entries.map((e) =>
    [e.name, e.email, e.mobile, e.plan || '', e.message, e.submittedAt, e.read ? 'Yes' : 'No']
      .map(csvEscape)
      .join(',')
  );
  const csv = [header.join(','), ...rows].join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="enquiries-${Date.now()}.csv"`);
  res.send(csv);
});

module.exports = router;
