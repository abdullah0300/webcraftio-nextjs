const ROW1_WORDS = [
  { text: "AI AGENTS", filled: true },
  { text: "SAAS PLATFORMS", filled: false },
  { text: "WEB APPS", filled: true },
  { text: "MOBILE APPS", filled: false },
  { text: "DESIGN SYSTEMS", filled: true },
  { text: "AUTOMATION", filled: false },
  { text: "RAG SYSTEMS", filled: true },
];

const ROW2_WORDS = [
  { text: "LLM apps", accent: true },
  { text: "RAG & search", accent: false },
  { text: "Autonomous agents", accent: false },
  { text: "Billing", accent: false },
  { text: "Dashboards", accent: true },
  { text: "Cloud infra", accent: false },
  { text: "iOS & Android", accent: false },
  { text: "React Native", accent: false },
  { text: "Design systems", accent: true },
  { text: "Performance", accent: false },
  { text: "Fine-tuning", accent: false },
  { text: "CI/CD", accent: false },
];

function Star() {
  return (
    <span
      style={{
        color: "#6FE7C0",
        fontSize: ".4em",
        display: "inline-flex",
        alignItems: "center",
        animation: "spinSlow 9s linear infinite",
      }}
    >
      ✶
    </span>
  );
}

function Row1Repeat({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {ROW1_WORDS.map((w, i) => (
        <span key={`${keyPrefix}-${i}`} style={{ display: "contents" }}>
          <span style={w.filled ? { color: "#fff" } : { color: "transparent", WebkitTextStroke: "1.6px #6FE7C0" }}>
            {w.text}
          </span>
          <Star />
        </span>
      ))}
    </>
  );
}

function Row2Repeat({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {ROW2_WORDS.map((w, i) => (
        <span key={`${keyPrefix}-${i}`} style={{ display: "contents" }}>
          <span style={{ color: w.accent ? "#6FE7C0" : "#7A827B" }}>{w.text}</span>
          <span style={{ color: "#3A4540" }}>•</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "#15181A", padding: "52px 0", margin: "-2px 0" }}>
      <div style={{ transform: "rotate(-2deg) scale(1.06)" }}>
        <div
          className="marqueeRow"
          style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
            gap: 32,
            animation: "marquee 32s linear infinite",
            whiteSpace: "nowrap",
            fontWeight: 700,
            fontSize: "clamp(34px,5vw,74px)",
            letterSpacing: "-.02em",
            lineHeight: 1,
          }}
        >
          <Row1Repeat keyPrefix="a" />
          <Row1Repeat keyPrefix="b" />
        </div>
        <div
          className="marqueeRow"
          style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
            gap: 22,
            animation: "marquee 26s linear infinite reverse",
            whiteSpace: "nowrap",
            marginTop: 22,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 14,
            letterSpacing: ".08em",
          }}
        >
          <Row2Repeat keyPrefix="a" />
          <Row2Repeat keyPrefix="b" />
        </div>
      </div>
    </div>
  );
}
