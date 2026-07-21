"use client";

import { useCallback } from "react";
import Script from "next/script";

interface FooterProps {
  footRef: React.RefObject<HTMLDivElement | null>;
  footerRef?: React.RefObject<HTMLElement | null>;
  year: number;
}

const SERVICES_LINKS = ["AI Services", "SaaS Platforms", "Web Development", "Mobile Apps"];
const STUDIO_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#start" },
];
const CONNECT_LINKS = [
  { label: "info@webcraftio.com", href: "#start" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function Footer({ footRef, footerRef, year }: FooterProps) {
  const footMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const k = footRef.current;
      if (!k) return;
      const r = k.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      const R = 200;
      const S = 30;
      k.querySelectorAll<HTMLElement>("[data-fc]").forEach((ch) => {
        const cr = ch.getBoundingClientRect();
        const ccx = cr.left - r.left + cr.width / 2;
        const ccy = cr.top - r.top + cr.height / 2;
        const dx = ccx - mx;
        const dy = ccy - my;
        const d = Math.hypot(dx, dy);
        if (d < R) {
          const f = (R - d) / R;
          const nx = dx / (d || 1);
          const ny = dy / (d || 1);
          ch.style.transform = `translate(${nx * f * S}px,${ny * f * S * 0.6}px)`;
          ch.style.color = f > 0.4 ? "#6FE7C0" : "";
        } else {
          ch.style.transform = "";
          ch.style.color = "";
        }
      });
    },
    [footRef]
  );

  const footReset = useCallback(() => {
    const k = footRef.current;
    if (!k) return;
    k.querySelectorAll<HTMLElement>("[data-fc]").forEach((ch) => {
      ch.style.transform = "";
      ch.style.color = "";
    });
  }, [footRef]);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={footerRef as React.RefObject<HTMLElement>}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg,#FAFBF8,#E4F6EE)",
        color: "#15181A",
        borderTop: "1px solid #D5EEE2",
        padding: "clamp(56px,7vw,96px) clamp(20px,5vw,64px) 32px",
      }}
    >
      <div style={{ position: "absolute", top: -90, right: -60, width: 340, height: 340, zIndex: 0, opacity: 0.4, pointerEvents: "none" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg,#6FE7C0,#0FA882)",
            animation: "morph 13s ease-in-out infinite, spinSlow 40s linear infinite",
            borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between" }}>
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <img
                src="/webcraftio.png"
                alt="WebCraftio"
                style={{
                  height: 26,
                  width: "auto",
                  display: "block",
                }}
              />
              <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "-.02em" }}>WebCraftio</span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#5C635E", margin: "18px 0 0" }}>
              We don&rsquo;t just build — we grow with you. A digital product studio shipping AI, SaaS, web and
              mobile.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 20, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "#0A6B53" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#15C79A", display: "inline-block", boxShadow: "0 0 0 4px #DBF6EC" }} />
              Available for new projects
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(36px,5vw,72px)" }}>
            <FooterColumn heading="SERVICES">
              {SERVICES_LINKS.map((label) => (
                <a key={label} href="#services" className="footerLink" style={{ color: "#41463F", textDecoration: "none", fontSize: 15, transition: "color .25s" }}>
                  {label}
                </a>
              ))}
            </FooterColumn>
            <FooterColumn heading="STUDIO">
              {STUDIO_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="footerLink" style={{ color: "#41463F", textDecoration: "none", fontSize: 15, transition: "color .25s" }}>
                  {link.label}
                </a>
              ))}
            </FooterColumn>
            <FooterColumn heading="CONNECT">
              {CONNECT_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="footerLink" style={{ color: "#41463F", textDecoration: "none", fontSize: 15, transition: "color .25s" }}>
                  {link.label}
                </a>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div
          ref={footRef}
          onMouseMove={footMove}
          onMouseLeave={footReset}
          style={{
            margin: "clamp(48px,6vw,88px) 0 0",
            display: "flex",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "clamp(54px,15vw,230px)",
            lineHeight: 0.82,
            letterSpacing: "-.05em",
            whiteSpace: "nowrap",
            cursor: "default",
          }}
        >
          {"WEBCRAFTIO".split("").map((ch, i) => (
            <span key={i} data-fc="" style={{ display: "inline-block", transition: "transform .4s cubic-bezier(.2,.9,.3,1.4), color .3s" }}>
              {ch}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: "clamp(36px,5vw,64px)",
            paddingTop: 24,
            borderTop: "1px solid #CFE7DC",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12,
            color: "#6E7B73",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <a
              href="//www.dmca.com/Protection/Status.aspx?ID=d89a7a13-fe94-46e8-9b29-0079d8fe6170"
              title="DMCA.com Protection Status"
              className="dmca-badge"
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <img
                src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-05.png?ID=d89a7a13-fe94-46e8-9b29-0079d8fe6170"
                alt="DMCA.com Protection Status"
              />
            </a>
            © {year} WebCraftio — Handcrafted from scratch. No templates, just pure vibes.
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a href="#" className="footerLink" style={{ color: "#6E7B73", textDecoration: "none", transition: "color .25s" }}>
              Privacy
            </a>
            <a href="#" className="footerLink" style={{ color: "#6E7B73", textDecoration: "none", transition: "color .25s" }}>
              Terms
            </a>
            <button
              onClick={toTop}
              className="backToTop"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#15181A",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "9px 16px",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 12,
                cursor: "pointer",
                transition: "transform .28s cubic-bezier(.2,1.4,.4,1), background .3s",
              }}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
      <Script id="dmca-badge-helper" src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" strategy="lazyOnload" />
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, letterSpacing: ".12em", color: "#8A918B" }}>
        {heading}
      </div>
      {children}
    </div>
  );
}
