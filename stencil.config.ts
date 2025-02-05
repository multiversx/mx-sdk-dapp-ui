import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { sass } from '@stencil/sass';

const excludeComponents = [
  'sign-transactions-modal',
  'pending-transactions-modal',
  'ledger-connect-modal',
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
  'wallet-connect-modal',
  'transaction-toast-progress',
];

export const config: Config = {
  namespace: 'sdk-dapp-core-ui',
  plugins: [sass()],
  outputTargets: [
    reactOutputTarget({
      outDir: './dist/react',
      excludeComponents,
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
      generateTypeDeclarations: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
  rollupPlugins: {
    after: [nodePolyfills()],
  },
};
