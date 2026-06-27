"use client";

import { useRef, useCallback } from "react";
import KineticText from "./KineticText";

interface ServicesProps {
  activeService: number;
  setActiveService: (i: number) => void;
  clearService: () => void;
}

const SERVICES = [
  {
    num: "01",
    eyebrow: "Products that think",
    title: "AI Services",
    quickTags: ["Agents", "RAG", "Automation"],
    description: "LLM apps, autonomous agents, RAG pipelines and automation — built to actually ship, not demo.",
    bullets: ["LLM apps & copilots", "Autonomous agents", "RAG & semantic search", "Workflow automation"],
  },
  {
    num: "02",
    eyebrow: "Software that scales",
    title: "SaaS Platforms",
    quickTags: ["Billing", "Dashboards", "Infra"],
    description: "Multi-tenant products with billing, dashboards, auth and infra — engineered to scale from day one.",
    bullets: ["Multi-tenant architecture", "Billing & subscriptions", "Admin dashboards", "Cloud infra & CI/CD"],
  },
  {
    num: "03",
    eyebrow: "Sites that convert",
    title: "Web Development",
    quickTags: ["Web Apps", "Design Sys", "Perf"],
    description: "Marketing sites, web apps and design systems — fast, accessible and genuinely beautiful.",
    bullets: ["Marketing & landing sites", "Web apps", "Design systems", "Performance & SEO"],
  },
  {
    num: "04",
    eyebrow: "Apps people keep",
    title: "Mobile Apps",
    quickTags: ["iOS", "Android", "Launch"],
    description: "iOS & Android, native and React Native — from first prototype to a polished store launch.",
    bullets: ["iOS & Android", "React Native", "App store launch", "Push & analytics"],
  },
];

export default function Services({ activeService, setActiveService, clearService }: ServicesProps) {
  const kineticRef3 = useRef<HTMLDivElement>(null);

  const svcMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const root = e.currentTarget;
    const r = root.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const k = kineticRef3.current;
    if (!k) return;
    const R = 165;
    const S = 46;
    k.querySelectorAll<HTMLElement>("[data-c]").forEach((ch) => {
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
        ch.style.transform = `translate(${nx * f * S}px,${ny * f * S}px) scale(${1 + f * 0.2})`;
        ch.style.color = f > 0.45 ? "#0FA882" : "";
      } else {
        ch.style.transform = "";
        ch.style.color = "";
      }
    });
  }, []);

  const svcReset = useCallback(() => {
    const k = kineticRef3.current;
    if (!k) return;
    k.querySelectorAll<HTMLElement>("[data-c]").forEach((ch) => {
      ch.style.transform = "";
      ch.style.color = "";
    });
  }, []);

  let cols: string;
  if (activeService < 0) {
    cols = "1fr 1fr 1fr 1fr";
  } else {
    const s = [0.7, 0.7, 0.7, 0.7];
    s[activeService] = 2.9;
    cols = s.map((x) => `${x}fr`).join(" ");
  }

  return (
    <section id="services" data-screen-label="Services" style={{ padding: "110px 24px", background: "linear-gradient(180deg,#FAFBF8,#EAF6F0)" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div onMouseMove={svcMove} onMouseLeave={svcReset} style={{ position: "relative", marginBottom: 46 }}>
          <div style={{ position: "absolute", top: 0, right: -10, width: 320, height: 320, zIndex: 0, pointerEvents: "none", opacity: 0.5 }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg,#FFFFFF,#B6F7E2)",
                animation: "morph 12s ease-in-out infinite, spinSlow 32s linear infinite",
                borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
              }}
            />
          </div>
          <div style={{ position: "relative", zIndex: 2, display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
            <div>
              <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: ".12em", color: "#0FA882" }}>
                [ WHAT WE DO / 03 ]
              </div>
              <div
                ref={kineticRef3}
                style={{
                  fontSize: "clamp(48px,9.5vw,134px)",
                  lineHeight: 0.84,
                  letterSpacing: "-.05em",
                  fontWeight: 700,
                  color: "#15181A",
                  display: "flex",
                  marginTop: 14,
                }}
              >
                <KineticText text="SERVICES" />
              </div>
            </div>
            <p style={{ maxWidth: 300, fontSize: 15, color: "#5C635E", margin: "0 0 16px" }}>
              Hover a panel — it grows like our coffee consumption. One tight team shipping code, not templates.
            </p>
          </div>
        </div>

        <div
          onMouseLeave={clearService}
          style={{ display: "grid", gridTemplateColumns: cols, gap: 14, transition: "grid-template-columns .55s cubic-bezier(.22,.7,.2,1)" }}
        >
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              onMouseEnter={() => setActiveService(i)}
              className="serviceCard"
              style={{
                position: "relative",
                height: 400,
                background: "#fff",
                border: "1px solid #E7ECE7",
                borderRadius: 26,
                padding: 26,
                overflow: "hidden",
                cursor: "pointer",
                transition: "background .45s, border-color .45s, transform .45s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: 18,
              }}
            >
              <div style={{ position: "absolute", bottom: -55, right: -55, width: 200, height: 200, zIndex: 0, opacity: 0.32, pointerEvents: "none" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg,#C9F8E8,#8AEFD0)",
                    animation: `morph ${11 + i}s ease-in-out infinite, spinSlow ${30 + i * 2}s linear infinite`,
                    borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
                  }}
                />
              </div>
              <span style={{ position: "absolute", top: 10, right: 18, zIndex: 0, fontWeight: 700, fontSize: 96, lineHeight: 1, color: "#EFF5F0", letterSpacing: "-.04em" }}>
                {svc.num}
              </span>
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "#0FA882", letterSpacing: ".06em" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6FE7C0", display: "inline-block" }} />
                {svc.num} / 04
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "#8A918B", letterSpacing: ".03em", marginBottom: 9 }}>
                  {svc.eyebrow}
                </div>
                <h3 style={{ fontSize: 25, letterSpacing: "-.02em", fontWeight: 700, margin: 0 }}>{svc.title}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#0FA882" }}>
                  {svc.quickTags.map((t) => (
                    <span key={t} style={{ background: "#E9FBF4", padding: "6px 11px", borderRadius: 999 }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ opacity: activeService === i ? 1 : 0, transition: "opacity .45s ease", marginTop: 16 }}>
                  <p style={{ fontSize: 14, color: "#5C635E", lineHeight: 1.55, margin: "0 0 14px", maxWidth: 300 }}>{svc.description}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {svc.bullets.map((b) => (
                      <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#41463F" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6FE7C0", display: "inline-block", flex: "none" }} />
                        {b}
                      </div>
                    ))}
                  </div>
                  <a href="#start" className="exploreServiceLink" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "#0FA882", textDecoration: "none" }}>
                    Explore service <span style={{ fontSize: 14 }}>→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
