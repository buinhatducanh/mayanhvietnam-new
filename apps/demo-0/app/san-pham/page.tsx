"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Backward-compat: old hash URLs (/san-pham#slug) → new dynamic route (/san-pham/slug).
// Without a hash, this page just forwards to the full product listing.
export default function ProductIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    const h = decodeURIComponent((window.location.hash || "").replace("#", ""));
    router.replace(h ? `/san-pham/${h}` : "/danh-muc");
  }, [router]);

  return (
    <div className="font-sans bg-[#fafaf8] min-h-screen flex items-center justify-center">
      <p className="m-0 text-[13.5px] text-[#a39d94]">Đang chuyển hướng...</p>
    </div>
  );
}
