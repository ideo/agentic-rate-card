"use client";

import { useMemo, useState } from "react";

const tasks = [
  { id: "research", label: "Research + synthesize", hint: "Search sources, Slack, Figma, or files", input: 0.8, output: 0.05 },
  { id: "build", label: "Build or edit an app", hint: "Implement features, pages, and tests", input: 2.5, output: 0.08 },
  { id: "design", label: "Heavy design iteration", hint: "Screenshots, visual comparison, repeated tweaks", input: 4, output: 0.1 },
  { id: "knowledge", label: "Deep knowledge work", hint: "Challenge assumptions and produce a decision", input: 6, output: 0.15 },
  { id: "video", label: "AI video pipeline", hint: "Models, workers, GPUs, and deployment tests", input: 20, output: 0.5 },
  { id: "swarm", label: "Multi-agent swarm", hint: "Parallel worktrees, reviews, merges, and retries", input: 35, output: 1.2 },
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
  const [selected, setSelected] = useState<string[]>(["research"]);
  const [hours, setHours] = useState(4);
  const [power, setPower] = useState(4);

  const estimate = useMemo(() => {
    const chosen = tasks.filter((task) => selected.includes(task.id));
    const multiplier = (hours / 4) * (0.65 + power * 0.25);
    const input = chosen.reduce((sum, task) => sum + task.input, 0) * multiplier;
    const output = chosen.reduce((sum, task) => sum + task.output, 0) * multiplier;
    return { input, output };
  }, [hours, power, selected]);

  const costs = models.map((model) => ({ ...model, cost: estimate.input * model.input + estimate.output * model.output }));
  const scaleMax = Math.max(100, Math.ceil(Math.max(...costs.map((model) => model.cost), 1) / 100) * 100);

  function toggle(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <section className="planner" aria-labelledby="planner-heading">
      <div className="planner-controls">
        <p className="eyebrow">Planning tool</p>
        <h2 id="planner-heading">Agentic workflow calculator</h2>
        <fieldset>
          <legend>What needs to get done?</legend>
          <div className="task-list">
            {tasks.map((task) => <label className="task-choice" key={task.id}>
              <input type="checkbox" checked={selected.includes(task.id)} onChange={() => toggle(task.id)} />
              <span><strong>{task.label}</strong><small>{task.hint}</small></span>
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
        <p className="chart-note">API-equivalent estimate for the selected work. Cached input and GPU costs are not included.</p>
        <div className="chart-guide"><span>Scale: $0–${scaleMax}</span><span>Bars grow as the estimate grows</span></div>
        <div className="cost-chart" role="img" aria-label="Estimated cost by model">
          {costs.map((model) => <div className="cost-row" key={model.name}><div className="cost-name"><span>{model.name}</span><strong>{money(model.cost)}</strong></div><div className="bar-track"><span className="bar" style={{ width: `${Math.min((model.cost / scaleMax) * 100, 100)}%`, background: model.color }} /></div></div>)}
        </div>
        <p className="planner-footnote">The biggest levers are repeated context, output length, model switching, tool calls, and parallel agents. Use the result to choose a lane on the rate card.</p>
      </div>
    </section>
  );
}
