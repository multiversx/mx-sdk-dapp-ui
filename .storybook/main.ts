const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
  },
  managerHead: (head: string) => `
    ${head}
    <base href="./" />
  `,
  previewHead: (head: string) => `
    ${head}
    <base href="./" />
  `,
};

export default config;
