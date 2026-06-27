"use client";

import { useRef, useCallback, type RefObject } from "react";

/**
 * Magnetic letter effect: characters with [data-c] (or a custom selector)
 * inside the container are pulled toward the cursor when within radius R.
 */
export function useMagnetic<T extends HTMLElement>(
  selector: string = "[data-c]"
) {
  const ref = useRef<T | null>(null);

  const apply = useCallback(
    (
      clientX: number,
      clientY: number,
      R: number,
      S: number,
      scale: number,
      yFactor: number,
      color: string,
      relativeTo?: DOMRect
    ) => {
      const container = ref.current;
      if (!container) return;
      const items = container.querySelectorAll<HTMLElement>(selector);
      const baseRect = relativeTo;
      items.forEach((ch) => {
        const cr = ch.getBoundingClientRect();
        const ccx = baseRect ? cr.left - baseRect.left + cr.width / 2 : cr.left + cr.width / 2;
        const ccy = baseRect ? cr.top - baseRect.top + cr.height / 2 : cr.top + cr.height / 2;
        const dx = ccx - clientX;
        const dy = ccy - clientY;
        const d = Math.hypot(dx, dy);
        if (d < R) {
          const f = (R - d) / R;
          const nx = dx / (d || 1);
          const ny = dy / (d || 1);
          ch.style.transform =
            `translate(${nx * f * S}px,${ny * f * S * yFactor}px)` +
            (scale ? ` scale(${1 + f * scale})` : "");
          ch.style.color = f > 0.4 ? color : "";
        } else {
          ch.style.transform = "";
          ch.style.color = "";
        }
      });
    },
    [selector]
  );

  const reset = useCallback(() => {
    const container = ref.current;
    if (!container) return;
    container.querySelectorAll<HTMLElement>(selector).forEach((ch) => {
      ch.style.transform = "";
      ch.style.color = "";
    });
  }, [selector]);

  return { ref: ref as RefObject<T | null>, apply, reset };
}
