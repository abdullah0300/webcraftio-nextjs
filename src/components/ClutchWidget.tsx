"use client";

import { useEffect, useRef } from "react";

export default function ClutchWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Only inject once
    if (containerRef.current.querySelector("script")) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://widget.clutch.co/static/js/widget.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.CLUTCHCO) {
        // @ts-ignore
        window.CLUTCHCO.Init();
      }
    };
    
    // Append the script right next to the widget div
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div ref={containerRef} style={{ display: "inline-block", width: "100%", maxWidth: 200, marginTop: 4 }}>
      <div
        className="clutch-widget"
        data-url="https://widget.clutch.co"
        data-widget-type="2"
        data-height="45"
        data-nofollow="false"
        data-expandifr="true"
        data-scale="100"
        data-clutchcompany-id="2367596"
      ></div>
    </div>
  );
}
