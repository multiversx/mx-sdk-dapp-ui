import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { sass } from '@stencil/sass';

const excludeComponents = [
  'sign-transactions-panel',
  'transaction-fee-component',
  'pending-transactions-panel',
  'ledger-connect-panel',
  'ledger-connect',
  'ledger-account-screen',
  'ledger-connect-screen',
  'ledger-confirm-screen',
  'toast-list',
  'generic-toast',
  'custom-toast',
  'simple-toast',
  'transaction-toast-details-body',
  'transaction-toast-details',
  'transaction-toast-content',
  'transaction-toast',
  'transaction-toast-wrapper',
  'sign-transaction-component',
  'wallet-connect',
  'wallet-connect-panel',
  'transaction-toast-progress',
  'token-component',
  'fungible-component',
  'balance-component',
];

export const config: Config = {
  globalStyle: 'src/global/tailwind.css',
  namespace: 'sdk-dapp-core-ui',
  plugins: [sass()],
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
      esmLoaderPath: './loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [{ src: 'global/output.css', dest: 'tailwind.css' }],
      serviceWorker: null, // disable service workers
    },
  ],
  rollupPlugins: {
    after: [nodePolyfills()],
  },
  extras: {
    enableImportInjection: true,
  },
};
