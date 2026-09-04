// Lightweight file-backed data store.
//
// The site is small (a single gym's contact enquiries), so a JSON file is
// simpler to inspect, back up, and deploy than standing up a full database
// server. Writes are synchronous and guarded by a queue so two requests
// arriving at nearly the same time can't corrupt the file.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'entries.json');

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function readAll() {
  ensureStore();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('[db] Failed to read entries.json, treating as empty:', err.message);
    return [];
  }
}

// Writes are chained onto this promise so concurrent calls serialize
// instead of racing to overwrite the same file.
let writeQueue = Promise.resolve();

function writeAll(entries) {
  writeQueue = writeQueue.then(
    () =>
      new Promise((resolve, reject) => {
        const tmpFile = `${DATA_FILE}.tmp`;
        fs.writeFile(tmpFile, JSON.stringify(entries, null, 2), 'utf8', (err) => {
          if (err) return reject(err);
          fs.rename(tmpFile, DATA_FILE, (renameErr) => {
            if (renameErr) return reject(renameErr);
            resolve();
          });
        });
      })
  );
  return writeQueue;
}

/**
 * Add a new enquiry entry. Returns the stored entry (with id/timestamps).
 */
async function addEntry({ name, email, mobile, message, plan }) {
  ensureStore();
  const entries = readAll();
  const entry = {
    id: crypto.randomUUID(),
    name,
    email,
    mobile: mobile || '',
    message,
    plan: plan || null,
    submittedAt: new Date().toISOString(),
    read: false,
  };
  entries.unshift(entry); // newest first
  await writeAll(entries);
  return entry;
}

function getAllEntries() {
  return readAll().sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
}

function getEntry(id) {
  return readAll().find((e) => e.id === id) || null;
}

async function setRead(id, read) {
  const entries = readAll();
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  entries[idx].read = read;
  await writeAll(entries);
  return entries[idx];
}

async function deleteEntry(id) {
  const entries = readAll();
  const next = entries.filter((e) => e.id !== id);
  const removed = next.length !== entries.length;
  if (removed) await writeAll(next);
  return removed;
}

function getStats() {
  const entries = readAll();
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return {
    total: entries.length,
    unread: entries.filter((e) => !e.read).length,
    thisWeek: entries.filter((e) => new Date(e.submittedAt) >= weekAgo).length,
    withPlanInterest: entries.filter((e) => !!e.plan).length,
  };
}

module.exports = {
  addEntry,
  getAllEntries,
  getEntry,
  setRead,
  deleteEntry,
  getStats,
};
