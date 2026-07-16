interface ProcessProps {
  procWrapRef: React.RefObject<HTMLDivElement | null>;
  procTrackRef: React.RefObject<HTMLDivElement | null>;
  procFillRef: React.RefObject<HTMLDivElement | null>;
  procNum: string;
}

export default function Process({ procWrapRef, procTrackRef, procFillRef, procNum }: ProcessProps) {
  return (
    <section id="process" data-screen-label="Process" className="processSection">
      {/* height is driven by --proc-steps so JS progress math stays viewport-agnostic */}
      <div ref={procWrapRef} className="processWrap">
        <div className="processStickyContent">
          <div className="processProgress">
            <div ref={procFillRef} className="processProgressFill" />
          </div>

          <div className="processEyebrow">HOW WE WORK</div>

          {/* Desktop counter — scroll-driven via procNum. On mobile each card
              carries its own number instead (see processStepCounter). */}
          <div className="processCounter">
            {procNum} <span>/ 05</span>
          </div>

          <div ref={procTrackRef} className="processTrack">
            <ProcessStep
              num="01"
              step="STEP 01 — We dig in"
              title="Discover"
              desc="Workshops, user research and a hard look at the numbers. We map the problem before anyone writes a line of code."
              checklist={["Discovery workshops", "User & market research", "A clear roadmap"]}
              tone="light"
              gradientPos="68% 16%"
              visual={<DiscoverVisual />}
            />
            <ProcessStep
              num="02"
              step="STEP 02 — We shape it"
              title="Design"
              desc="Wireframes become a living interface and design system — tested with real people, not guesswork."
              checklist={["Wireframes & flows", "Hi-fi UI + prototype", "A reusable design system"]}
              tone="mint"
              gradientPos="32% 16%"
              visual={<DesignVisual />}
            />
            <ProcessStep
              num="03"
              step="STEP 03 — We build it"
              title="Development"
              desc="Clean, tested, scalable code shipped in fast iterations — you see progress every single week."
              checklist={["Weekly shipping", "Automated testing", "Code you fully own"]}
              tone="light"
              gradientPos="68% 16%"
              visual={<DevelopmentVisual />}
            />
            <ProcessStep
              num="04"
              step="STEP 04 — We ship it"
              title="Launch"
              desc="Zero-drama deploys with monitoring, performance tuning and a launch plan that actually lands."
              checklist={["Smooth deploys", "Monitoring & analytics", "A real launch plan"]}
              tone="mint"
              gradientPos="32% 16%"
              visual={<LaunchVisual />}
            />
            <ProcessStep
              num="05"
              step="STEP 05 — We stick around"
              title="Support"
              desc="We don't disappear at launch. We watch, fix, iterate and grow the product right alongside you."
              checklist={["Proactive monitoring", "Ongoing iteration", "We grow with you"]}
              tone="light"
              gradientPos="68% 16%"
              visual={<SupportVisual />}
            />
          </div>

          <div className="processScrollHint">
            SCROLL <span>→</span>
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
  tone,
  gradientPos,
  visual,
}: {
  num: string;
  step: string;
  title: string;
  desc: string;
  checklist: string[];
  tone: "light" | "mint";
  gradientPos: string;
  visual: React.ReactNode;
}) {
  return (
    <div className={`processStepContainer processStepContainer--${tone}`}>
      {/* Mobile-only per-card counter — each slide shows its own number, so
          swiping visibly changes it with no JS scroll-syncing. */}
      <div className="processStepCounter">
        {num} <span>/ 05</span>
      </div>

      <div className="processStepText">
        <span className="processStepWatermark" aria-hidden="true">
          {num}
        </span>
        <div className="processStepInner">
          <div className="processStepEyebrow">
            <span className="processStepRule" />
            {step}
          </div>
          <h3>{title}</h3>
          <p>{desc}</p>
          <div className="processStepChecklist">
            {checklist.map((item) => (
              <div key={item} className="processStepCheckItem">
                <span className="processStepCheckIcon">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="processStepVisual"
        style={{ "--proc-gradient-pos": gradientPos } as React.CSSProperties}
      >
        <div className="processStepDecor" aria-hidden="true">
          <div className="processStepBlob" />
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
      className={`procVisualCard${dark ? " procVisualCard--dark" : ""}`}
      style={{ animationDuration }}
    >
      {children}
    </div>
  );
}

function DiscoverVisual() {
  return (
    <VisualCard animationDuration="7s">
      <div className="procCardLabel">DISCOVERY CALL</div>
      {["Who are your users?", "What does success look like?", "Where does it need to scale?"].map((q) => (
        <div key={q} className="procQuestionRow">
          <span className="procQuestionIcon">?</span>
          <span className="procQuestionText">{q}</span>
        </div>
      ))}
      <div className="procTagRow">
        <span className="procTag">Roadmap drafted</span>
      </div>
    </VisualCard>
  );
}

function DesignVisual() {
  return (
    <VisualCard animationDuration="7.4s">
      <div className="procSwatchRow">
        <span className="procSwatch procSwatch--mint" />
        <span className="procSwatch procSwatch--ink" />
        <span className="procSwatch procSwatch--pale" />
        <span className="procSwatchLabel">tokens</span>
      </div>
      <div className="procWireRow">
        <div className="procWireCol">
          <span className="procBar procBar--ink" style={{ width: "80%" }} />
          <span className="procBar procBar--ink" style={{ width: "60%" }} />
          <span className="procBar procBar--grey" style={{ width: "90%", marginTop: 4 }} />
          <span className="procBar procBar--grey" style={{ width: "70%" }} />
          <span className="procWirePill" />
        </div>
        <div className="procWireOrb" />
      </div>
    </VisualCard>
  );
}

function DevelopmentVisual() {
  return (
    <div className="procVisualCard procVisualCard--code" style={{ animationDuration: "7s" }}>
      <div className="procCodeChrome">
        <span className="procDot procDot--red" />
        <span className="procDot procDot--amber" />
        <span className="procDot procDot--mint" />
        <span className="procCodeFile">app.tsx</span>
      </div>
      <div>
        <span className="cKey">const</span> <span className="cWhite">app</span>{" "}
        <span className="cMuted">=</span> <span className="cFn">build</span>
        <span className="cWhite">(</span>
        <span className="cArg">spec</span>
        <span className="cWhite">)</span>
      </div>
      <div className="cMuted">{"// shipped & tested"}</div>
      <div className="procCodeCheck">
        <span className="cKey">✓</span>
        <span className="cWhite">142 tests passing</span>
      </div>
      <div className="procCodeCheck">
        <span className="cKey">✓</span>
        <span className="cWhite">CI green</span>
      </div>
    </div>
  );
}

function LaunchVisual() {
  return (
    <VisualCard animationDuration="7.4s">
      <div className="procCardHead">
        <span className="procCardTitle">Deploying to production</span>
        <span className="procPill">v1.0</span>
      </div>
      <div className="procDeployTrack">
        <div className="procDeployFill" />
      </div>
      <div className="procStatRow">
        {[
          { label: "DNS", value: "live" },
          { label: "SSL", value: "ok" },
          { label: "CDN", value: "warm" },
        ].map((item) => (
          <div key={item.label} className="procStat">
            <div className="procStatLabel">{item.label}</div>
            <div className="procStatValue">{item.value}</div>
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
      <div className="procCardHead">
        <span className="procCardTitle">Always on</span>
        <span className="procPill procPill--live">
          <span className="procLiveDot" />
          99.9%
        </span>
      </div>
      <div className="procBarChart">
        {heights.map((h, i) => (
          <div
            key={i}
            className={`procChartBar${h >= 85 ? " procChartBar--strong" : ""}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="procChat procChat--them">Quick one — can we add SSO?</div>
      <div className="procChat procChat--us">On it. Shipping this week.</div>
    </VisualCard>
  );
}