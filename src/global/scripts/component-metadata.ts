import * as fs from 'fs';
import * as path from 'path';

export interface ComponentMetadata {
  /** The custom element tag, e.g. `mvx-trim`. */
  tag: string;
  /** True only for `shadow: true`. Omitting `shadow` means no encapsulation. */
  shadow: boolean;
  /** Resolved directory the @Component lives in. */
  dir: string;
  file: string;
}

function getTSXFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getTSXFiles(filePath));
    } else if (filePath.endsWith('.tsx')) {
      results.push(filePath);
    }
  });

  return results;
}

/**
 * Returns the source text of the object literal passed to `@Component(...)`, by
 * brace-matching from the first `{` after `@Component(`.
 *
 * Brace matching rather than a `[^}]*` regex: the latter stops at the first
 * nested `}` and misreads any decorator containing a nested object.
 */
function extractComponentDecoratorBody(content: string): string | null {
  const start = content.indexOf('@Component(');

  if (start === -1) {
    return null;
  }

  const open = content.indexOf('{', start);

  if (open === -1) {
    return null;
  }

  let depth = 0;

  for (let index = open; index < content.length; index++) {
    const character = content[index];

    if (character === '{') {
      depth++;
    } else if (character === '}') {
      depth--;

      if (depth === 0) {
        return content.slice(open, index + 1);
      }
    }
  }

  return null;
}

/**
 * Parses every `@Component` decorator under `rootDir`.
 *
 * This is the single source of truth for shadow-vs-light-DOM classification.
 * It feeds both the React/Vue exclusion list and, more importantly, the choice
 * of Tailwind entry per component — a component misclassified as shadow would
 * ship a global CSS reset into every consumer's document.
 */
export function readComponentMetadata(rootDir: string): ComponentMetadata[] {
  return getTSXFiles(rootDir).flatMap(file => {
    const body = extractComponentDecoratorBody(fs.readFileSync(file, 'utf8'));

    if (!body) {
      return [];
    }

    const tag = body.match(/\btag:\s*['"`]([^'"`]+)['"`]/)?.[1];

    if (!tag) {
      return [];
    }

    return [
      {
        tag,
        shadow: /\bshadow:\s*true\b/.test(body),
        dir: path.resolve(path.dirname(file)),
        file,
      },
    ];
  });
}
