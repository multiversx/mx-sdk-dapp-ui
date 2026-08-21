#!/usr/bin/env node
/*
 * Post-build assertions on dist/web-components: no preflight leak, correct `@layer`
 * order, and every `mvx:` utility used in the markup has a rule behind it.
 * See "Tailwind pipeline" in CLAUDE.md.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const DIST = 'dist/web-components';

/** Stencil emits each component's CSS as a JS string literal; undo that escaping. */
const unescapeJs = source => source.replace(/\\\\/g, '\\');

/** Long enough to be a stylesheet rather than a class attribute. */
const CSS_LITERAL = /(["'])((?:(?!\1)[^\\]|\\.){200,})\1/g;

const LAYER_AT_RULE = /@layer\s+([a-z-]+)\s*[;{]/g;

/** `.mvx\:hover\:bg-x:hover` - consume escapes so the name is not cut at the real pseudo-class. */
const DEFINED_UTILITY = /\.mvx\\:(?:\\.|[^\s{,>+~:()[\]"'])+/g;

/** Markup usage. Consumes `[...]` values whole and keeps `!` (prefix or suffix). */
const USED_UTILITY = /(?<![.\\])\bmvx:(?:\[[^\]]*\]|[A-Za-z0-9_.%/:!-])+/g;

/** Trailing punctuation swept up by USED_UTILITY from surrounding source text. */
const trimUtility = utility => utility.replace(/[.:-]+(?=!?$)/, '');

/** Rules that could only have come from an unscoped preflight. */
const GLOBAL_SELECTOR = /(?:^|[},])\s*(\*|html|body)\s*(?=[,{])/;

const failures = [];

const fail = message => failures.push(message);

const files = readdirSync(DIST).filter(name => name.endsWith('.js'));

if (files.length === 0) {
  fail(`${DIST} contains no JavaScript - run the build first.`);
}

const definedUtilities = new Set();
const usedUtilities = new Map();

for (const file of files) {
  const raw = readFileSync(join(DIST, file), 'utf8');
  const css = unescapeJs(raw);

  if (css.includes('@apply')) {
    fail(`${file}: ships a raw \`@apply\` directive - Tailwind did not process this stylesheet.`);
  }

  for (const match of css.matchAll(DEFINED_UTILITY)) {
    definedUtilities.add(match[0].slice(1).replace(/\\/g, ''));
  }

  for (const match of raw.matchAll(USED_UTILITY)) {
    const utility = trimUtility(match[0]);

    if (!usedUtilities.has(utility)) {
      usedUtilities.set(utility, file);
    }
  }

  for (const [, , literal] of raw.matchAll(CSS_LITERAL)) {
    const stylesheet = unescapeJs(literal);

    if (!stylesheet.includes('@layer mvx-reset')) {
      continue;
    }

    const layers = [...stylesheet.matchAll(LAYER_AT_RULE)].map(match => match[1]);
    const reset = layers.indexOf('mvx-reset');
    const utilities = layers.indexOf('utilities');

    if (reset !== -1 && utilities !== -1 && reset > utilities) {
      fail(`${file}: \`mvx-reset\` sorts after \`utilities\` (${layers.join(' < ')}).`);
    }

    // `:host` marks a shadow component; only the `:where(<tag>)` form can leak.
    if (stylesheet.includes('@layer mvx-reset{:host')) {
      continue;
    }

    for (const rule of stylesheet.split('{')) {
      if (GLOBAL_SELECTOR.test(`${rule}{`)) {
        const tag = stylesheet.match(/@layer mvx-reset\{:where\(([a-z-]+)/)?.[1] ?? 'unknown';
        fail(`${file}: non-shadow component \`${tag}\` emits a document-level rule: \`${rule.trim().slice(-120)}\``);
        break;
      }
    }
  }
}

const missing = [...usedUtilities].filter(([utility]) => !definedUtilities.has(utility));

if (definedUtilities.size === 0) {
  fail('No Tailwind utility rules were emitted anywhere in the build.');
}

for (const [utility, file] of missing.slice(0, 20)) {
  fail(`${utility} is used in ${file} but no rule defines it.`);
}

if (missing.length > 20) {
  fail(`... and ${missing.length - 20} more undefined utilities.`);
}

if (failures.length > 0) {
  console.error('assert-no-preflight-leak: FAILED\n');
  failures.forEach(message => console.error(`  - ${message}`));
  process.exit(1);
}

console.log(
  `assert-no-preflight-leak: OK (${files.length} files, ${definedUtilities.size} utilities defined, ` +
    `${usedUtilities.size} used)`,
);
