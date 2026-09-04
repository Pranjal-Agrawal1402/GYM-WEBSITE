/**
 * Blocks access to admin routes unless the current session was created by a
 * successful login (see src/routes/admin.js). Anyone hitting an admin URL
 * without a session is sent to the login page and, once they do log in,
 * bounced back to the page they originally wanted.
 */
module.exports = function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  req.session.redirectAfterLogin = req.originalUrl;
  return res.redirect('/admin/login');
};
