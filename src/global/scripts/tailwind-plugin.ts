import type { PluginCtx, PluginTransformResults } from '@stencil/core/internal';
import tailwindcss from '@tailwindcss/postcss';
import * as path from 'path';
import postcss from 'postcss';

import { getSourceDirsForTag } from './component-sources';
import { scopePropertiesLayer } from './scope-properties-layer';
import { resolveTagFromStyleFilename, shadowTags, tailwindEntryFor } from './tailwind-entries';

const GLOBAL_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(GLOBAL_DIR, '..');

const STYLE_FILE = /\.(css|scss|sass)$/;

/** Style ids carry `?tag=...` in some Stencil code paths; filesystem calls need it gone. */
const stripQuery = (id: string): string => id.split('?')[0];

const SOURCE_EXCLUSIONS = [
  `@source not '${SRC_DIR}/**/tests/**';`,
  `@source not '${SRC_DIR}/**/*.spec.tsx';`,
  `@source not '${SRC_DIR}/**/*.e2e.ts';`,
  `@source not '${SRC_DIR}/**/*.stories.tsx';`,
];

/** Editing any of these changes every component's CSS, so watch mode must know. */
const GLOBAL_DEPENDENCIES = [
  'tailwind.css',
  'tailwind-shared.css',
  'tailwind-reset-shadow.css',
  'tailwind-reset-light-dom.css',
].map(name => path.join(GLOBAL_DIR, name));

/**
 * Runs Tailwind over every component stylesheet. See "Tailwind pipeline" in AGENTS.md.
 * Must be registered AFTER `sass()` - postcss cannot parse SCSS.
 */
export function mvxTailwind() {
  return {
    name: 'mvx-tailwind',
    pluginType: 'css',

    async transform(code: string, id: string, context: PluginCtx): Promise<PluginTransformResults | null> {
      const filename = stripQuery(id);

      if (!STYLE_FILE.test(filename)) {
        return null;
      }

      // dist-custom-elements never emits the global stylesheet, and it has no tag to scope to.
      const globalStyle = context?.config?.globalStyle;

      if (globalStyle && path.resolve(globalStyle) === path.resolve(filename)) {
        return null;
      }

      const tag = resolveTagFromStyleFilename(id);
      const sources = tag === null ? [] : getSourceDirsForTag(tag);

      const directives = [...sources.map(dir => `@source '${dir}';`), ...SOURCE_EXCLUSIONS].join('\n');
      const source = `${tailwindEntryFor(id)}\n${directives}\n${code}`;

      const optimize = context?.config?.devMode ? true : { minify: true };
      const plugins = [tailwindcss({ base: path.dirname(filename), optimize })];

      if (tag !== null && !shadowTags.includes(tag)) {
        plugins.push(scopePropertiesLayer(tag));
      }

      try {
        return {
          code: (await postcss(plugins).process(source, { from: filename })).css,
          map: null,
          dependencies: GLOBAL_DEPENDENCIES,
        };
      } catch (error) {
        // Stencil drops thrown style-plugin errors into diagnostics it never prints -
        // that is how the previous plugin's failure stayed invisible. Log, then rethrow.
        console.error(`[mvx-tailwind] Failed to process ${filename}`);
        console.error(error);
        throw error;
      }
    },
  };
}
