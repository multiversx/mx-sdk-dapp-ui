// .storybook/preview.tsx
import { defineCustomElements } from '../dist/web-components';

import '../src/global/style.css';
import '../src/global/variables.css';
import '../src/global/tailwind.css';

/**
 * Registers all custom elements in the Storybook preview.
 * This is useful if your components rely on other nested Stencil components.
 */

defineCustomElements();
