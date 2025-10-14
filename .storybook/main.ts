const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/html-vite',
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
