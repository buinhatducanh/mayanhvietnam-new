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
  'demo-shell': {
    name: 'Demo Gallery',
    description: 'Trang index này — gallery preview 10 demos.',
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
export const demos: Demo[] = discoverAppDirs()
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
  // Filter bỏ demo-shell khỏi gallery (chính nó)
  .filter((d) => d.id !== 'demo-shell');
