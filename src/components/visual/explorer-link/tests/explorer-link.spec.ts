import { newSpecPage } from '@stencil/core/testing';

import { ArrowRightIcon } from '../../../../assets/icons/arrow-right-icon/arrow-right-icon';
import { ExplorerLink } from '../explorer-link';

describe('ExplorerLink', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com"></mvx-explorer-link>',
    });

    expect(page.root).toEqualHtml(`
      <mvx-explorer-link link="https://example.com">
        <a href="https://example.com" target="_blank" class="explorer-link mvx:decoration-0 mvx:flex" rel="noreferrer">
          <slot-fb>
            <mvx-arrow-up-right-from-square-icon class="explorer-link-icon mvx:duration-200 mvx:ease-in-out mvx:flex mvx:h-4 mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity mvx:w-4"></mvx-arrow-up-right-from-square-icon>
          </slot-fb>
        </a>
      </mvx-explorer-link>
    `);
  });

  it('renders with custom text', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com">View on Explorer</mvx-explorer-link>',
    });

    expect(page.root).toEqualHtml(`
      <mvx-explorer-link link="https://example.com">
        <a href="https://example.com" target="_blank" class="explorer-link mvx:decoration-0 mvx:flex" rel="noreferrer">
          <slot-fb hidden="">
            <mvx-arrow-up-right-from-square-icon class="explorer-link-icon mvx:duration-200 mvx:ease-in-out mvx:flex mvx:h-4 mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity mvx:w-4"></mvx-arrow-up-right-from-square-icon>
          </slot-fb>
          View on Explorer
        </a>
      </mvx-explorer-link>
    `);
  });

  it('renders with custom class', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com" class="custom-class"></mvx-explorer-link>',
    });

    expect(page.root).toEqualHtml(`
      <mvx-explorer-link link="https://example.com" class="custom-class">
        <a href="https://example.com" target="_blank" class="custom-class explorer-link mvx:decoration-0 mvx:flex" rel="noreferrer">
          <slot-fb>
            <mvx-arrow-up-right-from-square-icon class="explorer-link-icon mvx:duration-200 mvx:ease-in-out mvx:flex mvx:h-4 mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity mvx:w-4"></mvx-arrow-up-right-from-square-icon>
          </slot-fb>
        </a>
      </mvx-explorer-link>
    `);
  });

  it('renders with custom icon', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink, ArrowRightIcon],
      html: '<mvx-explorer-link link="https://example.com"><mvx-arrow-right-icon /></mvx-explorer-link>',
    });

    expect(page.root).toEqualHtml(`
      <mvx-explorer-link link="https://example.com">
        <a class="explorer-link mvx:decoration-0 mvx:flex" href="https://example.com" rel="noreferrer" target="_blank">
          <slot-fb hidden="">
            <mvx-arrow-up-right-from-square-icon class="explorer-link-icon mvx:duration-200 mvx:ease-in-out mvx:flex mvx:h-4 mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity mvx:w-4"></mvx-arrow-up-right-from-square-icon>
          </slot-fb>
          <mvx-arrow-right-icon>
            <svg class="arrow-right-icon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
            </svg>
          </mvx-arrow-right-icon>
        </a>
      </mvx-explorer-link>
    `);
  });
});
