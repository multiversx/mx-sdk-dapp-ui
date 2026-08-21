import * as fs from 'fs';
import * as path from 'path';

import { readComponentMetadata } from './component-metadata';

const GLOBAL_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(GLOBAL_DIR, '..');

const EXTENSIONS = ['.tsx', '.ts'];

/** `import ... from`, `export ... from`, bare `import '<x>'`, dynamic `import('<x>')`. */
const IMPORT_PATTERN =
  /(?:\bimport\b|\bexport\b)[\s\S]*?\bfrom\s*['"]([^'"]+)['"]|\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)|\bimport\s*['"]([^'"]+)['"]/g;

const IGNORED_FILE = /(\.spec\.tsx?|\.e2e\.ts|\.stories\.tsx?)$/;

const isFile = (candidate: string): boolean => {
  try {
    return fs.statSync(candidate).isFile();
  } catch {
    return false;
  }
};

function resolveAgainst(base: string, spec: string): string | null {
  const target = path.resolve(base, spec);

  for (const extension of EXTENSIONS) {
    if (isFile(`${target}${extension}`)) {
      return `${target}${extension}`;
    }
  }

  for (const extension of EXTENSIONS) {
    const indexFile = path.join(target, `index${extension}`);

    if (isFile(indexFile)) {
      return indexFile;
    }
  }

  return EXTENSIONS.includes(path.extname(target)) && isFile(target) ? target : null;
}

/** Relative against the importer, bare against `src/` (tsconfig `baseUrl`). Null if outside `src/`. */
function resolveSpecifier(importer: string, spec: string): string | null {
  const resolved = spec.startsWith('.')
    ? resolveAgainst(path.dirname(importer), spec)
    : resolveAgainst(SRC_DIR, spec);

  if (resolved === null) {
    return null;
  }

  const relative = path.relative(SRC_DIR, resolved);

  return relative.startsWith('..') || path.isAbsolute(relative) ? null : resolved;
}

function readImportSpecifiers(file: string): string[] {
  const contents = fs.readFileSync(file, 'utf8');
  const specifiers: string[] = [];

  IMPORT_PATTERN.lastIndex = 0;

  let match = IMPORT_PATTERN.exec(contents);

  while (match !== null) {
    const spec = match[1] ?? match[2] ?? match[3];

    if (spec) {
      specifiers.push(spec);
    }

    match = IMPORT_PATTERN.exec(contents);
  }

  return specifiers;
}

/** Transitive imports reachable from `entry` inside `src/`. Cycles exist, hence `visited`. */
function collectImportClosure(entry: string): Set<string> {
  const visited = new Set<string>();
  const queue = [entry];

  while (queue.length > 0) {
    const file = queue.pop() as string;

    if (visited.has(file) || IGNORED_FILE.test(file)) {
      continue;
    }

    visited.add(file);

    for (const spec of readImportSpecifiers(file)) {
      const resolved = resolveSpecifier(file, spec);

      if (resolved !== null && !visited.has(resolved)) {
        queue.push(resolved);
      }
    }
  }

  return visited;
}

function collectSourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return collectSourceFiles(full);
    }

    return EXTENSIONS.includes(path.extname(full)) && !IGNORED_FILE.test(full) ? [full] : [];
  });
}

const componentMetadata = readComponentMetadata(SRC_DIR);
const componentFileByTag = new Map(componentMetadata.map(component => [component.tag, component.file]));

/** Shadow components that re-apply a consumer's `class` inside their own shadow root. */
const CLASS_FORWARDING_TAGS = new Set(
  componentMetadata
    .filter(component => component.shadow && /@Prop\(\)\s+class\b/.test(fs.readFileSync(component.file, 'utf8')))
    .map(component => component.tag),
);

/** Files that render `<mvx-some-tag>`, keyed by tag. */
const consumersByTag = new Map<string, string[]>();

for (const file of collectSourceFiles(SRC_DIR)) {
  const contents = fs.readFileSync(file, 'utf8');

  for (const match of contents.matchAll(/<(mvx-[a-z0-9-]+)/g)) {
    const existing = consumersByTag.get(match[1]);

    if (existing) {
      existing.push(file);
    } else {
      consumersByTag.set(match[1], [file]);
    }
  }
}

const sourceDirsCache = new Map<string, string[]>();

/**
 * Directories Tailwind must scan for `mvx:` candidates when building `tag`'s stylesheet.
 * See "Tailwind pipeline" in CLAUDE.md for why the scan is scoped this way.
 */
export function getSourceDirsForTag(tag: string): string[] {
  const cached = sourceDirsCache.get(tag);

  if (cached) {
    return cached;
  }

  const componentFile = componentFileByTag.get(tag);

  if (!componentFile) {
    sourceDirsCache.set(tag, []);
    return [];
  }

  const componentDir = path.resolve(path.dirname(componentFile));
  const isCoveredByBase = (dir: string) => dir === componentDir || dir.startsWith(`${componentDir}${path.sep}`);

  const reachable = collectImportClosure(path.resolve(componentFile));

  if (CLASS_FORWARDING_TAGS.has(tag)) {
    for (const consumer of consumersByTag.get(tag) ?? []) {
      for (const file of collectImportClosure(consumer)) {
        reachable.add(file);
      }
    }
  }

  const dirs = Array.from(reachable)
    .map(file => path.dirname(file))
    // `base` is scanned recursively already.
    .filter(dir => !isCoveredByBase(dir));

  const unique = Array.from(new Set(dirs)).sort();

  sourceDirsCache.set(tag, unique);

  return unique;
}
