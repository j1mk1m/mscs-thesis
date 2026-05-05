const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Gyeongwon James Kim";
pres.title = "Dissecting Reinforcement Learning";

// ── Palette — CMU Official Colors ────────────────────────────────────────────
const C = {
  navy:      "000000",   // Black  — dominant dark (headers, bars, title bg)
  blue:      "C41230",   // Carnegie Red — primary accent
  accent:    "C41230",   // Carnegie Red — same as blue for highlight uses
  lightBg:   "F8F8F8",   // near-white slide background
  white:     "FFFFFF",
  offWhite:  "F0F0F0",
  text:      "1A1A1A",   // near-black body
  muted:     "6D6E71",   // Iron Gray — captions / sub-text
  teal:      "6D6E71",   // Iron Gray — replaces teal
  orange:    "C41230",   // Carnegie Red — replaces orange
  lime:      "6D6E71",   // Iron Gray — replaces lime
  red:       "C41230",   // Carnegie Red
};

// Helper: shadow factory (fresh object each call, avoids PptxGenJS mutation bug)
const mkShadow = () => ({ type: "outer", color: "000000", blur: 6, offset: 3, angle: 135, opacity: 0.12 });

// ── Shared helpers ────────────────────────────────────────────────────────────
function addHeader(slide, title, subtitle) {
  // Navy top bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy }
  });
  slide.addText(title, {
    x: 0.4, y: 0, w: 9.2, h: 0.72,
    fontSize: 22, bold: true, color: C.white, valign: "middle",
    fontFace: "Calibri", margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.4, y: 0.74, w: 9.2, h: 0.36,
      fontSize: 13, color: C.blue, fontFace: "Calibri", italic: true, margin: 0
    });
  }
}

function addFooter(slide, label) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.4, w: 10, h: 0.225,
    fill: { color: C.navy }, line: { color: C.navy }
  });
  slide.addText("Gyeongwon James Kim  ·  CMU  ·  May 2026", {
    x: 0.3, y: 5.4, w: 6, h: 0.225,
    fontSize: 8, color: C.white, fontFace: "Calibri", valign: "middle", margin: 0
  });
  if (label) {
    slide.addText(label, {
      x: 7, y: 5.4, w: 2.7, h: 0.225,
      fontSize: 8, color: C.accent, fontFace: "Calibri", valign: "middle",
      align: "right", margin: 0
    });
  }
}

function card(slide, x, y, w, h) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white }, line: { color: "D0D0D0", pt: 1 },
    shadow: mkShadow()
  });
}

function accentCard(slide, x, y, w, h, color) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: color || C.navy }, line: { color: color || C.navy }
  });
}

// ── SLIDE 1: Title ────────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Large decorative accent block top-right
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 0, w: 2.5, h: 5.625,
    fill: { color: C.blue, transparency: 60 }, line: { color: C.blue, transparency: 60 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.8, y: 0, w: 1.2, h: 5.625,
    fill: { color: C.accent, transparency: 70 }, line: { color: C.accent, transparency: 70 }
  });

  // Title
  s.addText("Dissecting Reinforcement Learning", {
    x: 0.55, y: 1.0, w: 7.2, h: 1.0,
    fontSize: 34, bold: true, color: C.white, fontFace: "Calibri", valign: "bottom", margin: 0
  });
  s.addText("Mechanisms Behind Compositional Reasoning in LLMs", {
    x: 0.55, y: 2.05, w: 7.2, h: 0.7,
    fontSize: 19, color: C.accent, fontFace: "Calibri", italic: false, margin: 0
  });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 2.82, w: 3.0, h: 0.045,
    fill: { color: C.accent }, line: { color: C.accent }
  });

  // Meta
  s.addText([
    { text: "Gyeongwon James Kim", options: { bold: true, breakLine: true } },
    { text: "Advisor: Chenyan Xiong", options: { breakLine: true } },
    { text: "Carnegie Mellon University  ·  May 2026" }
  ], {
    x: 0.55, y: 2.95, w: 6.5, h: 1.3,
    fontSize: 14, color: "E0E0E0", fontFace: "Calibri", margin: 0
  });
}

// ── SLIDE 2: The Rise of Large Reasoning Models ────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };
  addHeader(s, "The Rise of Large Reasoning Models");
  addFooter(s, "Motivation");

  // Left: narrative
  s.addText("LLMs can now solve problems once considered far beyond reach", {
    x: 0.4, y: 0.85, w: 5.5, h: 0.55,
    fontSize: 15, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });

  s.addText([
    { text: "Competition mathematics", options: { bullet: true, breakLine: true } },
    { text: "Graduate-level science questions", options: { bullet: true, breakLine: true } },
    { text: "Complex multi-step code generation", options: { bullet: true } }
  ], {
    x: 0.4, y: 1.45, w: 5.3, h: 1.1,
    fontSize: 13, color: C.text, fontFace: "Calibri"
  });

  s.addText("The key ingredient: Reinforcement Learning with Verifiable Rewards (RLVR)", {
    x: 0.4, y: 2.65, w: 5.4, h: 0.55,
    fontSize: 14, bold: true, color: C.teal, fontFace: "Calibri", margin: 0
  });

  // RLVR loop illustration (right side)
  // Card background
  card(s, 6.1, 0.85, 3.5, 3.6);

  s.addText("RLVR Training Loop", {
    x: 6.1, y: 0.88, w: 3.5, h: 0.4,
    fontSize: 11, bold: true, color: C.navy, fontFace: "Calibri", align: "center", margin: 0
  });

  const steps = [
    { label: "Model generates", sub: "candidate solutions", color: "6D6E71" },
    { label: "Verifier checks", sub: "correctness (no human labels)", color: "000000" },
    { label: "Model updates", sub: "to produce better solutions", color: "C41230" },
  ];

  steps.forEach((step, i) => {
    const sy = 1.38 + i * 0.95;
    s.addShape(pres.shapes.OVAL, {
      x: 6.25, y: sy, w: 0.42, h: 0.42,
      fill: { color: step.color }, line: { color: step.color }
    });
    s.addText(String(i + 1), {
      x: 6.25, y: sy, w: 0.42, h: 0.42,
      fontSize: 13, bold: true, color: C.white, fontFace: "Calibri",
      align: "center", valign: "middle", margin: 0
    });
    s.addText(step.label, {
      x: 6.78, y: sy, w: 2.7, h: 0.25,
      fontSize: 12, bold: true, color: C.text, fontFace: "Calibri", margin: 0
    });
    s.addText(step.sub, {
      x: 6.78, y: sy + 0.23, w: 2.7, h: 0.22,
      fontSize: 10, color: C.muted, fontFace: "Calibri", margin: 0
    });
    // Arrow
    if (i < 2) {
      s.addShape(pres.shapes.LINE, {
        x: 6.43, y: sy + 0.44, w: 0, h: 0.49,
        line: { color: C.muted, width: 1.5, dashType: "dash" }
      });
    }
  });

  // Key claim bottom
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 3.32, w: 5.35, h: 0.95,
    fill: { color: "F5F5F5" }, line: { color: C.accent, pt: 1.5 }
  });
  s.addText("Result: Models produce extended chains of reasoning that scale inference-time compute and tackle increasingly complex problems", {
    x: 0.55, y: 3.37, w: 5.1, h: 0.85,
    fontSize: 12, color: C.navy, fontFace: "Calibri", valign: "middle"
  });
}

// ── SLIDE 3: The Open Question ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };
  addHeader(s, "The Open Question: Why Does RL Work?");
  addFooter(s, "Motivation");

  s.addText("RL training is bundled with many ingredients — which one actually drives reasoning?", {
    x: 0.4, y: 0.85, w: 9.2, h: 0.5,
    fontSize: 15, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });

  // Three hypothesis cards
  const hyps = [
    {
      icon: "🔍", title: "Sharpening",
      body: "RL concentrates probability mass on outputs already latent in the base model — improving pass@1 without fundamentally expanding capabilities",
      color: "6D6E71",
      ref: "Yue et al., 2025"
    },
    {
      icon: "🔄", title: "On-Policy Data",
      body: "The key is alignment between training data and the model's current distribution — RL avoids off-policy bias of static supervised datasets",
      color: "000000",
      ref: "Chen et al., 2025"
    },
    {
      icon: "⛔", title: "Negative Feedback",
      body: "Unlike SFT, RL explicitly penalizes incorrect outputs — this negative signal drives the model to avoid failure modes and explore new solutions",
      color: "C41230",
      ref: "Tian et al., 2026"
    }
  ];

  hyps.forEach((h, i) => {
    const x = 0.38 + i * 3.12;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.48, w: 2.95, h: 3.0,
      fill: { color: C.white }, line: { color: "D0D0D0", pt: 1 },
      shadow: mkShadow()
    });
    // Top color bar
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.48, w: 2.95, h: 0.25,
      fill: { color: h.color }, line: { color: h.color }
    });
    s.addText(h.title, {
      x: x + 0.15, y: 1.78, w: 2.65, h: 0.38,
      fontSize: 14, bold: true, color: h.color, fontFace: "Calibri", margin: 0
    });
    s.addText(h.body, {
      x: x + 0.15, y: 2.18, w: 2.65, h: 1.6,
      fontSize: 11, color: C.text, fontFace: "Calibri"
    });
    s.addText(h.ref, {
      x: x + 0.15, y: 3.9, w: 2.65, h: 0.35,
      fontSize: 9, italic: true, color: C.muted, fontFace: "Calibri", margin: 0
    });
  });

  // Bottom callout
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.38, y: 4.58, w: 9.24, h: 0.68,
    fill: { color: C.navy }, line: { color: C.navy }
  });
  s.addText("Modern RL pipelines bundle all three effects — making it impossible to attribute gains to any single cause", {
    x: 0.55, y: 4.58, w: 9.0, h: 0.68,
    fontSize: 13, color: C.white, fontFace: "Calibri", valign: "middle", bold: true
  });
}

// ── SLIDE 4: Our Approach ───────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };
  addHeader(s, "Our Approach: Controlled Decomposition");
  addFooter(s, "Approach");

  s.addText("We isolate the contributions of individual RL components under a single controlled task", {
    x: 0.4, y: 0.85, w: 9.2, h: 0.45,
    fontSize: 14, color: C.navy, fontFace: "Calibri", margin: 0
  });

  // Two axes diagram
  // Axis 1
  card(s, 0.38, 1.42, 4.4, 2.6);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.38, y: 1.42, w: 0.22, h: 2.6,
    fill: { color: C.blue }, line: { color: C.blue }
  });
  s.addText("Axis 1: Data Source", {
    x: 0.72, y: 1.5, w: 3.9, h: 0.38,
    fontSize: 13, bold: true, color: C.blue, fontFace: "Calibri", margin: 0
  });
  s.addText([
    { text: "Off-policy  →  On-policy", options: { bold: true, breakLine: true } },
    { text: "Teacher  →  Bootstrap  →  Iterative  →  On-policy rollouts", options: { breakLine: true } },
    { text: "How does data source affect compositional performance?", options: { italic: true } }
  ], {
    x: 0.72, y: 1.92, w: 3.9, h: 1.9,
    fontSize: 11.5, color: C.text, fontFace: "Calibri"
  });

  // Axis 2
  card(s, 5.18, 1.42, 4.4, 2.6);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.18, y: 1.42, w: 0.22, h: 2.6,
    fill: { color: C.teal }, line: { color: C.teal }
  });
  s.addText("Axis 2: Loss Function", {
    x: 5.52, y: 1.5, w: 3.9, h: 0.38,
    fontSize: 13, bold: true, color: C.teal, fontFace: "Calibri", margin: 0
  });
  s.addText([
    { text: "SFT  →  GRPO", options: { bold: true, breakLine: true } },
    { text: "SFT  →  POS+NEG  →  REINFORCE+  →  GRPO", options: { breakLine: true } },
    { text: "What does adding negative gradients and normalization buy us?", options: { italic: true } }
  ], {
    x: 5.52, y: 1.92, w: 3.9, h: 1.9,
    fontSize: 11.5, color: C.text, fontFace: "Calibri"
  });

  // Grid table at bottom
  s.addText("Unified 2×2 Framework", {
    x: 0.38, y: 4.15, w: 9.24, h: 0.32,
    fontSize: 12, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });
  const tableData = [
    [
      { text: "", options: { bold: true, fill: { color: C.navy }, color: C.white } },
      { text: "Positive Samples Only", options: { bold: true, fill: { color: C.navy }, color: C.white, align: "center" } },
      { text: "Positive + Negative Samples", options: { bold: true, fill: { color: C.navy }, color: C.white, align: "center" } }
    ],
    [
      { text: "Off-policy", options: { bold: true, fill: { color: "F5F5F5" } } },
      { text: "SFT", options: { align: "center", color: C.blue } },
      { text: "DPO", options: { align: "center", color: C.blue } }
    ],
    [
      { text: "On-policy", options: { bold: true, fill: { color: "F5F5F5" } } },
      { text: "On-policy SFT", options: { align: "center", color: C.teal } },
      { text: "GRPO ★", options: { align: "center", bold: true, color: C.orange } }
    ]
  ];
  s.addTable(tableData, {
    x: 0.38, y: 4.5, w: 9.24, h: 0.88,
    border: { pt: 1, color: "D0D0D0" },
    fontSize: 11, fontFace: "Calibri",
    colW: [1.8, 3.72, 3.72]
  });
}

// ── SLIDE 5: Compositional Generalization ────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };
  addHeader(s, "Our Lens: Compositional Generalization");
  addFooter(s, "Background");

  // Left col: definition + why
  s.addText("What is compositional generalization?", {
    x: 0.4, y: 0.88, w: 5.2, h: 0.4,
    fontSize: 14, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.32, w: 5.15, h: 1.45,
    fill: { color: "F5F5F5" }, line: { color: C.accent, pt: 1.5 }
  });
  s.addText("The ability to combine known atomic skills to solve harder problems — a key ingredient of general reasoning.", {
    x: 0.55, y: 1.38, w: 4.9, h: 1.3,
    fontSize: 13, color: C.navy, fontFace: "Calibri", valign: "middle"
  });

  s.addText("Why use it as our lens?", {
    x: 0.4, y: 2.9, w: 5.15, h: 0.38,
    fontSize: 13, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });
  s.addText([
    { text: "The SFT–RL gap is especially pronounced here", options: { bullet: true, breakLine: true } },
    { text: "SFT plateaus sharply as composition depth increases", options: { bullet: true, breakLine: true } },
    { text: "RL continues to improve — creating a clean, measurable separation", options: { bullet: true, breakLine: true } },
    { text: "Difficulty is precisely controlled by composition depth", options: { bullet: true } }
  ], {
    x: 0.4, y: 3.3, w: 5.1, h: 1.55,
    fontSize: 12, color: C.text, fontFace: "Calibri"
  });

  // Right col: examples of compositionality
  s.addText("Composition depth controls difficulty", {
    x: 5.9, y: 0.88, w: 3.8, h: 0.4,
    fontSize: 13, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });

  const levels = [
    { level: "Level 1", label: "f(x)", desc: "One atomic function", color: "E0E0E0" },
    { level: "Level 2", label: "f(g(x))", desc: "Compose 2 functions", color: "6D6E71" },
    { level: "Level 4", label: "f(g(h(i(x))))", desc: "Compose 4 functions", color: "000000" },
    { level: "Level 8", label: "f¹∘f²∘…∘f⁸(x)", desc: "Compose 8 functions", color: "C41230" },
  ];

  levels.forEach((lv, i) => {
    const sy = 1.32 + i * 0.92;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.88, y: sy, w: 3.74, h: 0.78,
      fill: { color: C.white }, line: { color: "D0D0D0" },
      shadow: mkShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.88, y: sy, w: 0.18, h: 0.78,
      fill: { color: lv.color }, line: { color: lv.color }
    });
    s.addText(lv.level, {
      x: 6.12, y: sy + 0.04, w: 1.1, h: 0.32,
      fontSize: 11, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
    });
    s.addText(lv.label, {
      x: 6.12, y: sy + 0.36, w: 1.7, h: 0.28,
      fontSize: 9.5, color: C.muted, fontFace: "Consolas", margin: 0
    });
    s.addText(lv.desc, {
      x: 7.55, y: sy + 0.22, w: 1.98, h: 0.36,
      fontSize: 10, color: C.text, fontFace: "Calibri", valign: "middle", margin: 0
    });
  });
}

// ── SLIDE 6: The String-Function Task ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };
  addHeader(s, "Task: String-Function Composition");
  addFooter(s, "Background");

  // Image on right
  s.addImage({
    path: path.resolve(__dirname, "../imgs/string-function.png"),
    x: 5.0, y: 0.85, w: 4.75, h: 4.4,
    sizing: { type: "contain", w: 4.75, h: 4.4 }
  });

  s.addText("Setup", {
    x: 0.4, y: 0.88, w: 4.4, h: 0.36,
    fontSize: 14, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });
  s.addText([
    { text: "25 unique string functions (13 train / 12 eval)", options: { bullet: true, breakLine: true } },
    { text: "Model receives function definitions + input", options: { bullet: true, breakLine: true } },
    { text: "Must predict output of composed programs", options: { bullet: true } }
  ], {
    x: 0.4, y: 1.28, w: 4.4, h: 1.0,
    fontSize: 12, color: C.text, fontFace: "Calibri"
  });

  s.addText("Training Protocol", {
    x: 0.4, y: 2.38, w: 4.4, h: 0.36,
    fontSize: 14, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });

  const stages = [
    { num: "1", title: "Stage 1 (Level-1)", body: "Learn all atomic functions → checkpoint 'Base'", color: "6D6E71" },
    { num: "2", title: "Stage 2 (Level-2)", body: "Train on composed tasks with different methods", color: "000000" },
    { num: "★", title: "Evaluation", body: "Measure accuracy on levels 1–8 (extrapolation)", color: "C41230" },
  ];

  stages.forEach((st, i) => {
    const sy = 2.82 + i * 0.78;
    s.addShape(pres.shapes.OVAL, {
      x: 0.4, y: sy + 0.1, w: 0.38, h: 0.38,
      fill: { color: st.color }, line: { color: st.color }
    });
    s.addText(st.num, {
      x: 0.4, y: sy + 0.1, w: 0.38, h: 0.38,
      fontSize: 11, bold: true, color: C.white, fontFace: "Calibri",
      align: "center", valign: "middle", margin: 0
    });
    s.addText(st.title, {
      x: 0.88, y: sy + 0.08, w: 3.7, h: 0.25,
      fontSize: 11.5, bold: true, color: st.color, fontFace: "Calibri", margin: 0
    });
    s.addText(st.body, {
      x: 0.88, y: sy + 0.32, w: 3.8, h: 0.28,
      fontSize: 10.5, color: C.text, fontFace: "Calibri", margin: 0
    });
  });
}

// ── SLIDE 7: SFT vs GRPO Baseline Gap ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };
  addHeader(s, "The Gap: SFT vs. GRPO");
  addFooter(s, "Results: Baseline");

  // Image
  s.addImage({
    path: path.resolve(__dirname, "../imgs/baseline.png"),
    x: 4.9, y: 0.85, w: 4.85, h: 4.4,
    sizing: { type: "contain", w: 4.85, h: 4.4 }
  });

  s.addText("Key Observation", {
    x: 0.4, y: 0.88, w: 4.3, h: 0.36,
    fontSize: 14, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.28, w: 4.25, h: 1.3,
    fill: { color: "F5F5F5" }, line: { color: C.accent, pt: 1.5 }
  });
  s.addText("GRPO substantially outperforms SFT at higher composition levels (levels 3–8), creating a large and measurable gap.", {
    x: 0.55, y: 1.33, w: 3.95, h: 1.2,
    fontSize: 12.5, color: C.navy, fontFace: "Calibri", valign: "middle"
  });

  s.addText("What this tells us", {
    x: 0.4, y: 2.72, w: 4.25, h: 0.36,
    fontSize: 13, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });
  s.addText([
    { text: "Standard off-policy SFT (lower bound)", options: { bullet: true, breakLine: true } },
    { text: "On-policy GRPO (upper bound)", options: { bullet: true, breakLine: true } },
    { text: "Both trained on Level-2 tasks — difference is purely the training method", options: { bullet: true, breakLine: true } },
    { text: "Goal: understand what inside GRPO drives this gap", options: { bullet: true, italic: true } }
  ], {
    x: 0.4, y: 3.1, w: 4.3, h: 1.8,
    fontSize: 12, color: C.text, fontFace: "Calibri"
  });
}

// ── SLIDE 8: Loss Function Decomposition ─────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };
  addHeader(s, "Loss Function Decomposition: SFT → GRPO");
  addFooter(s, "Framework: Loss Axis");

  s.addText("Key insight: loss functions differ only in how they weight positive and negative samples", {
    x: 0.4, y: 0.85, w: 9.2, h: 0.42,
    fontSize: 13.5, color: C.navy, fontFace: "Calibri", italic: true, margin: 0
  });

  // Table
  const tableData = [
    [
      { text: "Loss Function", options: { bold: true, fill: { color: C.navy }, color: C.white, align: "center" } },
      { text: "Positive Weight", options: { bold: true, fill: { color: C.navy }, color: C.white, align: "center" } },
      { text: "Negative Weight", options: { bold: true, fill: { color: C.navy }, color: C.white, align: "center" } },
      { text: "Negative Samples?", options: { bold: true, fill: { color: C.navy }, color: C.white, align: "center" } },
    ],
    [
      { text: "SFT", options: { bold: true } },
      { text: "1", options: { align: "center", color: C.text } },
      { text: "0", options: { align: "center", color: C.muted } },
      { text: "No", options: { align: "center", color: C.muted } },
    ],
    [
      { text: "GRPOMask", options: { bold: true } },
      { text: "(1 − μ) / σ", options: { align: "center", color: C.text } },
      { text: "0", options: { align: "center", color: C.muted } },
      { text: "No", options: { align: "center", color: C.muted } },
    ],
    [
      { text: "POS+NEG", options: { bold: true } },
      { text: "1", options: { align: "center", color: C.text } },
      { text: "−1", options: { align: "center", color: C.red } },
      { text: "Yes", options: { align: "center", color: C.red, bold: true } },
    ],
    [
      { text: "REINFORCE+", options: { bold: true } },
      { text: "1 − μ", options: { align: "center", color: C.text } },
      { text: "−μ", options: { align: "center", color: C.red } },
      { text: "Yes", options: { align: "center", color: C.red, bold: true } },
    ],
    [
      { text: "GRPO  ★", options: { bold: true, color: C.red } },
      { text: "(1 − μ) / σ", options: { align: "center", color: C.text } },
      { text: "−μ / σ", options: { align: "center", color: C.red } },
      { text: "Yes", options: { align: "center", color: C.red, bold: true } },
    ],
  ];

  s.addTable(tableData, {
    x: 0.4, y: 1.35, w: 9.2, h: 2.65,
    border: { pt: 1, color: "D0D0D0" },
    fontSize: 12, fontFace: "Calibri",
    colW: [2.4, 2.4, 2.4, 2.0]
  });

  // Annotation boxes
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.12, w: 4.4, h: 1.1,
    fill: { color: "F5F5F5" }, line: { color: C.teal, pt: 1.5 }
  });
  s.addText("Progression: add negative samples, then group baseline (μ), then variance normalization (σ)", {
    x: 0.55, y: 4.17, w: 4.1, h: 1.0,
    fontSize: 11.5, color: C.navy, fontFace: "Calibri", valign: "middle"
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 4.12, w: 4.4, h: 1.1,
    fill: { color: "F5F5F5" }, line: { color: C.orange, pt: 1.5 }
  });
  s.addText("Question: Is it the negative samples or the normalization that matters most for compositional generalization?", {
    x: 5.35, y: 4.17, w: 4.1, h: 1.0,
    fontSize: 11.5, color: C.navy, fontFace: "Calibri", valign: "middle"
  });
}

// ── SLIDE 9: Data Axis Results ────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };
  addHeader(s, "Results: Role of Data Source");
  addFooter(s, "Results: Data Axis");

  s.addImage({
    path: path.resolve(__dirname, "../imgs/data.png"),
    x: 4.9, y: 0.85, w: 4.85, h: 4.1,
    sizing: { type: "contain", w: 4.85, h: 4.1 }
  });

  s.addText("Surprising finding", {
    x: 0.4, y: 0.9, w: 4.3, h: 0.36,
    fontSize: 14, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.3, w: 4.25, h: 1.4,
    fill: { color: "F5F5F5" }, line: { color: C.orange, pt: 1.5 }
  });
  s.addText("On-policy SFT performs worse than off-policy teacher-generated SFT — data quality matters!", {
    x: 0.55, y: 1.35, w: 3.95, h: 1.3,
    fontSize: 12.5, color: C.navy, fontFace: "Calibri", valign: "middle"
  });

  s.addText("Interpretation", {
    x: 0.4, y: 2.82, w: 4.25, h: 0.36,
    fontSize: 13, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });
  s.addText([
    { text: "Teacher model generates far more correct solutions than base model", options: { bullet: true, breakLine: true } },
    { text: "On-policy data alone is not sufficient — need negative learning signal too", options: { bullet: true, breakLine: true } },
    { text: "Filtering strategies tested: correctness ratio, trajectory length", options: { bullet: true } }
  ], {
    x: 0.4, y: 3.2, w: 4.3, h: 1.5,
    fontSize: 12, color: C.text, fontFace: "Calibri"
  });
}

// ── SLIDE 10: Loss Function Results ───────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.lightBg };
  addHeader(s, "Results: Role of Negative Samples");
  addFooter(s, "Results: Loss Axis");

  s.addImage({
    path: path.resolve(__dirname, "../imgs/loss_fn.png"),
    x: 4.9, y: 0.85, w: 4.85, h: 4.1,
    sizing: { type: "contain", w: 4.85, h: 4.1 }
  });

  s.addText("Key finding", {
    x: 0.4, y: 0.9, w: 4.3, h: 0.36,
    fontSize: 14, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.3, w: 4.25, h: 1.55,
    fill: { color: "F5F5F5" }, line: { color: C.teal, pt: 1.5 }
  });
  s.addText("Adding negative samples (POS+NEG) under on-policy training recovers the bulk of the gap between on-policy SFT and full GRPO.", {
    x: 0.55, y: 1.35, w: 3.95, h: 1.45,
    fontSize: 12.5, color: C.navy, fontFace: "Calibri", valign: "middle"
  });

  s.addText("What this means", {
    x: 0.4, y: 2.95, w: 4.25, h: 0.36,
    fontSize: 13, bold: true, color: C.navy, fontFace: "Calibri", margin: 0
  });
  s.addText([
    { text: "Negative gradients are a critical component of GRPO", options: { bullet: true, breakLine: true } },
    { text: "Group normalization (σ, μ) has relatively smaller impact", options: { bullet: true, breakLine: true } },
    { text: "Both on-policy data AND negative samples are essential for compositional generalization", options: { bullet: true } }
  ], {
    x: 0.4, y: 3.33, w: 4.3, h: 1.5,
    fontSize: 12, color: C.text, fontFace: "Calibri"
  });
}

// ── SLIDE 11: Conclusion ───────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // Decorative elements
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.blue }, line: { color: C.blue }
  });
  s.addText("Conclusion & Contributions", {
    x: 0.4, y: 0, w: 9.2, h: 0.72,
    fontSize: 22, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.5, y: 0.72, w: 1.5, h: 4.68,
    fill: { color: C.accent, transparency: 80 }, line: { color: C.accent, transparency: 80 }
  });

  const contribs = [
    {
      num: "1",
      title: "Unified Decomposition Framework",
      body: "SFT and RL variants organized under a 2-axis grid (data × loss). Enables controlled ablations.",
      color: "E0E0E0"
    },
    {
      num: "2",
      title: "Large SFT–GRPO Gap Demonstrated",
      body: "RL substantially outperforms off-policy SFT on compositional generalization; filtering does not close the gap.",
      color: "E0E0E0"
    },
    {
      num: "3",
      title: "On-Policy Data is Critical",
      body: "Data quality and on-policy nature both matter; teacher-generated data outperforms base-model rollouts under SFT.",
      color: "C41230"
    },
    {
      num: "4",
      title: "Negative Gradients are Critical",
      body: "Adding negative samples under on-policy training recovers the bulk of the GRPO gap. Normalization is secondary.",
      color: "C41230"
    },
  ];

  contribs.forEach((c, i) => {
    const sy = 0.85 + i * 1.08;
    s.addShape(pres.shapes.OVAL, {
      x: 0.38, y: sy + 0.22, w: 0.45, h: 0.45,
      fill: { color: c.color }, line: { color: c.color }
    });
    s.addText(c.num, {
      x: 0.38, y: sy + 0.22, w: 0.45, h: 0.45,
      fontSize: 14, bold: true, color: C.white, fontFace: "Calibri",
      align: "center", valign: "middle", margin: 0
    });
    s.addText(c.title, {
      x: 0.95, y: sy + 0.2, w: 7.2, h: 0.3,
      fontSize: 13, bold: true, color: c.color, fontFace: "Calibri", margin: 0
    });
    s.addText(c.body, {
      x: 0.95, y: sy + 0.5, w: 7.2, h: 0.42,
      fontSize: 11, color: "E0E0E0", fontFace: "Calibri", margin: 0
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.38, w: 10, h: 0.245,
    fill: { color: C.blue }, line: { color: C.blue }
  });
  s.addText("Gyeongwon James Kim  ·  Carnegie Mellon University  ·  May 2026", {
    x: 0.3, y: 5.38, w: 9.4, h: 0.245,
    fontSize: 9, color: C.white, fontFace: "Calibri", valign: "middle", align: "center", margin: 0
  });
}

// ── Write ─────────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "slides/thesis_presentation.pptx" }).then(() => {
  console.log("✓ Written: slides/thesis_presentation.pptx");
}).catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
