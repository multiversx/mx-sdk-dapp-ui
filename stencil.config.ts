import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import tailwind from 'stencil-tailwind-plugin';

const excludeComponents = [
  'mvx-sign-transactions-panel',
  'mvx-transaction-fee-component',
  'mvx-pending-transactions-panel',
  'mvx-ledger-connect-panel',
  'mvx-ledger-connect',
  'mvx-ledger-account-screen',
  'mvx-ledger-connect-screen',
  'mvx-ledger-confirm-screen',
  'mvx-toast-list',
  'mvx-generic-toast',
  'mvx-custom-toast',
  'mvx-simple-toast',
  'mvx-transaction-toast-details-body',
  'mvx-transaction-toast-details',
  'mvx-transaction-toast-content',
  'mvx-transaction-toast',
  'mvx-transaction-toast-wrapper',
  'mvx-sign-transaction-component',
  'mvx-wallet-connect-provider',
  'mvx-wallet-connect-panel',
  'mvx-transaction-toast-progress',
  'mvx-token-component',
  'mvx-fungible-component',
  'mvx-balance-component',
];

export const config: Config = {
  namespace: 'sdk-dapp-core-ui',
  globalScript: './src/global/scripts/fonts-loader.ts',
  plugins: [
    sass(),
    tailwind({
      tailwindCssPath: './src/global/tailwind.css',
    }),
  ],
  outputTargets: [
    reactOutputTarget({
      outDir: './dist/react',
      stencilPackageName: '../../dist/types',
      customElementsDir: '../web-components',
      excludeComponents,
    }),
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
      generateTypeDeclarations: true,
      dir: './dist/web-components',
    },
    {
      type: 'dist',
      copy: [{ src: 'assets', dest: 'assets' }],
      esmLoaderPath: './loader',
    },
    // this is only for testing purposes
    // {
    //   type: 'www',
    //   serviceWorker: null,
    // },
  ],
  rollupPlugins: {
    before: [nodePolyfills()],
  },
  extras: {
    enableImportInjection: true,
  },
};
