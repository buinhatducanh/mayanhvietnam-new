'use client'

import { useMemo, useState } from 'react'
import { Aperture, Camera, CheckCircle2, Info, XCircle } from 'lucide-react'
import { cameraBodies, lensOptions } from '@/lib/products'

type Result = 'compatible' | 'incompatible' | null

export function LensChecker() {
  const [bodyIndex, setBodyIndex] = useState<number | null>(null)
  const [lensIndex, setLensIndex] = useState<number | null>(null)
  const [snapping, setSnapping] = useState(false)
  const [result, setResult] = useState<Result>(null)

  const body = bodyIndex !== null ? cameraBodies[bodyIndex] : null
  const lens = lensIndex !== null ? lensOptions[lensIndex] : null

  const cropNote = useMemo(() => {
    if (!body || !lens || result !== 'compatible') return null
    if (body.sensor === 'APS-C' && lens.coverage === 'Full-frame') {
      return 'Ống kính full-frame gắn trên máy APS-C sẽ có hệ số crop khoảng 1.5x — tiêu cự hiệu dụng sẽ dài hơn.'
    }
    if (body.sensor === 'Full-frame' && lens.coverage === 'APS-C') {
      return 'Ống kính APS-C gắn trên máy full-frame sẽ kích hoạt chế độ crop, giảm độ phân giải sử dụng.'
    }
    return null
  }, [body, lens, result])

  const runCheck = () => {
    if (!body || !lens) return
    setResult(null)
    setSnapping(true)
    setTimeout(() => {
      setSnapping(false)
      setResult(body.mountType === lens.mountType ? 'compatible' : 'incompatible')
    }, 900)
  }

  const reset = () => {
    setResult(null)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      {/* Selectors */}
      <div className="flex flex-col gap-6">
        <fieldset>
          <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Camera className="size-4 text-primary" aria-hidden="true" />
            Bước 1 — Chọn thân máy
          </legend>
          <div className="flex flex-col gap-2">
            {cameraBodies.map((b, i) => (
              <button
                key={b.name}
                type="button"
                aria-pressed={bodyIndex === i}
                onClick={() => {
                  setBodyIndex(i)
                  reset()
                }}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                  bodyIndex === i
                    ? 'brand-glow border-primary bg-primary/10 font-semibold'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                }`}
              >
                {b.name}
                <span className="shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                  {b.mountType} · {b.sensor}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Aperture className="size-4 text-primary" aria-hidden="true" />
            Bước 2 — Chọn ống kính
          </legend>
          <div className="flex flex-col gap-2">
            {lensOptions.map((l, i) => (
              <button
                key={l.name}
                type="button"
                aria-pressed={lensIndex === i}
                onClick={() => {
                  setLensIndex(i)
                  reset()
                }}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                  lensIndex === i
                    ? 'brand-glow border-primary bg-primary/10 font-semibold'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50'
                }`}
              >
                {l.name}
                <span className="shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                  {l.mountType}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Visualizer */}
      <div className="flex flex-col items-center justify-center gap-8 rounded-3xl border border-border bg-card p-8 lg:sticky lg:top-32 lg:self-start">
        <div
          className="flex items-center justify-center"
          role="img"
          aria-label={
            body && lens
              ? `Mô phỏng lắp ${lens.name} vào ${body.name}`
              : 'Chọn thân máy và ống kính để mô phỏng'
          }
        >
          {/* Camera body block */}
          <div
            className={`relative z-10 flex h-36 w-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all duration-500 sm:h-44 sm:w-40 ${
              body ? 'border-primary/60 bg-secondary' : 'border-dashed border-border bg-secondary/40'
            }`}
          >
            <Camera
              className={`size-8 ${body ? 'text-primary' : 'text-muted-foreground'}`}
              aria-hidden="true"
            />
            <span className="max-w-full truncate px-2 text-center text-[11px] font-medium">
              {body ? body.name : 'Thân máy'}
            </span>
            {body && (
              <span className="font-mono text-[10px] uppercase text-primary">{body.mountType}</span>
            )}
            {/* Mount ring */}
            <span
              aria-hidden="true"
              className={`absolute -right-3 top-1/2 size-12 -translate-y-1/2 rounded-full border-4 transition-colors duration-500 ${
                result === 'compatible'
                  ? 'border-primary bg-primary/20 animate-pulse-ring'
                  : result === 'incompatible'
                    ? 'border-destructive bg-destructive/20'
                    : 'border-muted-foreground/40 bg-background'
              }`}
            />
          </div>

          {/* Lens block */}
          <div
            aria-hidden="true"
            className={`flex h-24 w-36 items-center gap-2 rounded-r-2xl border-2 pl-8 pr-3 transition-all duration-700 ease-out sm:h-28 sm:w-44 ${
              lens ? 'border-primary/60 bg-secondary' : 'border-dashed border-border bg-secondary/40'
            } ${
              snapping
                ? '-translate-x-1'
                : result === 'compatible'
                  ? 'translate-x-0'
                  : result === 'incompatible'
                    ? 'translate-x-6'
                    : 'translate-x-4'
            }`}
          >
            <Aperture
              className={`size-7 shrink-0 ${lens ? 'text-primary' : 'text-muted-foreground'}`}
            />
            <span className="flex flex-col overflow-hidden">
              <span className="truncate text-[11px] font-medium">
                {lens ? lens.name : 'Ống kính'}
              </span>
              {lens && (
                <span className="font-mono text-[10px] uppercase text-primary">
                  {lens.mountType} · {lens.focalRange}
                </span>
              )}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={runCheck}
          disabled={!body || !lens || snapping}
          className="brand-glow-strong w-full rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
        >
          {snapping ? 'Đang kiểm tra...' : 'Kiểm tra tương thích'}
        </button>

        {/* Result */}
        <div aria-live="polite" className="min-h-16 w-full">
          {result === 'compatible' && (
            <div className="animate-rise-in flex flex-col gap-3 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
                Tương thích hoàn toàn — ngàm {body?.mountType}
              </p>
              {cropNote && (
                <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
                  <Info className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  {cropNote}
                </p>
              )}
            </div>
          )}
          {result === 'incompatible' && (
            <div className="animate-rise-in flex flex-col gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-destructive">
                <XCircle className="size-5 shrink-0" aria-hidden="true" />
                Không tương thích
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {`Ngàm ${lens?.mountType} không thể gắn trực tiếp lên thân máy ngàm ${body?.mountType}. Liên hệ Mayanhvietnam để được tư vấn ngàm chuyển (adapter) phù hợp nếu có.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
