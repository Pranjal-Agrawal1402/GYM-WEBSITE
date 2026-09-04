const express = require('express');
const router = express.Router();
const site = require('../siteData');
const db = require('../db');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Loose phone check: 7-15 digits, optionally with spaces, dashes, or a leading +.
const PHONE_RE = /^\+?[\d\s-]{7,15}$/;

const PLAN_NAMES = new Set(site.plans.map((p) => p.name));

function validateSubmission(body) {
  const errors = {};
  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const mobile = (body.mobile || '').toString().trim();
  const message = (body.message || '').toString().trim();
  let plan = (body.plan || '').toString().trim();

  if (name.length < 2) errors.name = 'Please enter your full name.';
  if (name.length > 100) errors.name = 'Name is too long.';

  if (!email) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (mobile && !PHONE_RE.test(mobile)) {
    errors.mobile = 'Please enter a valid phone number.';
  }

  if (message.length < 10) {
    errors.message = 'Please add a short message (at least 10 characters).';
  } else if (message.length > 2000) {
    errors.message = 'Message is too long (max 2000 characters).';
  }

  if (plan && !PLAN_NAMES.has(plan)) {
    plan = ''; // ignore unrecognized plan values rather than rejecting the whole form
  }

  return { errors, clean: { name, email, mobile, message, plan: plan || null } };
}

router.get('/contact', (req, res) => {
  const requestedPlan = (req.query.plan || '').toString();
  const preselectedPlan = site.plans.find((p) => p.name === requestedPlan) || null;

  res.render('contact', {
    activeNav: '/contact',
    pageTitle: `Contact Us — ${site.gymName} ${site.gymNameAccent}`,
    metaDescription: 'Get in touch with Titans Club about memberships, training programs, or classes.',
    site,
    preselectedPlan,
  });
});

router.post('/contact', async (req, res) => {
  // Honeypot: a real visitor never fills this hidden field in; a bot filling
  // every input usually will. Pretend success so the bot doesn't adapt.
  if (req.body.website) {
    return res.json({ success: true });
  }

  const { errors, clean } = validateSubmission(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    await db.addEntry(clean);
    return res.json({ success: true });
  } catch (err) {
    console.error('[contact] Failed to save entry:', err);
    return res.status(500).json({
      success: false,
      errors: { form: 'Something went wrong on our end. Please try again in a moment.' },
    });
  }
});

module.exports = router;
