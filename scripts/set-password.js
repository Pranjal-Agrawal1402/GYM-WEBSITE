#!/usr/bin/env node
// Generates a bcrypt hash for a new admin password and writes it to .env as
// ADMIN_PASSWORD_HASH, so the real password never has to be stored in plain
// text. Usage:
//   npm run set-admin-password -- "MyNewPassword123"
// or, without an argument, you'll be prompted for one.

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const bcrypt = require('bcryptjs');

const ENV_PATH = path.join(__dirname, '..', '.env');
const ENV_EXAMPLE_PATH = path.join(__dirname, '..', '.env.example');

function readPasswordFromPrompt() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('New admin password (min 8 characters): ', (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function upsertEnvLine(contents, key, value) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  if (pattern.test(contents)) {
    return contents.replace(pattern, line);
  }
  const separator = contents.endsWith('\n') || contents.length === 0 ? '' : '\n';
  return `${contents}${separator}${line}\n`;
}

async function main() {
  const argPassword = process.argv[2];
  const password = argPassword || (await readPasswordFromPrompt());

  if (!password || password.length < 8) {
    console.error('\nPassword must be at least 8 characters. Nothing was changed.');
    process.exitCode = 1;
    return;
  }

  const hash = await bcrypt.hash(password, 12);

  let envContents = '';
  if (fs.existsSync(ENV_PATH)) {
    envContents = fs.readFileSync(ENV_PATH, 'utf8');
  } else if (fs.existsSync(ENV_EXAMPLE_PATH)) {
    envContents = fs.readFileSync(ENV_EXAMPLE_PATH, 'utf8');
  }

  envContents = upsertEnvLine(envContents, 'ADMIN_PASSWORD_HASH', hash);
  fs.writeFileSync(ENV_PATH, envContents, 'utf8');

  console.log('\nAdmin password updated. The hash was written to .env as ADMIN_PASSWORD_HASH.');
  console.log('Restart the server for the change to take effect.');
}

main();
