import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = process.cwd();
const sourceDir = join(rootDir, 'docs', 'browser');
const targetDir = join(rootDir, 'docs');

if (!existsSync(sourceDir)) {
  console.error(`GitHub Pages sync skipped: ${sourceDir} not found.`);
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, {
  recursive: true,
  force: true
});

console.log('Synced docs/browser to docs for GitHub Pages.');
