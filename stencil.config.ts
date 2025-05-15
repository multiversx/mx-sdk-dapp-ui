import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import tailwind from 'stencil-tailwind-plugin';
import { getExcludedComponentTags } from './src/global/scripts/exclude-react-components';

const excludeComponents = getExcludedComponentTags('./src/components/functional');

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
