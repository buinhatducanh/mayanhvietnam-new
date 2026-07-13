import {
  Container, Spacer, HRule,
  WireImg, WireImgMid, WireImgDark, WireHero, WireImgLight,
  TDisplay, TH1, TH2, TH3, TBody, TSm, TXs, TEye,
  TDisplay_D, TH2_D, TBody_D, TSm_D, TXs_D, TEye_D,
  WireBtn, WireBtnFilled, WireSearch,
  SectionWrap, type AnnotationData
} from './WireUtils'

const annotations: Record<string, AnnotationData> = {
  s0: {
    sectionId: '0', sectionName: 'Navbar — Always Visible',
    purpose: 'Full navigation immediately accessible from first pixel — no hidden state',
    businessGoal: 'Maximum immediate accessibility for experienced users and return visitors',
    userEmotion: 'Confident — I know where everything is',
    layoutReason: 'Logo center, nav left, utils right — symmetric authority signal',
    visualFocus: 'Full-width announcement bar above navbar, then full nav row',
    interaction: 'All categories visible as text links; mega menu on hover',
    transition: 'Sticky on scroll — always present'
  },
  s1: {
    sectionId: '1', sectionName: 'Hero — Centered Film Still',
    purpose: 'Cinematic opening but CENTERED — symmetrical authority vs Concept A\'s asymmetric editorial',
    businessGoal: 'Same emotional disruption via composition contrast, not text placement difference',
    userEmotion: 'Awe → "this is different" — centered composition feels more monumental',
    layoutReason: 'Text centered bottom-third. Two ghost CTAs visible at hero bottom — dual intent served.',
    visualFocus: '100vh photograph. Brand name centered. Two CTAs side by side.',
    interaction: 'Two CTAs visible: "Khám phá" (ghost left) + "Xem sản phẩm" (ghost right)',
    transition: 'Hero image flows into Manifesto via horizontal rules — like opening a chapter'
  },
  s2: {
    sectionId: '2', sectionName: 'Manifesto — Centered Column',
    purpose: 'Brand declaration, same emotional intent as Concept A but different visual grammar',
    businessGoal: 'Differentiation through structured elegance vs editorial sparseness',
    userEmotion: '"They have a point of view" — centered column feels more deliberate, less raw',
    layoutReason: 'Centered 60% column flanked by horizontal rules — classical typographic structure',
    visualFocus: 'Text column centered with rules above and below. No void space — contained authority.',
    interaction: 'Same stagger reveals on scroll. Same ghost CTA at end.',
    transition: 'Structured manifesto → tiered category rows: "here is the organized world"'
  },
  s3: {
    sectionId: '3', sectionName: 'Category Universe — Tiered Grid Rows',
    purpose: 'Structured visual hierarchy: primary categories large, secondary smaller, tertiary equal',
    businessGoal: 'Commercial priority visible in card sizes — Máy ảnh + Ống kính dominant',
    userEmotion: 'Ordered discovery — "I can find my place in this structured world"',
    layoutReason: 'Row 1: 8/12 hero + 4/12 stacked. Row 2: 4 equal 3/12. Row 3: 3 unequal + beginner card.',
    visualFocus: 'Clear visual hierarchy — size = importance. Structured magazine not mosaic.',
    interaction: 'Same hover behavior. Beginner card last row, visually differentiated.',
    transition: 'Ordered categories → sequential creator blocks: from world-view to human story'
  },
  s4: {
    sectionId: '4', sectionName: 'Creator Stories — Full-Width Sequential Blocks',
    purpose: 'Creator inspiration presented as full-width editorial spreads with text overlays',
    businessGoal: 'Maximum image impact; equipment link visible over the photograph itself',
    userEmotion: '"I am inside the photograph" — immersive rather than comparative',
    layoutReason: 'Full-width image, text and equipment overlay at bottom-left of each image. Sequential vertical.',
    visualFocus: 'The photograph IS the section. Text is overlaid, not beside it.',
    interaction: 'Equipment pill floats over the image. Click → PDP.',
    transition: 'Full-width imagery → Featured Products: emotional fullness → product focus'
  },
  s5: {
    sectionId: '5', sectionName: 'Featured Products — Full-Width Hero + Grid',
    purpose: 'ONE hero product gets full-width attention, then 3 equal products below',
    businessGoal: 'Drive single flagship product spotlight + grid comparison for additional SKUs',
    userEmotion: 'Desire → consideration → "which one is right for me?"',
    layoutReason: 'Full-width hero card (6/12 image + 6/12 info) then 3-column grid below',
    visualFocus: 'Hero card occupies full container width. Grid below is compact and comparable.',
    interaction: 'Hero card CTA prominent. Grid cards: hover reveals secondary info.',
    transition: 'Featured products → New Arrivals: from curated to broader browsing'
  },
  s6: {
    sectionId: '6', sectionName: 'New Arrivals — Portrait Cards on Alt Background',
    purpose: 'Portrait ratio cards (3:4) create a different rhythm from hero square cards',
    businessGoal: 'Section feels distinct from Featured — browsing vs. curating',
    userEmotion: 'Browsing — "let me scroll through everything new"',
    layoutReason: 'Portrait cards 3:4 ratio. Slightly warm surface background — section distinctly delineated.',
    visualFocus: 'Taller cards show more of product. 5 cards visible with half-peek of 6th.',
    interaction: 'Horizontal drag. Same peek behavior. Different card proportions = distinct rhythm.',
    transition: 'Browsed products → Why Choose Us: horizontal to vertical rhythm shift'
  },
  s7: {
    sectionId: '7', sectionName: 'Why Choose Us — Split 4/12 + 8/12 Grid',
    purpose: 'Left: brand statement that contextualizes trust. Right: 2×2 grid of specific differentiators.',
    businessGoal: 'Trust signals feel MORE specific and credible in grid format vs. 5-column row',
    userEmotion: 'Rational reassurance — information dense but scannable',
    layoutReason: '4/12 heading+intro on left. 8/12 2×2 grid on right. Asymmetry creates reading hierarchy.',
    visualFocus: 'The 2×2 grid structure signals organized competence. Left column anchors the section.',
    interaction: 'Static — same minimal interaction as Concept A.',
    transition: 'Trust confirmed → Physical Presence: rational → physical proof'
  },
  s8: {
    sectionId: '8', sectionName: 'Physical Presence — Full-Width Banner + 4 Cards Below',
    purpose: 'Store as brand statement: one full-width image first, then individual store info below',
    businessGoal: 'Brand impression of scale before individual location utility',
    userEmotion: '"This brand is substantial — look at this space"',
    layoutReason: 'Full-width store image on top (aspect 21:9). 4 location cards below in a grid.',
    visualFocus: 'The store photography commands full width — max brand statement for physical presence.',
    interaction: 'Same location card CTAs. Different visual weight on store photography.',
    transition: 'Physical presence confirmed → Footer'
  },
  s9: {
    sectionId: '9', sectionName: 'Footer',
    purpose: 'Navigation, policies, newsletter — identical structure to Concept A',
    businessGoal: 'Same footer goals across both concepts',
    userEmotion: 'Functional neutral',
    layoutReason: '4 columns — same structure as Concept A for consistency',
    visualFocus: 'Dark background, white type hierarchy',
    interaction: 'Same interactions',
    transition: 'End of page'
  }
}

interface Props { showAnnotations: boolean }

export function ConceptB({ showAnnotations }: Props) {
  return (
    <div className="bg-white" style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>

      {/* ── S0: NAVBAR — ALWAYS VISIBLE ─────────────────────────── */}
      <SectionWrap label="S0 · Navbar — Always Fully Visible" annotation={annotations.s0} showAnnotation={showAnnotations}>
        <div className="border-b border-gray-100">
          {/* Announcement bar */}
          <div className="bg-gray-800 text-white py-2 flex items-center justify-center gap-4">
            <div className="h-2 w-48 bg-gray-400" />
            <div className="h-px w-px bg-gray-600" />
            <div className="h-2 w-32 bg-gray-500" />
            <div className="h-2 w-20 bg-gray-400" />
          </div>
          {/* Full nav */}
          <div className="bg-white">
            <div className="mx-auto px-10 h-16 flex items-center justify-between" style={{ maxWidth: '1920px' }}>
              <div className="flex items-center gap-8">
                {['Máy ảnh', 'Ống kính', 'Flycam', 'Studio', 'Cũ'].map(c => (
                  <div key={c} className="h-2.5 bg-gray-700" style={{ width: `${c.length * 7 + 8}px` }} />
                ))}
              </div>
              <div className="h-5 w-32 bg-gray-800" />
              <div className="flex items-center gap-4">
                <WireSearch />
                <div className="h-2.5 w-8 bg-gray-400" />
                <div className="h-2.5 w-6 bg-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </SectionWrap>

      {/* ── S1: HERO — CENTERED ─────────────────────────────────── */}
      <SectionWrap label="S1 · Hero — Centered Film Still + Dual CTA" annotation={annotations.s1} showAnnotation={showAnnotations}>
        <WireHero className="w-full" style={{ height: '100vh', minHeight: '640px' }}>
          <div className="relative h-full w-full flex flex-col items-center justify-end pb-20 px-16">
            {/* Centered text block */}
            <div className="flex flex-col items-center gap-5" style={{ maxWidth: '720px' }}>
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-gray-500" />
                <div className="h-1.5 w-24 bg-gray-400" />
                <div className="h-px w-6 bg-gray-500" />
              </div>
              {/* Brand name — CENTERED */}
              <TDisplay_D w="480px" />
              {/* Tagline */}
              <TH2_D w="320px" />
              <Spacer h={16} />
              {/* Dual CTAs */}
              <div className="flex items-center gap-4">
                <WireBtn dark width="w-40" />
                <WireBtn dark width="w-44" />
              </div>
            </div>

            {/* Bottom scroll indicator */}
            <div className="absolute bottom-6 left-1/2 flex flex-col items-center gap-2" style={{ transform: 'translateX(-50%)' }}>
              <div className="h-6 w-px bg-gray-600" />
              <div className="h-1.5 w-16 bg-gray-500" />
            </div>

            {/* Photography credit */}
            <div className="absolute bottom-8 right-16 flex flex-col items-end gap-1">
              <div className="h-1.5 w-28 bg-gray-500" />
              <div className="h-1.5 w-20 bg-gray-600" />
            </div>
          </div>
        </WireHero>
        {showAnnotations && (
          <div className="bg-gray-50 border-t border-gray-200 px-10 py-3 font-mono text-xs text-gray-500">
            Spec: 100vh × 100vw. Text CENTERED, not bottom-left (key Concept B distinction). Two ghost CTAs show dual intent above fold.
          </div>
        )}
      </SectionWrap>

      {/* ── S2: MANIFESTO — CENTERED COLUMN ─────────────────────── */}
      <SectionWrap label="S2 · Manifesto — Centered Column with Rules" annotation={annotations.s2} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '112px', paddingBottom: '112px' }}>
          <Container>
            {/* Horizontal rule above */}
            <div className="flex items-center gap-8 mb-12">
              <div className="flex-1 h-px bg-gray-200" />
              <TEye w="160px" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* CENTERED 60% column */}
            <div className="flex flex-col items-center" style={{ maxWidth: '60%', margin: '0 auto' }}>
              <div className="flex flex-col gap-4 items-center text-center">
                <TDisplay w="80%" />
                <TDisplay w="60%" />
                <Spacer h={8} />
                <TH1 w="70%" />
                <TH1 w="65%" />
                <Spacer h={8} />
                <TH1 w="72%" />
                <TH1 w="55%" />
              </div>

              {/* Horizontal rule below manifesto */}
              <Spacer h={40} />
              <div className="w-full h-px bg-gray-200" />
              <Spacer h={32} />

              {/* Credibility anchor — centered */}
              <TSm w="75%" />
              <Spacer h={8} />
              <TXs w="50%" />

              <Spacer h={32} />

              {/* Ghost CTA */}
              <div className="flex items-center gap-3">
                <div className="h-px w-4 bg-gray-300" />
                <TXs w="120px" />
                <div className="h-px w-4 bg-gray-300" />
              </div>
            </div>

            {/* Horizontal rule below */}
            <Spacer h={40} />
            <div className="flex items-center gap-8">
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S3: CATEGORY UNIVERSE — TIERED ROWS ─────────────────── */}
      <SectionWrap label="S3 · Category Universe — Tiered Grid Rows" annotation={annotations.s3} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <Container>
            {/* Section header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <TEye w="160px" />
                <Spacer h={12} />
                <TH2 w="36%" />
              </div>
              <TBody w="200px" />
            </div>

            {/* ROW 1: 8/12 + 4/12 stacked (different ratio from A) */}
            <div className="flex gap-3" style={{ height: '400px' }}>
              <div className="relative overflow-hidden" style={{ flex: '8' }}>
                <WireImgDark className="w-full h-full" />
                <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                  <div className="h-2 w-20 bg-gray-400" />
                  <div className="h-6 w-44 bg-gray-200" />
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-14 bg-gray-400" />
                    <div className="h-px w-4 bg-gray-500" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3" style={{ flex: '4' }}>
                <div className="relative overflow-hidden flex-1">
                  <WireImgMid className="w-full h-full" />
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                    <div className="h-2 w-16 bg-gray-400" />
                    <div className="h-4 w-28 bg-gray-700" />
                  </div>
                </div>
                <div className="relative overflow-hidden flex-1">
                  <WireImg className="w-full h-full" />
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                    <div className="h-2 w-16 bg-gray-400" />
                    <div className="h-4 w-32 bg-gray-700" />
                  </div>
                </div>
              </div>
            </div>

            <Spacer h={12} />

            {/* ROW 2: 4 equal cards — same as Concept A but different heights */}
            <div className="grid grid-cols-4 gap-3" style={{ height: '260px' }}>
              {['Flycam', 'Action Camera', 'Camera/Quay phim', 'Phụ kiện'].map((cat) => (
                <div key={cat} className="relative overflow-hidden">
                  <WireImgMid className="w-full h-full" />
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                    <div className="h-2 w-12 bg-gray-400" />
                    <div className="h-3.5 bg-gray-200" style={{ width: `${cat.length * 6}px` }} />
                  </div>
                </div>
              ))}
            </div>

            <Spacer h={12} />

            {/* ROW 3: 3/12 + 4.5/12 + 4.5/12 — different split from Concept A */}
            <div className="flex gap-3" style={{ height: '200px' }}>
              <div className="relative overflow-hidden" style={{ flex: '3' }}>
                <WireImg className="w-full h-full" />
                <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                  <div className="h-2 w-16 bg-gray-400" />
                  <div className="h-4 w-24 bg-gray-700" />
                </div>
              </div>
              <div className="relative overflow-hidden" style={{ flex: '4.5' }}>
                <WireImgMid className="w-full h-full" />
                <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                  <div className="h-2 w-20 bg-gray-400" />
                  <div className="h-4 w-32 bg-gray-700" />
                </div>
              </div>
              {/* Beginner card — same concept, different visual (lighter bg, no dashed border) */}
              <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center" style={{ flex: '4.5' }}>
                <div className="flex flex-col items-center gap-3 px-8">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-400" />
                  </div>
                  <TH3 w="160px" />
                  <TBody w="200px" />
                  <WireBtnFilled width="w-36" />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S4: CREATOR STORIES — FULL-WIDTH SEQUENTIAL ─────────── */}
      <SectionWrap label="S4 · Creator Inspiration — Full-Width Sequential Blocks" annotation={annotations.s4} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <Container>
            <div className="mb-10">
              <TEye w="180px" />
              <Spacer h={10} />
              <TH2 w="35%" />
            </div>
          </Container>

          {/* Story 1: Full-width image block with TEXT OVERLAY at bottom */}
          <div className="relative" style={{ height: '560px' }}>
            <WireImgDark className="w-full h-full" />
            {/* Text overlay — bottom-left, on image */}
            <div className="absolute bottom-0 left-0 right-0 p-12" style={{ background: 'rgba(0,0,0,0.0)' }}>
              <div className="mx-auto" style={{ maxWidth: '1320px' }}>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-3" style={{ maxWidth: '480px' }}>
                    <TEye_D w="80px" />
                    <TH2_D w="95%" />
                    <TBody_D w="85%" />
                    {/* Creator credit */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex-shrink-0" />
                      <div className="flex flex-col gap-1">
                        <TSm_D w="80px" />
                        <TXs_D w="110px" />
                      </div>
                    </div>
                  </div>
                  {/* Equipment pill — floats over image */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 bg-gray-900 border border-gray-600 px-4 py-2">
                      <div className="h-2 w-44 bg-gray-300" />
                    </div>
                    <TXs_D w="80px" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Spacer h={4} />

          {/* Story 2: Full-width — different image tone */}
          <div className="relative" style={{ height: '480px' }}>
            <WireImgMid className="w-full h-full" />
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <div className="mx-auto" style={{ maxWidth: '1320px' }}>
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-3" style={{ maxWidth: '520px' }}>
                    <TEye_D w="80px" />
                    <TH2_D w="90%" />
                    <TBody_D w="80%" />
                    <div className="flex items-center gap-3 mt-2">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex-shrink-0" />
                      <div className="flex flex-col gap-1">
                        <TSm_D w="90px" />
                        <TXs_D w="120px" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 bg-gray-700 border border-gray-500 px-4 py-2">
                      <div className="h-2 w-48 bg-gray-300" />
                    </div>
                    <TXs_D w="80px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrap>

      {/* ── S5: FEATURED PRODUCTS — HERO CARD + 3-COLUMN GRID ───── */}
      <SectionWrap label="S5 · Featured Products — Full-Width Hero Card + Grid" annotation={annotations.s5} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <Container>
            {/* Header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <TEye w="200px" />
                <Spacer h={10} />
                <TH2 w="400px" />
              </div>
              <WireBtn />
            </div>

            {/* HERO CARD — full-width, 6/12+6/12 split */}
            <div className="flex border border-gray-100" style={{ height: '380px' }}>
              <WireImgDark className="" style={{ flex: '6' }} />
              <div className="flex flex-col justify-between p-10" style={{ flex: '6' }}>
                <div className="flex flex-col gap-4">
                  <TEye w="160px" />
                  <TH1 w="80%" />
                  <TH2 w="60%" />
                  {/* Positioning line */}
                  <TBody w="75%" />
                  <TBody w="65%" />
                  {/* Micro trust line */}
                  <div className="flex items-center gap-2">
                    <div className="h-px w-4 bg-gray-200" />
                    <TXs w="200px" />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <TDisplay w="30%" />
                  <TSm w="50%" />
                  <div className="flex items-center gap-3">
                    <WireBtnFilled width="w-36" />
                    <WireBtn width="w-32" />
                  </div>
                </div>
              </div>
            </div>

            <Spacer h={16} />

            {/* 3-COLUMN GRID below hero */}
            <div className="grid grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="border border-gray-100 flex flex-col">
                  <WireImg className="w-full aspect-[4/3]" />
                  <div className="p-6 flex flex-col gap-3">
                    <TEye w="100px" />
                    <TH3 w="90%" />
                    <TXs w="80%" />
                    <Spacer h={4} />
                    <TH2 w="40%" />
                    <TSm w="55%" />
                    <Spacer h={4} />
                    <WireBtn />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S6: NEW ARRIVALS — PORTRAIT CARDS ───────────────────── */}
      <SectionWrap label="S6 · New Arrivals — Portrait Cards on Alt Surface" annotation={annotations.s6} showAnnotation={showAnnotations}>
        <div className="bg-gray-50" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <Container>
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2">
                  <TEye w="130px" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                </div>
                <Spacer h={6} />
                <TH3 w="180px" />
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

            {/* Portrait cards — 3:4 ratio (taller than Concept A's 1:1) */}
            <div className="flex gap-4 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-shrink-0 flex flex-col" style={{ width: '220px' }}>
                  <div className="relative">
                    {/* Portrait 3:4 image */}
                    <WireImg className="w-full" style={{ aspectRatio: '3/4' }} />
                    {i < 2 && (
                      <div className="absolute top-2 left-2 bg-gray-800 px-2 py-0.5">
                        <div className="h-1.5 w-6 bg-gray-200" />
                      </div>
                    )}
                  </div>
                  <div className="pt-3 flex flex-col gap-2 bg-white p-3">
                    <TEye w="55%" />
                    <TH3 w="90%" />
                    <div className="h-2 bg-gray-300" style={{ width: '75%' }} />
                    <TH2 w="55%" />
                  </div>
                </div>
              ))}
              {/* Peek */}
              <div className="flex-shrink-0" style={{ width: '40px' }}>
                <WireImgLight className="w-full" style={{ aspectRatio: '3/4' }} />
              </div>
            </div>

            <Spacer h={24} />
            <div className="flex justify-center">
              <WireBtn width="w-44" />
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S7: WHY CHOOSE US — SPLIT 4/12 + 8/12 GRID ─────────── */}
      <SectionWrap label="S7 · Why Choose Us — Asymmetric 4/12 + 8/12" annotation={annotations.s7} showAnnotation={showAnnotations}>
        <div className="bg-white" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
          <Container>
            <div className="flex gap-16 items-start">
              {/* LEFT: 4/12 heading + intro */}
              <div style={{ flex: '4' }}>
                <TEye w="160px" />
                <Spacer h={16} />
                <TH1 w="85%" />
                <TH1 w="70%" />
                <Spacer h={16} />
                <TBody w="95%" />
                <TBody w="80%" />
                <TBody w="90%" />
                <Spacer h={32} />
                <WireBtn />
              </div>

              {/* RIGHT: 8/12 — 2×2 grid of differentiators */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-6">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-100 p-6 flex flex-col gap-4">
                      <div className="w-10 h-10 border border-gray-200 flex items-center justify-center">
                        <div className="w-5 h-5 bg-gray-300" />
                      </div>
                      <TH3 w="80%" />
                      <TBody w="95%" />
                      <TBody w="75%" />
                      <TBody w="85%" />
                      <Spacer h={4} />
                      {/* Specific claim line */}
                      <div className="flex items-center gap-2">
                        <div className="h-px w-3 bg-gray-300" />
                        <TXs w="160px" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </SectionWrap>

      {/* ── S8: PHYSICAL PRESENCE — FULL-WIDTH + CARDS ──────────── */}
      <SectionWrap label="S8 · Physical Presence — Full-Width Banner + Location Cards" annotation={annotations.s8} showAnnotation={showAnnotations}>
        <div className="bg-gray-900">
          {/* Full-width store image — 21:9 aspect, max brand statement */}
          <div className="relative" style={{ aspectRatio: '21/9' }}>
            <WireImgDark className="w-full h-full" />
            {/* Overlay text on image */}
            <div className="absolute inset-0 flex flex-col justify-end p-16">
              <div className="mx-auto w-full" style={{ maxWidth: '1320px' }}>
                <TH2_D w="40%" />
                <Spacer h={8} />
                <TBody_D w="50%" />
                <Spacer h={20} />
                <div className="flex items-center gap-4">
                  <WireBtnFilled dark width="w-48" />
                  <WireBtn dark width="w-44" />
                </div>
              </div>
            </div>
          </div>

          {/* 4 Location cards below image */}
          <div className="mx-auto px-10 py-12" style={{ maxWidth: '1320px' }}>
            <div className="grid grid-cols-4 gap-4">
              {['Hà Nội — Cầu Giấy', 'Hà Nội — Hoàn Kiếm', 'TP.HCM — Q.3', 'Đà Nẵng'].map((loc) => (
                <div key={loc} className="border border-gray-700 bg-gray-800 p-5 flex flex-col gap-3">
                  <TSm_D w="90%" />
                  <TBody_D w="80%" />
                  <TXs_D w="65%" />
                  <Spacer h={4} />
                  <div className="h-px bg-gray-700" />
                  <Spacer h={4} />
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-gray-500" />
                    <div className="h-px w-4 bg-gray-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrap>

      {/* ── S9: FOOTER ──────────────────────────────────────────── */}
      <SectionWrap label="S9 · Footer" annotation={annotations.s9} showAnnotation={showAnnotations}>
        <div className="bg-gray-950" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
          <Container>
            <div className="grid grid-cols-4 gap-12 mb-16">
              <div className="flex flex-col gap-4">
                <div className="h-5 w-28 bg-gray-200" />
                <TBody_D w="90%" />
                <TBody_D w="80%" />
                <TBody_D w="70%" />
                <Spacer h={8} />
                <div className="flex gap-3">
                  {[0,1,2,3].map(i => <div key={i} className="w-7 h-7 border border-gray-600" />)}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <TSm_D w="80px" />
                <Spacer h={4} />
                {[0,1,2,3,4,5,6].map(i => <TXs_D key={i} w={`${60 + i * 8}px`} />)}
              </div>
              <div className="flex flex-col gap-3">
                <TSm_D w="60px" />
                <Spacer h={4} />
                {[0,1,2,3,4].map(i => <TXs_D key={i} w={`${70 + i * 10}px`} />)}
              </div>
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
