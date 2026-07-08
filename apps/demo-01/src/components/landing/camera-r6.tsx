/**
 * Canon EOS R6 Mark II — detailed SVG illustration
 * Used as standalone product hero, not a replacement for photographic asset
 */
export function CameraR6({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 480"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Canon EOS R6 Mark II — máy ảnh mirrorless full-frame"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a35" />
          <stop offset="40%" stopColor="#16161f" />
          <stop offset="100%" stopColor="#0a0a0f" />
        </linearGradient>
        <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a24" />
          <stop offset="50%" stopColor="#0d0d14" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>
        <linearGradient id="lensGloss" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#666680" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#16161f" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="lensInner" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a2a1a" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#0a1a0a" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <radialGradient id="lensReflection" cx="35%" cy="30%" r="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3a3a48" />
          <stop offset="30%" stopColor="#2a2a35" />
          <stop offset="100%" stopColor="#1a1a24" />
        </linearGradient>
      </defs>

      {/* Camera body main shape (slight 3/4 perspective) */}
      <g>
        {/* Body shadow underneath */}
        <ellipse cx="280" cy="340" rx="190" ry="22" fill="#000000" opacity="0.55" />

        {/* Top deck — prism hump */}
        <path
          d="M 195 90 Q 200 50 240 38 L 360 38 Q 400 50 405 90 L 405 130 L 195 130 Z"
          fill="url(#bodyGrad)"
          stroke="#3a3a48"
          strokeWidth="1"
        />
        {/* Hot shoe */}
        <rect x="260" y="60" width="80" height="20" rx="2" fill="#0a0a0f" stroke="#2a2a35" strokeWidth="0.5" />
        <line x1="270" y1="70" x2="330" y2="70" stroke="#1a1a24" strokeWidth="1" />

        {/* Mode dial — left top */}
        <circle cx="180" cy="100" r="24" fill="#1a1a24" stroke="#2a2a38" strokeWidth="1" />
        <circle cx="180" cy="100" r="20" fill="#0a0a0f" />
        <text x="180" y="106" fontSize="11" fontWeight="700" fill="#ff6b35" textAnchor="middle" fontFamily="sans-serif">M</text>
        {/* Mode dial ridges */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
          <line
            key={a}
            x1={180 + 16 * Math.cos((a * Math.PI) / 180)}
            y1={100 + 16 * Math.sin((a * Math.PI) / 180)}
            x2={180 + 21 * Math.cos((a * Math.PI) / 180)}
            y2={100 + 21 * Math.sin((a * Math.PI) / 180)}
            stroke="#3a3a48"
            strokeWidth="1"
          />
        ))}

        {/* Shutter button */}
        <circle cx="225" cy="92" r="14" fill="#2a2a35" stroke="#3a3a48" strokeWidth="1" />
        <circle cx="225" cy="92" r="11" fill="#1a1a24" />
        <circle cx="225" cy="92" r="6" fill="#ff6b35" />

        {/* Top dial — right top */}
        <circle cx="360" cy="100" r="22" fill="#1a1a24" stroke="#2a2a38" strokeWidth="1" />
        <circle cx="360" cy="100" r="18" fill="#0a0a0f" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1={360 + 14 * Math.cos((a * Math.PI) / 180)}
            y1={100 + 14 * Math.sin((a * Math.PI) / 180)}
            x2={360 + 19 * Math.cos((a * Math.PI) / 180)}
            y2={100 + 19 * Math.sin((a * Math.PI) / 180)}
            stroke="#3a3a48"
            strokeWidth="1"
          />
        ))}

        {/* Power switch */}
        <rect x="280" y="68" width="40" height="14" rx="4" fill="#0a0a0f" stroke="#2a2a35" strokeWidth="0.5" />
        <rect x="284" y="71" width="14" height="8" rx="2" fill="#ff6b35" />

        {/* Brand label "Canon" on top */}
        <text
          x="300"
          y="120"
          fontSize="18"
          fontWeight="800"
          fill="#f0f0f5"
          textAnchor="middle"
          fontFamily="serif"
          letterSpacing="0.05em"
        >
          Canon
        </text>

        {/* Main body */}
        <path
          d="M 145 130 L 455 130 L 460 280 Q 460 320 420 330 L 320 330 L 300 360 L 250 360 L 230 330 L 175 330 Q 140 320 140 280 Z"
          fill="url(#bodyGrad)"
          stroke="#3a3a48"
          strokeWidth="1"
        />

        {/* Grip — left side */}
        <path
          d="M 145 145 L 145 295 Q 145 315 165 322 L 200 330 L 200 145 Q 200 130 185 130 L 160 130 Q 145 130 145 145 Z"
          fill="url(#gripGrad)"
          stroke="#2a2a35"
          strokeWidth="0.5"
        />
        {/* Grip ridges */}
        {[150, 165, 180, 195, 210, 225, 240, 255, 270, 285].map((y) => (
          <line key={y} x1="160" y1={y} x2="195" y2={y + 2} stroke="#0a0a0f" strokeWidth="0.5" opacity="0.7" />
        ))}

        {/* EVF bump on left */}
        <rect x="148" y="158" width="18" height="32" rx="2" fill="#0a0a0f" stroke="#2a2a35" strokeWidth="0.5" />

        {/* Model label */}
        <text x="320" y="170" fontSize="14" fontWeight="700" fill="#f0f0f5" textAnchor="middle" fontFamily="sans-serif">
          EOS R6
        </text>
        <text x="320" y="188" fontSize="9" fontWeight="600" fill="#ff6b35" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.1em">
          Mark II
        </text>

        {/* Top-right "R6" badge */}
        <rect x="410" y="145" width="35" height="14" rx="3" fill="#0a0a0f" stroke="#2a2a35" strokeWidth="0.5" />
        <text x="427" y="155" fontSize="9" fontWeight="700" fill="#8888a0" textAnchor="middle" fontFamily="sans-serif">R6</text>

        {/* LCD screen (back) */}
        <rect x="220" y="200" width="135" height="90" rx="4" fill="#0d0d14" stroke="#2a2a38" strokeWidth="1" />
        <rect x="223" y="203" width="129" height="84" rx="3" fill="url(#lensInner)" opacity="0.6" />
        {/* Screen reflection */}
        <path d="M 225 205 L 260 205 L 240 245 L 225 245 Z" fill="url(#lensReflection)" opacity="0.4" />

        {/* Buttons beside LCD */}
        <circle cx="370" cy="225" r="4" fill="#2a2a35" />
        <circle cx="370" cy="245" r="4" fill="#2a2a35" />
        <circle cx="370" cy="265" r="4" fill="#2a2a35" />

        {/* Mount + lens throat */}
        <circle cx="320" cy="265" r="58" fill="#0a0a0f" stroke="#2a2a35" strokeWidth="1" />
        <circle cx="320" cy="265" r="55" fill="url(#lensGrad)" />

        {/* Lens barrel */}
        <g>
          {/* Lens body (large) */}
          <circle cx="320" cy="265" r="62" fill="url(#lensGrad)" stroke="#3a3a48" strokeWidth="0.5" />
          <circle cx="320" cy="265" r="58" fill="#0a0a0f" />

          {/* Red ring (Canon L-style indicator) */}
          <circle cx="320" cy="265" r="56" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.95" />

          {/* Focus ring ridges */}
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i / 60) * Math.PI * 2;
            const r1 = 50;
            const r2 = 58;
            return (
              <line
                key={i}
                x1={320 + r1 * Math.cos(a)}
                y1={265 + r1 * Math.sin(a)}
                x2={320 + r2 * Math.cos(a)}
                y2={265 + r2 * Math.sin(a)}
                stroke="#2a2a35"
                strokeWidth="0.4"
                opacity="0.6"
              />
            );
          })}

          {/* Inner glass element */}
          <circle cx="320" cy="265" r="42" fill="url(#lensInner)" />
          <circle cx="320" cy="265" r="42" fill="url(#lensReflection)" />
          {/* Specular highlight */}
          <ellipse cx="302" cy="248" rx="14" ry="10" fill="#ffffff" opacity="0.15" />
          <ellipse cx="304" cy="247" rx="6" ry="4" fill="#ffffff" opacity="0.25" />

          {/* Lens text ring */}
          <text
            x="320"
            y="208"
            fontSize="6"
            fontWeight="600"
            fill="#aaaaBB"
            textAnchor="middle"
            fontFamily="monospace"
            letterSpacing="0.05em"
          >
            CANON LENS RF 24-70mm F2.8 L IS USM
          </text>
        </g>

        {/* Strap lugs */}
        <rect x="142" y="155" width="8" height="10" rx="1" fill="#1a1a24" />
        <rect x="450" y="155" width="8" height="10" rx="1" fill="#1a1a24" />

        {/* Bottom plate details */}
        <rect x="270" y="350" width="60" height="6" rx="1" fill="#0a0a0f" />
        <rect x="370" y="350" width="20" height="6" rx="1" fill="#0a0a0f" />

        {/* Tripod mount hint */}
        <circle cx="310" cy="320" r="3" fill="#3a3a48" opacity="0.4" />
      </g>
    </svg>
  );
}
