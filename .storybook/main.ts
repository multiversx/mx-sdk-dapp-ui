import path from 'path';

const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@stencil/storybook-plugin',
    options: {},
  },
  staticDirs: ['../dist/web-components'], // <-- important
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@dist': path.resolve(__dirname, '../dist'),
    };
    return config;
  },
};

export default config;
