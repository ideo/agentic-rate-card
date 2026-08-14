"use client";

import { useMemo, useState } from "react";

const outcomes = [
  { id: "research", label: "Research + synthesize", hint: "Find evidence and produce a point of view", input: 0.8, output: 0.05 },
  { id: "build", label: "Build or edit an app", hint: "Implement features, pages, and tests", input: 2.5, output: 0.08 },
  { id: "knowledge", label: "Deep knowledge work", hint: "Challenge assumptions and make a decision", input: 6, output: 0.15 },
  { id: "video", label: "Build an AI video pipeline", hint: "Models, workers, GPUs, and deployment", input: 20, output: 0.5 },
];

const modifiers = [
  { id: "sources", label: "Connected sources", hint: "Slack, Figma, files, or web research", input: 0.35, output: 0.02 },
  { id: "visual", label: "Visual iteration", hint: "Screenshots and repeated design tweaks", input: 0.45, output: 0.03 },
  { id: "review", label: "Tests + review loop", hint: "Run, inspect, critique, and retry", input: 0.3, output: 0.04 },
  { id: "parallel", label: "Parallel agents", hint: "Multiple worktrees or specialist agents", input: 0.9, output: 0.08 },
  { id: "infra", label: "Infrastructure work", hint: "GPU setup, builds, deployment, monitoring", input: 0.6, output: 0.04 },
];

const models = [
  { name: "GPT-5.6 Sol", input: 5, output: 30, color: "#111" },
  { name: "Claude Opus 5", input: 5, output: 30, color: "#555" },
  { name: "Kimi K2 Thinking", input: 1.15, output: 8, color: "#777" },
  { name: "GLM-4.5", input: 0.11, output: 0.28, color: "#aaa" },
];

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
        <p className="eyebrow">Planning tool</p>
        <h2 id="planner-heading">Agentic workflow calculator</h2>
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
        <label className="range-label">Time available <strong>{hours} {hours === 1 ? "hour" : "hours"}</strong>
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
        <p className="planner-footnote">This is additive at the workflow level: one outcome plus extra context, iteration, review, parallelism, or infrastructure. It is not the sum of unrelated tasks.</p>
      </div>
    </section>
  );
}
