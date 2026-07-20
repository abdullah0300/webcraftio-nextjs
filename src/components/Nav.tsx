"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface NavProps {
  scrolled: boolean;
  navDocked: boolean;
  activeNav: number;
  navBarRef: React.RefObject<HTMLDivElement | null>;
  navFillRef: React.RefObject<HTMLDivElement | null>;
}

const LINKS = [
  { num: "01", label: "Work", href: "#work" },
  { num: "02", label: "Services", href: "#services" },
  { num: "03", label: "Process", href: "#process" },
  { num: "04", label: "About", href: "#start" },
];

export default function Nav({ scrolled, navDocked, activeNav, navBarRef, navFillRef }: NavProps) {
  const navLinksRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLDivElement>(null);
  const [navHover, setNavHover] = useState(false);

  const moveIndicatorTo = useCallback((i: number) => {
    const c = navLinksRef.current;
    const ind = indRef.current;
    if (!c || !ind) return;
    const links = c.querySelectorAll<HTMLElement>("[data-navlink]");
    if (i < 0 || !links[i]) {
      ind.style.opacity = "0";
      return;
    }
    const l = links[i];
    ind.style.opacity = "1";
    ind.style.left = l.offsetLeft + "px";
    ind.style.width = l.offsetWidth + "px";
  }, []);

  const onNavEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setNavHover(true);
    const l = e.currentTarget;
    const ind = indRef.current;
    if (!ind) return;
    ind.style.opacity = "1";
    ind.style.left = l.offsetLeft + "px";
    ind.style.width = l.offsetWidth + "px";
  };

  const onNavLeave = () => {
    setNavHover(false);
    moveIndicatorTo(activeNav);
  };

  // Keep indicator synced with activeNav whenever it changes (and we're not
  // currently hovering a link, which drives the indicator itself).
  useEffect(() => {
    if (!navHover) moveIndicatorTo(activeNav);
  }, [activeNav, navHover, moveIndicatorTo]);

  const navPad = scrolled ? "9px 12px 9px 16px" : "14px 14px 14px 20px";
  const navShadow = scrolled
    ? "0 14px 34px -14px rgba(20,50,40,.22)"
    : "0 1px 0 rgba(0,0,0,0)";
  const navWidth = navDocked ? "max-content" : "min(1180px,100%)";
  const navGap = navDocked ? "12px" : "18px";
  const navWordDisplay = navDocked ? "none" : "inline";
  const navCtaLabelDisplay = navDocked ? "none" : "inline";
  const navCtaBg = navDocked ? "transparent" : "#15181A";
  const navCtaPad = navDocked ? "4px" : "11px 10px 11px 18px";
  const navCtaArrowBg = navDocked ? "#15181A" : "#6FE7C0";
  const navCtaArrowColor = navDocked ? "#fff" : "#0A2A22";
  const navCtaArrowSize = navDocked ? "38px" : "24px";

  return (
    <nav
      className="navRoot"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        display: "flex",
        justifyContent: "center",
        padding: "18px 20px",
        pointerEvents: "none",
      }}
    >
      <div
        ref={navBarRef}
        className="navBarContainer"
        style={{
          pointerEvents: "auto",
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: navGap,
          width: navWidth,
          justifyContent: "space-between",
          background: "rgba(255,255,255,.72)",
          backdropFilter: "blur(18px) saturate(1.4)",
          WebkitBackdropFilter: "blur(18px) saturate(1.4)",
          border: "1px solid #E2EAE5",
          borderRadius: 999,
          padding: navPad,
          boxShadow: navShadow,
          transition:
            "padding .35s ease, box-shadow .4s ease, width .55s cubic-bezier(.4,.8,.2,1), gap .4s ease, transform .72s cubic-bezier(.34,1.56,.64,1), opacity .3s ease",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: 2,
            width: "100%",
            background: "transparent",
            zIndex: 0,
          }}
        >
          <div
            ref={navFillRef}
            style={{
              height: "100%",
              width: 0,
              background: "linear-gradient(90deg,#9FF3D8,#0FA882)",
              borderRadius: 999,
              transition: "width .12s linear",
            }}
          />
        </div>

        <a
          href="#top"
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 11,
            textDecoration: "none",
            color: "#15181A",
          }}
        >
          <img
            src="/webcraftio.png"
            alt="WebCraftio"
            style={{
              height: 26,
              width: "auto",
              display: "block",
            }}
          />
          <span
            className="navLogoText"
            style={{
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-.02em",
              display: navWordDisplay,
            }}
          >
            WebCraftio
          </span>
        </a>

        <div
          ref={navLinksRef}
          className="navLinksContainer"
          onMouseLeave={onNavLeave}
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div
            ref={indRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: 0,
              opacity: 0,
              background: "#E9FBF4",
              border: "1px solid #CDEFE2",
              borderRadius: 999,
              transition:
                "left .4s cubic-bezier(.4,.8,.2,1), width .4s cubic-bezier(.4,.8,.2,1), opacity .25s ease",
              zIndex: 0,
            }}
          />
          {LINKS.map((link) => (
            <a
              key={link.href}
              data-navlink=""
              className="navLinkItem"
              onMouseEnter={onNavEnter}
              href={link.href}
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 15px",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 12.5,
                textDecoration: "none",
                color: "#41463F",
              }}
            >
              <span className="linkNum" style={{ fontSize: 9, color: "#9FB8AD" }}>{link.num}</span>
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#start"
          className="navCta"
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: 9,
            background: navCtaBg,
            color: "#fff",
            textDecoration: "none",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12.5,
            padding: navCtaPad,
            borderRadius: 999,
            transition:
              "transform .25s cubic-bezier(.2,1.4,.4,1), box-shadow .3s, background .3s, padding .4s ease",
          }}
        >
          <span className="navCtaText" style={{ display: navCtaLabelDisplay }}>Start a project</span>{" "}
          <span
            style={{
              width: navCtaArrowSize,
              height: navCtaArrowSize,
              borderRadius: "50%",
              background: navCtaArrowBg,
              color: navCtaArrowColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              transition: "width .4s ease, height .4s ease, background .3s",
            }}
          >
            →
          </span>
        </a>
      </div>
    </nav>
  );
}
