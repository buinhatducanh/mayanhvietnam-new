'use client'

import { useState } from 'react'
import { Aperture, Camera, CheckCircle2, Sparkles, XCircle, Zap } from 'lucide-react'
import { cameraBodies, lensOptions, type CameraBody, type LensOption } from '@/lib/products'

type Result = 'compatible' | 'crop' | 'incompatible'

function getResult(body: CameraBody, lens: LensOption): Result {
  if (body.mountType !== lens.mountType) return 'incompatible'
  if (body.sensor === 'Full-frame' && lens.coverage === 'APS-C') return 'crop'
  return 'compatible'
}

const resultConfig: Record<
  Result,
  { icon: typeof CheckCircle2; title: string; description: string; className: string }
> = {
  compatible: {
    icon: CheckCircle2,
    title: 'Tương thích hoàn hảo',
    description:
      'Ống kính và thân máy dùng chung ngàm, hoạt động đầy đủ tính năng lấy nét tự động và chống rung.',
    className: 'border-primary/50 bg-primary/10 text-primary',
  },
  crop: {
    icon: Zap,
    title: 'Tương thích (chế độ Crop)',
    description:
      'Ngàm khớp nhau nhưng ống kính APS-C trên thân máy Full-frame sẽ tự động kích hoạt chế độ crop, giảm độ phân giải hiệu dụng.',
    className: 'border-accent/50 bg-accent/10 text-accent',
  },
  incompatible: {
    icon: XCircle,
    title: 'Không tương thích',
    description:
      'Hai thiết bị dùng ngàm khác nhau và không thể lắp trực tiếp. Liên hệ hotline để được tư vấn ngàm chuyển (adapter) phù hợp.',
    className: 'border-destructive/50 bg-destructive/10 text-destructive',
  },
}

export function LensChecker() {
  const [bodyIndex, setBodyIndex] = useState<number | null>(null)
  const [lensIndex, setLensIndex] = useState<number | null>(null)

  const body = bodyIndex !== null ? cameraBodies[bodyIndex] : null
  const lens = lensIndex !== null ? lensOptions[lensIndex] : null
  const result = body && lens ? getResult(body, lens) : null
  const config = result ? resultConfig[result] : null

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      {/* Body selector */}
      <fieldset className="rounded-2xl border border-border bg-card p-6">
        <legend className="sr-only">Chọn thân máy</legend>
        <div className="mb-4 flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <Camera className="size-4 text-primary" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold">Bước 1: Chọn thân máy</p>
            <p className="text-xs text-muted-foreground">Camera body bạn đang sở hữu</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {cameraBodies.map((b, i) => (
            <button
              key={b.name}
              type="button"
              aria-pressed={bodyIndex === i}
              onClick={() => setBodyIndex(i)}
              className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition-all ${
                bodyIndex === i
                  ? 'brand-glow border-primary bg-primary/10 font-medium'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span>{b.name}</span>
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                {b.mountType} · {b.sensor}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Lens selector */}
      <fieldset className="rounded-2xl border border-border bg-card p-6">
        <legend className="sr-only">Chọn ống kính</legend>
        <div className="mb-4 flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <Aperture className="size-4 text-primary" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold">Bước 2: Chọn ống kính</p>
            <p className="text-xs text-muted-foreground">Lens bạn muốn kiểm tra</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {lensOptions.map((l, i) => (
            <button
              key={l.name}
              type="button"
              aria-pressed={lensIndex === i}
              onClick={() => setLensIndex(i)}
              className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition-all ${
                lensIndex === i
                  ? 'brand-glow border-primary bg-primary/10 font-medium'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span>{l.name}</span>
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                {l.mountType}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Result */}
      <div className="lg:col-span-2" aria-live="polite">
        {config && body && lens ? (
          <div
            key={`${body.name}-${lens.name}`}
            className={`animate-rise-in flex flex-col items-center gap-4 rounded-2xl border p-8 text-center sm:flex-row sm:text-left ${config.className}`}
          >
            <config.icon className="size-12 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-lg font-bold">{config.title}</p>
              <p className="mt-1 text-sm leading-relaxed opacity-90">{config.description}</p>
              <p className="mt-2 font-mono text-xs opacity-75">
                {body.name} ({body.mountType}) + {lens.name} ({lens.mountType})
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-10 text-center">
            <Sparkles className="size-8 text-primary" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              Chọn một thân máy và một ống kính để xem kết quả tương thích ngay lập tức.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
