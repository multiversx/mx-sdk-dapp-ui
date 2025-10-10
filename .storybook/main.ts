const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: ['public', '../dist'],
  managerHead: (head: string) => `
    ${head}
    <base href="./" />
  `,
  previewHead: (head: string) => `
    ${head}
    <base href="./" />
    <script type="module">
      import { defineCustomElements } from './web-components/index.js';
      defineCustomElements();
    </script>
  `,
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop: any) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
