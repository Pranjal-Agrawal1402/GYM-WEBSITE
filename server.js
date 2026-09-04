const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const session = require('express-session');
const rateLimit = require('express-rate-limit');

const pagesRouter = require('./src/routes/pages');
const contactRouter = require('./src/routes/contact');
const adminRouter = require('./src/routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// If deployed behind a reverse proxy (Render, Railway, Heroku, Nginx, etc.)
// this makes req.ip and secure cookies behave correctly.
app.set('trust proxy', 1);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!process.env.SESSION_SECRET) {
  console.warn(
    '[server] SESSION_SECRET is not set in .env — using an insecure default. Set one before deploying.'
  );
}

app.use(
  session({
    name: 'titans.sid',
    secret: process.env.SESSION_SECRET || 'insecure-dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction, // requires HTTPS in production
      maxAge: 1000 * 60 * 60 * 8, // 8 hours
    },
  })
);

// ---- Rate limiting ----

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    req.session.flash = { type: 'error', message: 'Too many login attempts. Please try again later.' };
    res.redirect('/admin/login');
  },
});

app.use('/admin/login', loginLimiter);

// ---- Routes ----

app.use(pagesRouter);
app.use(contactRouter);
app.use(adminRouter);

// ---- 404 ----

app.use((req, res) => {
  const site = require('./src/siteData');
  res.status(404).render('404', { site });
});

// ---- Error handler ----

app.use((err, req, res, next) => {
  console.error('[server] Unhandled error:', err);
  if (req.path.startsWith('/contact') && req.method === 'POST') {
    return res.status(500).json({ success: false, errors: { form: 'Something went wrong. Please try again.' } });
  }
  res.status(500).send('Something went wrong on our end. Please try again shortly.');
});

app.listen(PORT, () => {
  console.log(`Titans Club server running at http://localhost:${PORT}`);
});
