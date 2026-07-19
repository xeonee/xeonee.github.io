---
layout: post
title: "Why Your p99 Latency Lies to You"
date: 2026-07-19 07:30:00 +0100
tags: [Performance, Streaming, Kafka]
read_time: "5 min read"
description: "Averages hide pain and single percentiles hide more. A short guide to reading latency honestly in streaming systems."
---

Someone asks how fast your pipeline is. You say "p99 is 80ms" and everyone nods. But that one number is quietly lying to you — or at least letting you lie to yourself.

## The average was always a trap

A mean latency of 40ms can hide a tail where 1% of requests take 4 seconds. In a streaming system doing millions of events a minute, **1% is a lot of angry users**. Averages smear the pain across the happy path; percentiles are the fix.

## But a single percentile hides too

p99 tells you the value 99% of requests come in under. It says nothing about:

- **How bad the last 1% gets.** p99 = 80ms with p99.9 = 3s is a very different system from p99 = 80ms with p99.9 = 90ms.
- **How often you're measuring it.** A p99 over a 5-minute window can look calm while 10-second windows spike repeatedly.
- **Where the time goes.** Queue wait, processing, and downstream calls all fold into one number.

> A percentile is a summary. Every summary throws information away — the question is whether it throws away the part that hurts.

## What to actually watch

For streaming workloads I track a small set together:

```python
# Emit a spread, not a single number
metrics = {
    "p50":   q(latencies, 0.50),
    "p95":   q(latencies, 0.95),
    "p99":   q(latencies, 0.99),
    "p99_9": q(latencies, 0.999),  # the tail that pages you
    "max":   max(latencies),
    "count": len(latencies),
}
```

- **p50 vs p99 gap** — how skewed the distribution is.
- **p99.9 and max** — the tail that actually causes incidents.
- **Short windows** — compute over 10–30s, not 5min, so spikes survive aggregation.

## Takeaway

Report a *shape*, not a point. p50, p99, p99.9, and max side by side tell the truth that any single percentile is built to hide.
