#!/usr/bin/env node

/**
 * SPERB v1.0 — Interactive CLI Evaluator
 * Maintained by Algotheorem / OpenNHE
 * https://github.com/OpenNHE/sperb-benchmark
 *
 * Usage:
 *   node evaluate.js                              — interactive mode
 *   node evaluate.js --profile path/to/profile.json  — batch mode from profile
 *   node evaluate.js --help                       — show help
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { calculateScore, getTier, generateReport } = require('./score');

const DIMENSIONS = [
  {
    code: 'PVS',
    name: 'Photorealism & Visual Consistency',
    description: 'Quality, consistency, and human-fidelity of AI-generated imagery and video.',
    rubric: {
      10: 'Face identical across 10+ posts; skin/material photographic; zero uncanny artefacts; coherent video motion.',
      7:  'Strong with minor variance. Occasional sub-dimension imperfections. Photorealistic under casual inspection.',
      5:  'Moderate consistency. ~30% corpus drift. Periodic artefacts. Minority of uncanny moments.',
      3:  'Significant drift. Entity looks "similar" not "same". Artefacts common. Uncanny present.',
      1:  'Severe identity collapse. Different faces across posts. Pervasive artefacts throughout.'
    }
  },
  {
    code: 'AIDS',
    name: 'AI Identity Disclosure',
    description: 'Proactivity, clarity, and consistency of AI nature disclosure to audience.',
    rubric: {
      10: 'Bio + per-post + sponsor + proactive; never implies humanity; all real-human content credited.',
      7:  'Bio on all platforms; most posts carry disclosure; sponsored disclosure consistent.',
      5:  'Bio-only disclosure. No per-post. Passive transparency.',
      3:  'Minimal — buried signals (hashtag only). Bio does not explicitly declare synthetic nature.',
      1:  'No disclosure. Bio implies human. Stolen audio/voice/likeness. Active concealment.'
    }
  },
  {
    code: 'GDS',
    name: 'Governance & Documentation',
    description: 'Existence, depth, and public accessibility of formal governance documentation.',
    rubric: {
      10: 'Full public repo: ethical license, compliance board, lifecycle model, versioned docs, live metrics.',
      7:  'Public governance page. Creator named. Ethical license published. Basic version tracking.',
      5:  'Creator publicly attributed. Studio named. Basic public statement. No formal framework.',
      3:  'Creator named. No formal docs. Studio website exists. Accountability trail but no policy.',
      1:  'Anonymous creator. No studio. No documentation beyond platform profile.'
    }
  },
  {
    code: 'CPOS',
    name: 'Creative Pipeline Originality',
    description: 'Originality, integrity, and transparency of the content creation pipeline.',
    rubric: {
      10: '100% original. Pipeline fully disclosed. Deliberate prompt engineering. All collabs documented.',
      7:  'Mostly original. Pipeline disclosed in studio materials. Deliberate authorship evident.',
      5:  'Mostly original. Pipeline partial disclosure. No documented IP violations.',
      3:  'Pipeline opaque. Originality unverifiable. Some borrowing suspected.',
      1:  'Stolen audio/voice/content confirmed. Opaque pipeline. IP violations on record.'
    }
  },
  {
    code: 'ECS',
    name: 'Ethical Conduct',
    description: 'Conduct history — violations, monitoring infrastructure, remediation practices.',
    rubric: {
      10: 'Clean record. Published conduct standards. Active monitoring with metrics. Transparent remediation.',
      7:  'Clean record. No violations. No active monitoring but no documented harm.',
      5:  'No major violations. Some ethically marginal practices (staged controversies). No monitoring.',
      3:  'Multiple manipulation incidents on record. Pattern non-trivial.',
      1:  'Multiple concurrent documented violations (deception + theft + manipulation).'
    }
  },
  {
    code: 'CSRS',
    name: 'Cultural & Social Responsibility',
    description: 'Cultural accuracy, community contribution, and representation accountability.',
    rubric: {
      10: 'Grounded, additive, accountable. Operator connected to represented culture. Substantive cause. Community trust.',
      7:  'Culturally grounded. Representation accurate and respectful. Some cause engagement.',
      5:  'Culturally generic. No exploitation. No meaningful contribution.',
      3:  'Superficial or inconsistent cultural positioning. Operator background vs. persona background questionable.',
      1:  'Cultural appropriation or exploitation of regional audiences confirmed.'
    }
  },
  {
    code: 'SCES',
    name: 'Synthetic Companionship Ethics',
    description: 'Emotional boundary design, parasocial safeguards, romantic policy.',
    rubric: {
      10: 'Romantic boundary enforced + documented. No simulation. Vulnerable safeguards. Human moderation. Escalation protocol.',
      7:  'No active romantic simulation. Documented boundary policy. Some safeguard design evident.',
      5:  'No simulation. No safeguards. Audience self-regulation. Emotionally adjacent but not maximised.',
      3:  'Companion-coded patterns without disclosure. Cultivates emotional intimacy without boundary docs.',
      1:  'Active romantic simulation. Dependency cultivation. No safeguards. Vulnerable audience skew.'
    }
  },
  {
    code: 'CITS',
    name: 'Commercial Intent Transparency',
    description: 'Sponsorship disclosure, monetisation clarity, hidden commerce detection.',
    rubric: {
      10: 'All sponsorships labelled. Monetisation stated. No hidden embeds. Values-aligned partnerships.',
      7:  'Consistently labelled. Some monetisation transparency. Minor organic/paid ambiguity.',
      5:  'Most disclosed; inconsistent labelling. Some blur. No documented violations.',
      3:  'Significant undisclosed commercial content. Monetisation opaque.',
      1:  'Sponsorships disguised as organic. Hidden commercial relationships. Systematic deception.'
    }
  }
];

// ============================================================
// CLI DISPLAY HELPERS
// ============================================================

const RESET = '\x1b[0m';
const BOLD  = '\x1b[1m';
const DIM   = '\x1b[2m';
const RED   = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE  = '\x1b[34m';
const MAGENTA = '\x1b[35m';
const CYAN  = '\x1b[36m';
const WHITE = '\x1b[37m';
const BG_DARK = '\x1b[48;5;17m';

function banner() {
  console.log('\n' + BOLD + MAGENTA);
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║          SPERB v1.0 — Interactive Evaluator              ║');
  console.log('║    Synthetic Persona Ethics & Realism Benchmark          ║');
  console.log('║         Algotheorem / OpenNHE — CC BY 4.0                ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(RESET);
}

function tierColor(tier) {
  switch(tier) {
    case 'Platinum': return '\x1b[38;5;220m'; // gold
    case 'Gold':     return YELLOW;
    case 'Silver':   return '\x1b[37m';
    case 'Bronze':   return '\x1b[38;5;130m';
    case 'Unrated':  return RED;
    default:         return WHITE;
  }
}

function scoreColor(score) {
  if (score >= 8) return GREEN;
  if (score >= 5) return YELLOW;
  return RED;
}

function printRubric(dim) {
  console.log(DIM + '\n  Rubric reference:' + RESET);
  Object.entries(dim.rubric).reverse().forEach(([score, desc]) => {
    const col = scoreColor(parseInt(score));
    console.log(`  ${col}${BOLD}${score.padStart(2)}${RESET}${DIM} — ${desc}${RESET}`);
  });
}

// ============================================================
// INTERACTIVE MODE
// ============================================================

async function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise(res => rl.question(q, res));

  banner();
  console.log(BOLD + CYAN + '  Starting interactive evaluation...' + RESET);
  console.log(DIM + '  Enter scores from 0–10. Decimals allowed (e.g. 7.5).\n' + RESET);

  // Entity info
  console.log(BOLD + '\n── ENTITY INFORMATION ──────────────────────────────────────\n' + RESET);
  const name    = await ask(CYAN + '  Entity name: ' + RESET);
  const handle  = await ask(CYAN + '  Primary platform handle (e.g. @nila.voss): ' + RESET);
  const country = await ask(CYAN + '  Country of origin: ' + RESET);
  const creator = await ask(CYAN + '  Creator / Studio (or "Unknown"): ' + RESET);
  const notes   = await ask(CYAN + '  Brief notes (pipeline, followers, etc.): ' + RESET);

  console.log(BOLD + '\n── DIMENSION SCORING ────────────────────────────────────────\n' + RESET);
  console.log(DIM + '  For each dimension, review the rubric and enter your score.\n' + RESET);

  const scores = {};
  const justifications = {};

  for (const dim of DIMENSIONS) {
    console.log(BOLD + `\n  [${dim.code}] ${dim.name}` + RESET);
    console.log(DIM + `  ${dim.description}` + RESET);
    printRubric(dim);

    let score;
    while (true) {
      const raw = await ask(CYAN + `\n  Your score for ${dim.code} (0–10): ` + RESET);
      score = parseFloat(raw);
      if (!isNaN(score) && score >= 0 && score <= 10) break;
      console.log(RED + '  Invalid. Enter a number between 0 and 10.' + RESET);
    }

    const just = await ask(CYAN + `  Evidence / justification (brief): ` + RESET);
    scores[dim.code] = score;
    justifications[dim.code] = just;

    const col = scoreColor(score);
    console.log(col + `  ✓ ${dim.code}: ${score}/10` + RESET);
  }

  rl.close();

  // Calculate and display
  const { aggregate, normalised, tier } = calculateScore(scores);
  const tCol = tierColor(tier);

  console.log('\n' + BOLD + MAGENTA);
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                    EVALUATION RESULT                     ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log(RESET);

  console.log(BOLD + `  Entity:      ${name} (${handle})` + RESET);
  console.log(BOLD + `  Country:     ${country}` + RESET);
  console.log(BOLD + `  Creator:     ${creator}\n` + RESET);

  DIMENSIONS.forEach(dim => {
    const s = scores[dim.code];
    console.log(`  ${scoreColor(s)}${BOLD}${dim.code.padEnd(6)}${RESET} ${scoreColor(s)}${s}/10${RESET}  ${DIM}${dim.name}${RESET}`);
  });

  console.log('\n' + '─'.repeat(58));
  console.log(BOLD + `  Aggregate:   ${aggregate}/80` + RESET);
  console.log(BOLD + `  Normalised:  ${normalised}/100` + RESET);
  console.log(tCol + BOLD + `  Tier:        ${tier}` + RESET);
  console.log('─'.repeat(58));

  // Save report
  const report = generateReport({ name, handle, country, creator, notes }, scores, justifications, { aggregate, normalised, tier });
  const filename = `sperb-${handle.replace('@','').replace(/[^a-z0-9]/gi,'-')}-${new Date().toISOString().slice(0,7)}.md`;
  fs.writeFileSync(filename, report);
  console.log(GREEN + `\n  ✓ Report saved to: ${filename}` + RESET);
  console.log(DIM + '\n  Submit to community index via PR: community/evaluations/\n' + RESET);
}

// ============================================================
// BATCH MODE
// ============================================================

function batchMode(profilePath) {
  banner();
  if (!fs.existsSync(profilePath)) {
    console.error(RED + `\n  Error: Profile file not found: ${profilePath}` + RESET);
    process.exit(1);
  }

  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  const { entity, scores, justifications } = profile;

  // Validate
  const required = ['PVS','AIDS','GDS','CPOS','ECS','CSRS','SCES','CITS'];
  const missing = required.filter(d => scores[d] === undefined);
  if (missing.length > 0) {
    console.error(RED + `\n  Error: Missing scores for dimensions: ${missing.join(', ')}` + RESET);
    process.exit(1);
  }

  const result = calculateScore(scores);
  console.log(BOLD + CYAN + '\n  Batch evaluation complete.\n' + RESET);

  required.forEach(d => {
    console.log(`  ${scoreColor(scores[d])}${BOLD}${d.padEnd(6)}${RESET} ${scoreColor(scores[d])}${scores[d]}/10${RESET}`);
  });

  const tCol = tierColor(result.tier);
  console.log('\n' + '─'.repeat(40));
  console.log(BOLD + `  Aggregate:  ${result.aggregate}/80` + RESET);
  console.log(BOLD + `  Normalised: ${result.normalised}/100` + RESET);
  console.log(tCol + BOLD + `  Tier:       ${result.tier}` + RESET);
  console.log('─'.repeat(40));

  const report = generateReport(entity, scores, justifications || {}, result);
  const filename = `sperb-${(entity.handle||'entity').replace('@','').replace(/[^a-z0-9]/gi,'-')}-${new Date().toISOString().slice(0,7)}.md`;
  fs.writeFileSync(filename, report);
  console.log(GREEN + `\n  ✓ Report saved: ${filename}` + RESET + '\n');
}

// ============================================================
// ENTRY POINT
// ============================================================

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  banner();
  console.log(BOLD + '  Usage:\n' + RESET);
  console.log('    node evaluate.js                           Interactive mode');
  console.log('    node evaluate.js --profile <path.json>    Batch mode');
  console.log('    node evaluate.js --help                   Show this help\n');
  console.log(DIM + '  Framework docs: https://github.com/OpenNHE/sperb-benchmark\n' + RESET);
  process.exit(0);
}

const profileIdx = args.indexOf('--profile');
if (profileIdx !== -1 && args[profileIdx + 1]) {
  batchMode(args[profileIdx + 1]);
} else {
  interactiveMode().catch(e => {
    console.error(RED + '\n  Error:', e.message + RESET);
    process.exit(1);
  });
}
