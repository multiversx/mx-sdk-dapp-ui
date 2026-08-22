import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@stencil/storybook-plugin';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = resolve(packageRoot, 'src');

const sourceAliases = ['assets', 'common', 'components', 'constants', 'global', 'types', 'utils'].map(directory => ({
  find: new RegExp(`^${directory}/`),
  replacement: `${resolve(sourceRoot, directory)}/`,
}));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@stencil/storybook-plugin',
  },
  viteFinal: async viteConfig => {
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: [...sourceAliases, ...(Array.isArray(viteConfig.resolve?.alias) ? viteConfig.resolve.alias : [])],
    };

    return viteConfig;
  },
  managerHead: head => `
    ${head}
    <base href="./" />
  `,
  previewHead: head => `
    ${head}
    <base href="./" />
  `,
};

export default config;
