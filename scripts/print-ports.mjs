#!/usr/bin/env node
/**
 * Print port mapping for all mayanhvietnam-new demo apps.
 * Usage: pnpm ports
 */
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const APPS_DIR = join(import.meta.dirname, '..', 'apps');

const entries = readdirSync(APPS_DIR)
  .filter(d => d.startsWith('demo-') || d === 'admin-next' || d === 'api')
  .sort((a, b) => {
    // demo-00..demo-10 then admin-next, api, demo-shell
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    if (!isNaN(numA)) return -1;
    if (!isNaN(numB)) return 1;
    return a.localeCompare(b);
  })
  // Skip folders without package.json (stale references)
  .filter(d => {
    try {
      readFileSync(join(APPS_DIR, d, 'package.json'), 'utf8');
      return true;
    } catch {
      return false;
    }
  });

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║              mayanhvietnam-new — Port Mapping                 ║');
console.log('╠════════════════╦═══════╦══════════════════════════════════════╣');
console.log('║ Demo           ║ Port  ║ Description                          ║');
console.log('╠════════════════╬═══════╬══════════════════════════════════════╣');

for (const dir of entries) {
  const pkgPath = join(APPS_DIR, dir, 'package.json');
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    const scripts = pkg.scripts?.dev || '';
    const portMatch = scripts.match(/-p\s+(\d+)|--port\s+(\d+)/);
    const port = portMatch ? (portMatch[1] || portMatch[2]) : '-';
    const desc = pkg.description || '(no description)';
    console.log(`║ ${dir.padEnd(14)} ║ ${port.padEnd(5)} ║ ${desc.padEnd(36).slice(0, 36)} ║`);
  } catch {
    console.log(`║ ${dir.padEnd(14)} ║ ${'?'.padEnd(5)} ║ ${(readFileSync(pkgPath, 'utf8').includes('"vite"') ? 'Vite' : 'unknown').padEnd(36)} ║`);
  }
}

console.log('╚════════════════╩═══════╩══════════════════════════════════════╝');
console.log('');
