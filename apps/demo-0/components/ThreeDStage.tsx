"use client";

import React, { useEffect, useRef } from "react";

// Khai báo kiểu TypeScript cho custom web component <glb-stage>
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'glb-stage': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
          src?: string;
          'spin-parts'?: string;
          'color-parts'?: string;
          exposure?: string;
          fit?: string;
          ref?: React.RefObject<any>;
        }, HTMLElement>;
      }
    }
  }
  namespace JSX {
    interface IntrinsicElements {
      'glb-stage': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        'spin-parts'?: string;
        'color-parts'?: string;
        exposure?: string;
        fit?: string;
        ref?: React.RefObject<any>;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

interface ThreeDStageProps {
  src: string;
  spinParts?: string;
  colorParts?: string;
  exposure?: string;
  fit?: string;
  color?: string;
  pose?: {
    x?: number;
    y?: number;
    rotY?: number;
    rotX?: number;
    scale?: number;
    opacity?: number;
    idle?: number;
    ground?: number;
  };
  onReady?: () => void;
  onError?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function ThreeDStage({
  src,
  spinParts = "",
  colorParts = "",
  exposure,
  fit,
  color,
  pose,
  onReady,
  onError,
  className,
  style
}: ThreeDStageProps) {
  const stageRef = useRef<any>(null);

  useEffect(() => {
    // Chỉ load Web Component glb-stage.js ở phía Client qua thẻ script để tránh Turbopack bundle URL externals
    const existing = document.querySelector('script[src="/glb-stage.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "/glb-stage.js";
      script.type = "module";
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const handleReady = () => {
      if (color) el.setColor(color);
      if (pose) el.setPose(pose);
      if (onReady) onReady();
    };

    const handleError = () => {
      if (onError) onError();
    };

    el.addEventListener("glb-ready", handleReady);
    el.addEventListener("glb-error", handleError);

    // Nếu element đã sẵn sàng từ trước
    if (el.ready) {
      if (color) el.setColor(color);
      if (pose) el.setPose(pose);
    }

    return () => {
      el.removeEventListener("glb-ready", handleReady);
      el.removeEventListener("glb-error", handleError);
    };
  }, [onReady, onError]);

  // Cập nhật pose khi props pose thay đổi
  useEffect(() => {
    const el = stageRef.current;
    if (el && el.ready && pose) {
      el.setPose(pose);
    }
  }, [pose]);

  // Cập nhật color khi props color thay đổi
  useEffect(() => {
    const el = stageRef.current;
    if (el && el.ready && color) {
      el.setColor(color);
    }
  }, [color]);

  return (
    <glb-stage
      ref={stageRef}
      src={src}
      spin-parts={spinParts}
      color-parts={colorParts}
      exposure={exposure}
      fit={fit}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
    />
  );
}
