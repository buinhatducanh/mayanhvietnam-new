/**
 * Demo registry — auto-discovered từ /apps folder.
 *
 * Không hardcode entries — mỗi lần thêm app mới trong /apps/, chỉ cần:
 * 1. Tạo folder mới với package.json có "scripts.dev" có dạng "-p 30XX"
 * 2. Trang gallery sẽ tự pick up
 */

import fs from 'node:fs';
import path from 'node:path';

const APPS_DIR = path.resolve(process.cwd(), '../../apps');

interface PortFromScript {
  port: number | null;
}

function parsePortFromDevScript(script: string): PortFromScript {
  // Match: "-p 3002", "--port 3002", "next dev -p 3002"
  const match = script.match(/(?:-p|--port)\s+(\d+)/);
  return { port: match ? parseInt(match[1], 10) : null };
}

function discoverAppDirs(): string[] {
  return fs
    .readdirSync(APPS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function readAppPkg(appDir: string): { name: string; description?: string; devScript?: string; port?: number } | null {
  const pkgPath = path.join(APPS_DIR, appDir, 'package.json');
  if (!fs.existsSync(pkgPath)) return null;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const devScript = pkg.scripts?.dev;
  const { port } = devScript ? parsePortFromDevScript(devScript) : { port: null };
  return {
    name: pkg.name,
    description: pkg.description,
    devScript,
    port: port ?? undefined,
  };
}

const APP_METADATA: Record<string, { name: string; description: string }> = {
  'web-public-next': {
    name: 'Web Public (Production)',
    description: 'Source FE gốc — 13 routes, header/footer/SEO chuẩn mayanhvietnam.com.',
  },
  'demo-0': {
    name: '🎬 3D Demo (LUMEN Camera)',
    description: 'Trải nghiệm Landing Page 3D tương tác — scroll-driven animation, đổi màu 3D model real-time, showcase Canon EOS R50 / Sony A7C II / Fujifilm X-T5.',
  },
  'demo-03': {
    name: '3D Demo (Canon R50)',
    description: 'Trải nghiệm Landing Page 3D và Cửa hàng 3D tương tác của Canon EOS R50.',
  },
  'demo-shell': {
    name: 'Demo Gallery',
    description: 'Trang index này — gallery preview 10 demos.',
  },
};

// External demos — nằm ngoài /apps/ nên không auto-discover
const EXTERNAL_DEMOS: Record<string, { name: string; description: string; port: number }> = {
  'insta360-clone': {
    name: '🎥 Insta360 Clone (Next.js)',
    description: 'Bản clone Insta360 Luna Ultra bằng Next.js — Hero, BentoGrid, FeatureShowcase, ColorProfiles, Specs, Accessories. Từ ai-website-cloner-template skill.',
    port: 3000,
  },
};

export interface Demo {
  id: string;
  name: string;
  description: string;
  url: string | null;
  port: number | null;
}

/**
 * Auto-discover all demo apps from /apps folder.
 * Apps có port = demo có thể launch được.
 */
export const demos: Demo[] = [
  // Apps trong /apps/ — auto-discovered
  ...discoverAppDirs()
    .map((dir) => {
      const pkg = readAppPkg(dir);
      if (!pkg) return null;

      const meta = APP_METADATA[dir];
      const port = pkg.port ?? null;

      return {
        id: dir,
        name: meta?.name ?? dir,
        description: meta?.description ?? pkg.description ?? '',
        url: port ? `http://localhost:${port}` : null,
        port,
      } satisfies Demo;
    })
    .filter((d): d is Demo => d !== null)
    .filter((d) => d.id !== 'demo-shell'),
  // External demos — nằm ngoài /apps/
  ...Object.entries(EXTERNAL_DEMOS).map(([id, meta]): Demo => ({
    id,
    name: meta.name,
    description: meta.description,
    url: `http://localhost:${meta.port}`,
    port: meta.port,
  })),
];
