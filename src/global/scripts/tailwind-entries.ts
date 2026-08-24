import * as fs from 'fs';
import * as path from 'path';

import { readComponentMetadata } from './component-metadata';

const GLOBAL_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(GLOBAL_DIR, '..');

const readGlobalCss = (name: string): string => fs.readFileSync(path.join(GLOBAL_DIR, name), 'utf8');

const SHARED_IMPORT = /^[ \t]*@import\s+['"]\.\/tailwind-shared\.css['"];[ \t]*$/m;

/**
 * `stencil-tailwind-plugin` runs postcss with `base` set to the *component's*
 * directory (see its `buildTailwindConfigurationForPostCss`). A relative
 * `@import './tailwind-shared.css'` inside the injected entry would therefore
 * be looked up next to the component and fail to resolve. Inline it instead.
 *
 * Bare specifiers (`@import 'tailwindcss/theme.css'`) are unaffected — node
 * resolution walks up from the component directory and finds this package's
 * node_modules.
 */
function inlineShared(entry: string, entryName: string): string {
  if (!SHARED_IMPORT.test(entry)) {
    throw new Error(
      `[tailwind] Expected a \`@import './tailwind-shared.css';\` line in ${entryName}. ` +
        'src/global/scripts/tailwind-entries.ts inlines that import because relative imports do ' +
        'not resolve from the component directory the plugin uses as postcss base.',
    );
  }

  return entry.replace(SHARED_IMPORT, readGlobalCss('tailwind-shared.css'));
}

/**
 * One preflight-free entry for everything, plus a scoped reset chosen per
 * component. See the comment at the top of tailwind.css for why preflight
 * cannot be emitted for shadow components either.
 */
const BASE_ENTRY = inlineShared(readGlobalCss('tailwind.css'), 'tailwind.css');
const SHADOW_RESET = readGlobalCss('tailwind-reset-shadow.css');
const LIGHT_DOM_RESET_TEMPLATE = readGlobalCss('tailwind-reset-light-dom.css');

const SHADOW_ENTRY = `${BASE_ENTRY}\n${SHADOW_RESET}\n`;

// Rooted at src/, not src/components — mvx-arrow-right-icon lives in src/assets/icons.
const components = readComponentMetadata(SRC_DIR);

const tagsByDir = new Map(components.map(component => [component.dir, component.tag]));
const shadowByTag = new Map(components.map(component => [component.tag, component.shadow]));

export const nonShadowTags = components
  .filter(component => !component.shadow)
  .map(component => component.tag)
  .sort();

export const shadowTags = components
  .filter(component => component.shadow)
  .map(component => component.tag)
  .sort();

/**
 * The plugin documents that `filename` may carry a `?tag=<tag-name>` suffix.
 * Prefer it; otherwise resolve by exact directory match.
 *
 * Exact (rather than nearest-ancestor) matching is deliberate and complete
 * here: no directory holds two `@Component` files, and every `styleUrl` is a
 * bare filename in its component's own directory. Anything else — src/common,
 * helpers, stories, src/global — falls through to `null` by design.
 */
export function resolveTagFromStyleFilename(filename: string): string | null {
  const [rawPath, query] = filename.split('?');

  if (query) {
    const tag = new URLSearchParams(query).get('tag');

    if (tag) {
      return tag;
    }
  }

  return tagsByDir.get(path.resolve(path.dirname(rawPath))) ?? null;
}

/**
 * Chooses the Tailwind entry CSS to prepend to a given file's styles.
 *
 * Nothing here ever emits preflight. Shadow components get a `:host`-scoped
 * reset, non-shadow components a reset scoped to their own custom element tag,
 * because their compiled CSS is injected into the host app's document.head.
 */
export function tailwindEntryFor(filename: string): string {
  const tag = resolveTagFromStyleFilename(filename);

  if (tag === null) {
    // Not a component file. The plugin's transform fires for every .tsx and
    // every stylesheet in the graph - src/common/**, helpers, stories,
    // src/global/style.css - and only 54 of ~140 .tsx files are components.
    //
    // Return the bare entry: theme tokens and utilities, no reset. There is no
    // tag to scope a reset to, and the importing component supplies its own.
    // Do not throw - that would kill the build on the first non-component
    // stylesheet (src/global/style.css is one).
    return BASE_ENTRY;
  }

  if (shadowByTag.get(tag) === true) {
    return SHADOW_ENTRY;
  }

  return `${BASE_ENTRY}\n${LIGHT_DOM_RESET_TEMPLATE.split('__MVX_TAG__').join(tag)}\n`;
}
