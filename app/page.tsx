export const dynamic = "force-dynamic";

type Row = {
  title: string;
  detail: string;
  mode: string;
  modeClass?: string;
  time: string;
  power: number;
  usage: string;
  openai: string;
  openaiCost: string;
  claude: string;
  claudeCost: string;
  rowClass?: string;
};

const rows: Row[] = [
  { title: "Ask a question, draft, or rewrite", detail: "Explain an idea, improve a paragraph, or make a quick first draft.", mode: "Chat", time: "10 sec–2 min", power: 2, usage: "1–10K / 0.2–2K", openai: "GPT-5.6 Luna", openaiCost: "<$0.001–$0.005", claude: "Claude Haiku 4.5", claudeCost: "$0.002–$0.02" },
  { title: "Do one Slack action", detail: "Ask for a channel summary, find details in a thread, or draft a reply.", mode: "Connected chat", time: "1–5 min", power: 2, usage: "10–100K / 1–8K", openai: "GPT-5.6 Luna", openaiCost: "$0.003–$0.03", claude: "Claude Haiku 4.5", claudeCost: "$0.02–$0.14" },
  { title: "Summarize a document or meeting", detail: "Turn one transcript, deck, or report into themes, decisions, and next steps.", mode: "Chat + file", time: "3–15 min", power: 3, usage: "20–150K / 2–12K", openai: "GPT-5.6 Terra", openaiCost: "$0.06–$0.44", claude: "Claude Sonnet 5", claudeCost: "$0.06–$0.42" },
  { title: "Search Slack or Figma and synthesize", detail: "Explore many channels, frames, or comments and turn the evidence into themes.", mode: "Connected agent", modeClass: "agentic", time: "10–45 min", power: 4, usage: "0.1–1M / 5–50K", openai: "GPT-5.6 Terra", openaiCost: "$0.09–$0.90", claude: "Claude Sonnet 5", claudeCost: "$0.08–$0.80" },
  { title: "Research, analyze data, or create a shareable document", detail: "Gather sources, compare evidence, develop a point of view, and polish a DOCX, HTML file, spreadsheet, slide deck, or PDF.", mode: "Research agent", modeClass: "agentic", time: "15–90 min", power: 4, usage: "0.5–3M / 20–150K", openai: "GPT-5.6 Terra", openaiCost: "$0.39–$2.70", claude: "Claude Sonnet 5", claudeCost: "$0.35–$2.40" },
  { title: "Make small edits to a web app", detail: "Change styles, adjust a component, fix a contained bug, or add one new page.", mode: "Coding agent", modeClass: "agentic", time: "10–60 min", power: 4, usage: "0.5–3M / 5–40K", openai: "Codex · GPT-5.6 Terra", openaiCost: "$0.21–$1.38", claude: "Claude Code · Sonnet 5", claudeCost: "$0.20–$1.30" },
  { title: "Iterate heavily on the design of an app", detail: "Take many screenshots, compare visual details, and go back and forth until it feels right.", mode: "Visual coding agent", modeClass: "agentic", time: "1–4 hr", power: 4, usage: "2–10M / 20–120K", openai: "Codex · GPT-5.6 Terra", openaiCost: "$0.84–$4.44", claude: "Claude Code · Sonnet 5", claudeCost: "$0.80–$4.20" },
  { title: "Diagnose a difficult software problem or review code", detail: "Trace behavior across a codebase, reproduce the issue, test theories, and verify a fix.", mode: "Reasoning agent", modeClass: "agentic", time: "30 min–3 hr", power: 5, usage: "2–15M / 20–150K", openai: "Codex · GPT-5.6 Sol", openaiCost: "$2.10–$15.75", claude: "Claude Code · Opus 5", claudeCost: "$2–$15" },
  { title: "Deep, decision-ready knowledge work", detail: "Work across many sources, challenge assumptions, synthesize a position, and refine it.", mode: "Long-running agent", modeClass: "agentic", time: "2–6 hr", power: 5, usage: "3–20M / 50–300K", openai: "Codex · GPT-5.6 Sol", openaiCost: "$3.75–$24", claude: "Claude Code · Opus 5", claudeCost: "$3.50–$22.50", rowClass: "heavy" },
  { title: "A heavy day of software development", detail: "Implement several features, debug, run tests, review the whole system, and revise repeatedly.", mode: "Coding agent", modeClass: "agentic", time: "4–10 hr", power: 5, usage: "8–40M / 0.1–0.6M", openai: "Codex · Terra → Sol", openaiCost: "$9–$48", claude: "Claude Code · Sonnet → Opus", claudeCost: "$8.50–$45", rowClass: "heavy" },
  { title: "Build a modest first version of an app from zero", detail: "Plan the structure, create the interface, connect data, test the flows, and make it shareable.", mode: "Build agent", modeClass: "agentic", time: "8–24 hr", power: 5, usage: "15–80M / 0.2–1.2M", openai: "Codex · Terra → Sol", openaiCost: "$17–$96", claude: "Claude Code · Sonnet → Opus", claudeCost: "$16–$90", rowClass: "heavy" },
  { title: "Build and test an AI video pipeline", detail: "Research video models, compare renders, wire the pipeline, package model weights, deploy GPU workers, and monitor cloud tests.", mode: "Model + infra stack", modeClass: "multi", time: "1–3 days", power: 5, usage: "50–250M / 0.3–10M", openai: "Codex · Terra + Sol + video models", openaiCost: "$50–$500 + GPU", claude: "Claude Code · Sonnet + Opus + video models", claudeCost: "$45–$450 + GPU", rowClass: "heavy" },
  { title: "Extreme: overnight team of 4–8 AI agents", detail: "Split a large goal into parallel research, design, build, testing, and review workstreams.", mode: "Multi-agent", modeClass: "multi", time: "8–16 hr", power: 5, usage: "40–250M / 0.5–4M", openai: "Codex · Terra + Sol team", openaiCost: "$45–$308", claude: "Claude Code · Sonnet + Opus", claudeCost: "$43–$288", rowClass: "extreme" },
  { title: "Extreme: agent swarm across working trees", detail: "Run 8–20 coding agents in parallel branches or worktrees, with continuous tests, reviews, merges, and retries.", mode: "Agent swarm", modeClass: "multi", time: "4–8 hr", power: 5, usage: "60–250M / 0.3–20M", openai: "Codex · Terra + Sol swarm", openaiCost: "$200–$800", claude: "Claude Code · Sonnet + Opus swarm", claudeCost: "$170–$690", rowClass: "extreme" },
];

const terms = [
  ["Input tokens", "Text, code, images, and tool results the model reads."],
  ["Output tokens", "Text, code, reasoning, and structured results the model produces."],
  ["Cached input", "Previously processed context reused at a discounted input price."],
  ["Cache write", "The first time reusable context is stored; it can cost more than a cache read."],
  ["Model stack", "A workflow that switches models for planning, coding, generation, review, or infrastructure."],
  ["Agentic workflow", "A model uses tools, observes results, makes decisions, and continues toward an outcome."],
  ["Tool call", "An action such as searching, editing files, running tests, or deploying a service."],
  ["Working tree", "An isolated code workspace where an agent can make changes without blocking others."],
  ["GPU / infrastructure", "Non-model costs for compute, storage, model downloads, builds, and hosted services."],
  ["Human review", "Your time spent directing the work, checking outputs, and deciding what ships."],
  ["Context window", "The maximum amount of conversation and project material a model can use at once."],
  ["Raw API-equivalent cost", "A planning estimate based on published token prices, before subscriptions or credits."],
];

function Power({ level }: { level: number }) {
  return <span className={`power ${level === 5 ? "p5" : level === 4 ? "p4" : ""}`}>{level} / 5</span>;
}

export default function Page() {
  return (
    <main className="sheet">
      <header>
        <h1><span>Agentic</span> Rate Card</h1>
        <div className="updated">Updated<br /><strong>August 14, 2026</strong></div>
      </header>

      <div className="table-wrap">
      <table aria-label="Agentic AI workflow rate card">
        <colgroup><col className="work" /><col className="time" /><col className="power-col" /><col className="usage" /><col className="provider" /><col className="provider" /></colgroup>
        <thead><tr><th>What you want to accomplish</th><th>Time</th><th>Power</th><th>Tokens processed<br />input / output</th><th>OpenAI / Codex stack</th><th>Anthropic / Claude stack</th></tr></thead>
        <tbody>
          {rows.map((row) => <tr className={row.rowClass} key={row.title}>
            <th><span className="work-title">{row.title}</span><span className="work-detail">{row.detail}</span><span className={`mode ${row.modeClass || ""}`}>{row.mode}</span></th>
            <td className="time">{row.time}</td><td><Power level={row.power} /></td><td className="usage">{row.usage}</td>
            <td><span className="model">{row.openai}</span><span className="cost">{row.openaiCost}</span></td>
            <td><span className="model">{row.claude}</span><span className="cost">{row.claudeCost}</span></td>
          </tr>)}
        </tbody>
      </table>
      </div>

      <section className="notes">
        <div>
          <div className="legend"><span><strong>2/5</strong> fast + economical</span><span><strong>4/5</strong> strong synthesis</span><span><strong>5/5</strong> maximum reasoning</span></div>
          <p><strong>Input</strong> includes repeated and cached reading; <strong>output</strong> includes what the model writes or reasons through. K = thousand tokens; M = million. An <strong>agent</strong> can use tools and complete a workstream.</p>
        </div>
        <div>
          <p><strong>Validated locally:</strong> Agentic Codex and Claude Code turns processed roughly 3–5M median input tokens versus 0.4–0.9M for no-tool turns. A swarm across working trees can reach hundreds of millions of processed tokens.</p>
          <p><strong>Cost assumption:</strong> Chat rows use standard list prices. Agentic rows assume repeated context is mostly cached—about 15% of standard input cost—while output is full price. The provider columns show a <strong>model stack</strong>, not one model.</p>
        </div>
      </section>

      <section className="terms" aria-labelledby="terms-heading"><h2 id="terms-heading">Terminology</h2><div className="terms-grid">{terms.map(([term, description]) => <div className="term" key={term}><strong>{term}</strong>{description}</div>)}</div></section>
    </main>
  );
}
