# Architecture — mayanhvietnam.com Rebuild

## Tổng Quan

Hệ thống gồm 3 ứng dụng chính chạy trong pnpm monorepo:

```
Browser / Googlebot
    │
    ▼
mayanhvietnam.com ── Next.js 15 (SSR/SSG)
    │                 Render UI / SEO / Tracking
    │                 KHÔNG SQL, KHÔNG business rule
    ▼
Backend API ──────── NestJS + Prisma
    │                 Product / Category / Search / SEO / Tracking / Lead
    │                 Auth / RBAC / CUD / Audit log / Import-export
    ▼
PostgreSQL ────────── Dữ liệu chuẩn hóa + Index + FTS


Nhân viên nội bộ
    │
    ▼
ad.mayanhvietnam.com ── Next.js 15 (Admin)
    │                     Quản trị SP / bài viết / KM / user
    │                     Chỉ gọi Admin API
    ▼
Backend Admin API ──── (cùng NestJS server, tách route /admin)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Website Public | Next.js 15 (App Router, Server Components) |
| Admin Tool | Next.js 15 (App Router) |
| Backend API | NestJS (TypeScript) |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT (access + refresh token) |
| Monorepo | pnpm workspaces |

## Ranh Giới Code

### web-public-next
- ✅ Render UI, SSR/SSG, gọi Public API, tracking FE
- ❌ Connect PostgreSQL, viết SQL, tính giá, quyết định tồn kho, chứa DB secret

### admin-next
- ✅ Render UI admin, gọi Admin API, form CUD, preview, validate nhẹ
- ❌ Connect PostgreSQL, bỏ qua RBAC, chứa rule nghiệp vụ, chứa secret

### api (NestJS)
- ✅ Connect PostgreSQL, query, validate nghiệp vụ, RBAC, transaction, cache, log
- ❌ Trả dữ liệu dư, nối chuỗi SQL, bỏ qua audit log
