"use client";

import { useRef, useCallback } from "react";
import ClutchWidget from "./ClutchWidget";
import KineticText from "./KineticText";

interface HeroProps {
  heroWrapRef: React.RefObject<HTMLDivElement | null>;
  activeStage: number;
  rotIndex: number;
  goStage: (i: number) => void;
}

const ROT_WORDS = ["AI PRODUCTS", "SAAS PLATFORMS", "WEB APPS", "MOBILE APPS"];

const RAIL_ITEMS = [
  { label: "AI Services" },
  { label: "SaaS" },
  { label: "Web Dev" },
  { label: "Mobile" },
];

export default function Hero({ heroWrapRef, activeStage, rotIndex, goStage }: HeroProps) {
  const heroStageRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const kineticRef = useRef<HTMLDivElement>(null);

  const heroMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const root = e.currentTarget;
    const r = root.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;

    const b = bubbleRef.current;
    if (b) b.style.transform = `translate(${mx - 110}px,${my - 110}px)`;

    const bl = blobRef.current;
    if (bl) {
      const cx = r.width / 2;
      const cy = r.height / 2;
      bl.style.transform = `translate(${(mx - cx) * 0.05}px,${(my - cy) * 0.05}px)`;
    }

    const k = kineticRef.current;
    if (k) {
      const R = 175;
      const S = 52;
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
          ch.style.transform = `translate(${nx * f * S}px,${ny * f * S}px) scale(${1 + f * 0.22})`;
          ch.style.color = f > 0.45 ? "#0FA882" : "";
        } else {
          ch.style.transform = "";
          ch.style.color = "";
        }
      });
    }
  }, []);

  const magnetReset = useCallback(() => {
    const k = kineticRef.current;
    if (!k) return;
    k.querySelectorAll<HTMLElement>("[data-c]").forEach((ch) => {
      ch.style.transform = "";
      ch.style.color = "";
    });
  }, []);

  const a = [0, 1, 2, 3, 4].map((i) => (activeStage === i ? 1 : 0));
  const t = [0, 1, 2, 3, 4].map((i) => `translateY(${activeStage === i ? 0 : 40}px)`);
  const pe = [0, 1, 2, 3, 4].map((i) => (activeStage === i ? "auto" : "none"));
  const railY = `translateY(${(Math.max(activeStage, 1) - 1) * 48}px)`;
  const railOpacity = activeStage >= 1 ? 1 : 0;
  const railPE = activeStage >= 1 ? "auto" : "none";
  const rotY = `translateY(calc(-${rotIndex} * 1.1em))`;

  return (
    <header
      id="top"
      ref={heroWrapRef}
      data-screen-label="Hero"
      style={{ position: "relative", height: "520vh" }}
    >
      <div
        ref={heroStageRef}
        onMouseMove={heroMove}
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
      >
        {/* Floating ambient blobs */}
        <div
          style={{
            position: "absolute",
            top: -150,
            left: -100,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%,#A8F5DC,#6FE7C0)",
            filter: "blur(60px)",
            opacity: 0.45,
            animation: "floaty 18s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -130,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 40%,#C9F8E8,#8AEFD0)",
            filter: "blur(54px)",
            opacity: 0.5,
            animation: "floaty2 22s ease-in-out infinite",
            zIndex: 0,
          }}
        />

        <div
          ref={bubbleRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%,rgba(159,243,216,.5) rgba(111,231,192,0) 70%)",
            pointerEvents: "none",
            transition: "transform .7s cubic-bezier(.2,.7,.2,1)",
            zIndex: 1,
            willChange: "transform",
          }}
        />

        {/* Right-side stage rail */}
        <div
          style={{
            position: "absolute",
            right: 30,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 7,
            opacity: railOpacity,
            pointerEvents: railPE as "auto" | "none",
            transition: "opacity .45s ease",
          }}
        >
          <div style={{ position: "relative", width: 142 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 4,
                height: 40,
                background: "#DDF7EC",
                borderRadius: 13,
                transform: railY,
                transition: "transform .5s cubic-bezier(.4,.8,.2,1)",
              }}
            />
            {RAIL_ITEMS.map((item, i) => (
              <div
                key={item.label}
                onClick={() => goStage(i + 1)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 10,
                  padding: "0 14px",
                  cursor: "pointer",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 12.5,
                  color: "#15181A",
                }}
              >
                {item.label}
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#0FA882",
                    display: "inline-block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stage 0 — intro */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            overflow: "hidden",
            opacity: a[0],
            transform: t[0],
            pointerEvents: pe[0] as "auto" | "none",
            transition: "opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <div
            ref={blobRef}
            style={{
              position: "absolute",
              top: "42%",
              left: "62%",
              width: "min(46vw,560px)",
              height: "min(46vw,560px)",
              zIndex: 0,
              transition: "transform .9s cubic-bezier(.2,.7,.2,1)",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg,#B6F7E2,#6FE7C0)",
                animation: "morph 9s ease-in-out infinite, spinSlow 30s linear infinite",
                borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              top: 118,
              left: "clamp(20px,5vw,64px)",
              zIndex: 4,
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "#fff",
              border: "1px solid #E7ECE7",
              borderRadius: 999,
              padding: "8px 16px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12,
              letterSpacing: ".04em",
              color: "#41463F",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#15C79A",
                display: "inline-block",
                boxShadow: "0 0 0 4px #E9FBF4",
              }}
            />
            WEBCRAFTIO — DIGITAL PRODUCT STUDIO
          </div>

          <div
            style={{
              position: "absolute",
              top: 124,
              right: "clamp(20px,5vw,64px)",
              zIndex: 4,
              textAlign: "right",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12,
              letterSpacing: ".04em",
              color: "#8A918B",
              lineHeight: 1.95,
            }}
          >
            <div style={{ marginBottom: 4 }}>EST. 2019</div>
            <ClutchWidget />
          </div>

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "clamp(20px,5vw,64px)",
              transform: "translateY(-50%)",
              zIndex: 3,
              maxWidth: "94vw",
            }}
          >
            <div
              ref={kineticRef}
              onMouseLeave={magnetReset}
              style={{
                fontSize: "clamp(58px,13.5vw,200px)",
                lineHeight: 0.86,
                letterSpacing: "-.05em",
                fontWeight: 700,
                color: "#15181A",
                display: "flex",
              }}
            >
              <KineticText text="WE BUILD" />
            </div>
            <div
              style={{
                fontSize: "clamp(32px,7.4vw,104px)",
                lineHeight: 1.05,
                letterSpacing: "-.035em",
                fontWeight: 700,
                marginTop: ".08em",
                display: "flex",
                alignItems: "center",
                gap: ".32em",
              }}
            >
              <span style={{ color: "#BFC6BF", fontSize: ".5em", fontWeight: 500 }}>→</span>
              <span style={{ display: "inline-flex", height: "1.1em", overflow: "hidden" }}>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    transform: rotY,
                    transition: "transform .65s cubic-bezier(.6,0,.2,1)",
                    color: "#0FA882",
                  }}
                >
                  {ROT_WORDS.map((w) => (
                    <span key={w} style={{ height: "1.1em", lineHeight: "1.1em" }}>
                      {w.split(" ").join("\u00A0")}
                    </span>
                  ))}
                </span>
              </span>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 52,
              left: "clamp(20px,5vw,64px)",
              zIndex: 4,
              maxWidth: 430,
            }}
          >
            <p style={{ fontSize: 16, lineHeight: 1.5, color: "#5C635E", margin: "0 0 18px" }}>
              We don&rsquo;t just ship and leave. One tight team designs, engineers, and scales it
              — then grows with you.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a
                href="#start"
                className="liftBtn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  background: "#6FE7C0",
                  color: "#0A2A22",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "14px 24px",
                  borderRadius: 999,
                  transition: "transform .28s cubic-bezier(.2,1.4,.4,1), box-shadow .3s",
                }}
              >
                Start a project <span>→</span>
              </a>
              <a
                href="#work"
                className="liftBtnOutline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  background: "#fff",
                  border: "1px solid #E0E6E0",
                  color: "#15181A",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "14px 24px",
                  borderRadius: 999,
                  transition: "transform .28s cubic-bezier(.2,1.4,.4,1), border-color .3s",
                }}
              >
                See our work
              </a>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 46,
              right: "clamp(20px,5vw,64px)",
              zIndex: 4,
              width: 122,
              height: 122,
            }}
          >
            <svg
              viewBox="0 0 120 120"
              width="122"
              height="122"
              style={{ animation: "spinSlow 16s linear infinite", overflow: "visible" }}
            >
              <defs>
                <path id="cpath" d="M60,18 a42,42 0 1,1 0,84 a42,42 0 1,1 0,-84" />
              </defs>
              <text
                fontFamily="var(--font-jetbrains-mono), monospace"
                fontSize="10.5"
                letterSpacing="3"
                fill="#0FA882"
              >
                <textPath href="#cpath">SCROLL TO EXPLORE • SCROLL TO EXPLORE • </textPath>
              </text>
            </svg>
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "#15181A",
                animation: "bob 1.7s ease-in-out infinite",
              }}
            >
              ↓
            </span>
          </div>
        </div>

        {/* Stage 1 — AI Services */}
        <StagePanel opacity={a[1]} transform={t[1]} pointerEvents={pe[1]}>
          <StageCopy
            num="01"
            kicker="AI SERVICES"
            title={
              <>
                Agents that
                <br />
                do the work
              </>
            }
            desc="LLM apps, autonomous agents, RAG and automation — shipped into production, not demos."
            tags={["Agents", "RAG", "Automation"]}
          />
          <StageVisual cornerNum="01" cornerSide="left">
            <AgentChatMock />
          </StageVisual>
        </StagePanel>

        {/* Stage 2 — SaaS Platforms */}
        <StagePanel opacity={a[2]} transform={t[2]} pointerEvents={pe[2]}>
          <StageVisual cornerNum="02" cornerSide="right">
            <SaasDashboardMock />
          </StageVisual>
          <StageCopy
            num="02"
            kicker="SAAS PLATFORMS"
            title={
              <>
                Software that
                <br />
                scales with you
              </>
            }
            desc="Multi-tenant products with billing, dashboards, auth and infra — engineered to scale from day one."
            tags={["Billing", "Dashboards", "Infra"]}
          />
        </StagePanel>

        {/* Stage 3 — Web Development */}
        <StagePanel opacity={a[3]} transform={t[3]} pointerEvents={pe[3]}>
          <StageCopy
            num="03"
            kicker="WEB DEVELOPMENT"
            title={
              <>
                Sites that
                <br />
                convert
              </>
            }
            desc="Marketing sites, web apps and design systems — fast, accessible, and genuinely beautiful."
            tags={["Web Apps", "Design Systems", "0.2s LCP"]}
          />
          <StageVisual cornerNum="03" cornerSide="left">
            <BrowserMock />
          </StageVisual>
        </StagePanel>

        {/* Stage 4 — Mobile Apps */}
        <StagePanel opacity={a[4]} transform={t[4]} pointerEvents={pe[4]}>
          <StageVisual cornerNum="04" cornerSide="right">
            <PhoneMock />
          </StageVisual>
          <StageCopy
            num="04"
            kicker="MOBILE APPS"
            title={
              <>
                Apps people
                <br />
                keep
              </>
            }
            desc="iOS & Android, native and React Native — from first prototype to a polished store launch."
            tags={["iOS", "Android", "4.9 ★"]}
          />
        </StagePanel>
      </div>
    </header>
  );
}

/* ---------- Shared stage building blocks ---------- */

function StagePanel({
  opacity,
  transform,
  pointerEvents,
  children,
}: {
  opacity: number;
  transform: string;
  pointerEvents: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(96px,13vh,140px) clamp(28px,6vw,90px) 72px",
        opacity,
        transform,
        pointerEvents: pointerEvents as "auto" | "none",
        transition: "opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(28px,5vw,80px)",
          alignItems: "center",
          maxWidth: 1140,
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function StageCopy({
  num,
  kicker,
  title,
  desc,
  tags,
}: {
  num: string;
  kicker: string;
  title: React.ReactNode;
  desc: string;
  tags: string[];
}) {
  return (
    <div style={{ position: "relative", zIndex: 2 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 12.5,
          letterSpacing: ".1em",
          color: "#0FA882",
        }}
      >
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "1.5px solid #BFE6D8",
            background: "rgba(255,255,255,.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
          }}
        >
          {num}
        </span>
        {kicker}
        <span
          style={{
            flex: 1,
            height: 1,
            background: "linear-gradient(90deg,#BFE6D8,transparent)",
            maxWidth: 120,
          }}
        />
      </div>
      <h2
        style={{
          fontSize: "clamp(34px,5.2vw,66px)",
          letterSpacing: "-.035em",
          fontWeight: 700,
          lineHeight: 0.98,
          margin: "22px 0 0",
          color: "#15181A",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          maxWidth: 410,
          fontSize: "clamp(15px,1.4vw,18px)",
          lineHeight: 1.55,
          color: "#5C635E",
          margin: "20px 0 0",
        }}
      >
        {desc}
      </p>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 26,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 12,
          color: "#0FA882",
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              background: "#E9FBF4",
              border: "1px solid #DBF3EA",
              padding: "8px 14px",
              borderRadius: 999,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function StageVisual({
  cornerNum,
  cornerSide,
  children,
}: {
  cornerNum: string;
  cornerSide: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 480,
      }}
    >
      <span
        style={{
          position: "absolute",
          ...(cornerSide === "left" ? { left: -14 } : { right: -14 }),
          top: "42%",
          transform: "translateY(-50%)",
          fontWeight: 700,
          fontSize: "clamp(220px,30vw,420px)",
          lineHeight: 0.7,
          color: "rgba(15,168,130,.16)",
          letterSpacing: "-.05em",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {cornerNum}
      </span>
      <div
        style={{
          position: "absolute",
          top: "6%",
          ...(cornerSide === "left" ? { right: "4%" } : { left: "4%" }),
          width: 280,
          height: 280,
          opacity: 0.45,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg,#FFFFFF,#9FF3D8)",
            animation: "morph 12s ease-in-out infinite, spinSlow 34s linear infinite",
            borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
          }}
        />
      </div>
      {children}
    </div>
  );
}

function AgentChatMock() {
  return (
    <div
      data-mock=""
      style={{
        position: "relative",
        zIndex: 2,
        width: "min(100%,430px)",
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 50px 90px -38px rgba(20,70,54,.45)",
        border: "1px solid #EEF3F0",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        animation: "float3 7s ease-in-out infinite",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          paddingBottom: 12,
          borderBottom: "1px solid #EEF3F0",
        }}
      >
        <Dot color="#FF7A7A" />
        <Dot color="#FFD36A" />
        <Dot color="#6FE7C0" />
        <span style={{ marginLeft: 6, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "#41463F" }}>
          northwind · agent
        </span>
        <span
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#E9FBF4",
            color: "#0FA882",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 10,
            padding: "4px 9px",
            borderRadius: 999,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15C79A", display: "inline-block" }} />
          LIVE
        </span>
      </div>
      <Bubble align="start" bg="#F1F4F2" color="#41463F">
        Customer can&rsquo;t complete checkout.
      </Bubble>
      <Bubble align="end" bg="#6FE7C0" color="#0A2A22">
        Found it — expired token. Reissued &amp; retried the charge.
      </Bubble>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 2 }}>
        <span
          style={{
            background: "#15181A",
            color: "#fff",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            padding: "8px 14px",
            borderRadius: 999,
          }}
        >
          Resolved in 1.4s
        </span>
        <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#7E867F" }}>
          98% auto-resolved
        </span>
      </div>
    </div>
  );
}

function SaasDashboardMock() {
  const bars = [42, 58, 48, 74, 64, 100];
  const barColors = ["#CFF4E6", "#9FF3D8", "#CFF4E6", "#6FE7C0", "#9FF3D8", "#15181A"];
  return (
    <div
      data-mock=""
      style={{
        position: "relative",
        zIndex: 2,
        width: "min(100%,460px)",
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 50px 90px -38px rgba(20,70,54,.45)",
        border: "1px solid #EEF3F0",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "float3 7.6s ease-in-out infinite",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-.01em" }}>Ledgerly · Overview</span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            color: "#0FA882",
            background: "#E9FBF4",
            padding: "5px 10px",
            borderRadius: 999,
          }}
        >
          ↑ live
        </span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <StatBox label="MRR" value="$1.2M" />
        <StatBox label="SEATS" value="30,412" />
        <StatBox label="CHURN" value="1.1%" color="#0FA882" />
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 88, paddingTop: 4 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: barColors[i], borderRadius: "8px 8px 4px 4px" }} />
        ))}
      </div>
    </div>
  );
}

function BrowserMock() {
  return (
    <div
      data-mock=""
      style={{
        position: "relative",
        zIndex: 2,
        width: "min(100%,480px)",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 50px 90px -38px rgba(20,70,54,.45)",
        border: "1px solid #EEF3F0",
        overflow: "hidden",
        animation: "float3 7.2s ease-in-out infinite",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 14px",
          background: "#F5FAF8",
          borderBottom: "1px solid #EEF3F0",
        }}
      >
        <Dot color="#FF7A7A" />
        <Dot color="#FFD36A" />
        <Dot color="#6FE7C0" />
        <span
          style={{
            marginLeft: 8,
            flex: 1,
            background: "#fff",
            border: "1px solid #E7ECE7",
            borderRadius: 999,
            padding: "6px 12px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            color: "#8A918B",
          }}
        >
          webcraftio.studio
        </span>
      </div>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#6FE7C0" }} />
          <span style={{ flex: 1 }} />
          <span style={{ width: 40, height: 8, borderRadius: 4, background: "#E7ECE7" }} />
          <span style={{ width: 40, height: 8, borderRadius: 4, background: "#E7ECE7" }} />
          <span style={{ width: 64, height: 24, borderRadius: 999, background: "#15181A" }} />
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 6 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
            <span style={{ width: "90%", height: 16, borderRadius: 6, background: "#15181A" }} />
            <span style={{ width: "70%", height: 16, borderRadius: 6, background: "#15181A" }} />
            <span style={{ width: "80%", height: 9, borderRadius: 5, background: "#D7DDD7", marginTop: 4 }} />
            <span style={{ width: "55%", height: 9, borderRadius: 5, background: "#D7DDD7" }} />
            <span style={{ width: 96, height: 30, borderRadius: 999, background: "#6FE7C0", marginTop: 6 }} />
          </div>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 18,
              background: "radial-gradient(circle at 32% 30%,#A8F5DC,#6FE7C0)",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <div style={{ flex: 1, height: 54, borderRadius: 12, background: "#F1F6F3" }} />
          <div style={{ flex: 1, height: 54, borderRadius: 12, background: "#F1F6F3" }} />
          <div style={{ flex: 1, height: 54, borderRadius: 12, background: "#F1F6F3" }} />
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div
      data-mock=""
      style={{
        position: "relative",
        zIndex: 2,
        width: 238,
        height: 472,
        background: "#15181A",
        borderRadius: 42,
        padding: 9,
        boxShadow: "0 50px 88px -34px rgba(20,40,33,.5)",
        animation: "float3 7s ease-in-out infinite",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#fff",
          borderRadius: 34,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 74,
            height: 8,
            borderRadius: 999,
            background: "#15181A",
            zIndex: 2,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px 8px",
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            color: "#8A918B",
          }}
        >
          <span>9:41</span>
          <span>···</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 18px 14px" }}>
          <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "-.02em" }}>FitLoop</span>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "#6FE7C0" }} />
        </div>
        <div
          style={{
            margin: "0 16px",
            borderRadius: 18,
            background: "radial-gradient(circle at 30% 28%,#A8F5DC,#6FE7C0)",
            padding: 16,
            color: "#0A2A22",
          }}
        >
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, opacity: 0.7 }}>TODAY</div>
          <div style={{ fontWeight: 700, fontSize: 30, marginTop: 4 }}>8,420</div>
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, marginTop: 2 }}>
            steps · 92% of goal
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 16 }}>
          <SkeletonRow w1="70%" w2="45%" />
          <SkeletonRow w1="60%" w2="40%" />
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "14px 24px",
            borderTop: "1px solid #EEF3F0",
          }}
        >
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#0FA882" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#CBD3CB" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#CBD3CB" }} />
          <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#CBD3CB" }} />
        </div>
      </div>
    </div>
  );
}

function SkeletonRow({ w1, w2 }: { w1: string; w2: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 38, height: 38, borderRadius: 12, background: "#F1F6F3" }} />
      <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ width: w1, height: 9, borderRadius: 5, background: "#D7DDD7" }} />
        <span style={{ width: w2, height: 9, borderRadius: 5, background: "#E7ECE7" }} />
      </span>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span style={{ width: 9, height: 9, borderRadius: "50%", background: color }} />;
}

function StatBox({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ flex: 1, background: "#F5FAF8", borderRadius: 14, padding: 12 }}>
      <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#7E867F" }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 20, marginTop: 3, color }}>{value}</div>
    </div>
  );
}

function Bubble({
  align,
  bg,
  color,
  children,
}: {
  align: "start" | "end";
  bg: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        alignSelf: `flex-${align}`,
        maxWidth: "84%",
        background: bg,
        color,
        fontSize: 14,
        padding: "11px 14px",
        borderRadius: align === "start" ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
      }}
    >
      {children}
    </div>
  );
}
