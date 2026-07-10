/**
 * BrandLogos — styled text brand names thay vì SVG paths không chính xác.
 * Mỗi brand có font-weight, letter-spacing, brand color đặc trưng.
 *
 * Đây là approach tốt hơn SVG paths hand-written:
 * - Luôn render chính xác, không phụ thuộc viewBox/coordinates
 * - Dễ maintain, dễ scale
 * - Recognizable với font styling riêng cho mỗi brand
 */

interface LogoProps {
  className?: string;
  size?: number;
}

/* ── Brand components ─────────────────────────────────────── */
export function CanonLogo({ className = "", size = 70 }: LogoProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap font-sans select-none ${className}`}
      style={{ fontSize: size * 0.38, fontWeight: 700, color: "currentColor", letterSpacing: "0.1em" }}
      aria-label="Canon"
    >
      Canon
    </span>
  );
}

export function SonyLogo({ className = "", size = 70 }: LogoProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap select-none ${className}`}
      style={{ fontSize: size * 0.42, fontWeight: 800, color: "currentColor", letterSpacing: "0.04em", fontFamily: "Georgia, 'Times New Roman', serif" }}
      aria-label="Sony"
    >
      Sony
    </span>
  );
}

export function NikonLogo({ className = "", size = 70 }: LogoProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap font-sans select-none ${className}`}
      style={{
        fontSize: size * 0.38,
        fontWeight: 900,
        color: "currentColor",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}
      aria-label="Nikon"
    >
      Nikon
    </span>
  );
}

export function FujifilmLogo({ className = "", size = 70 }: LogoProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap font-sans select-none ${className}`}
      style={{ fontSize: size * 0.3, fontWeight: 600, color: "currentColor", letterSpacing: "0.08em" }}
      aria-label="Fujifilm"
    >
      FUJIFILM
    </span>
  );
}

export function DJILogo({ className = "", size = 70 }: LogoProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap select-none ${className}`}
      style={{
        fontSize: size * 0.52,
        fontWeight: 900,
        color: "currentColor",
        letterSpacing: "0.12em",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
      aria-label="DJI"
    >
      DJI
    </span>
  );
}

export function SigmaLogo({ className = "", size = 70 }: LogoProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap font-sans select-none ${className}`}
      style={{ fontSize: size * 0.38, fontWeight: 700, color: "currentColor", letterSpacing: "0.14em" }}
      aria-label="Sigma"
    >
      SIGMA
    </span>
  );
}

export function TamronLogo({ className = "", size = 70 }: LogoProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap font-sans select-none ${className}`}
      style={{ fontSize: size * 0.38, fontWeight: 600, color: "currentColor", letterSpacing: "0.08em" }}
      aria-label="Tamron"
    >
      TAMRON
    </span>
  );
}

export function GodoxLogo({ className = "", size = 70 }: LogoProps) {
  return (
    <span
      className={`inline-block whitespace-nowrap font-sans select-none ${className}`}
      style={{ fontSize: size * 0.38, fontWeight: 800, color: "currentColor", letterSpacing: "0.1em" }}
      aria-label="Godox"
    >
      GODOX
    </span>
  );
}

/* ── Category slug → lucide icon ───────────────────────────── */
import {
  Camera, Aperture, Zap, Video, Headphones, Settings, Film,
  Package as PackageIcon,
} from "lucide-react";

export const CAT_ICON_MAP: Record<string, React.FC<any>> = {
  "may-anh": Camera,
  "ong-kinh": Aperture,
  "san-pham-cu": PackageIcon,
  "lap-phong-studio": Film,
  "action-camera": Video,
  "flycam": Zap,
  "thiet-bi-studio": Headphones,
  "phu-kien": Settings,
  "may-quay-phim": Video,
};
