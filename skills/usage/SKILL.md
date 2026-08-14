---
name: usage
description: Report a Codex thread's token usage, cached-input breakdown, tool-call count, elapsed span, and approximate API-equivalent cost.
---

# Thread usage

Run `scripts/report_usage.py` to produce a compact usage report from local Codex session metadata. The script reads metadata only; it does not read prompts, code, tool arguments, or project content.

```bash
python3 skills/usage/scripts/report_usage.py [--thread-id THREAD_UID]
```

Report input tokens, cached input, cache writes, uncached input, output, reasoning output, total tokens, tool calls, the session span, and estimated API-equivalent cost. Explain that the estimate is not a subscription invoice and excludes cloud/GPU, search, image, connector, and human-time costs.

The estimate uses the GPT-5.6 Luna, Terra, and Sol rates embedded in the script. Cached tokens count as processed work but use a lower rate.
