/**
 * SPERB v1.0 — Score Calculator and Tier Classifier
 * Maintained by Algotheorem / OpenNHE
 * https://github.com/OpenNHE/sperb-benchmark
 */

'use strict';

const DIMENSION_CODES = ['PVS', 'AIDS', 'GDS', 'CPOS', 'ECS', 'CSRS', 'SCES', 'CITS'];
const MAX_AGGREGATE = 80;
const NORMALISATION_FACTOR = 1.25; // 80 × 1.25 = 100

/**
 * TIER_BOUNDARIES defines the normalised score thresholds.
 * Version-locked at v1.0. Changes require Iteration Protocol.
 */
const TIER_BOUNDARIES = [
  { name: 'Platinum', min: 85, emoji: '🏆' },
  { name: 'Gold',     min: 70, emoji: '🥇' },
  { name: 'Silver',   min: 55, emoji: '🥈' },
  { name: 'Bronze',   min: 40, emoji: '🥉' },
  { name: 'Unrated',  min:  0, emoji: '⛔' }
];

/**
 * calculateScore — compute aggregate, normalised score, and tier from dimension scores.
 *
 * @param {Object} scores — { PVS: number, AIDS: number, GDS: number, CPOS: number,
 *                            ECS: number, CSRS: number, SCES: number, CITS: number }
 * @returns {{ aggregate: number, normalised: number, tier: string, tierEmoji: string }}
 * @throws if any dimension score is missing or out of range
 */
function calculateScore(scores) {
  // Validate
  for (const code of DIMENSION_CODES) {
    if (scores[code] === undefined || scores[code] === null) {
      throw new Error(`Missing score for dimension: ${code}`);
    }
    const s = parseFloat(scores[code]);
    if (isNaN(s) || s < 0 || s > 10) {
      throw new Error(`Invalid score for ${code}: ${scores[code]}. Must be 0–10.`);
    }
  }

  const aggregate = parseFloat(
    DIMENSION_CODES.reduce((sum, code) => sum + parseFloat(scores[code]), 0).toFixed(2)
  );

  const normalised = parseFloat((aggregate * NORMALISATION_FACTOR).toFixed(1));

  const tierObj = TIER_BOUNDARIES.find(t => normalised >= t.min);
  const tier = tierObj ? tierObj.name : 'Unrated';
  const tierEmoji = tierObj ? tierObj.emoji : '⛔';

  return { aggregate, normalised, tier, tierEmoji };
}

/**
 * getTier — standalone tier classification from a normalised score.
 *
 * @param {number} normalised — score out of 100
 * @returns {string} tier name
 */
function getTier(normalised) {
  const tierObj = TIER_BOUNDARIES.find(t => normalised >= t.min);
  return tierObj ? tierObj.name : 'Unrated';
}

/**
 * generateReport — produce a markdown evaluation report.
 *
 * @param {Object} entity    — { name, handle, country, creator, notes }
 * @param {Object} scores    — dimension scores
 * @param {Object} justifications — dimension justification strings
 * @param {Object} result    — { aggregate, normalised, tier, tierEmoji }
 * @returns {string} markdown
 */
function generateReport(entity, scores, justifications, result) {
  const date = new Date().toISOString().slice(0, 10);
  const { aggregate, normalised, tier, tierEmoji } = result;

  const dimensionNames = {
    PVS:  'Photorealism & Visual Consistency',
    AIDS: 'AI Identity Disclosure',
    GDS:  'Governance & Documentation',
    CPOS: 'Creative Pipeline Originality',
    ECS:  'Ethical Conduct',
    CSRS: 'Cultural & Social Responsibility',
    SCES: 'Synthetic Companionship Ethics',
    CITS: 'Commercial Intent Transparency'
  };

  let md = '';
  md += `# SPERB v1.0 Evaluation — ${entity.name || 'Unknown Entity'}\n\n`;
  md += `**Handle:** ${entity.handle || 'N/A'}  \n`;
  md += `**Country:** ${entity.country || 'N/A'}  \n`;
  md += `**Creator / Studio:** ${entity.creator || 'Unknown'}  \n`;
  md += `**Evaluation Date:** ${date}  \n`;
  if (entity.notes) md += `**Notes:** ${entity.notes}  \n`;
  md += '\n---\n\n';
  md += `## Result\n\n`;
  md += `| | |\n|---|---|\n`;
  md += `| **SPERB Score** | **${normalised}/100** |\n`;
  md += `| **Tier** | **${tierEmoji} ${tier}** |\n`;
  md += `| **Aggregate** | ${aggregate}/80 |\n\n`;
  md += `---\n\n## Dimension Scores\n\n`;
  md += `| Dimension | Score | Notes |\n|-----------|-------|-------|\n`;

  for (const code of DIMENSION_CODES) {
    const score = parseFloat(scores[code]);
    const bar = score >= 8 ? '🟢' : score >= 5 ? '🟡' : '🔴';
    const just = justifications[code] || '';
    md += `| **${code}** — ${dimensionNames[code]} | ${bar} ${score}/10 | ${just} |\n`;
  }

  md += `\n---\n\n## Score Breakdown\n\n`;
  md += `\`\`\`\n`;
  md += `Aggregate  = ${DIMENSION_CODES.map(c => `${c}(${scores[c]})`).join(' + ')}\n`;
  md += `           = ${aggregate}/80\n`;
  md += `Normalised = ${aggregate} × ${NORMALISATION_FACTOR} = ${normalised}/100\n`;
  md += `Tier       = ${tierEmoji} ${tier}\n`;
  md += `\`\`\`\n\n`;
  md += `---\n\n`;
  md += `*Evaluated using [SPERB v1.0](https://github.com/OpenNHE/sperb-benchmark) by Algotheorem / OpenNHE. CC BY 4.0.*\n`;

  return md;
}

/**
 * compareCohort — rank a set of scored entities.
 *
 * @param {Array} entities — [{ name, scores: { PVS, AIDS, ... } }, ...]
 * @returns {Array} sorted by normalised score descending, with tier added
 */
function compareCohort(entities) {
  return entities
    .map(e => {
      const result = calculateScore(e.scores);
      return { ...e, ...result };
    })
    .sort((a, b) => b.normalised - a.normalised)
    .map((e, i) => ({ ...e, rank: i + 1 }));
}

module.exports = { calculateScore, getTier, generateReport, compareCohort, DIMENSION_CODES, TIER_BOUNDARIES };
