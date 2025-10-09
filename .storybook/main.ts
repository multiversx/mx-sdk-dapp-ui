const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@stencil/storybook-plugin',
  },
  managerHead: (head) => `
    ${head}
    <base href="./" />
  `,
  previewHead: (head) => `
    ${head}
    <base href="./" />
  `,
};

export default config;
