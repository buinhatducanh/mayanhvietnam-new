import Image from 'next/image'

interface Props {
  isNew?: boolean
  condition: string
}

export function ProductInfoBar({ isNew, condition }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {isNew && (
        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          MỚI 100%
        </span>
      )}
      <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        {condition === 'NEW' ? 'Hàng chính hãng' : 'Hàng đã qua sử dụng'}
      </span>
      <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
        <Image
          src="https://mayanhvietnam.com/asset/imgs/icon/logoBCT.png"
          alt="Đã thông báo Bộ Công Thương"
          width={14}
          height={14}
          className="object-contain"
        />
        Đã thông báo Bộ Công Thương
      </span>
    </div>
  )
}
