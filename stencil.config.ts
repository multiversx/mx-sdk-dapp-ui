import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import tailwind from 'stencil-tailwind-plugin';
import { getExcludedComponentTags } from './src/global/scripts/exclude-react-components';

/**
 * A list of component tags to be excluded from the build process.
 *
 * This is necessary to exclude functional components (components used by `sdk-dapp`)
 * in order to prevent potential conflicts with the event bus and issues related to
 * Stencil's state management. By excluding these components, we ensure that the
 * application remains stable and avoids unintended behavior caused by overlapping
 * event handling or state inconsistencies.
 *
 * The components to be excluded are determined dynamically from the specified directory.
 */
const excludeComponents = getExcludedComponentTags('./src/components/functional');

export const config: Config = {
  namespace: 'sdk-dapp-ui',
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
