"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endTime: string;
  size?: "sm" | "md";
  onComplete?: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

function diff(endTime: string): TimeLeft {
  const end = new Date(endTime).getTime();
  const now = Date.now();
  const totalMs = Math.max(0, end - now);
  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const seconds = Math.floor((totalMs % 60_000) / 1000);
  return { hours, minutes, seconds, totalMs };
}

export default function CountdownTimer({ endTime, size = "md", onComplete }: CountdownTimerProps) {
  const [t, setT] = useState<TimeLeft>(() => diff(endTime));

  useEffect(() => {
    const id = setInterval(() => {
      const next = diff(endTime);
      setT(next);
      if (next.totalMs <= 0) {
        clearInterval(id);
        onComplete?.();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [endTime, onComplete]);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const isUrgent = t.totalMs < 3_600_000;
  const boxSize = size === "sm" ? "w-9 h-9 text-sm" : "w-11 h-11 text-base";

  return (
    <div className={`inline-flex items-center gap-1.5 ${isUrgent ? "animate-pulse" : ""}`}>
      {[
        { label: "Giờ", val: pad(t.hours + (t.hours > 24 ? Math.floor(t.hours / 24) * 24 : 0)) },
        { label: "Phút", val: pad(t.minutes) },
        { label: "Giây", val: pad(t.seconds) },
      ].map((block, i) => (
        <div key={block.label} className="flex items-center gap-1.5">
          <div className="flex flex-col items-center">
            <span className={`${boxSize} bg-zinc-900 text-white rounded-lg flex items-center justify-center font-bold tabular-nums`}>
              {block.val}
            </span>
            {size === "md" && <span className="text-[9px] text-zinc-500 mt-0.5 uppercase tracking-wider">{block.label}</span>}
          </div>
          {i < 2 && <span className="text-zinc-900 font-bold text-lg -mx-0.5">:</span>}
        </div>
      ))}
    </div>
  );
}