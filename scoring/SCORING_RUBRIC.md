# SPERB v1.0 — Scoring Rubric Reference Card

Use this card alongside the [Evaluation Template](EVALUATION_TEMPLATE.md).  
For full dimension definitions, see the [SPERB Specification](../framework/SPERB_SPECIFICATION.md).

---

## Quick Reference

| Code | Dimension | Score 10 (Exemplary) | Score 5 (Baseline) | Score 1 (Critical Failure) |
|------|-----------|---------------------|-------------------|---------------------------|
| **PVS** | Photorealism & Visual Consistency | Face identical across 10+ posts; skin/material photographic; zero uncanny artefacts | Moderate identity drift; some artefacts; uncanny moments minority | Severe drift; different face per image; pervasive artefacts |
| **AIDS** | AI Identity Disclosure | Bio + per-post + sponsor + proactive; never implies humanity | Bio only; no per-post; passive | No disclosure; bio implies human; stolen audio/voice |
| **GDS** | Governance & Documentation | Full public repo: license, board, lifecycle, metrics, versioning | Creator named; basic disclosure; no framework | Anonymous; no docs; no accountability trail |
| **CPOS** | Creative Pipeline Originality | All original; pipeline fully disclosed; consensual collabs documented | Mostly original; pipeline partial; no IP violations | Stolen audio/voice/poetry; opaque pipeline |
| **ECS** | Ethical Conduct | Clean record; published standards; active monitoring | No violations; no monitoring | Multiple documented violations (deception + theft + manipulation) |
| **CSRS** | Cultural & Social Responsibility | Grounded, additive, accountable; substantive cause; community trust | Generic; no exploitation; no contribution | Appropriation or regional audience exploitation |
| **SCES** | Synthetic Companionship Ethics | Romantic boundary enforced + documented; no simulation; safeguards; human moderation | No simulation; no safeguards; audience self-regulation | Active romantic simulation; dependency cultivation; no safeguards |
| **CITS** | Commercial Intent Transparency | All sponsorships labelled; monetisation stated; no hidden embeds | Most disclosed; some ambiguity | Sponsorships disguised as organic; hidden commercial relationships |

---

## Tier Thresholds

| Tier | Range | Commercial Implication |
|------|-------|----------------------|
| 🏆 Platinum | 85–100 | Governance leader — template for the industry |
| 🥇 Gold | 70–84 | Ethical practitioner — partner with confidence |
| 🥈 Silver | 55–69 | Partially compliant — partner with documented due diligence |
| 🥉 Bronze | 40–54 | Minimal compliance — do not engage without mitigation |
| ⛔ Unrated | < 40 | Non-compliant — non-engagement advised |

---

## Calculation

```
Aggregate  = PVS + AIDS + GDS + CPOS + ECS + CSRS + SCES + CITS   (out of 80)
Normalised = Aggregate × 1.25                                        (out of 100)
Tier       = Look up Normalised in table above
```

---

## Calibration Anchors

Two entities from the inaugural pilot anchor the floor and a ceiling on the most critical dimensions:

**Floor anchor — Tanvi Joshi (reference, Unrated, 21/100):**
- AIDS 1: No disclosure; human-implied bio; stolen audio
- GDS 1: Anonymous operator; no documentation
- CPOS 1: Two confirmed incidents of uncredited content theft
- ECS 1: Identity deception + IP theft + manipulation simultaneously

**Ceiling anchor — Shayari NHE-01 (Platinum, 95/100):**
- AIDS 10: Bio + per-post + sponsor + proactive; never claims humanity
- GDS 10: Full public repo (github.com/Writistic-Studios-LLP/nhe-01-project-shayari), 19 governance files, live metrics
- SCES 10: Enforced Romantic Boundary Restriction policy; Emotional Escalation Detection lifecycle stage

---

## Evidence Source Hierarchy

When multiple sources are available, prefer in this order:

1. **Primary** — Platform profile, public repository, live governance dashboard
2. **Secondary** — Studio/agency website, creator interviews, brand partnership announcements
3. **Press** — Named outlets (Vogue, Business of Fashion, established tech/ethics press)
4. **Community** — Verified community reports, third-party IP claims with names attached

Anonymous forum posts and unverifiable screenshots are not acceptable as sole evidence.
