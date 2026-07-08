#!/usr/bin/env node

/**
 * Auto-generate root package.json scripts from workspace apps.
 * 
 * Usage: node packages/scripts/generate-scripts.js
 * 
 * Reads all apps/ folders that have a "dev" script in their package.json,
 * then updates root package.json with:
 *   - dev:{name}: pnpm --filter {name} dev
 *   - build:{name}: pnpm --filter {name} build
 *   - dev:all: run all dev servers concurrently
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const appsDir = path.join(ROOT, 'apps');

// Get all app folders
const appDirs = fs.readdirSync(appsDir).filter(d => {
  const pkgPath = path.join(appsDir, d, 'package.json');
  if (!fs.existsSync(pkgPath)) return false;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  return pkg.scripts?.dev;
});

// Generate scripts
const scripts = {};

appDirs.forEach(dir => {
  const pkgPath = path.join(appsDir, dir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const name = pkg.name;
  
  // Add dev script
  scripts[`dev:${name}`] = `pnpm --filter ${name} dev`;
  
  // Add build script if build script exists
  if (pkg.scripts?.build) {
    scripts[`build:${name}`] = `pnpm --filter ${name} build`;
  }
});

// Generate dev:all (run all dev servers concurrently)
const devScripts = appDirs.map(dir => {
  const pkg = JSON.parse(fs.readFileSync(path.join(appsDir, dir, 'package.json'), 'utf8'));
  return `pnpm --filter ${pkg.name} dev`;
});

// Add utility scripts
scripts['dev:all'] = devScripts.join(' & ');
scripts['db:migrate'] = 'pnpm --filter api prisma:migrate';
scripts['db:seed'] = 'pnpm --filter api prisma:seed';
scripts['db:studio'] = 'pnpm --filter api prisma:studio';
scripts['lint'] = 'pnpm -r lint';
scripts['format'] = 'prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"';

// Read root package.json
const rootPkgPath = path.join(ROOT, 'package.json');
const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));

// Update scripts
rootPkg.scripts = scripts;

// Write back
fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');

console.log('✅ Generated scripts for:', appDirs.join(', '));
console.log('📝 Total scripts:', Object.keys(scripts).length);
