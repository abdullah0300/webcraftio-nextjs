"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import KineticText from "./KineticText";

interface WorkProps {
  workWrapRef: React.RefObject<HTMLDivElement | null>;
  card1Ref: React.RefObject<HTMLDivElement | null>;
  card2Ref: React.RefObject<HTMLDivElement | null>;
  activeProject: number;
  openCard: number;
  narrow: boolean;
  toggleCard1: () => void;
  toggleCard2: () => void;
  closeCard: (e: React.MouseEvent) => void;
}

export default function Work({
  workWrapRef,
  card1Ref,
  card2Ref,
  activeProject,
  openCard,
  narrow,
  toggleCard1,
  toggleCard2,
  closeCard,
}: WorkProps) {
  const kineticRef2 = useRef<HTMLDivElement>(null);

  const projMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const root = e.currentTarget;
    const r = root.getBoundingClientRect();
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    const k = kineticRef2.current;
    if (!k) return;
    const R = 165;
    const S = 48;
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

  const projReset = useCallback(() => {
    const k = kineticRef2.current;
    if (!k) return;
    k.querySelectorAll<HTMLElement>("[data-c]").forEach((ch) => {
      ch.style.transform = "";
      ch.style.color = "";
    });
  }, []);

  const onProjEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const d = e.currentTarget.querySelector<HTMLElement>("[data-details]");
    if (d) d.style.transform = "translateY(0)";
  };
  const onProjLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const d = e.currentTarget.querySelector<HTMLElement>("[data-details]");
    if (d) d.style.transform = "translateY(101%)";
  };

  const projC0 = activeProject === 0 ? "#15181A" : "#C7CFC7";
  const projC1 = activeProject === 1 ? "#15181A" : "#C7CFC7";
  const detailCols = narrow ? "1fr" : "1.05fr 1fr";
  const visualDisplay = narrow ? "none" : "flex";

  const d1L = openCard === 0 ? "translate(-101%, 101%)" : "translate(0, 0)";
  const d1R = openCard === 0 ? "translate(101%, -101%)" : "translate(0, 0)";
  const d2L = openCard === 1 ? "translate(-101%, 101%)" : "translate(0, 0)";
  const d2R = openCard === 1 ? "translate(101%, -101%)" : "translate(0, 0)";
  const card1CloseDisp = openCard === 0 ? "flex" : "none";
  const card2CloseDisp = openCard === 1 ? "flex" : "none";

  return (
    <section id="work" data-screen-label="Projects" style={{ position: "relative", background: "#FAFBF8" }}>
      <div
        onMouseMove={projMove}
        onMouseLeave={projReset}
        style={{ position: "relative", maxWidth: 1180, margin: "0 auto", padding: "110px 24px 36px" }}
      >
        <div
          style={{
            position: "absolute",
            top: 8,
            left: -20,
            width: 320,
            height: 320,
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.6,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg,#C9F8E8,#8AEFD0)",
              animation: "morph 11s ease-in-out infinite, spinSlow 34s linear infinite",
              borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
            }}
          />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, letterSpacing: ".12em", color: "#0FA882" }}>
              [ SELECTED WORK / 02 ]
            </div>
            <div
              ref={kineticRef2}
              style={{
                fontSize: "clamp(54px,10.5vw,148px)",
                lineHeight: 0.84,
                letterSpacing: "-.05em",
                fontWeight: 700,
                color: "#15181A",
                display: "flex",
                marginTop: 14,
              }}
            >
              <KineticText text="OUR WORK" />
            </div>
          </div>
          <p style={{ maxWidth: 300, fontSize: 15, color: "#5C635E", margin: "0 0 16px" }}>
            A couple of our proudest builds. The kind of products that completely transform a business. Click a card to see what’s under the hood.
          </p>
        </div>
      </div>

      <div ref={workWrapRef} className="workScrollContainer" style={{ position: "relative", height: "320vh" }}>
        <div className="workStickyContent" style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <div
            className="workSelectedLabel"
            style={{
              position: "absolute",
              top: 92,
              left: "clamp(20px,5vw,64px)",
              zIndex: 6,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12,
              letterSpacing: ".12em",
              color: "#8A918B",
            }}
          >
            SELECTED WORK
          </div>
          <div
            className="workIndicator"
            style={{
              position: "absolute",
              top: "50%",
              right: "clamp(20px,5vw,64px)",
              transform: "translateY(-50%)",
              zIndex: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 8,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            <span style={{ color: projC0, transition: "color .45s" }}>01</span>
            <span style={{ width: 1, height: 22, background: "#C7CFC7", marginRight: 6 }} />
            <span style={{ color: projC1, transition: "color .45s" }}>02</span>
          </div>
          <div
            className="workScrollIndicator"
            style={{
              position: "absolute",
              bottom: 32,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 6,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              letterSpacing: ".16em",
              color: "#8A918B",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            SCROLL
            <span style={{ animation: "bob 1.6s ease-in-out infinite", color: "#0FA882", fontSize: 14 }}>↓</span>
          </div>

          {/* Card 2 layer (SmartCFO) sits behind, z-index 1 */}
          <div
            className="workCardWrapper workCard2Wrapper"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(86px,11vh,94px) clamp(16px,4vw,56px) clamp(40px,6vh,54px)",
              pointerEvents: "none",
            }}
          >
            <ProjectCard
              cardRef={card2Ref}
              num="02"
              badge="AI FINANCE"
              title="SmartCFO"
              titleBreak={false}
              description="SmartCFO isn't just AI software—it's your personal financial genius that learns, adapts, and makes decisions before you even ask."
              stats={[
                { value: "24/7", label: "ANALYSIS" },
                { value: "0", label: "ERRORS" },
                { value: "100%", label: "ADAPTIVE" },
              ]}
              tags={["AI Assistant", "Financial Genius", "Adaptive AI"]}
              detailCols={detailCols}
              visualDisplay={visualDisplay}
              gradientPos="32% 16%"
              visual={<SmartCFOVisual />}
              flipTitle="SmartCFO"
              flipDesc="Your personal financial genius that learns and adapts."
              flipBadge="AI FINANCE"
              flipYear="2026"
              siteUrl="https://smartcfo.app"
              coverImg="https://images.unsplash.com/photo-1554224155-3a58922a22c3?q=80&w=1141&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              toggleOpen={toggleCard2}
              closeCard={closeCard}
              closeDisplay={card2CloseDisp}
              dL={d2L}
              dR={d2R}
              onProjEnter={onProjEnter}
              onProjLeave={onProjLeave}
            />
          </div>

          {/* Card 1 layer (Northwind AI) sits in front, z-index 2; slides up on scroll */}
          <div
            className="workCardWrapper workCard1Wrapper"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(86px,11vh,94px) clamp(16px,4vw,56px) clamp(40px,6vh,54px)",
              pointerEvents: "none",
            }}
          >
            <ProjectCard
              cardRef={card1Ref}
              num="01"
              badge="AI SAAS PLATFORM"
              title={
                <>
                  TruckersCall
                </>
              }
              description="TruckersCall is an AI-powered Transportation Management System (TMS) designed to modernize how trucking businesses operate. The platform covers the full spectrum of fleet management — from driver apps and real-time load tracking to maintenance scheduling, broker coordination, and financial management."
              stats={[
                { value: "35%", label: "COST REDUCTION" },
                { value: "24/7", label: "LOAD TRACKING" },
                { value: "99.9%", label: "UPTIME" },
              ]}
              tags={["SaaS Platform", "Fleet Management", "AI Automation"]}
              detailCols={detailCols}
              visualDisplay={visualDisplay}
              gradientPos="68% 16%"
              visual={<TruckersCallVisual />}
              flipTitle="TruckersCall"
              flipDesc="A next-generation logistics platform built for the future of freight."
              flipBadge="TMS PLATFORM"
              flipYear="2026"
              siteUrl="https://www.truckerscall.com/"
              coverImg="/truckers.jpg"
              toggleOpen={toggleCard1}
              closeCard={closeCard}
              closeDisplay={card1CloseDisp}
              dL={d1L}
              dR={d1R}
              onProjEnter={onProjEnter}
              onProjLeave={onProjLeave}
            />
          </div>
        </div>
      </div>

      
    </section>
  );
}

interface ProjectCardProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  num: string;
  badge: string;
  title: React.ReactNode;
  titleBreak?: boolean;
  description: string;
  stats: { value: string; label: string }[];
  tags: string[];
  detailCols: string;
  visualDisplay: string;
  gradientPos: string;
  visual: React.ReactNode;
  fullBleedVisual?: boolean;
  flipTitle: string;
  flipDesc: string;
  flipBadge: string;
  flipYear: string;
  toggleOpen: () => void;
  closeCard: (e: React.MouseEvent) => void;
  closeDisplay: string;
  dL: string;
  dR: string;
  onProjEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  onProjLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
  siteUrl?: string;
  coverImg?: string;
}

function ProjectCard({
  cardRef,
  num,
  badge,
  title,
  description,
  stats,
  tags,
  detailCols,
  visualDisplay,
  gradientPos,
  visual,
  fullBleedVisual,
  flipTitle,
  flipDesc,
  flipBadge,
  flipYear,
  toggleOpen,
  closeCard,
  closeDisplay,
  dL,
  dR,
  onProjEnter,
  onProjLeave,
  siteUrl,
  coverImg,
}: ProjectCardProps) {
  return (
    <div
      ref={cardRef}
      className="projectCardContainer"
      onMouseEnter={onProjEnter}
      onMouseLeave={onProjLeave}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        border: "1px solid #E7ECE7",
        borderRadius: 32,
        overflow: "hidden",
        transform: "translateZ(0)",
        boxShadow: "0 40px 90px -42px rgba(20,70,54,.35)",
      }}
    >
      <div className="projectCardGrid" style={{ position: "absolute", inset: 0, zIndex: 1, display: "grid", gridTemplateColumns: detailCols, background: "#fff" }}>
        <div
          className="projectCardText"
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(14px,2vw,26px)",
            padding: "clamp(40px,6vw,110px) clamp(28px,6vw,90px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "#E9FBF4",
                color: "#0FA882",
                padding: "8px 15px",
                borderRadius: 999,
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 12,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#15C79A", display: "inline-block" }} />
              {badge}
            </span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, color: "#8A918B" }}>({num})</span>
          </div>
          <h3 style={{ fontSize: "clamp(38px,5.4vw,88px)", lineHeight: 0.9, letterSpacing: "-.045em", fontWeight: 700, margin: 0, color: "#15181A" }}>
            {title}
          </h3>
          <p style={{ maxWidth: 470, fontSize: "clamp(15px,1.3vw,18px)", color: "#5C635E", lineHeight: 1.55, margin: 0 }}>
            {description}
          </p>
          <div style={{ display: "flex", gap: "clamp(22px,3.4vw,52px)", marginTop: 6 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontWeight: 700, fontSize: "clamp(26px,2.6vw,40px)", letterSpacing: "-.02em", color: "#0FA882" }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#8A918B", marginTop: 4, letterSpacing: ".04em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginTop: 8 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#0FA882" }}>
              {tags.map((tag) => (
                <span key={tag} style={{ background: "#E9FBF4", padding: "7px 12px", borderRadius: 999 }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href="#start" style={{ display: "flex", alignItems: "center", gap: 11, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, color: "#15181A", textDecoration: "none" }}>
              View case
              <span
                className="viewCaseArrow"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "#15181A",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                →
              </span>
            </a>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: visualDisplay,
            overflow: "hidden",
            background: fullBleedVisual ? "#fff" : `radial-gradient(120% 100% at ${gradientPos},#DFFBF1,#9FF3D8)`,
            alignItems: "center",
            justifyContent: "center",
            padding: fullBleedVisual ? 0 : "clamp(30px,4vw,70px)",
          }}
        >
          {!fullBleedVisual && (
            <>
              <span
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: 30,
                  fontWeight: 700,
                  fontSize: "clamp(150px,20vw,320px)",
                  lineHeight: 0.7,
                  color: "rgba(255,255,255,.45)",
                  letterSpacing: "-.05em",
                  zIndex: 1,
                }}
              >
                {num}
              </span>
              <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, opacity: 0.55, zIndex: 0 }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg,#FFFFFF,#A8F5DC)",
                    animation: "morph 11s ease-in-out infinite, spinSlow 32s linear infinite",
                    borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
                  }}
                />
              </div>
            </>
          )}
          {visual}
        </div>
      </div>

      <button
        onClick={closeCard}
        className="closeCardBtn"
        style={{
          position: "absolute",
          top: "clamp(20px,3vw,34px)",
          right: "clamp(20px,3vw,34px)",
          zIndex: 6,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "#15181A",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: 18,
          display: closeDisplay,
          alignItems: "center",
          justifyContent: "center",
          transition: "transform .28s cubic-bezier(.2,1.4,.4,1), background .3s",
        }}
      >
        ×
      </button>

      <a
        href={siteUrl || "#"}
        target={siteUrl ? "_blank" : undefined}
        rel={siteUrl ? "noopener noreferrer" : undefined}
        style={{
          position: "absolute",
          bottom: "clamp(20px,3vw,34px)",
          right: "clamp(20px,3vw,34px)",
          zIndex: 6,
          background: "#fff",
          color: "#15181A",
          textDecoration: "none",
          padding: "12px 22px",
          borderRadius: 999,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 13,
          display: closeDisplay === "flex" || closeDisplay === "block" ? "inline-flex" : "none",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 16px 30px -10px rgba(20,40,33,.4)",
          transition: "transform .2s ease-out",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        Visit site ↗
      </a>

      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#CDEFE2" strokeWidth="1.5" strokeDasharray="6,6" />
      </svg>

      <FlipHalf side="left" transform={dL} onClick={toggleOpen} num={num} badge={flipBadge} year={flipYear} title={flipTitle} desc={flipDesc} coverImg={coverImg} />
      <FlipHalf side="right" transform={dR} onClick={toggleOpen} num={num} badge={flipBadge} year={flipYear} title={flipTitle} desc={flipDesc} coverImg={coverImg} />
    </div>
  );
}

function FlipHalf({
  side,
  transform,
  onClick,
  num,
  badge,
  year,
  title,
  desc,
  coverImg,
}: {
  side: "left" | "right";
  transform: string;
  onClick: () => void;
  num: string;
  badge: React.ReactNode;
  year: string;
  title: string;
  desc: string;
  coverImg?: string;
}) {
  const isImageSide = side === "right";
  const maskL = `url("data:image/svg+xml,%3Csvg width='10' height='10' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,0 0,10 10,10' fill='black' /%3E%3C/svg%3E")`;
  const maskR = `url("data:image/svg+xml,%3Csvg width='10' height='10' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,0 10,0 10,10' fill='black' /%3E%3C/svg%3E")`;

  return (
    <div
      data-cl={side === "left" ? "" : undefined}
      data-cr={side === "right" ? "" : undefined}
      onClick={onClick}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        WebkitMaskImage: side === "left" ? maskL : maskR,
        maskImage: side === "left" ? maskL : maskR,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        transform,
        transition: "transform .72s cubic-bezier(.76,0,.18,1)",
        willChange: "transform",
        cursor: "pointer",
        background: isImageSide ? "#15181A" : "#FBFCFA",
      }}
    >
      {isImageSide ? (
        <div style={{ position: "absolute", inset: 0 }}>
          {coverImg && (
            <Image
              src={coverImg}
              alt={title}
              fill
              style={{ objectFit: "cover", objectPosition: "80% 20%" }}
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(225deg, transparent 40%, rgba(21,24,26,0.3) 100%)" }} />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            padding: "clamp(24px, 5vw, 60px)",
            paddingRight: "clamp(60px, 15vw, 200px)",
            boxSizing: "border-box",
          }}
        >
          <span
            className="projectCardWatermark"
            style={{
              position: "absolute",
              top: "-5%",
              left: "-3%",
              fontWeight: 700,
              fontSize: "clamp(180px, 35vw, 540px)",
              lineHeight: 0.7,
              color: "#F1F6F2",
              letterSpacing: "-.05em",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            {num}
          </span>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 14,
              zIndex: 2,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "#E9FBF4",
                color: "#0FA882",
                padding: "8px 15px",
                borderRadius: 999,
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 12,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#15C79A", display: "inline-block" }} />
              {badge}
            </span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "#8A918B" }}>{year}</span>
          </div>
          <h3 style={{ position: "relative", zIndex: 2, fontSize: "clamp(32px, 4vw, 64px)", lineHeight: 0.88, letterSpacing: "-.05em", fontWeight: 700, margin: 0, color: "#15181A", maxWidth: "90%" }}>
            {title}
          </h3>
          <p style={{ position: "relative", zIndex: 2, maxWidth: "85%", fontSize: "clamp(13px, 1.1vw, 16px)", color: "#6B726B", lineHeight: 1.5, marginTop: 12, marginBottom: 24 }}>
            {desc}
          </p>
          <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 11, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, color: "#15181A", fontWeight: 600 }}>
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#15181A",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                transition: "transform .3s",
              }}
            >
              →
            </span>
            Explore case
          </div>
        </div>
      )}
    </div>
  );
}

const smartCfoChats = [
  {
    q: "Analyze our runway based on this month's burn rate.",
    a: "Runway is stable at 18 months. I've re-allocated $12k of unused ad spend to offset the server cost increase.",
    s1: "Optimized in 1.2s",
    s2: "100% adaptive",
  },
  {
    q: "Forecast revenue if we boost marketing spend by 15%.",
    a: "Projected MRR increases by 8.5%. CAC will rise to $240, slightly reducing short-term margins.",
    s1: "Generated in 1.8s",
    s2: "3 scenarios tested",
  },
  {
    q: "Flag any abnormal expenses from Engineering this week.",
    a: "Found 2 anomalies: a $4,500 spike in AWS egress, and a duplicate SaaS sub. I've drafted a Slack alert.",
    s1: "Audited 10k txs",
    s2: "2 risks mitigated",
  },
  {
    q: "What is our consolidated cash position across all subsidiaries?",
    a: "Consolidated cash is $8.4M. Currency fluctuations reduced EU reserves by 1.2%. I've initiated a hedge.",
    s1: "Synced 14 accounts",
    s2: "Zero discrepancy",
  }
];

function SmartCFOVisual() {
  const [chatIdx, setChatIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);

  useEffect(() => {
    setShowQuestion(true);
    setShowAnswer(false);

    const t1 = setTimeout(() => {
      setShowAnswer(true);
    }, 1500);

    const t2 = setTimeout(() => {
      setShowQuestion(false);
      setShowAnswer(false);
    }, 5500);

    const t3 = setTimeout(() => {
      setChatIdx((prev) => (prev + 1) % smartCfoChats.length);
    }, 5800);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [chatIdx]);

  const currentChat = smartCfoChats[chatIdx];

  return (
    <div
      data-mock=""
      style={{
        position: "relative",
        zIndex: 2,
        width: "min(86%, 440px)",
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 44px 90px -20px rgba(20,70,54,.6)",
        padding: 26,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        animation: "float3 7s ease-in-out infinite",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF756A" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFD36A" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#6FE7C0" }} />
        <span style={{ marginLeft: 6, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "#41463F" }}>
          smartcfo · agent
        </span>
        <span
          style={{
            marginLeft: "auto",
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#0FA882",
            animation: showAnswer ? "none" : "pulse 2s infinite",
            opacity: showAnswer ? 0.2 : 1,
            transition: "opacity 0.3s",
          }}
        ></span>
      </div>
      
      <div style={{ 
        alignSelf: "flex-start", 
        maxWidth: "84%", 
        background: "#F1F4F2", 
        color: "#41463F", 
        fontSize: 14, 
        padding: "11px 14px", 
        borderRadius: "14px 14px 14px 4px",
        opacity: showQuestion ? 1 : 0,
        transform: showQuestion ? "translateY(0)" : "translateY(4px)",
        transition: "all 0.3s ease"
      }}>
        {currentChat.q}
      </div>

      <div style={{ 
        alignSelf: "flex-end", 
        maxWidth: "88%", 
        background: "#6FE7C0", 
        color: "#0A2A22", 
        fontSize: 14, 
        padding: "11px 14px", 
        borderRadius: "14px 14px 4px 14px",
        opacity: showAnswer ? 1 : 0,
        transform: showAnswer ? "translateY(0)" : "translateY(8px)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      }}>
        {currentChat.a}
      </div>

      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 9,
        opacity: showAnswer ? 1 : 0,
        transform: showAnswer ? "translateY(0)" : "translateY(4px)",
        transition: "all 0.4s ease",
        transitionDelay: "0.1s"
      }}>
        <span style={{ background: "#15181A", color: "#fff", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, padding: "8px 14px", borderRadius: 999 }}>
          {currentChat.s1}
        </span>
        <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#7E867F" }}>{currentChat.s2}</span>
      </div>
    </div>
  );
}

const exactDesignHtml = `<div style="display: flex; align-items: flex-start; justify-content: space-between;"><div><div style="font-family: var(--font-jetbrains-mono), monospace; font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8;">New Manifest</div><div style="font-family: 'Poppins'; font-size: 17px; font-weight: 700; color: #0f172a; margin-top: 2px;">Monday dispatch</div></div><div style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; background: #fff; border: 1px solid #e5e7eb; border-radius: 9999px; font-size: 11.5px; font-weight: 600; color: #475569;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Jun 25</div></div><div style="display: flex; gap: 10px; margin-top: 16px;"><div style="flex: 1; display: flex; align-items: center; gap: 9px; padding: 10px 12px; background: #f8fafc; border: 1.5px solid #e5e7eb; border-radius: 13px;"><span style="position: relative; width: 30px; height: 30px; border-radius: 9999px; background: linear-gradient(135deg,#475569,#0f172a); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 12px;">R<span style="position: absolute; bottom: -1px; right: -1px; width: 9px; height: 9px; border-radius: 9999px; background: #0f172a; border: 2px solid #f8fafc;"></span></span><div style="min-width: 0;"><div style="font-family: var(--font-jetbrains-mono), monospace; font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8;">Driver</div><div style="font-size: 13px; font-weight: 700; color: #0f172a;">Randy Flores</div></div></div><div style="flex: 1; display: flex; align-items: center; gap: 9px; padding: 10px 12px; background: #f8fafc; border: 1.5px solid #e5e7eb; border-radius: 13px;"><span style="width: 30px; height: 30px; border-radius: 9px; background: #0f172a; display: flex; align-items: center; justify-content: center; color: #fff;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg></span><div style="min-width: 0;"><div style="font-family: var(--font-jetbrains-mono), monospace; font-size: 8.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #94a3b8;">Vehicle</div><div style="font-size: 13px; font-weight: 700; color: #0f172a;">TRK-204</div></div></div></div><div style="display: flex; align-items: center; justify-content: space-between; margin-top: 18px;"><span style="font-family: var(--font-jetbrains-mono), monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #98a2b3;">Jobs in manifest</span><span style="padding: 2px 8px; border-radius: 9999px; background: #f1f5f9; color: #475569; font-size: 11px; font-weight: 700;">2</span></div><div style="margin-top: 11px; display: flex; flex-direction: column; gap: 9px; flex: 1;"><div style="background: #fff; border: 1px solid #eef0f3; border-radius: 14px; padding: 11px 13px; display: flex; align-items: center; gap: 11px;"><span style="width: 28px; height: 28px; border-radius: 8px; background: #f1f5f9; color: #475569; display: flex; align-items: center; justify-content: center; font-family: var(--font-jetbrains-mono), monospace; font-size: 12px; font-weight: 700;">1</span><div style="flex: 1; min-width: 0;"><div style="display: flex; align-items: center; gap: 7px;"><span style="font-size: 13px; font-weight: 700; color: #0f172a;">Pacific Beverage Co.</span><span style="font-family: var(--font-jetbrains-mono), monospace; font-size: 9px; color: #475569; background: #f1f5f9; padding: 1px 6px; border-radius: 5px;">JOB-204</span></div><div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">Carson → Long Beach · 2 stops</div></div><span style="padding: 3px 9px; border-radius: 9999px; background: #f1f5f9; color: #475569; font-size: 10px; font-weight: 700;">Assigned</span></div><div style="background: #fff; border: 1px solid #eef0f3; border-radius: 14px; padding: 11px 13px; display: flex; align-items: center; gap: 11px;"><span style="width: 28px; height: 28px; border-radius: 8px; background: #f1f5f9; color: #475569; display: flex; align-items: center; justify-content: center; font-family: var(--font-jetbrains-mono), monospace; font-size: 12px; font-weight: 700;">2</span><div style="flex: 1; min-width: 0;"><div style="display: flex; align-items: center; gap: 7px;"><span style="font-size: 13px; font-weight: 700; color: #0f172a;">Harbor Freight Lines</span><span style="font-family: var(--font-jetbrains-mono), monospace; font-size: 9px; color: #475569; background: #f1f5f9; padding: 1px 6px; border-radius: 5px;">JOB-205</span></div><div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">San Pedro → Pier S · 1 stop</div></div><span style="padding: 3px 9px; border-radius: 9999px; background: #f1f5f9; color: #475569; font-size: 10px; font-weight: 700;">Assigned</span></div></div><div style="margin-top: 14px; display: flex; align-items: center; justify-content: center; gap: 8px; background: #0f172a; color: #fff; border-radius: 13px; padding: 13px; font-size: 13.5px; font-weight: 700; box-shadow: 0 10px 24px rgba(15,23,42,0.22);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>Dispatch Manifest · 2 jobs</div>`;

function TruckersCallVisual() {
  return (
    <div
      data-mock=""
      style={{
        position: "relative",
        zIndex: 2,
        width: "min(86%, 440px)",
        background: "#fff",
        borderRadius: 22,
        boxShadow: "0 44px 90px -20px rgba(20,70,54,.6)",
        padding: 26,
        display: "flex",
        flexDirection: "column",
        animation: "float3 7s ease-in-out infinite",
      }}
      dangerouslySetInnerHTML={{ __html: exactDesignHtml }}
    />
  );
}
