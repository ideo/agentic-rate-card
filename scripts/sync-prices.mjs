import { readFile, writeFile } from "node:fs/promises";

const configPath = new URL("../data/model-prices.json", import.meta.url);
const snapshotPath = new URL("../data/pricing-source-snapshot.json", import.meta.url);

function textFromHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function relevantSnippets(text) {
  const chunks = text.split(/(?<=[.!?。])\s+/);
  return chunks
    .filter((chunk) => /(?:price|pricing|token|million|cache|\$|美元|价格|元)/i.test(chunk))
    .map((chunk) => chunk.slice(0, 360))
    .slice(0, 12);
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(source.url, {
      headers: { "user-agent": "agentic-rate-card-price-review/1.0" },
      signal: controller.signal,
    });
    const body = await response.text();
    const text = textFromHtml(body);
    return {
      ...source,
      status: response.status,
      ok: response.ok,
      snippets: relevantSnippets(text),
    };
  } catch (error) {
    return { ...source, ok: false, error: error instanceof Error ? error.message : String(error), snippets: [] };
  } finally {
    clearTimeout(timeout);
  }
}

const config = JSON.parse(await readFile(configPath, "utf8"));
const sources = await Promise.all(config.sources.map(fetchSource));
const snapshot = {
  generatedAt: new Date().toISOString(),
  currency: config.currency,
  currentRates: config.models,
  sources,
  nextStep: "Review the source snippets, update data/model-prices.json if needed, then commit the changed rate file.",
};

await writeFile(snapshotPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Wrote ${new URL(snapshotPath).pathname}`);
console.log("Review the snapshot, then edit data/model-prices.json to publish revised rates.");
