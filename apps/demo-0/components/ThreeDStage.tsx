"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
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
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Nếu custom element đã được đăng ký sẵn → script đã load
    if (customElements.get("glb-stage")) {
      setScriptLoaded(true);
      return;
    }

    let script = document.querySelector('script[data-glb-stage]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.src = "/glb-stage.js";
      script.type = "module";
      script.setAttribute("data-glb-stage", "true");
      document.head.appendChild(script);
    }

    const onLoaded = () => setScriptLoaded(true);
    const onErrored = () => setLoadError(true);
    script.addEventListener("load", onLoaded);
    script.addEventListener("error", onErrored);

    // Nếu script đã được execute (custom element đã đăng ký)
    const checkInterval = setInterval(() => {
      if (customElements.get("glb-stage")) {
        setScriptLoaded(true);
        clearInterval(checkInterval);
      }
    }, 200);

    // Timeout 10s — nếu CDN blocked hoặc script lỗi
    const timeout = setTimeout(() => {
      if (!customElements.get("glb-stage")) {
        console.warn("[ThreeDStage] glb-stage.js did not register custom element in 10s");
        setLoadError(true);
      }
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      script?.removeEventListener("load", onLoaded);
      script?.removeEventListener("error", onErrored);
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
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

    if (el.ready) {
      if (color) el.setColor(color);
      if (pose) el.setPose(pose);
    }

    return () => {
      el.removeEventListener("glb-ready", handleReady);
      el.removeEventListener("glb-error", handleError);
    };
  }, [onReady, onError]);

  useEffect(() => {
    const el = stageRef.current;
    if (el && el.ready && pose) {
      el.setPose(pose);
    }
  }, [pose]);

  useEffect(() => {
    const el = stageRef.current;
    if (el && el.ready && color) {
      el.setColor(color);
    }
  }, [color]);

  // Fallback UI nếu script load lỗi
  if (loadError) {
    return (
      <div
        className={className}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: "12px",
          fontFamily: "monospace",
          textAlign: "center",
          ...style,
        }}
      >
        <span>3D Viewer không khả dụng<br />{src}</span>
      </div>
    );
  }

  // Đợi script load xong mới render custom element
  if (!scriptLoaded) {
    return (
      <div
        className={className}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.3)",
          fontSize: "11px",
          fontFamily: "monospace",
          ...style,
        }}
      >
        Đang tải 3D...
      </div>
    );
  }

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