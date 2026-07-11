'use client';

import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { SpecCallout } from '@/lib/adapter';

type SpecCalloutsProps = {
  progress: MotionValue<number>;
  callouts: SpecCallout[];
};

function CalloutItem({
  callout,
  side,
  progress,
  index,
}: {
  callout: SpecCallout;
  side: 'left' | 'right';
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.28 + index * 0.02;
  const opacity = useTransform(progress, [start, start + 0.06, 0.46, 0.52], [0, 1, 1, 0]);
  const x = useTransform(
    progress,
    [start, start + 0.08],
    side === 'left' ? [-40, 0] : [40, 0],
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className={`flex items-center gap-0 ${side === 'right' ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`max-w-52 rounded-lg border border-border bg-card/80 px-4 py-3 backdrop-blur-sm ${
          side === 'right' ? 'text-right' : ''
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
          {callout.target}
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">{callout.label}</p>
        <p className="text-xs text-muted-foreground">{callout.value}</p>
      </div>
      <div className="flex items-center">
        <div className="h-px w-16 bg-gradient-to-r from-primary/70 to-primary/20 md:w-28" />
        <div className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_2px] shadow-primary/50" />
      </div>
    </motion.div>
  );
}

export function SpecCallouts({ progress, callouts }: SpecCalloutsProps) {
  const left = callouts.filter((_, i) => i % 2 === 0);
  const right = callouts.filter((_, i) => i % 2 === 1);

  return (
    <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-6 md:flex lg:px-16">
      <div className="flex flex-col gap-20">
        {left.map((c, i) => (
          <CalloutItem key={c.label} callout={c} side="left" progress={progress} index={i * 2} />
        ))}
      </div>
      <div className="flex flex-col gap-20">
        {right.map((c, i) => (
          <CalloutItem key={c.label} callout={c} side="right" progress={progress} index={i * 2 + 1} />
        ))}
      </div>
    </div>
  );
}

export function SpecCalloutsMobile({ progress, callouts }: SpecCalloutsProps) {
  const opacity = useTransform(progress, [0.28, 0.34, 0.46, 0.52], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-24 flex flex-wrap items-center justify-center gap-2 px-4 md:hidden"
    >
      {callouts.map((c) => (
        <div key={c.label} className="rounded-full border border-border bg-card/80 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-xs text-foreground">{c.value}</span>
        </div>
      ))}
    </motion.div>
  );
}
