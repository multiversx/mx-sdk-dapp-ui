const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-essentials'],
  framework: {
    name: '@stencil/storybook-plugin',
  },
};

export default config;
