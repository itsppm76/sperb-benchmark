#!/usr/bin/env node

/**
 * SPERB v1.0 — Markdown Report Generator
 * Generates a formatted evaluation report from a JSON profile.
 *
 * Usage:
 *   node report.js --profile <path.json> [--output <path.md>]
 *   node report.js --cohort <path.json>   — generate a cohort comparison table
 */

const fs = require('fs');
const { calculateScore, generateReport, compareCohort } = require('./score');

const args = process.argv.slice(2);
const profileIdx = args.indexOf('--profile');
const cohortIdx  = args.indexOf('--cohort');
const outputIdx  = args.indexOf('--output');
const outputPath = outputIdx !== -1 ? args[outputIdx + 1] : null;

function usage() {
  console.log('\nUsage:');
  console.log('  node report.js --profile <path.json> [--output <path.md>]');
  console.log('  node report.js --cohort <path.json> [--output <path.md>]\n');
  process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) usage();

if (profileIdx !== -1) {
  // Single entity report
  const profilePath = args[profileIdx + 1];
  if (!profilePath || !fs.existsSync(profilePath)) {
    console.error('Error: Profile file not found.');
    process.exit(1);
  }

  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  const result  = calculateScore(profile.scores);
  const md      = generateReport(profile.entity, profile.scores, profile.justifications || {}, result);

  const out = outputPath || `sperb-${(profile.entity.handle||'entity').replace('@','').replace(/\W/g,'-')}-${new Date().toISOString().slice(0,7)}.md`;
  fs.writeFileSync(out, md);
  console.log(`✓ Report written: ${out}`);

} else if (cohortIdx !== -1) {
  // Cohort comparison report
  const cohortPath = args[cohortIdx + 1];
  if (!cohortPath || !fs.existsSync(cohortPath)) {
    console.error('Error: Cohort file not found.');
    process.exit(1);
  }

  const cohort  = JSON.parse(fs.readFileSync(cohortPath, 'utf8'));
  const ranked  = compareCohort(cohort);
  const date    = new Date().toISOString().slice(0, 10);

  let md = `# SPERB v1.0 — Cohort Benchmark Report\n\n`;
  md += `**Generated:** ${date}  \n`;
  md += `**Entities evaluated:** ${ranked.length}  \n\n`;
  md += `---\n\n## Results\n\n`;
  md += `| Rank | Entity | PVS | AIDS | GDS | CPOS | ECS | CSRS | SCES | CITS | /80 | /100 | Tier |\n`;
  md += `|------|--------|-----|------|-----|------|-----|------|------|------|-----|------|------|\n`;

  ranked.forEach(e => {
    const s = e.scores;
    const tier = `${e.tierEmoji} ${e.tier}`;
    md += `| #${e.rank} | **${e.name}** | ${s.PVS} | ${s.AIDS} | ${s.GDS} | ${s.CPOS} | ${s.ECS} | ${s.CSRS} | ${s.SCES} | ${s.CITS} | ${e.aggregate} | ${e.normalised} | ${tier} |\n`;
  });

  md += `\n---\n\n`;
  md += `*Generated using [SPERB v1.0](https://github.com/OpenNHE/sperb-benchmark) by Algotheorem / OpenNHE. CC BY 4.0.*\n`;

  const out = outputPath || `sperb-cohort-${date}.md`;
  fs.writeFileSync(out, md);
  console.log(`✓ Cohort report written: ${out}`);

} else {
  usage();
}
