#!/usr/bin/env node

/**
 * Convert Figma Make (Vite + React Router) exports to Next.js 16 App Router.
 *
 * Usage:
 *   node packages/scripts/convert-figma-make.js <source-dir> <target-app> <port> [app-name]
 *
 * Example:
 *   node packages/scripts/convert-figma-make.js apps/demo-02-extracted apps/demo-02 8002 "Demo 02"
 */

const fs = require('fs');
const path = require('path');

const [,, sourceDir, targetApp, port, appName] = process.argv;

if (!sourceDir || !targetApp || !port) {
  console.error('Usage: convert-figma-make.js <source> <target> <port> [name]');
  process.exit(1);
}

const ROOT = path.resolve(__dirname, '../..');
const src = path.resolve(ROOT, sourceDir);
const dst = path.resolve(ROOT, targetApp);
const pName = appName || path.basename(targetApp);

// Ensure source exists
if (!fs.existsSync(src)) {
  console.error(`Source not found: ${src}`);
  process.exit(1);
}

console.log(`\n🔄 Converting: ${src} → ${dst} (port ${port})\n`);

// ── Step 1: Copy src/ directory (pages, components, data, context, styles, imports)
console.log('1. Copying src/...');
const srcDir = path.join(src, 'src');
if (fs.existsSync(srcDir)) {
  fs.cpSync(srcDir, path.join(dst, 'src'), { recursive: true });
  console.log('   ✅ src/ copied');
}

// Also copy public/ if exists (images from src/imports/ are used as static imports)
const publicDir = path.join(dst, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// Copy image files from src/imports/ to public/imports/
const importsDir = path.join(dst, 'src', 'imports');
if (fs.existsSync(importsDir)) {
  const files = fs.readdirSync(importsDir);
  for (const f of files) {
    if (f.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) {
      const destDir = path.join(publicDir, 'imports');
      if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(path.join(importsDir, f), path.join(destDir, f));
    }
  }
  console.log('   ✅ Images moved to public/imports/');
}

// ── Step 2: Create package.json (Next.js 16, no Vite)
console.log('2. Creating package.json...');
const pkgJson = {
  name: pName.toLowerCase().replace(/\s+/g, '-'),
  version: '0.1.0',
  private: true,
  description: `${pName} — mayanhvietnam.com FE demo`,
  scripts: {
    dev: `next dev -p ${port}`,
    build: 'next build',
    start: `next start -p ${port}`,
    lint: 'eslint'
  },
  dependencies: {
    "@mayanhvietnam/mock-data": "workspace:*",
    "@mayanhvietnam/shared-utils": "workspace:*",
    "clsx": "^2.1.1",
    "lucide-react": "^0.487.0",
    "next": "16.2.10",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwind-merge": "^3.6.0"
  },
  devDependencies: {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20.19.43",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.10",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
};

// Copy existing extra deps from source package.json (MUI, Radix, etc.)
const srcPkgPath = path.join(src, 'package.json');
if (fs.existsSync(srcPkgPath)) {
  const srcPkg = JSON.parse(fs.readFileSync(srcPkgPath, 'utf8'));
  // Add Radix/MUI/etc. as deps if present
  const extraDeps = ['@radix-ui', '@mui', 'emotion', 'motion', 'recharts', 'embla-carousel-react',
    'react-day-picker', 'react-hook-form', 'react-responsive-masonry', 'react-slick',
    'sonner', 'vaul', 'cmdk', 'date-fns', 'input-otp', 'react-resizable-panels',
    'class-variance-authority', 'tw-animate-css', 'canvas-confetti'];

  for (const [name, version] of Object.entries(srcPkg.dependencies || {})) {
    if (extraDeps.some(d => name.startsWith(d))) {
      pkgJson.dependencies[name] = version;
    }
  }
}

fs.writeFileSync(path.join(dst, 'package.json'), JSON.stringify(pkgJson, null, 2) + '\n');
console.log('   ✅ package.json created');

// ── Step 3: Create Next.js config files
console.log('3. Creating config files...');

fs.writeFileSync(path.join(dst, 'next.config.ts'), `import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Figma Make images, no CDN yet
  },
};

export default nextConfig;
`);
console.log('   ✅ next.config.ts');

fs.writeFileSync(path.join(dst, 'tsconfig.json'), `{
  "extends": "../../packages/tsconfig/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@mayanhvietnam/shared-utils": ["../../packages/shared-utils/src"],
      "@mayanhvietnam/mock-data": ["../../packages/mock-data/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`);
console.log('   ✅ tsconfig.json');

fs.writeFileSync(path.join(dst, 'postcss.config.mjs'), `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
`);
console.log('   ✅ postcss.config.mjs');

fs.writeFileSync(path.join(dst, 'eslint.config.mjs'), `import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });
const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];
export default eslintConfig;
`);
console.log('   ✅ eslint.config.mjs');

// ── Step 4: Create globals.css (merge tailwind.css + theme.css + fonts.css + index.css)
console.log('4. Creating globals.css...');
let globalsContent = `@import "tailwindcss";\n\n`;

const cssFiles = ['src/styles/theme.css', 'src/styles/fonts.css', 'src/styles/index.css', 'src/styles/globals.css', 'default_shadcn_theme.css'];
for (const cssF of cssFiles) {
  const cssPath = path.join(src, cssF);
  if (fs.existsSync(cssPath)) {
    const content = fs.readFileSync(cssPath, 'utf8').trim();
    if (content) {
      globalsContent += `/* ── From ${cssF} ── */\n${content}\n\n`;
    }
  }
}

// Add @source for Tailwind v4
globalsContent += `/* Tailwind v4 source scan */\n@source "../**/*.{ts,tsx}";\n`;

fs.writeFileSync(path.join(dst, 'src', 'app', 'globals.css'), globalsContent);
console.log('   ✅ globals.css (merged)');

// ── Step 5: Convert React Router routes → Next.js App Router pages
console.log('5. Converting routes to App Router...');

// Read routes.tsx to extract route mappings
const routesPath = path.join(dst, 'src', 'app', 'routes.tsx');
let routes = {};

if (fs.existsSync(routesPath)) {
  const routesContent = fs.readFileSync(routesPath, 'utf8');

  // Parse route patterns: { path: "X", Component: Y }
  const routeMatches = routesContent.matchAll(/\{\s*(?:index:\s*true|path:\s*["']([^"']*)["'])\s*,\s*Component:\s*(\w+)\s*\}/g);

  for (const m of routeMatches) {
    const routePath = m[1] || '/';
    const componentName = m[2];
    routes[routePath] = componentName;
  }

  // Remove routes.tsx (replaced by file-based routing)
  fs.unlinkSync(routesPath);
  console.log(`   Found ${Object.keys(routes).length} routes:`, Object.keys(routes));
}

// Move pages from src/app/pages/ → src/app/{route}/page.tsx
const pagesDir = path.join(dst, 'src', 'app', 'pages');
if (fs.existsSync(pagesDir)) {
  for (const [routePath, componentName] of Object.entries(routes)) {
    const pageFile = path.join(pagesDir, `${componentName}.tsx`);
    if (!fs.existsSync(pageFile)) {
      console.log(`   ⚠️  Missing: ${componentName}.tsx for route ${routePath}`);
      continue;
    }

    let content = fs.readFileSync(pageFile, 'utf8');

    // Fix relative imports: "../context/CartContext" → "@/app/context/CartContext"
    content = content.replace(/from ['"]\.\.\/context\/CartContext['"]/g, 'from "@/app/context/CartContext"');
    content = content.replace(/from ['"]\.\.\/context['"]/g, 'from "@/app/context"');
    content = content.replace(/from ['"]\.\.\/data['"]/g, 'from "@/app/data"');
    content = content.replace(/from ['"]\.\.\/components\/Layout['"]/g, 'from "@/app/components/Layout"');
    content = content.replace(/from ['"]\.\.\/components\/figma\/ImageWithFallback['"]/g, 'from "@/app/components/figma/ImageWithFallback"');

    // Create route directory
    let routeDir;
    if (routePath === '/') {
      routeDir = path.join(dst, 'src', 'app', '(home)');
      if (!fs.existsSync(routeDir)) fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'page.tsx'), content);
    } else if (routePath === '*') {
      // Wildcard → Next.js not-found.tsx
      fs.writeFileSync(path.join(dst, 'src', 'app', 'not-found.tsx'), content);
    } else {
      // Strip ':' and '*' for fs mkdir (Windows limitation)
      const safePath = routePath.replace(/[*:]/g, '');
      routeDir = path.join(dst, 'src', 'app', safePath);
      if (!fs.existsSync(routeDir)) fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'page.tsx'), content);
    }

    console.log(`   ✅ ${routePath} → ${componentName}.tsx`);
  }

  // Remove pages directory
  fs.rmSync(pagesDir, { recursive: true, force: true });
  console.log('   ✅ pages/ removed (moved to routes)');
}

// ── Step 6: Create layout.tsx (replaces Layout.tsx / Root.tsx)
console.log('6. Creating layout.tsx...');

// Find the Layout or Root component file
const layoutCandidates = [
  path.join(dst, 'src', 'app', 'components', 'Layout.tsx'),
  path.join(dst, 'src', 'app', 'layout', 'Root.tsx'),
];

let layoutComponent = '';
let layoutName = '';

for (const candidate of layoutCandidates) {
  if (fs.existsSync(candidate)) {
    layoutComponent = fs.readFileSync(candidate, 'utf8');
    layoutName = path.basename(candidate, '.tsx');

    // Extract the component content between export default function Layout() { ... }
    // and the closing }
    const bodyMatch = layoutComponent.match(/export default function \w+\(\)\s*\{([\s\S]*)/);

    if (bodyMatch) {
      // Keep imports that are needed, replace Link/Outlet/useNavigate
      let cleaned = layoutComponent
        .replace(/import\s*\{[^}]*Outlet[^}]*\}\s*from\s*["']react-router["'];?\n?/g, '')
        .replace(/import\s*\{[^}]*useNavigate[^}]*\}\s*from\s*["']react-router["'];?\n?/g, '')
        .replace(/import\s*\{[^}]*useLocation[^}]*\}\s*from\s*["']react-router["'];?\n?/g, '')
        .replace(/<Outlet\s*\/>/g, '{children}')
        .replace(/useNavigate\(\)/g, '{ push: (href: string) => { /* router.push(href) */ } }')
        .replace(/<Link\s+to="([^"]*)"/g, '<Link href="$1"')
        .replace(/<a\s+href="([^"]*)"/g, '<Link href="$1"')
        .replace(/navigate\(/g, '/* navigate */ console.log("navigate"); //');

      layoutComponent = cleaned;
    }

    break;
  }
}

const appDir = path.join(dst, 'src', 'app');
const layoutPath = path.join(appDir, 'layout.tsx');

fs.writeFileSync(layoutPath, `import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '${pName} — mayanhvietnam.com',
  description: '${pName} for mayanhvietnam.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
`);
console.log('   ✅ layout.tsx (minimal)');

// Move the full Layout as a client component
if (layoutName && layoutComponent) {
  // Add 'use client' at the top if not present
  if (!layoutComponent.startsWith("'use client'")) {
    layoutComponent = "'use client';\n\n" + layoutComponent;
  }

  // Fix react-router imports → next/link
  layoutComponent = layoutComponent
    .replace(/from\s*["']react-router["'];?\n?/g, '')
    .replace(/<Link\s+to="([^"]*)"/g, '<Link href="$1"')
    .replace(/<a\s+href="([^"]*)"/g, '<Link href="$1"');

  // Add next/link import if Link is used
  if (layoutComponent.includes('<Link')) {
    layoutComponent = `import Link from 'next/link';\n` + layoutComponent;
  }

  fs.writeFileSync(path.join(appDir, 'components', `${layoutName}Original.tsx`), layoutComponent);
  console.log(`   ✅ ${layoutName}Original.tsx (original layout preserved)`);
}

// ── Step 7: Fix all imports in components
console.log('7. Fixing imports...');
const fixImports = (dir) => {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      fixImports(fullPath);
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // Fix relative imports that now break
      content = content.replace(/from\s*["']\.\.\/context\/CartContext["'];?\n?/g,
        'import { useCart } from "@/app/context/CartContext";\n');
      content = content.replace(/from\s*["']\.\.\/context["'];?\n?/g,
        'import { useTheme } from "@/app/context";\n');
      content = content.replace(/from\s*["']\.\.\/data["'];?\n?/g,
        'import * as DATA from "@/app/data";\n');

      if (content !== original) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
};
fixImports(path.join(dst, 'src'));
console.log('   ✅ Imports fixed');

// ── Step 8: Create home page (index.tsx or layout wrapper)
console.log('8. Setting up home page...');
const homePage = path.join(appDir, '(home)', 'page.tsx');
if (!fs.existsSync(homePage)) {
  // Create minimal home
  fs.writeFileSync(homePage, `import Home from '@/app/pages/Home';

export default function HomePage() {
  return <Home />;
}
`);
  console.log('   ✅ Minimal home page created');
}

// ── Step 9: Clean up Vite files
console.log('9. Cleaning up Vite files...');
const viteFiles = ['vite.config.ts', 'index.html', 'pnpm-workspace.yaml'];
for (const f of viteFiles) {
  const fPath = path.join(dst, f);
  if (fs.existsSync(fPath)) {
    fs.unlinkSync(fPath);
    console.log(`   🗑️  ${f}`);
  }
}

// Also remove any nested pnpm-workspace
const nestedPnpm = path.join(dst, 'pnpm-workspace.yaml');
if (fs.existsSync(nestedPnpm)) fs.unlinkSync(nestedPnpm);

// ── Done
console.log(`\n✅ Conversion complete for ${pName}`);
console.log(`   Run: pnpm --filter ${pkgJson.name} dev\n`);
