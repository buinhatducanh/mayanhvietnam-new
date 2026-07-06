# mayanhvietnam-new

Rebuild website **mayanhvietnam.com** — Monorepo chứa website public, admin tool và backend API.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Website Public | Next.js 15 (App Router, TypeScript) |
| Admin Tool | Next.js 15 (App Router, TypeScript) |
| Backend API | NestJS 11 (TypeScript) |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT |
| Monorepo | pnpm workspaces |

## Cấu Trúc Repo

```
mayanhvietnam-new/
├── apps/
│   ├── web-public-next/   # Website public — mayanhvietnam.com (port 3000)
│   ├── admin-next/        # Admin tool — ad.mayanhvietnam.com (port 3001)
│   └── api/               # Backend API — Public + Admin API (port 4000)
├── db/
│   ├── migrations/        # SQL migration scripts (reference)
│   ├── seeds/             # Seed data
│   └── scripts/           # DB utility scripts
├── docs/                  # Documentation
├── pnpm-workspace.yaml
└── package.json
```

## Yêu Cầu

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0
- **PostgreSQL** >= 15

## Cài Đặt

```bash
# 1. Clone repo
git clone <repo-url>
cd mayanhvietnam-new

# 2. Cài dependencies
pnpm install

# 3. Copy & cấu hình environment
cp .env.example .env
# Chỉnh sửa .env với thông tin PostgreSQL local

# 4. Setup database
pnpm db:migrate    # Chạy migrations
pnpm db:seed       # Seed dữ liệu mẫu
```

## Chạy Local

```bash
# Chạy tất cả cùng lúc (mở 3 terminal)
pnpm dev:api       # API server → http://localhost:4000
pnpm dev:web       # Website public → http://localhost:3000
pnpm dev:admin     # Admin tool → http://localhost:3001
```

## Scripts

| Script | Mô tả |
|--------|-------|
| `pnpm dev:web` | Chạy website public (port 3000) |
| `pnpm dev:admin` | Chạy admin tool (port 3001) |
| `pnpm dev:api` | Chạy API server (port 4000) |
| `pnpm build:web` | Build website public |
| `pnpm build:admin` | Build admin tool |
| `pnpm build:api` | Build API server |
| `pnpm db:migrate` | Chạy Prisma migration |
| `pnpm db:seed` | Seed dữ liệu mẫu |
| `pnpm db:studio` | Mở Prisma Studio (GUI) |
| `pnpm lint` | Lint tất cả packages |

## Branch Strategy

- `main` — Production, stable
- `staging` — Staging environment
- `dev` — Development, integration branch

## Documentation

- [Architecture](docs/architecture.md)
- [API Contract](docs/api-contract.md) *(coming soon)*
- [DB Schema](docs/db-schema.md) *(coming soon)*
- [SEO Checklist](docs/seo-checklist.md) *(coming soon)*
