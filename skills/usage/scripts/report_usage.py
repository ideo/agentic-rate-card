#!/usr/bin/env python3
"""Report Codex session token metadata and API-equivalent cost."""

import argparse
import json
from datetime import datetime
from pathlib import Path


PRICES = {
    "GPT-5.6 Luna": (1.00, 0.10, 6.00),
    "GPT-5.6 Terra": (2.50, 0.25, 15.00),
    "GPT-5.6 Sol": (5.00, 0.50, 30.00),
}


def parse_time(value):
    if not value:
        return None
    for fmt in ("%Y-%m-%dT%H:%M:%S.%f", "%Y-%m-%dT%H:%M:%S"):
        try:
            return datetime.strptime(value[:26] if "%f" in fmt else value[:19], fmt)
        except ValueError:
            pass
    return None


def inspect(path):
    session = None
    timestamps = []
    latest_usage = None
    tool_calls = 0
    try:
        with path.open(encoding="utf-8", errors="ignore") as stream:
            for line in stream:
                try:
                    record = json.loads(line)
                except json.JSONDecodeError:
                    continue
                timestamp = parse_time(record.get("timestamp"))
                if timestamp:
                    timestamps.append(timestamp)
                payload = record.get("payload") or {}
                if record.get("type") == "session_meta":
                    session = payload
                if record.get("type") == "event_msg" and payload.get("type") == "token_count":
                    usage = (payload.get("info") or {}).get("total_token_usage")
                    if usage:
                        latest_usage = usage
                if record.get("type") == "response_item" and payload.get("type") in {"custom_tool_call", "function_call"}:
                    tool_calls += 1
    except OSError:
        return None
    if not session or not latest_usage or not timestamps:
        return None
    return {"path": str(path), "session": session, "usage": latest_usage, "tools": tool_calls, "first": min(timestamps), "last": max(timestamps)}


def find_session(codex_root, thread_id):
    paths = sorted(codex_root.glob("sessions/**/*.jsonl")) + sorted(codex_root.glob("archived_sessions/*.jsonl"))
    records = []
    for path in paths:
        record = inspect(path)
        if record:
            records.append(record)
    if thread_id:
        matches = [record for record in records if record["session"].get("id") == thread_id]
        if not matches:
            raise SystemExit("No local Codex session metadata found for that thread.")
        return max(matches, key=lambda record: record["last"])
    roots = [record for record in records if record["session"].get("source") == "vscode" and not record["session"].get("parent_thread_id")]
    if not roots:
        raise SystemExit("No root Codex session metadata found.")
    return max(roots, key=lambda record: record["last"])


def money(value):
    return f"${value:,.2f}" if value < 100 else f"${value:,.0f}"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--thread-id")
    parser.add_argument("--codex-root", type=Path, default=Path.home() / ".codex")
    args = parser.parse_args()
    record = find_session(args.codex_root, args.thread_id)
    usage = record["usage"]
    input_tokens = int(usage.get("input_tokens", 0))
    cached_tokens = int(usage.get("cached_input_tokens", 0))
    cache_write_tokens = int(usage.get("cache_write_input_tokens", 0))
    output_tokens = int(usage.get("output_tokens", 0))
    reasoning_tokens = int(usage.get("reasoning_output_tokens", 0))
    uncached_tokens = max(0, input_tokens - cached_tokens - cache_write_tokens)
    total_tokens = int(usage.get("total_tokens", input_tokens + output_tokens))
    print("/usage")
    print(f"Thread: {record['session'].get('id', 'unknown')}")
    print(f"Session span: {record['first'].isoformat()} → {record['last'].isoformat()}")
    print(f"Input tokens: {input_tokens:,}")
    print(f"Cached input: {cached_tokens:,}")
    print(f"Cache writes: {cache_write_tokens:,}")
    print(f"Uncached input: {uncached_tokens:,}")
    print(f"Output tokens: {output_tokens:,}")
    print(f"Reasoning output: {reasoning_tokens:,}")
    print(f"Total tokens: {total_tokens:,}")
    print(f"Tool calls: {record['tools']:,}")
    print("Estimated API-equivalent cost:")
    for model, (input_rate, cached_rate, output_rate) in PRICES.items():
        cost = (uncached_tokens / 1_000_000 * input_rate + cached_tokens / 1_000_000 * cached_rate + cache_write_tokens / 1_000_000 * input_rate * 1.25 + output_tokens / 1_000_000 * output_rate)
        print(f"  {model}: {money(cost)}")
    print("Note: metadata estimate only; excludes cloud/GPU, search, image, connector, and human-time costs.")


if __name__ == "__main__":
    main()
