import {
  Container, Spacer, HRule,
  WireImg, WireImgMid, WireImgDark, WireHero, WireImgLight,
  TDisplay, TH1, TH2, TH3, TBody, TSm, TXs, TEye,
  TDisplay_D, TH2_D, TBody_D, TSm_D, TXs_D, TEye_D,
  WireBtn, WireBtnFilled,
  SectionWrap, type AnnotationData
} from './WireUtils'

const annotations: Record<string, AnnotationData> = {
  s0: {
    sectionId: '0', sectionName: 'Navbar — Dual Mode',
    purpose: 'Transparent on hero (cinematic mode), full-featured after scroll (functional mode)',
    businessGoal: 'Fast lane for experienced users without breaking hero immersion',
    userEmotion: 'Seamless — power available without distraction',
    layoutReason: 'Logo left only on hero; full nav + search revealed on scroll past hero',
    visualFocus: 'Invisible on hero, glass bar after scroll',
    interaction: 'Mode A: logo + search icon + cart. Mode B: full nav strip with search bar',
    transition: 'Hero fades; nav solidifies into backdrop-blur strip'
  },
  s1: {
    sectionId: '1', sectionName: 'Hero — Opening Frame',
    purpose: 'Create immediate disruption — this feels unlike any Vietnamese ecommerce site',
    businessGoal: 'Reduce bounce rate; earn the right to sell before selling',
    userEmotion: 'Surprise → curiosity → staying',
    layoutReason: 'Full 100vh editorial photo; text anchored bottom-left — asymmetric authority',
    visualFocus: 'The photograph occupies 100% of the viewport. Nothing competes.',
    interaction: 'Scroll indicator at bottom-center; subtle parallax on image',
    transition: 'Dark hero fades out; white manifesto section appears — darkness to light metaphor'
  },
  s2: {
    sectionId: '2', sectionName: 'Manifesto',
    purpose: 'Declare brand philosophy — create emotional recognition before any product',
    businessGoal: 'Build brand moat through identity; differentiation no competitor can copy',
    userEmotion: '"They understand me" — belonging before commerce',
    layoutReason: 'Text as architecture — 58% width column, 42% void. Typography IS the composition.',
    visualFocus: 'Giant display text. White background. Absolute silence around the words.',
    interaction: 'Lines fade-in staggered on scroll; no interactive elements — section is for reading',
    transition: 'Text section gives way to Category Universe — verbal world → visual world'
  },
  s3: {
    sectionId: '3', sectionName: 'Category Universe',
    purpose: 'Show the full scope of the brand through 9+1 visual worlds, not text links',
    businessGoal: 'Intentional traffic distribution across 9 categories + beginner pathway',
    userEmotion: 'Exploration — "my world is here"',
    layoutReason: 'Irregular mosaic: one dominant 7/12 hero + two 5/12 stacked right, then 4×3/12 row, then 3 unequal',
    visualFocus: 'Editorial grid where no two cards are the same size — magazine page logic',
    interaction: 'Hover: image scales 1.03 + text appears. Click → category page',
    transition: 'Categories show scope. Creator section below asks: "but what can you make?"'
  },
  s4: {
    sectionId: '4', sectionName: 'Creator Inspiration',
    purpose: 'Bridge brand philosophy → product desire through real output photography',
    businessGoal: 'Activate purchase intent via inspiration — highest conversion psychology',
    userEmotion: '"I want to create something like that" → "what camera did they use?"',
    layoutReason: 'Two alternating panels: Story 1 photo 55% left / text 45% right. Story 2 text 40% left / photo 60% right.',
    visualFocus: 'Output photography (not product shot) dominates — creator is the hero',
    interaction: 'Equipment pill button → PDP. Photo hover → subtle overlay with EXIF line',
    transition: 'Inspiration creates desire → Featured Products satisfies it immediately below'
  },
  s5: {
    sectionId: '5', sectionName: 'Featured Products',
    purpose: 'Present curated products with editorial treatment — objects worthy of consideration',
    businessGoal: 'Drive PDP visits for high-margin / bestselling products',
    userEmotion: 'Consideration — "this is what I need"',
    layoutReason: 'One dominant 7/12 featured product left + two stacked 5/12 products right. Asymmetric shelf.',
    visualFocus: 'Products float on white with generous breathing room — no touching',
    interaction: 'Card hover: shadow + scale 1.02 + "Khám phá →" fades in. Wishlist on hover.',
    transition: 'Curated selection → New Arrivals: from "best picks" to "what\'s just arrived"'
  },
  s6: {
    sectionId: '6', sectionName: 'New Arrivals Carousel',
    purpose: 'Expose newest products; create return visit behavior with fresh content',
    businessGoal: 'Traffic to new products; reward FOMO; support seasonal launches',
    userEmotion: 'Curiosity — "let me see what just came in"',
    layoutReason: 'Horizontal carousel with square cards and 40px peek — signals infinite browsing',
    visualFocus: 'Consistent card size, orange "MỚI" badge, IBM Mono specs line',
    interaction: 'Drag/swipe. Peek reveals more cards. Click → PDP.',
    transition: 'Products explored → Why Choose Us: user is ready to evaluate trust before buying'
  },
  s7: {
    sectionId: '7', sectionName: 'Why Choose Us',
    purpose: 'Directly answer: "Can I trust buying a 30M VND camera here?"',
    businessGoal: 'Reduce cart abandonment for high-value orders; competitive differentiation',
    userEmotion: 'Concern → resolved → trust confirmed',
    layoutReason: '5 equal columns — stability, completeness, no hierarchy among trust signals',
    visualFocus: 'Clean, no imagery. Typography-only. Trust must feel solid, not animated.',
    interaction: 'No interaction — section is for reading. Scroll reveals only.',
    transition: 'Trust confirmed → Physical Presence: "we exist beyond the screen"'
  },
  s8: {
    sectionId: '8', sectionName: 'Physical Presence',
    purpose: 'Ground the brand in physical reality — 4 stores = accountability and OMO trust',
    businessGoal: 'Drive in-store visits; increase online confidence through physical proof',
    userEmotion: '"They really exist. I can find them if I need to."',
    layoutReason: 'Dark section (second allowed). 7/12 interior store image left, 5/12 4-location grid right.',
    visualFocus: 'Beautiful showroom interior photography. Architecture of trust.',
    interaction: '"Chỉ đường" opens Google Maps. "Đặt lịch" opens booking flow.',
    transition: 'Physical presence confirmed → Footer: navigation, policies, contact'
  },
  s9: {
    sectionId: '9', sectionName: 'Footer',
    purpose: 'Navigation, legal compliance, secondary SEO internal links, newsletter',
    businessGoal: 'Hotline conversion, newsletter capture, SEO link equity',
    userEmotion: 'Neutral functional — find what you need without thinking',
    layoutReason: '4 equal columns: Brand, Products, Support, Connect',
    visualFocus: 'Dark background (--color-void). White text hierarchy.',
    interaction: 'Links navigate. Newsletter submit. Social links.',
    transition: 'End of page — homepage arc complete'
  }
}

interface Props { showAnnotations: boolean }

export function ConceptA({ showAnnotations }: Props) {
  return (
    <div className="bg-white" style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>

      {/* ── S0: NAVBAR ─────────────────────────────────────────── */}
      <SectionWrap label="S0 · Navbar — Dual Mode" annotation={annotations.s0} showAnnotation={showAnnotations}>
        <div className="border-b border-gray-100">
          {/* Mode A — Cinematic (on hero) */}
          <div className="bg-gray-900 text-white">
            <div className="mx-auto px-10 h-16 flex items-center justify-between" style={{ maxWidth: '1920px' }}>
              <div className="flex items-center gap-2">
                <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mr-3">MODE A</div>
                <div className="h-5 w-32 bg-gray-200" />
              </div>
              <div className="flex items-center gap-6">
                <div className="w-5 h-5 border border-gray-500 rounded-full" />
                <div className="w-5 h-5 border border-gray-500" />
              </div>
            </div>
          </div>
          {/* Mode B — Functional (after scroll) */}
          <div className="bg-gray-50 border-t border-gray-200">
            <div className="mx-auto px-10 h-14 flex items-center justify-between gap-8" style={{ maxWidth: '1920px' }}>
              <div className="flex items-center gap-2">
                <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mr-3">MODE B</div>
                <div className="h-4 w-24 bg-gray-700" />
              </div>
              <div className="flex items-center gap-8">
                {['Máy ảnh', 'Ống kính', 'Flycam', 'Studio', 'Xem tất cả'].map(c => (
                  <div key={c} className="h-2.5 bg-gray-500" style={{ width: `${c.length * 6 + 20}px` }} />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="h-9 w-52 border border-gray-300 bg-white flex items-center px-3 gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-gray-300 rounded-full" />
                  <div className="h-2 w-28 bg-gray-200" />
                </div>
                <div className="h-2.5 w-8 bg-gray-400" />
                <div className="h-2.5 w-6 bg-gray-400" />
              </div>
            </div>
          </div>
        </div>
        {showAnnotations && (
          <div className="bg-gray-50 border-t border-gray-200 px-10 py-3 font-mono text-xs text-gray-500" style={{ maxWidth: 'none' }}>
            Spec: Mode A = logo + search icon + cart on dark hero. Mode B = full nav + search bar, activates on scroll past 100vh.
          </div>
        )}
      </SectionWrap>

      {/* ── S1: HERO ────────────────────────────────────────────── */}
      <SectionWrap label="S1 · Hero — Editorial Opening Frame" annotation={annotations.s1} showAnnotation={showAnnotations}>
        {/* Full viewport hero: 100vh × full width at 1920px */}
        <WireHero className="w-full" style={{ height: '100vh', minHeight: '640px' }}>
          {/* Photograph fills entire section */}
          <div className="relative h-full w-full">
            {/* Brand authority whisper — bottom of hero */}
            <div className="absolute top-0 left-0 right-0 h-full flex flex-col justify-between px-16 pb-14 pt-16"
              style={{ maxWidth: '1920px', margin: '0 auto' }}>

              {/* TOP: invisible spacer (nav is floating above) */}
              <div />

              {/* BOTTOM-LEFT: text block — asymmetric, left-anchored */}
              <div className="flex flex-col gap-4" style={{ maxWidth: '620px' }}>
                {/* Micro trust bar — authority whisper */}
                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-gray-500" />
                  <div className="h-1.5 bg-gray-400" style={{ width: '320px' }} />
                </div>
                {/* Brand name: large, thin, white */}
                <TDisplay_D w="72%" />
                {/* Tagline */}
                <TH2_D w="50%" />
                {/* Brand credential — credibility anchor */}
                <TSm_D w="65%" />

                <Spacer h={24} />

                {/* Scroll indicator */}
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gray-500" />
                  <div className="h-1.5 w-20 bg-gray-500" />
                  <div className="h-4 w-px bg-gray-600" />
                </div>
              </div>

              {/* BOTTOM-RIGHT: photography credit */}
              <div className="absolute bottom-12 right-16 flex flex-col items-end gap-1">
                <div className="h-1.5 w-28 bg-gray-500" />
                <div className="h-1.5 w-20 bg-gray-600" />
              </div>
            </div>
          </div>
        </WireHero>

        {/* Specs panel below */}
        {showAnnotations && (
          <div className="bg-gray-50 border-t border-gray-200 px-10 py-3 font-mono text-xs text-gray-500">
            Spec: 100vh × 100vw. Text bottom-left, photography credit bottom-right. Parallax rate 0.15. Dark-to-light transition on scroll.
          </div>
        )}
      </SectionWrap>

      {/* ── S2: MANIFESTO ───────────────────────────────────────── */}
      <SectionWrap label="S2 · Manifesto — Brand Declaration" annotation={annotations.s2} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '112px', paddingBottom: '112px' }}>
          <Container>
            {/* 58% width column — text is the composition */}
            <div style={{ maxWidth: '58%' }}>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px w-8 bg-gray-300" />
                <TEye w="120px" />
              </div>

              {/* Display text: manifesto lines, alternating ExtraBold / Light */}
              <div className="flex flex-col gap-5">
                <TDisplay w="78%" />
                <TDisplay w="52%" />
                <Spacer h={8} />
                <TH1 w="70%" />
                <TH1 w="60%" />
                <Spacer h={8} />
                <TH1 w="66%" />
                <TH1 w="50%" />
              </div>

              <Spacer h={48} />

              {/* Credibility anchor line */}
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gray-200" />
                <TSm w="320px" />
              </div>
              <Spacer h={8} />
              <TSm w="200px" />

              <Spacer h={40} />

              {/* Subtle CTA — ghost link */}
              <div className="flex items-center gap-3">
                <TXs w="120px" />
                <div className="h-px w-6 bg-gray-300" />
              </div>
            </div>

            {/* 42% void — intentional empty space on the right */}
          </Container>
        </div>
      </SectionWrap>

      {/* ── S3: CATEGORY UNIVERSE ───────────────────────────────── */}
      <SectionWrap label="S3 · Category Universe — 9+1 Visual Worlds" annotation={annotations.s3} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <Container>
            {/* Section header */}
            <div className="mb-10">
              <TEye w="160px" />
              <Spacer h={12} />
              <TH2 w="40%" />
            </div>

            {/* ROW 1: 7/12 big hero + 5/12 two stacked */}
            <div className="flex gap-3" style={{ height: '440px' }}>
              {/* Big hero category — Máy ảnh */}
              <div className="flex flex-col relative overflow-hidden" style={{ flex: '7' }}>
                <WireImgDark className="w-full h-full" />
                <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                  <div className="h-2 w-24 bg-gray-400" />
                  <div className="h-5 w-40 bg-gray-200" />
                  <div className="h-2 w-16 bg-gray-500" />
                </div>
              </div>
              {/* Two stacked on the right — Ống kính + Sản phẩm cũ */}
              <div className="flex flex-col gap-3" style={{ flex: '5' }}>
                <div className="relative overflow-hidden flex-1">
                  <WireImgMid className="w-full h-full" />
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                    <div className="h-2 w-16 bg-gray-400" />
                    <div className="h-4 w-32 bg-gray-700" />
                  </div>
                </div>
                <div className="relative overflow-hidden flex-1">
                  <WireImg className="w-full h-full" />
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                    <div className="h-2 w-16 bg-gray-400" />
                    <div className="h-4 w-36 bg-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            <Spacer h={12} />

            {/* ROW 2: 4 equal cards — 3/12 each */}
            <div className="grid grid-cols-4 gap-3" style={{ height: '280px' }}>
              {['Flycam', 'Action Camera', 'Studio', 'Phụ kiện'].map((cat) => (
                <div key={cat} className="relative overflow-hidden">
                  <WireImgMid className="w-full h-full" />
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                    <div className="h-2 w-12 bg-gray-400" />
                    <div className="h-3.5 bg-gray-200" style={{ width: `${cat.length * 7}px` }} />
                  </div>
                </div>
              ))}
            </div>

            <Spacer h={12} />

            {/* ROW 3: 3 unequal widths — Camera/Quay phim (5/12), Lắp phông (4/12), Beginner entry (3/12) */}
            <div className="flex gap-3" style={{ height: '220px' }}>
              <div className="relative overflow-hidden" style={{ flex: '5' }}>
                <WireImg className="w-full h-full" />
                <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                  <div className="h-2 w-16 bg-gray-400" />
                  <div className="h-4 w-40 bg-gray-700" />
                </div>
              </div>
              <div className="relative overflow-hidden" style={{ flex: '4' }}>
                <WireImgMid className="w-full h-full" />
                <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                  <div className="h-2 w-20 bg-gray-400" />
                  <div className="h-4 w-32 bg-gray-700" />
                </div>
              </div>
              {/* Beginner entry card — visually differentiated */}
              <div className="relative overflow-hidden bg-gray-100 flex flex-col items-center justify-center gap-3 border border-dashed border-gray-300"
                style={{ flex: '3' }}>
                <div className="h-4 w-36 bg-gray-500" />
                <div className="h-3 w-44 bg-gray-300" />
                <div className="h-8 w-32 border border-gray-400 flex items-center justify-center">
                  <div className="h-2 w-20 bg-gray-500" />
                </div>
                <div className="absolute top-3 left-3 bg-gray-500 px-2 py-0.5">
                  <div className="h-1.5 w-12 bg-gray-200" />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S4: CREATOR INSPIRATION ─────────────────────────────── */}
      <SectionWrap label="S4 · Creator Inspiration — Two Alternating Panels" annotation={annotations.s4} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <Container>
            {/* Section header */}
            <div className="mb-12">
              <TEye w="180px" />
              <Spacer h={10} />
              <TH2 w="35%" />
            </div>

            {/* Story 1: Photo 55% LEFT / Text 45% RIGHT */}
            <div className="flex gap-16 items-start mb-20">
              <div style={{ flex: '55' }}>
                <WireImgDark className="w-full aspect-[4/3]" />
                {/* EXIF overlay at bottom of image */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-px w-4 bg-gray-300" />
                  <div className="h-1.5 w-56 bg-gray-300" />
                </div>
              </div>
              <div className="flex flex-col gap-5 pt-8" style={{ flex: '45' }}>
                <TEye w="100px" />
                <TH2 w="80%" />
                <TH3 w="65%" />
                <Spacer h={4} />
                <TBody w="90%" />
                <TBody w="85%" />
                <TBody w="70%" />
                <Spacer h={8} />
                {/* Creator info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <TSm w="100px" />
                    <TXs w="140px" />
                  </div>
                </div>
                <Spacer h={4} />
                {/* Equipment pill */}
                <div className="inline-flex items-center gap-2 border border-gray-700 px-3 py-1.5 self-start">
                  <div className="h-2 w-40 bg-gray-700" />
                  <div className="h-px w-4 bg-gray-400" />
                </div>
              </div>
            </div>

            <HRule />
            <Spacer h={56} />

            {/* Story 2: Text 40% LEFT / Photo 60% RIGHT */}
            <div className="flex gap-16 items-start">
              <div className="flex flex-col gap-5 pt-8" style={{ flex: '40' }}>
                <TEye w="100px" />
                <TH2 w="85%" />
                <TH3 w="70%" />
                <Spacer h={4} />
                <TBody w="95%" />
                <TBody w="80%" />
                <TBody w="75%" />
                <Spacer h={8} />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <TSm w="100px" />
                    <TXs w="140px" />
                  </div>
                </div>
                <Spacer h={4} />
                <div className="inline-flex items-center gap-2 border border-gray-700 px-3 py-1.5 self-start">
                  <div className="h-2 w-44 bg-gray-700" />
                  <div className="h-px w-4 bg-gray-400" />
                </div>
              </div>
              <div style={{ flex: '60' }}>
                <WireImgMid className="w-full aspect-[4/3]" />
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-px w-4 bg-gray-300" />
                  <div className="h-1.5 w-56 bg-gray-300" />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S5: FEATURED PRODUCTS ───────────────────────────────── */}
      <SectionWrap label="S5 · Featured Products — Asymmetric Shelf" annotation={annotations.s5} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <Container>
            {/* Section header */}
            <div className="flex items-end justify-between mb-12">
              <div className="flex flex-col gap-3">
                <TEye w="200px" />
                <TH2 w="360px" />
              </div>
              <WireBtn />
            </div>

            {/* Layout: 7/12 dominant left + 5/12 two stacked right */}
            <div className="flex gap-8 items-start">
              {/* DOMINANT product — 7/12 */}
              <div style={{ flex: '7' }}>
                <WireImg className="w-full aspect-[4/3]" />
                <div className="pt-6 flex flex-col gap-3">
                  <TEye w="160px" />
                  <TH2 w="85%" />
                  <TH3 w="55%" />
                  {/* Micro trust line */}
                  <div className="flex items-center gap-2">
                    <div className="h-px w-4 bg-gray-300" />
                    <TXs w="200px" />
                  </div>
                  <Spacer h={4} />
                  <TH1 w="35%" />
                  <TSm w="45%" />
                  <Spacer h={4} />
                  <div className="flex items-center gap-4">
                    <WireBtnFilled />
                    <WireBtn />
                  </div>
                </div>
              </div>

              {/* Two stacked products — 5/12 */}
              <div className="flex flex-col gap-8" style={{ flex: '5' }}>
                {[0, 1].map((i) => (
                  <div key={i} className="flex gap-4">
                    <WireImg className="flex-shrink-0 aspect-square" style={{ width: '140px', height: '140px' }} />
                    <div className="flex flex-col gap-2 pt-2">
                      <TEye w="100px" />
                      <TH3 w="90%" />
                      {/* Micro trust line */}
                      <TXs w="160px" />
                      <Spacer h={2} />
                      <TH2 w="50%" />
                      <TSm w="70%" />
                      <Spacer h={4} />
                      <WireBtn width="w-28" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Spacer h={40} />
            <div className="flex justify-center">
              <WireBtn width="w-48" />
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S6: NEW ARRIVALS CAROUSEL ───────────────────────────── */}
      <SectionWrap label="S6 · New Arrivals — Horizontal Scroll Carousel" annotation={annotations.s6} showAnnotation={showAnnotations}>
        <div className="bg-gray-50" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <Container>
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <TEye w="130px" />
                  {/* Orange live dot */}
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
                <TH3 w="200px" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-gray-300 flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-gray-400" />
                </div>
                <div className="w-8 h-8 border border-gray-300 flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-gray-700" />
                </div>
              </div>
            </div>

            {/* Carousel track — 6 cards with peek */}
            <div className="flex gap-4 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-shrink-0 flex flex-col gap-3" style={{ width: '210px' }}>
                  <div className="relative">
                    <WireImg className="w-full aspect-square" />
                    {/* MỚI badge */}
                    {i < 2 && (
                      <div className="absolute top-2 left-2 bg-gray-800 px-2 py-0.5">
                        <div className="h-1.5 w-6 bg-gray-200" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <TEye w="55%" />
                    <TH3 w="90%" />
                    {/* IBM Mono specs line */}
                    <div className="h-2 bg-gray-300" style={{ width: '75%', fontFamily: '"IBM Plex Mono", monospace' }} />
                    <TH2 w="55%" />
                  </div>
                </div>
              ))}
              {/* Peek of 7th card */}
              <div className="flex-shrink-0" style={{ width: '40px' }}>
                <WireImgLight className="w-full aspect-square" />
              </div>
            </div>

            <Spacer h={24} />
            <div className="flex justify-center">
              <WireBtn width="w-44" />
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S7: WHY CHOOSE US ───────────────────────────────────── */}
      <SectionWrap label="S7 · Why Choose Us — 5 Competitive Differentiators" annotation={annotations.s7} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <Container>
            {/* Header */}
            <div className="text-center mb-16 flex flex-col items-center gap-0">
              <TEye w="160px" />
              <Spacer h={12} />
              <TH1 w="45%" />
              <Spacer h={8} />
              <TBody w="55%" />
            </div>

            {/* 5 equal columns */}
            <div className="grid grid-cols-5 gap-8">
              {[
                ['Đại lý ủy quyền trực tiếp', 'Hóa đơn VAT. Serial verify với nhà sản xuất.'],
                ['Nhân viên là nhiếp ảnh gia', 'Họ dùng chính thiết bị họ tư vấn bạn mua.'],
                ['Thử trước, quyết định sau', 'Tại 4 showroom. Đặt lịch cầm thử bất kỳ thiết bị.'],
                ['Bảo hành tại cửa hàng', 'Không cần gửi đi đâu. Sửa ngay tại 4 cơ sở.'],
                ['Thanh toán linh hoạt', 'Trả góp 0%. Ví điện tử. Chuyển khoản. COD.'],
              ].map(([headline], idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  {/* Icon placeholder */}
                  <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">
                    <div className="w-5 h-5 bg-gray-300" />
                  </div>
                  <TH3 w="80%" />
                  <TBody w="95%" />
                  <TBody w="75%" />
                  <TBody w="85%" />
                </div>
              ))}
            </div>

            <Spacer h={48} />
            <HRule />
            <Spacer h={24} />
            <div className="flex justify-center">
              <WireBtn width="w-40" />
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S8: PHYSICAL PRESENCE ───────────────────────────────── */}
      <SectionWrap label="S8 · Physical Presence — 4 Showrooms" annotation={annotations.s8} showAnnotation={showAnnotations}>
        <div className="bg-gray-900" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <Container>
            {/* Header on dark */}
            <div className="mb-12">
              <TEye_D w="200px" />
              <Spacer h={10} />
              <TH2_D w="50%" />
              <Spacer h={8} />
              <TBody_D w="60%" />
            </div>

            {/* Layout: 7/12 store image left + 5/12 info right */}
            <div className="flex gap-10 items-start">
              {/* Store interior photography — large */}
              <div style={{ flex: '7' }}>
                <WireImgDark className="w-full aspect-[16/10]" />
                <Spacer h={16} />
                {/* Dark CTAs */}
                <div className="flex items-center gap-4">
                  <WireBtnFilled dark />
                  <WireBtn dark />
                </div>
              </div>

              {/* 4 location cards — stacked right */}
              <div className="flex flex-col gap-3" style={{ flex: '5' }}>
                {['Hà Nội — Cầu Giấy', 'Hà Nội — Hoàn Kiếm', 'TP.HCM — Q.3', 'Đà Nẵng'].map((loc) => (
                  <div key={loc} className="border border-gray-700 p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <TSm_D w="100px" />
                      <TXs_D w="60px" />
                    </div>
                    <TBody_D w="75%" />
                    <div className="flex items-center gap-2 mt-1">
                      <div className="h-1.5 w-16 bg-gray-600" />
                      <div className="h-px w-4 bg-gray-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S9: FOOTER ──────────────────────────────────────────── */}
      <SectionWrap label="S9 · Footer" annotation={annotations.s9} showAnnotation={showAnnotations}>
        <div className="bg-gray-950" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
          <Container>
            {/* 4 columns */}
            <div className="grid grid-cols-4 gap-12 mb-16">
              {/* Col 1 — Brand */}
              <div className="flex flex-col gap-4">
                <div className="h-5 w-28 bg-gray-200" />
                <TBody_D w="90%" />
                <TBody_D w="80%" />
                <TBody_D w="70%" />
                <Spacer h={8} />
                {/* Social icons */}
                <div className="flex gap-3">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="w-7 h-7 border border-gray-600" />
                  ))}
                </div>
              </div>
              {/* Col 2 — Products */}
              <div className="flex flex-col gap-3">
                <TSm_D w="80px" />
                <Spacer h={4} />
                {[0,1,2,3,4,5,6].map(i => <TXs_D key={i} w={`${60 + i * 8}px`} />)}
              </div>
              {/* Col 3 — Support */}
              <div className="flex flex-col gap-3">
                <TSm_D w="60px" />
                <Spacer h={4} />
                {[0,1,2,3,4].map(i => <TXs_D key={i} w={`${70 + i * 10}px`} />)}
              </div>
              {/* Col 4 — Newsletter */}
              <div className="flex flex-col gap-4">
                <TSm_D w="80px" />
                <TXs_D w="95%" />
                <TXs_D w="85%" />
                <Spacer h={4} />
                <div className="flex gap-2">
                  <div className="flex-1 h-10 border border-gray-600 bg-gray-800" />
                  <div className="w-24 h-10 bg-gray-600" />
                </div>
              </div>
            </div>

            <HRule shade="border-gray-800" />
            <Spacer h={24} />

            {/* Bottom bar */}
            <div className="flex items-center justify-between">
              <TXs_D w="200px" />
              <div className="flex gap-6">
                <TXs_D w="100px" />
                <TXs_D w="110px" />
                <TXs_D w="90px" />
              </div>
            </div>
          </Container>
        </div>
      </SectionWrap>
    </div>
  )
}
