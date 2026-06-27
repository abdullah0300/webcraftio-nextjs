"use client";

import { Fragment } from "react";

interface KineticTextProps {
  text: string;
  spaceWidth?: string;
}

/**
 * Renders text as individual [data-c] spans for the magnetic hover effect.
 * A literal space in `text` renders as a fixed-width spacer span instead of
 * a magnetic character (matching the original markup's word-gap spans).
 */
export default function KineticText({ text, spaceWidth = ".32em" }: KineticTextProps) {
  return (
    <Fragment>
      {text.split("").map((ch, i) =>
        ch === " " ? (
          <span key={i} style={{ display: "inline-block", width: spaceWidth }} />
        ) : (
          <span
            key={i}
            data-c=""
            style={{
              display: "inline-block",
              transition: "transform .4s cubic-bezier(.2,.9,.3,1.4), color .3s",
              willChange: "transform",
            }}
          >
            {ch}
          </span>
        )
      )}
    </Fragment>
  );
}
