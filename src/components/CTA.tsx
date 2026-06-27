interface CTAProps {
  intent: number;
  setIntent: (i: number) => void;
}

const INTENT_CHIPS = ["an AI thing", "a SaaS product", "a website", "a mobile app"];
const INTENT_TEXT = ["an AI product", "a SaaS platform", "a website", "a mobile app"];

export default function CTA({ intent, setIntent }: CTAProps) {
  const intentText = intent < 0 ? "something great" : INTENT_TEXT[intent];

  return (
    <section id="start" data-screen-label="CTA" style={{ padding: "clamp(60px,7vw,100px) 24px", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "min(1180px,100%)",
          background: "linear-gradient(135deg,#EAFBF4,#D2F6E7)",
          border: "1px solid #C6EFDC",
          borderRadius: 36,
          padding: "clamp(32px,4vw,60px)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "clamp(32px,5vw,72px)",
          alignItems: "center",
        }}
      >
        <div style={{ position: "absolute", top: -90, right: "30%", width: 300, height: 300, zIndex: 0, opacity: 0.4, pointerEvents: "none" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg,#FFFFFF,#9FF3D8)",
              animation: "morph 11s ease-in-out infinite, spinSlow 30s linear infinite",
              borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
            }}
          />
        </div>
        <div style={{ position: "absolute", bottom: -90, left: -50, width: 240, height: 240, zIndex: 0, opacity: 0.4, pointerEvents: "none" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg,#BFF4E0,#6FE7C0)",
              animation: "morph 13s ease-in-out infinite reverse, spinSlow 36s linear infinite",
              borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
            }}
          />
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,.6)",
              border: "1px solid #C6EFDC",
              borderRadius: 999,
              padding: "7px 14px",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12.5,
              letterSpacing: ".03em",
              color: "#0A6B53",
            }}
          >
            <span style={{ display: "inline-block", transformOrigin: "70% 80%", animation: "wave 3s ease-in-out infinite", fontSize: 17 }}>
              👋
            </span>{" "}
            hey, we&rsquo;re WebCraftio
          </div>
          <h2 style={{ fontSize: "clamp(30px,4vw,58px)", letterSpacing: "-.035em", fontWeight: 700, margin: "18px 0 0", lineHeight: 0.98, color: "#0A2A22" }}>
            So… what are we building together?
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 22, marginTop: 26, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12.5, color: "#3F7D69", letterSpacing: ".02em" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#15C79A", display: "inline-block" }} />
              Replies in ~1 day
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#15C79A", display: "inline-block" }} />
              Free first call
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#15C79A", display: "inline-block" }} />
              We grow with you
            </span>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            background: "rgba(255,255,255,.66)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid #D2F0E2",
            borderRadius: 24,
            padding: "clamp(24px,2.6vw,34px)",
          }}
        >
          <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12, color: "#3F7D69", letterSpacing: ".06em" }}>
            I WANT TO BUILD…
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 14 }}>
            {INTENT_CHIPS.map((label, i) => (
              <button
                key={label}
                onClick={() => setIntent(i)}
                className="chipBtn"
                style={{
                  background: intent === i ? "#15181A" : "#fff",
                  color: intent === i ? "#fff" : "#15181A",
                  border: "1px solid #BCE9D5",
                  borderRadius: 999,
                  padding: "11px 18px",
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 13,
                  cursor: "pointer",
                  transition: "transform .25s cubic-bezier(.2,1.4,.4,1), background .3s, color .3s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "#2F5247", margin: "20px 0 0" }}>
            Let&rsquo;s make <strong style={{ color: "#0A6B53" }}>{intentText}</strong>. Drop your email — we&rsquo;ll reply
            within a day. No forms, no pitch.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #C6EFDC", borderRadius: 999, padding: "6px 6px 6px 18px", marginTop: 18 }}>
            <input
              type="email"
              placeholder="you@company.com"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 14,
                color: "#15181A",
                flex: 1,
                minWidth: 0,
              }}
            />
            <button
              className="ctaEmailBtn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#15181A",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "12px 20px",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "transform .28s cubic-bezier(.2,1.4,.4,1), background .3s",
              }}
            >
              Let&rsquo;s talk <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
