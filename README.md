# mayanhvietnam-new

Rebuild website **mayanhvietnam.com** — Monorepo gồm **N demo FE projects** độc lập + admin + API. Mỗi demo tự chạy trên port riêng, share design tokens + utils qua workspace packages.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Demo FE Projects | Next.js 16 (App Router, TypeScript) |
| Shared Packages | `@mayanhvietnam/{shared-utils,mock-data,tsconfig,scripts,eslint-config}` |
| Admin Tool | Next.js 15 (App Router, TypeScript) |
| Backend API | NestJS 11 (TypeScript) |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT |
| Monorepo | pnpm workspaces |

## Cấu Trúc Repo

```
mayanhvietnam-new/
├── apps/                              # Mỗi app = 1 Next.js project độc lập
│   ├── demo-01/                       # Website production mayanhvietnam.com
│   ├── demo-shell/                    # Gallery preview — auto-discover tất cả demos
│   ├── demo-02/, demo-03/, ...        # Demo FE từ Figma
│   ├── admin-next/                    # Admin dashboard
│   └── api/                           # Backend NestJS
│
├── packages/                          # Share code giữa tất cả apps
│   ├── shared-utils/                  # formatVND, slugify, formatPhone, ...
│   ├── mock-data/                     # Products, categories, stores, reviews
│   ├── tsconfig/                      # Shared base + nextjs tsconfig
│   ├── eslint-config/                 # Shared eslint rules
│   └── scripts/                       # Auto-generate root scripts
│
├── docs/
├── pnpm-workspace.yaml
└── package.json                       # Root scripts auto-generated
```

**Nguyên tắc: Mỗi demo = 1 folder trong `apps/`, không đụng chạm nhau.** Thêm demo mới chỉ cần copy folder + sửa port + chạy.

## Yêu Cầu

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0
- **PostgreSQL** >= 15

## Cài Đặt

```bash
# 1. Clone repo
git clone <repo-url>
cd mayanhvietnam-new

# 2. Cài dependencies (tất cả apps + packages)
pnpm install

# 3. Auto-generate root scripts (NÊN chạy sau khi thêm app mới)
node packages/scripts/generate-scripts.js

# 4. Copy & cấu hình environment
cp .env.example .env
# Chỉnh sửa .env với thông tin PostgreSQL local

# 5. Setup database
pnpm db:migrate    # Chạy migrations
pnpm db:seed       # Seed dữ liệu mẫu
```

## Chạy Local

```bash
# ============ CHẠY RIÊNG TỪNG DEMO ============
pnpm dev:demo-01            # Production website → http://localhost:8000
pnpm dev:demo-shell         # Gallery preview → http://localhost:8001
pnpm dev:demo-02            # Demo 02 → http://localhost:8002
pnpm dev:demo-03            # Demo 03 → http://localhost:8003
pnpm dev:demo-04            # ...
# ... tương tự đến dev:demo-10 (port 8010)

# ============ CHẠY TẤT CẢ CÙNG LÚC ============
pnpm dev:all                # Khởi động mọi app song song (mỗi app 1 port riêng)

# ============ ADMIN + API ============
pnpm dev:admin-next         # Admin → http://localhost:8001 (trùng demo-shell, đổi nếu cần)
pnpm dev:api                # API → http://localhost:4000
```

**Port mapping:**

| App | Port |
|-----|------|
| `demo-01` | 8000 |
| `demo-shell` | 8001 |
| `demo-02` | 8002 |
| `demo-03` | 8003 |
| `demo-04` | 8004 |
| `demo-05` | 8005 |
| `demo-06` | 8006 |
| `demo-07` | 8007 |
| `demo-08` | 8008 |
| `demo-09` | 8009 |
| `demo-10` | 8010 |

## Workflow: Thêm Demo Mới

**1. Scaffold folder mới:**
```bash
cp -r apps/demo-02 apps/demo-{NN}
```

**2. Sửa `apps/demo-{NN}/package.json`:**
```json
{
  "name": "demo-{NN}",
  "scripts": {
    "dev": "next dev -p 30{NN}"
  }
}
```

**3. Sửa nội dung:** thay `src/app/page.tsx` bằng design từ Figma.

**4. Regen scripts:**
```bash
node packages/scripts/generate-scripts.js
```

**5. Chạy:**
```bash
pnpm dev:demo-{NN}
```

Trang gallery ở `http://localhost:3001` sẽ **tự động pick up** demo mới — không cần update code.

## Shared Packages — Cách dùng

### `@mayanhvietnam/shared-utils`
```ts
import { formatVND, formatPhone, calcDiscountPercent, slugify } from '@mayanhvietnam/shared-utils';
```

### `@mayanhvietnam/mock-data`
```ts
import { allProducts, categories, stores } from '@mayanhvietnam/mock-data';
import type { ProductSummary } from '@mayanhvietnam/mock-data';
```

### `@mayanhvietnam/tsconfig`
```json
{
  "extends": "@mayanhvietnam/tsconfig/nextjs.json",
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### `@mayanhvietnam/eslint-config`
```js
// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
export default [...compat.extends('next/core-web-vitals')];
```

## Scripts

| Script | Mô tả |
|--------|-------|
| `pnpm dev:{app-name}` | Chạy individual app |
| `pnpm dev:all` | Chạy tất cả apps |
| `pnpm build:{app-name}` | Build individual app |
| `pnpm db:migrate` | Chạy Prisma migration |
| `pnpm db:seed` | Seed dữ liệu mẫu |
| `pnpm lint` | Lint tất cả packages |
| `pnpm format` | Format với Prettier |
| `node packages/scripts/generate-scripts.js` | Regen root scripts |

## Verification Checklist

Sau khi scaffold mới demo, kiểm tra:

- [ ] Demo folder có file: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`
- [ ] `package.json` có `name: "demo-{NN}"` unique
- [ ] `dev` script có `-p 30{NN}` đúng port
- [ ] `pnpm install` chạy không lỗi
- [ ] `pnpm dev:demo-{NN}` start OK
- [ ] Gallery `localhost:3001` hiển thị demo mới
- [ ] Demo mới link workspace packages OK: check `node_modules/@mayanhvietnam/`

## Branch Strategy

- `main` — Production, stable
- `staging` — Staging environment
- `dev` — Development, integration branch

## Documentation

- [DESIGN.md](DESIGN.md) — Design system reference
- [PRODUCT.md](PRODUCT.md) — Product specification
