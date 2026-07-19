---
layout: post
title: "Taming Spark Data Skew with Salting"
date: 2026-07-19 09:00:00 +0100
tags: [Spark, Performance]
read_time: "6 min read"
description: "A practical look at why data skew wrecks Spark jobs — and how salting keys spreads the load without changing your results."
---

If you've ever watched a Spark job sit at **199/200 tasks complete** for twenty minutes, you've met data skew. One partition got most of the rows, and one executor is doing all the work while the rest idle.

This post walks through the fix I reach for most often: **salting**.

## Why skew happens

A shuffle (from a `join` or `groupBy`) hashes each key to a partition. If a handful of keys dominate — a null `user_id`, a default `"unknown"` country, one whale customer — those partitions balloon:

> The job isn't slow because there's too much data. It's slow because the data isn't *spread*.

You'll see it in the Spark UI as a single task with a huge **shuffle read** and a runtime far above the median.

## The idea behind salting

Instead of joining on the raw key, we append a small random **salt** to spread hot keys across N partitions, then reconcile. The result is identical — we've only changed how work is distributed.

```scala
import org.apache.spark.sql.functions._

val saltFactor = 16

// Explode the (small) dimension across every possible salt value
val dimSalted = dim.withColumn(
  "salt",
  explode(sequence(lit(0), lit(saltFactor - 1)))
)

// Give each fact row a random salt in the same range
val factSalted = fact.withColumn(
  "salt",
  (rand() * saltFactor).cast("int")
)

// Join on the composite key — load now spreads across saltFactor partitions
val joined = factSalted.join(
  dimSalted,
  Seq("user_id", "salt"),
  "inner"
).drop("salt")
```

## When to use it (and when not to)

Salting isn't free — you're multiplying the dimension side by `saltFactor`. Reach for it when:

- A **few keys** dominate a join or aggregation
- The skewed side is genuinely large (broadcasting won't help)
- You've confirmed skew in the UI, not just guessed

If the smaller table fits in memory, a **broadcast join** is simpler and usually faster. And on Spark 3.x, always check whether **Adaptive Query Execution** (`spark.sql.adaptive.skewJoin.enabled`) already handles it before hand-rolling salt.

## Takeaway

Skew is a distribution problem, not a volume problem. Salting is a precise tool: spread the hot keys, do the work in parallel, reconcile at the end. Measure first, salt second — and delete the salt the moment AQE makes it redundant.
