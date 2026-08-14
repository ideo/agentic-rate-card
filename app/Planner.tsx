"use client";

import { useMemo, useState } from "react";
import priceData from "../data/model-prices.json";

const outcomes = [
  { id: "research", label: "Research + synthesize", hint: "Deep research, online searching, evidence, and points of view", input: 0.8, output: 0.05 },
  { id: "build", label: "Build or edit an app", hint: "Build a feature, update a page, or test and revise behavior", input: 2.5, output: 0.08 },
  { id: "knowledge", label: "Deep knowledge work", hint: "Challenge assumptions, compare tradeoffs, and make a decision", input: 6, output: 0.15 },
  { id: "video", label: "Build an AI video pipeline", hint: "Evaluate models, set up workers, deploy GPUs, and test", input: 20, output: 0.5 },
];

const modifiers = [
  { id: "codebase", label: "Existing codebase", hint: "Read repo structure, trace dependencies, and understand the implementation", input: 0.7, output: 0.04 },
  { id: "sources", label: "Connected sources", hint: "Search Slack, Figma, documents, files, or the web", input: 0.35, output: 0.02 },
  { id: "browser", label: "Browser control", hint: "Navigate a live site, test flows, capture browser state, and retry", input: 0.35, output: 0.03 },
  { id: "visual", label: "Visual iteration", hint: "Use screenshots to refine CSS, JavaScript, and UI details", input: 0.45, output: 0.03 },
  { id: "review", label: "Tests + review loop", hint: "Run, inspect, critique, and retry", input: 0.3, output: 0.04 },
  { id: "parallel", label: "Parallel agents", hint: "Multiple worktrees or specialist agents", input: 0.9, output: 0.08 },
  { id: "infra", label: "Infrastructure work", hint: "Firebase, Vercel, Google Cloud, GPUs, builds, deployment, or monitoring", input: 0.6, output: 0.04 },
];

const models = priceData.models;

function money(value: number) {
  if (value < 0.01) return "<$0.01";
  if (value < 1) return `$${value.toFixed(2)}`;
  return `$${value.toFixed(value < 10 ? 2 : 0)}`;
}

export default function Planner() {
  const [outcome, setOutcome] = useState("research");
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
  const [hours, setHours] = useState(4);
  const [power, setPower] = useState(4);
  const [showEstimateNote, setShowEstimateNote] = useState(true);

  const estimate = useMemo(() => {
    const primary = outcomes.find((item) => item.id === outcome) || outcomes[0];
    const chosen = modifiers.filter((item) => selectedModifiers.includes(item.id));
    const multiplier = (hours / 4) * (0.65 + power * 0.25);
    const input = (primary.input + chosen.reduce((sum, item) => sum + item.input, 0)) * multiplier;
    const output = (primary.output + chosen.reduce((sum, item) => sum + item.output, 0)) * multiplier;
    return { input, output };
  }, [hours, outcome, power, selectedModifiers]);

  const costs = models.map((model) => ({ ...model, cost: estimate.input * model.input + estimate.output * model.output }));
  const scaleMax = Math.max(100, Math.ceil(Math.max(...costs.map((model) => model.cost), 1) / 100) * 100);

  function toggleModifier(id: string) {
    setSelectedModifiers((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <section className="planner" aria-labelledby="planner-heading">
      <div className="planner-controls">
        <div className="planner-heading"><h2 id="planner-heading">Agentic workflow calculator</h2><button className="estimate-help" type="button" onClick={() => setShowEstimateNote(true)}>About this estimate</button></div>
        <fieldset>
          <legend>1. Choose the primary outcome</legend>
          <div className="task-list">
            {outcomes.map((item) => <label className="task-choice" key={item.id}>
              <input type="radio" name="primary-outcome" checked={outcome === item.id} onChange={() => setOutcome(item.id)} />
              <span><strong>{item.label}</strong><small>{item.hint}</small></span>
            </label>)}
          </div>
        </fieldset>
        <fieldset>
          <legend>2. Add scope modifiers</legend>
          <div className="task-list">
            {modifiers.map((item) => <label className="task-choice" key={item.id}>
              <input type="checkbox" checked={selectedModifiers.includes(item.id)} onChange={() => toggleModifier(item.id)} />
              <span><strong>{item.label}</strong><small>{item.hint}</small></span>
            </label>)}
          </div>
        </fieldset>
        <label className="range-label">Agent run time <strong>{hours} {hours === 1 ? "hour" : "hours"}</strong>
          <input type="range" min="1" max="24" value={hours} onChange={(event) => setHours(Number(event.target.value))} />
        </label>
        <label className="range-label">Reasoning power <strong>{power} / 5</strong>
          <input type="range" min="1" max="5" value={power} onChange={(event) => setPower(Number(event.target.value))} />
        </label>
      </div>
      <div className="planner-results">
        <div className="estimate-strip"><span>Estimated input</span><strong>{estimate.input.toFixed(1)}M</strong><span>Estimated output</span><strong>{estimate.output.toFixed(2)}M</strong></div>
        <h3>Cost by model</h3>
        <p className="chart-note">API-equivalent estimate for this workflow. Cached input and GPU costs are not included.</p>
        <div className="chart-guide"><span>Scale: $0–${scaleMax}</span><span>Bars grow as scope grows</span></div>
        <div className="cost-chart" role="img" aria-label="Estimated cost by model">
          {costs.map((model) => <div className="cost-row" key={model.name}><div className="cost-name"><span>{model.name}</span><strong>{money(model.cost)}</strong></div><div className="bar-track"><span className="bar" style={{ width: `${Math.min((model.cost / scaleMax) * 100, 100)}%`, background: model.color }} /></div></div>)}
        </div>
        <p className="planner-footnote">One outcome establishes the base. Modifiers add the work that makes a workflow larger: project context, external sources, browser loops, visual iteration, verification, parallelism, and infrastructure.</p>
      </div>
      {showEstimateNote && <div className="estimate-modal-backdrop" role="presentation"><div className="estimate-modal" aria-labelledby="estimate-modal-title" aria-modal="true" role="dialog"><p className="modal-kicker">Before you use the calculator</p><h3 id="estimate-modal-title">This is a ballpark estimate.</h3><p>Use it to compare approaches and set a budget range—not as a quote, invoice, or promise of delivery time.</p><p>Actual cost can move with model choice, cached context, long files or codebases, screenshots, browser/tool loops, retries, parallel agents, and cloud or GPU usage.</p><button type="button" onClick={() => setShowEstimateNote(false)}>Got it</button></div></div>}
    </section>
  );
}
