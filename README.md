# SPERB — Synthetic Persona Ethics & Realism Benchmark

<div align="center">

![SPERB Version](https://img.shields.io/badge/SPERB-v1.0-9B59B6?style=for-the-badge)
![License](https://img.shields.io/badge/License-CC%20BY%204.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Open%20Specification-green?style=for-the-badge)
![Maintained by](https://img.shields.io/badge/Maintained%20by-Algotheorem-1A1A40?style=for-the-badge)

**The first open, replicable, multi-dimensional standard for evaluating AI influencers and synthetic digital personas.**

*A proposed global standard for the evaluation, classification, and governance of AI personas — for brands, platforms, regulators, creators, and researchers.*

[🟢 **Start Here — Beginner Guide**](QUICKSTART.md) · [📖 Read the Specification](#-framework-overview) · [🚀 Run Your Own Evaluation](#-how-to-evaluate-a-persona) · [📊 View the Pilot Results](pilot/PILOT_RESULTS.md) · [🤝 Contribute](CONTRIBUTING.md)

</div>

---

## What Is SPERB?

The AI influencer industry operates without a standardised framework for evaluating the ethical conduct, governance integrity, or realism quality of the synthetic personas it produces.

Engagement rates are measured to four decimal places. Photorealism is spectacular. Brand partnerships are lucrative.

**Nobody evaluates whether the entity disclosed its nature. Nobody audits its governance. Nobody measures whether it's safe to engage with emotionally.**

**SPERB fills that gap.**

SPERB (Synthetic Persona Ethics & Realism Benchmark) is an eight-dimension, evidence-anchored evaluation framework that produces:

- A score out of 100
- A tier classification (Platinum → Unrated)
- A public, reproducible justification for every score

Anyone can use it. Anyone can challenge it. No licence required.

---

## The Tanvi Joshi Problem

In February 2026, an undisclosed AI persona called "Tanvi Joshi" accumulated **28 million Instagram views in a single day** using audio stolen from a real person — presented to audiences as a "Punjabi girl," not a synthetic agent. The real voice owner discovered the theft by finding her own voice in the viral clip.

No benchmark detected it. No compliance tool flagged it. It was caught by the victim.

This is the cost of operating a multi-billion-dollar industry without evaluation infrastructure.

SPERB exists so the next Tanvi Joshi is visible before the 28 million views.

---

## Framework Overview

SPERB evaluates any AI influencer or synthetic digital persona across **8 dimensions**, each scored 0–10 against a defined rubric and public evidence.

| Code | Dimension | What It Measures |
|------|-----------|-----------------|
| **PVS** | Photorealism & Visual Consistency | Generation quality, identity stability, uncanny valley avoidance |
| **AIDS** | AI Identity Disclosure | How proactively and consistently the entity discloses its synthetic nature |
| **GDS** | Governance & Documentation | Public governance framework, creator attribution, version control |
| **CPOS** | Creative Pipeline Originality | Original content, pipeline transparency, IP integrity |
| **ECS** | Ethical Conduct | Conduct history, monitoring infrastructure, violation record |
| **CSRS** | Cultural & Social Responsibility | Cultural accuracy, community impact, representation ethics |
| **SCES** | Synthetic Companionship Ethics | Emotional boundary design, parasocial safeguards, romantic policy |
| **CITS** | Commercial Intent Transparency | Sponsorship disclosure, monetisation clarity, hidden commerce detection |

**Aggregate: PVS + AIDS + GDS + CPOS + ECS + CSRS + SCES + CITS = out of 80**
**Normalised: × 1.25 = out of 100**

### Tier Classification

| Tier | Score Range | Meaning |
|------|------------|---------|
| 🏆 **Platinum** | 85–100 | Governance Leader — sets the standard |
| 🥇 **Gold** | 70–84 | Ethical Practitioner — commercially partnerable with confidence |
| 🥈 **Silver** | 55–69 | Partially Compliant — due diligence required |
| 🥉 **Bronze** | 40–54 | Minimal Compliance — significant concerns |
| ⛔ **Unrated** | Below 40 | Non-Compliant / At Risk — elevated risk, non-engagement advised |

---

## Inaugural Pilot Results (May 2026)

SPERB was validated through a pilot benchmark applied to 10 globally prominent AI influencers.

| Rank | Entity | Score | Tier |
|------|--------|-------|------|
| 1 | Shayari NHE-01 | **95** | 🏆 Platinum |
| 2 | Imma | 80 | 🥇 Gold |
| 3 | Noonoouri | 80 | 🥇 Gold |
| 4 | Kenza Layli | 77 | 🥇 Gold |
| 5 | Rozy | 75 | 🥇 Gold |
| 6 | Aitana Lopez | 69 | 🥈 Silver |
| 7 | Shudu Gram | 68 | 🥈 Silver |
| 8 | Lil Miquela | 66 | 🥈 Silver |
| 9 | Kyra | 63 | 🥈 Silver |
| 10 | Naina Avtr | 63 | 🥈 Silver |
| ref | Tanvi Joshi | 21 | ⛔ Unrated |

> Full dimensional scores, per-entity justifications, and comparative analysis: [`pilot/PILOT_RESULTS.md`](pilot/PILOT_RESULTS.md)

---

## 🟢 New Here? Start with the Beginner Guide

If you have never used GitHub before and just want to test your AI persona: **[QUICKSTART.md](QUICKSTART.md)** — no coding, no terminal required. Plain English, step by step.

## How to Evaluate a Persona

### Option 1 — Manual Evaluation (anyone)

1. Read [`framework/SPERB_SPECIFICATION.md`](framework/SPERB_SPECIFICATION.md) — the full methodology
2. Use [`scoring/SCORING_RUBRIC.md`](scoring/SCORING_RUBRIC.md) — the reference card for all 8 dimensions
3. Fill in [`scoring/EVALUATION_TEMPLATE.md`](scoring/EVALUATION_TEMPLATE.md) — the structured scoring sheet
4. Publish your evaluation and link it here via a PR to [`community/EVALUATIONS.md`](community/EVALUATIONS.md)

### Option 2 — Command-Line Tool (developers)

```bash
# Clone the repository
git clone https://github.com/OpenNHE/sperb-benchmark.git
cd sperb-benchmark

# Install dependencies
npm install

# Run the interactive evaluator
node tools/evaluate.js

# Or score a specific entity from a JSON profile
node tools/evaluate.js --profile tools/examples/example_profile.json
```

### Option 3 — Use the Evaluation Template Directly

Download [`scoring/EVALUATION_TEMPLATE.md`](scoring/EVALUATION_TEMPLATE.md), fill it in, and share your results. No tools needed.

---

## Repository Structure

```
sperb-benchmark/
│
├── README.md                          ← You are here
├── LICENSE.md                         ← CC BY 4.0 — open for use with attribution
├── CHANGELOG.md                       ← Version history
├── CONTRIBUTING.md                    ← How to contribute
│
├── framework/
│   ├── SPERB_SPECIFICATION.md         ← Full v1.0 methodology (the canonical document)
│   ├── DIMENSION_PVS.md               ← Photorealism & Visual Consistency
│   ├── DIMENSION_AIDS.md              ← AI Identity Disclosure
│   ├── DIMENSION_GDS.md               ← Governance & Documentation
│   ├── DIMENSION_CPOS.md              ← Creative Pipeline Originality
│   ├── DIMENSION_ECS.md               ← Ethical Conduct
│   ├── DIMENSION_CSRS.md              ← Cultural & Social Responsibility
│   ├── DIMENSION_SCES.md              ← Synthetic Companionship Ethics
│   └── DIMENSION_CITS.md              ← Commercial Intent Transparency
│
├── scoring/
│   ├── SCORING_RUBRIC.md              ← Reference card — all 8 dimensions at a glance
│   ├── EVALUATION_TEMPLATE.md         ← Fill-in-the-blank scoring sheet
│   └── TIER_BOUNDARIES.md             ← Tier system, thresholds, and implications
│
├── pilot/
│   ├── PILOT_RESULTS.md               ← Full inaugural benchmark (May 2026)
│   └── entities/
│       ├── shayari_nhe01.md
│       ├── imma.md
│       ├── noonoouri.md
│       ├── kenza_layli.md
│       ├── rozy.md
│       ├── aitana_lopez.md
│       ├── shudu_gram.md
│       ├── lil_miquela.md
│       ├── kyra.md
│       ├── naina_avtr.md
│       └── tanvi_joshi_reference.md
│
├── tools/
│   ├── evaluate.js                    ← Interactive CLI evaluator
│   ├── score.js                       ← Score calculator and tier classifier
│   ├── report.js                      ← Markdown report generator
│   ├── package.json
│   └── examples/
│       └── example_profile.json       ← Example entity profile format
│
├── docs/
│   ├── ADOPTION_GUIDE.md              ← How brands, platforms & regulators adopt SPERB
│   ├── REGULATORY_ALIGNMENT.md        ← Mapping to EU AI Act, FTC, BOT Act, ASCI
│   ├── ITERATION_PROTOCOL.md          ← How SPERB v2.0 will be developed
│   ├── GLOSSARY.md                    ← Definitions of all SPERB terms
│   └── FAQ.md                         ← Common questions
│
├── community/
│   └── EVALUATIONS.md                 ← Community-submitted evaluations index
│
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── score_challenge.md          ← Challenge an existing score
    │   ├── new_evaluation.md           ← Submit a new evaluation
    │   └── dimension_proposal.md       ← Propose a framework change
    └── workflows/
        └── validate_evaluation.yml     ← CI: validates submitted evaluation format
```

---

## Who Created SPERB?

SPERB was created by **Algotheorem**, the research wing of **OpenNHE** — an open research initiative focused on the governance, evaluation, and ethical design of synthetic digital identities.

The inaugural pilot benchmark and framework specification were co-authored by:

- **Pratham Prateek Mohanty** — Framework architect, pilot benchmark design, governance methodology
- **Claude (Opus 4.7), Anthropic** — Specification drafting, scoring rubric formalisation, pilot benchmark scoring

SPERB is published as an **open specification**. It is not a proprietary product. No licence is required to use it, apply it, or adapt it — only attribution.

> *Algotheorem is the research wing of OpenNHE. OpenNHE is an open initiative for the governance of Non-Human Entities in digital public spaces.*

---

## Why Open Source?

A framework that demands transparency from AI personas must itself be transparent.

SPERB is open because:

1. **Credibility requires scrutiny** — scores must be reproducible by anyone, not by a certified-only body
2. **Adoption requires accessibility** — a framework behind a paywall helps nobody
3. **Evolution requires community** — the field moves fast; the framework must move with it
4. **A closed evaluation system is itself a governance failure** — we cannot preach accountability while practising opacity

---

## Citation

If you use SPERB in research, industry reports, or platform policy work, please cite:

```
Mohanty, P. P., & Claude (Opus 4.7), Anthropic. (2026). SPERB: The Synthetic Persona 
Ethics & Realism Benchmark — A Proposed Global Standard for the Evaluation, 
Classification, and Governance of AI Influencers (Version 1.0). 
Algotheorem / OpenNHE. https://github.com/OpenNHE/sperb-benchmark
```

---

## Contributing

We welcome:
- Score challenges (with evidence)
- New community evaluations
- Dimension refinement proposals
- Translations
- Integration examples

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a PR or issue.

---

## License

SPERB v1.0 is published under the **Creative Commons Attribution 4.0 International (CC BY 4.0)** license.

**You are free to:**
- Use SPERB to evaluate any entity
- Adapt the framework for specific markets or contexts
- Build tools on top of SPERB
- Publish evaluations using SPERB scores

**Under one condition:**
- You credit **Algotheorem / OpenNHE** and link to this repository

See [`LICENSE.md`](LICENSE.md) for full terms.

---

<div align="center">

*SPERB is not a ranking system.*
*It is accountability infrastructure for the synthetic persona age.*

**[⭐ Star this repo](https://github.com/OpenNHE/sperb-benchmark) · [📋 Use the template](scoring/EVALUATION_TEMPLATE.md) · [💬 Open a discussion](https://github.com/OpenNHE/sperb-benchmark/discussions)**

</div>
