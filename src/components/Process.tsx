interface ProcessProps {
  procWrapRef: React.RefObject<HTMLDivElement | null>;
  procTrackRef: React.RefObject<HTMLDivElement | null>;
  procFillRef: React.RefObject<HTMLDivElement | null>;
  procNum: string;
}

export default function Process({ procWrapRef, procTrackRef, procFillRef, procNum }: ProcessProps) {
  return (
    <section id="process" data-screen-label="Process" style={{ position: "relative" }}>
      <div ref={procWrapRef} style={{ position: "relative", height: "500vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 8, height: 5, background: "#E7ECE7" }}>
            <div
              ref={procFillRef}
              style={{ height: "100%", width: 0, background: "linear-gradient(90deg,#9FF3D8,#0FA882)", transition: "width .08s linear" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: 38,
              left: "clamp(20px,5vw,64px)",
              zIndex: 7,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 12,
              letterSpacing: ".12em",
              color: "#8A918B",
            }}
          >
            HOW WE WORK
          </div>
          <div
            style={{
              position: "absolute",
              top: 34,
              right: "clamp(20px,5vw,64px)",
              zIndex: 7,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontWeight: 700,
              fontSize: 15,
              color: "#15181A",
            }}
          >
            {procNum} <span style={{ color: "#C7CFC7" }}>/ 05</span>
          </div>
          <div ref={procTrackRef} style={{ display: "flex", width: "max-content", height: "100%", willChange: "transform" }}>
            <ProcessStep
              num="01"
              step="STEP 01 — We dig in"
              title="Discover"
              desc="Workshops, user research and a hard look at the numbers. We map the problem before anyone writes a line of code."
              checklist={["Discovery workshops", "User & market research", "A clear roadmap"]}
              bg="#FAFBF8"
              gradientPos="68% 16%"
              visual={<DiscoverVisual />}
            />
            <ProcessStep
              num="02"
              step="STEP 02 — We shape it"
              title="Design"
              desc="Wireframes become a living interface and design system — tested with real people, not guesswork."
              checklist={["Wireframes & flows", "Hi-fi UI + prototype", "A reusable design system"]}
              bg="#EFF8F3"
              gradientPos="32% 16%"
              visual={<DesignVisual />}
            />
            <ProcessStep
              num="03"
              step="STEP 03 — We build it"
              title="Development"
              desc="Clean, tested, scalable code shipped in fast iterations — you see progress every single week."
              checklist={["Weekly shipping", "Automated testing", "Code you fully own"]}
              bg="#FAFBF8"
              gradientPos="68% 16%"
              visual={<DevelopmentVisual />}
            />
            <ProcessStep
              num="04"
              step="STEP 04 — We ship it"
              title="Launch"
              desc="Zero-drama deploys with monitoring, performance tuning and a launch plan that actually lands."
              checklist={["Smooth deploys", "Monitoring & analytics", "A real launch plan"]}
              bg="#EFF8F3"
              gradientPos="32% 16%"
              visual={<LaunchVisual />}
            />
            <ProcessStep
              num="05"
              step="STEP 05 — We stick around"
              title="Support"
              desc="We don't disappear at launch. We watch, fix, iterate and grow the product right alongside you."
              checklist={["Proactive monitoring", "Ongoing iteration", "We grow with you"]}
              bg="#FAFBF8"
              gradientPos="68% 16%"
              visual={<SupportVisual />}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 7,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              letterSpacing: ".16em",
              color: "#8A918B",
              display: "flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            SCROLL <span style={{ fontSize: 14, color: "#0FA882" }}>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  num,
  step,
  title,
  desc,
  checklist,
  bg,
  gradientPos,
  visual,
}: {
  num: string;
  step: string;
  title: string;
  desc: string;
  checklist: string[];
  bg: string;
  gradientPos: string;
  visual: React.ReactNode;
}) {
  return (
    <div style={{ flex: "none", width: "100vw", height: "100%", display: "grid", gridTemplateColumns: "1.05fr 1fr", background: bg, overflow: "hidden" }}>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "clamp(14px,1.8vw,24px)",
          padding: "clamp(70px,8vw,130px) clamp(32px,6vw,96px)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "6%",
            left: "clamp(20px,5vw,80px)",
            zIndex: 0,
            fontWeight: 700,
            fontSize: "clamp(150px,24vw,400px)",
            lineHeight: 0.7,
            color: "#EBF4ED",
            letterSpacing: "-.05em",
            pointerEvents: "none",
          }}
        >
          {num}
        </span>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "clamp(14px,1.8vw,24px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, color: "#0FA882", letterSpacing: ".06em" }}>
            <span style={{ width: 30, height: 1, background: "#0FA882" }} />
            {step}
          </div>
          <h3 style={{ fontSize: "clamp(46px,6.4vw,104px)", lineHeight: 0.9, letterSpacing: "-.045em", fontWeight: 700, margin: 0, color: "#15181A" }}>
            {title}
          </h3>
          <p style={{ maxWidth: 430, fontSize: "clamp(15px,1.3vw,19px)", color: "#5C635E", lineHeight: 1.55, margin: 0 }}>{desc}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 6 }}>
            {checklist.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: "#2F3A35" }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#E9FBF4",
                    color: "#0FA882",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    flex: "none",
                  }}
                >
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: `radial-gradient(120% 100% at ${gradientPos},#DFFBF1,#9FF3D8)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(30px,4vw,72px)",
        }}
      >
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, opacity: 0.5, zIndex: 0 }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg,#FFFFFF,#A8F5DC)",
              animation: "morph 12s ease-in-out infinite, spinSlow 34s linear infinite",
              borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%",
            }}
          />
        </div>
        {visual}
      </div>
    </div>
  );
}

function VisualCard({
  animationDuration,
  children,
  dark,
}: {
  animationDuration: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        width: "min(86%,400px)",
        background: dark ? "#15181A" : "#fff",
        borderRadius: 22,
        boxShadow: dark ? "0 44px 90px -34px rgba(20,40,33,.55)" : "0 44px 90px -34px rgba(20,70,54,.5)",
        padding: 22,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: `float3 ${animationDuration} ease-in-out infinite`,
      }}
    >
      {children}
    </div>
  );
}

function DiscoverVisual() {
  return (
    <VisualCard animationDuration="7s">
      <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#8A918B", letterSpacing: ".06em" }}>
        DISCOVERY CALL
      </div>
      {["Who are your users?", "What does success look like?", "Where does it need to scale?"].map((q) => (
        <div key={q} style={{ display: "flex", alignItems: "center", gap: 11, background: "#F5FAF8", borderRadius: 13, padding: "12px 14px" }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#E9FBF4", color: "#0FA882", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flex: "none" }}>
            ?
          </span>
          <span style={{ fontSize: 13.5, color: "#41463F" }}>{q}</span>
        </div>
      ))}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 2 }}>
        <span style={{ background: "#15181A", color: "#fff", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, padding: "8px 14px", borderRadius: 999 }}>
          Roadmap drafted
        </span>
      </div>
    </VisualCard>
  );
}

function DesignVisual() {
  return (
    <VisualCard animationDuration="7.4s">
      <div style={{ display: "flex", gap: 8 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, background: "#6FE7C0" }} />
        <span style={{ width: 26, height: 26, borderRadius: 7, background: "#15181A" }} />
        <span style={{ width: 26, height: 26, borderRadius: 7, background: "#E9FBF4", border: "1px solid #C6EFDC" }} />
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#8A918B", alignSelf: "center" }}>
          tokens
        </span>
      </div>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ width: "80%", height: 13, borderRadius: 5, background: "#15181A" }} />
          <span style={{ width: "60%", height: 13, borderRadius: 5, background: "#15181A" }} />
          <span style={{ width: "90%", height: 8, borderRadius: 4, background: "#D7DDD7", marginTop: 4 }} />
          <span style={{ width: "70%", height: 8, borderRadius: 4, background: "#D7DDD7" }} />
          <span style={{ width: 88, height: 28, borderRadius: 999, background: "#6FE7C0", marginTop: 6 }} />
        </div>
        <div style={{ width: 96, height: 96, borderRadius: 16, background: "radial-gradient(circle at 32% 30%,#A8F5DC,#6FE7C0)" }} />
      </div>
    </VisualCard>
  );
}

function DevelopmentVisual() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        width: "min(88%,420px)",
        background: "#15181A",
        borderRadius: 22,
        boxShadow: "0 44px 90px -34px rgba(20,40,33,.55)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 9,
        animation: "float3 7s ease-in-out infinite",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, paddingBottom: 10, borderBottom: "1px solid #2A322E" }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF7A7A" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFD36A" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#6FE7C0" }} />
        <span style={{ marginLeft: 6, color: "#8A918B", fontSize: 11 }}>app.tsx</span>
      </div>
      <div>
        <span style={{ color: "#6FE7C0" }}>const</span> <span style={{ color: "#fff" }}>app</span>{" "}
        <span style={{ color: "#8A918B" }}>=</span> <span style={{ color: "#9FF3D8" }}>build</span>
        <span style={{ color: "#fff" }}>(</span>
        <span style={{ color: "#FFD36A" }}>spec</span>
        <span style={{ color: "#fff" }}>)</span>
      </div>
      <div style={{ color: "#8A918B" }}>{"// shipped & tested"}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
        <span style={{ color: "#6FE7C0" }}>✓</span>
        <span style={{ color: "#fff" }}>142 tests passing</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#6FE7C0" }}>✓</span>
        <span style={{ color: "#fff" }}>CI green</span>
      </div>
    </div>
  );
}

function LaunchVisual() {
  return (
    <VisualCard animationDuration="7.4s">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-.01em" }}>Deploying to production</span>
        <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#0FA882", background: "#E9FBF4", padding: "4px 9px", borderRadius: 999 }}>
          v1.0
        </span>
      </div>
      <div style={{ height: 10, borderRadius: 999, background: "#EEF3F0", overflow: "hidden" }}>
        <div style={{ width: "88%", height: "100%", borderRadius: 999, background: "linear-gradient(90deg,#9FF3D8,#0FA882)" }} />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {[
          { label: "DNS", value: "live" },
          { label: "SSL", value: "ok" },
          { label: "CDN", value: "warm" },
        ].map((item) => (
          <div key={item.label} style={{ flex: 1, background: "#F5FAF8", borderRadius: 12, padding: 11 }}>
            <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, color: "#7E867F" }}>{item.label}</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 2, color: "#0FA882" }}>{item.value}</div>
          </div>
        ))}
      </div>
    </VisualCard>
  );
}

function SupportVisual() {
  const heights = [60, 80, 55, 90, 70, 100, 85, 75, 95, 65];
  return (
    <VisualCard animationDuration="7s">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-.01em" }}>Always on</span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 10,
            color: "#0FA882",
            background: "#E9FBF4",
            padding: "4px 9px",
            borderRadius: 999,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15C79A", display: "inline-block" }} />
          99.9%
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 54 }}>
        {heights.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, background: h >= 85 ? "#0FA882" : "#9FF3D8", borderRadius: 4 }} />
        ))}
      </div>
      <div style={{ alignSelf: "flex-start", background: "#F1F4F2", color: "#41463F", fontSize: 13, padding: "10px 13px", borderRadius: "13px 13px 13px 3px" }}>
        Quick one — can we add SSO?
      </div>
      <div style={{ alignSelf: "flex-end", background: "#6FE7C0", color: "#0A2A22", fontSize: 13, padding: "10px 13px", borderRadius: "13px 13px 3px 13px" }}>
        On it. Shipping this week.
      </div>
    </VisualCard>
  );
}
