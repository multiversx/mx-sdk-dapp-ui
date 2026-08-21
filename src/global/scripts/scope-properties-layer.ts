import type { Plugin } from 'postcss';

/** Tailwind's `@property` polyfill selector, as lightningcss prints it after minification. */
const UNIVERSAL_SELECTOR = /^\s*\*\s*,\s*:{1,2}before\s*,\s*:{1,2}after\s*,\s*::backdrop\s*$/;

/**
 * Scopes Tailwind's `@layer properties` fallback to one custom element, so a non-shadow
 * component does not set `--tw-*` on every element in the host page.
 *
 * Pseudo-elements go OUTSIDE `:where()`: they are invalid inside it, and lightningcss
 * silently collapses `:where(tag *::before)` to an empty `:where()` that matches nothing.
 */
export function scopePropertiesLayer(tag: string): Plugin {
  const scoped = [
    `:where(${tag})`,
    `:where(${tag} *)`,
    `:where(${tag})::before`,
    `:where(${tag} *)::before`,
    `:where(${tag})::after`,
    `:where(${tag} *)::after`,
    `:where(${tag})::backdrop`,
    `:where(${tag} *)::backdrop`,
  ].join(',');

  return {
    postcssPlugin: 'mvx-scope-properties-layer',
    AtRule: {
      layer: atRule => {
        if (atRule.params.trim() !== 'properties') {
          return;
        }

        atRule.walkRules(rule => {
          if (UNIVERSAL_SELECTOR.test(rule.selector)) {
            rule.selector = scoped;
          }
        });
      },
    },
  };
}

scopePropertiesLayer.postcss = true;
