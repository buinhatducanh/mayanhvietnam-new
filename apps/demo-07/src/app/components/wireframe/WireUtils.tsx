import { ReactNode } from 'react'

// ─────────────────────────────────────────────────────────────
// IMAGE BLOCKS
// ─────────────────────────────────────────────────────────────

type DivProps = { className?: string; style?: React.CSSProperties; children?: ReactNode }

export const WireImg = ({ className = '', style, children }: DivProps) => (
  <div className={`bg-gray-300 flex-shrink-0 ${className}`} style={style}>{children}</div>
)

export const WireImgMid = ({ className = '', style, children }: DivProps) => (
  <div className={`bg-gray-400 flex-shrink-0 ${className}`} style={style}>{children}</div>
)

export const WireImgDark = ({ className = '', style, children }: DivProps) => (
  <div className={`bg-gray-600 flex-shrink-0 ${className}`} style={style}>{children}</div>
)

export const WireHero = ({ className = '', style, children }: DivProps) => (
  <div className={`bg-gray-800 flex-shrink-0 ${className}`} style={style}>{children}</div>
)

export const WireImgLight = ({ className = '', style, children }: DivProps) => (
  <div className={`bg-gray-200 flex-shrink-0 ${className}`} style={style}>{children}</div>
)

// ─────────────────────────────────────────────────────────────
// TEXT BARS — Light background
// ─────────────────────────────────────────────────────────────

export const TDisplay = ({ w = '80%' }: { w?: string }) => (
  <div className="h-9 bg-gray-800" style={{ width: w }} />
)

export const TH1 = ({ w = '70%' }: { w?: string }) => (
  <div className="h-7 bg-gray-800" style={{ width: w }} />
)

export const TH2 = ({ w = '60%' }: { w?: string }) => (
  <div className="h-5 bg-gray-700" style={{ width: w }} />
)

export const TH3 = ({ w = '50%' }: { w?: string }) => (
  <div className="h-4 bg-gray-600" style={{ width: w }} />
)

export const TBody = ({ w = '75%' }: { w?: string }) => (
  <div className="h-3 bg-gray-400" style={{ width: w }} />
)

export const TSm = ({ w = '55%' }: { w?: string }) => (
  <div className="h-2.5 bg-gray-350" style={{ width: w }} />
)

export const TXs = ({ w = '40%' }: { w?: string }) => (
  <div className="h-2 bg-gray-300" style={{ width: w }} />
)

export const TEye = ({ w = '22%' }: { w?: string }) => (
  <div className="h-2 bg-gray-500 tracking-widest" style={{ width: w }} />
)

// ─────────────────────────────────────────────────────────────
// TEXT BARS — Dark background
// ─────────────────────────────────────────────────────────────

export const TDisplay_D = ({ w = '70%' }: { w?: string }) => (
  <div className="h-9 bg-gray-200" style={{ width: w }} />
)

export const TH1_D = ({ w = '60%' }: { w?: string }) => (
  <div className="h-7 bg-gray-200" style={{ width: w }} />
)

export const TH2_D = ({ w = '50%' }: { w?: string }) => (
  <div className="h-5 bg-gray-300" style={{ width: w }} />
)

export const TBody_D = ({ w = '70%' }: { w?: string }) => (
  <div className="h-3 bg-gray-500" style={{ width: w }} />
)

export const TSm_D = ({ w = '50%' }: { w?: string }) => (
  <div className="h-2.5 bg-gray-600" style={{ width: w }} />
)

export const TXs_D = ({ w = '40%' }: { w?: string }) => (
  <div className="h-2 bg-gray-600" style={{ width: w }} />
)

export const TEye_D = ({ w = '20%' }: { w?: string }) => (
  <div className="h-2 bg-gray-500" style={{ width: w }} />
)

// ─────────────────────────────────────────────────────────────
// INTERACTIVE BLOCKS
// ─────────────────────────────────────────────────────────────

export const WireBtn = ({ dark = false, width = 'w-32' }: { dark?: boolean; width?: string }) => (
  <div className={`h-10 ${width} border flex items-center justify-center flex-shrink-0 ${dark ? 'border-gray-500' : 'border-gray-700'}`}>
    <div className={`h-2 w-14 ${dark ? 'bg-gray-500' : 'bg-gray-700'}`} />
  </div>
)

export const WireBtnFilled = ({ dark = false, width = 'w-32' }: { dark?: boolean; width?: string }) => (
  <div className={`h-10 ${width} flex items-center justify-center flex-shrink-0 ${dark ? 'bg-gray-600' : 'bg-gray-800'}`}>
    <div className={`h-2 w-14 ${dark ? 'bg-gray-400' : 'bg-gray-300'}`} />
  </div>
)

export const WireSearch = () => (
  <div className="h-11 w-64 border border-gray-300 bg-gray-50 flex items-center px-4 gap-3">
    <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex-shrink-0" />
    <div className="h-2 w-24 bg-gray-300" />
  </div>
)

// ─────────────────────────────────────────────────────────────
// LAYOUT PRIMITIVES
// ─────────────────────────────────────────────────────────────

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto px-10 ${className}`} style={{ maxWidth: '1320px' }}>
    {children}
  </div>
)

export const Spacer = ({ h }: { h: number }) => (
  <div style={{ height: `${h}px` }} />
)

export const HRule = ({ shade = 'border-gray-200' }: { shade?: string }) => (
  <div className={`border-t ${shade} w-full`} />
)

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────

export const WireProductCard = ({
  imageAspect = 'aspect-[4/3]',
  dark = false,
  size = 'normal'
}: {
  imageAspect?: string
  dark?: boolean
  size?: 'normal' | 'compact'
}) => (
  <div className="flex flex-col w-full">
    <WireImg className={`w-full ${imageAspect}`} />
    <div className={`pt-${size === 'compact' ? '3' : '4'} flex flex-col gap-2`}>
      <TEye w="30%" />
      <TH3 w="85%" />
      {size === 'normal' && <TSm w="60%" />}
      <TH2 w="45%" />
      {size === 'normal' && <WireBtn dark={dark} />}
    </div>
  </div>
)

// ─────────────────────────────────────────────────────────────
// ANNOTATION SYSTEM
// ─────────────────────────────────────────────────────────────

export interface AnnotationData {
  sectionId: string
  sectionName: string
  purpose: string
  businessGoal: string
  userEmotion: string
  layoutReason: string
  visualFocus: string
  interaction: string
  transition: string
}

export const SectionAnnotation = ({
  data,
  visible
}: {
  data: AnnotationData
  visible: boolean
}) => {
  if (!visible) return null
  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto px-10 py-5" style={{ maxWidth: '1320px' }}>
        <div className="grid grid-cols-[180px_1fr] gap-8 font-mono text-xs">
          <div>
            <div className="text-gray-400 text-[10px] tracking-widest uppercase mb-1">
              Section {data.sectionId}
            </div>
            <div className="text-gray-700 font-medium leading-tight">
              {data.sectionName}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-3">
            {[
              ['Purpose', data.purpose],
              ['Business Goal', data.businessGoal],
              ['User Emotion', data.userEmotion],
              ['Layout Reason', data.layoutReason],
              ['Visual Focus', data.visualFocus],
              ['Interaction', data.interaction],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{label}</div>
                <div className="text-gray-600 leading-relaxed">{value}</div>
              </div>
            ))}
            <div className="col-span-3">
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Transition to Next</div>
              <div className="text-gray-600 leading-relaxed">{data.transition}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SECTION WRAPPER with label
// ─────────────────────────────────────────────────────────────

export const SectionWrap = ({
  children,
  label,
  annotation,
  showAnnotation,
  className = ''
}: {
  children: ReactNode
  label: string
  annotation?: AnnotationData
  showAnnotation?: boolean
  className?: string
}) => (
  <div className={`relative group ${className}`}>
    <div className="absolute top-0 left-0 z-10 bg-gray-900 text-white font-mono text-[10px] tracking-widest px-2 py-1 uppercase opacity-70">
      {label}
    </div>
    {children}
    {annotation && <SectionAnnotation data={annotation} visible={!!showAnnotation} />}
  </div>
)
