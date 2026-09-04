const bcrypt = require('bcryptjs');

/**
 * Verify a submitted username/password against the configured admin
 * credentials. The password is stored as a bcrypt hash in the environment
 * (ADMIN_PASSWORD_HASH) so the real password is never kept in plain text
 * on disk. Use `npm run set-admin-password` to generate a new hash.
 *
 * The login route is also rate-limited (see server.js), which is the main
 * defense against brute-forcing here.
 */
async function verifyAdminCredentials(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedHash) {
    console.error(
      '[auth] ADMIN_PASSWORD_HASH is not set. Run "npm run set-admin-password" to create one.'
    );
    return false;
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return false;
  }

  const usernameMatches = username === expectedUsername;
  // Always run bcrypt.compare, even when the username already failed, so a
  // wrong username doesn't return noticeably faster than a wrong password.
  const passwordMatches = await bcrypt.compare(password, expectedHash);

  return usernameMatches && passwordMatches;
}

module.exports = { verifyAdminCredentials };
