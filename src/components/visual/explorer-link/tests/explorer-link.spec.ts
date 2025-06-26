import { newSpecPage } from '@stencil/core/testing';

import { ExplorerLink } from '../explorer-link';

describe('ExplorerLink', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com"></mvx-explorer-link>',
    });

    expect(page.root.outerHTML).toEqualHtml(`
      <mvx-explorer-link link="https://example.com">
        <template shadowrootmode="open">
          <a href="https://example.com" target="_blank" class="explorer-link" rel="noreferrer">
            <mvx-arrow-up-right-from-square-icon class="explorer-link-icon mvx:duration-200 mvx:ease-in-out mvx:flex mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity"></mvx-arrow-up-right-from-square-icon>
          </a>
        </template>
      </mvx-explorer-link>
    `);
  });

  it('renders with custom text', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com">View on Explorer</mvx-explorer-link>',
    });

    expect(page.root.outerHTML).toEqualHtml(`
      <mvx-explorer-link link="https://example.com">
        <template shadowrootmode="open">
          <a href="https://example.com" target="_blank" class="explorer-link" rel="noreferrer">
            <slot></slot>
          </a>
        </template>
        View on Explorer
      </mvx-explorer-link>
    `);
  });

  it('renders with custom class', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com" class="custom-class"></mvx-explorer-link>',
    });

    expect(page.root.outerHTML).toEqualHtml(`
      <mvx-explorer-link link="https://example.com" class="custom-class">
        <template shadowrootmode="open">
          <a href="https://example.com" target="_blank" class="explorer-link custom-class" rel="noreferrer">
            <mvx-arrow-up-right-from-square-icon class="explorer-link-icon mvx:duration-200 mvx:ease-in-out mvx:flex mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity"></mvx-arrow-up-right-from-square-icon>
          </a>
        </template>
      </mvx-explorer-link>
    `);
  });

  it('renders with custom icon', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com"><mvx-arrow-right-icon /></mvx-explorer-link>',
    });

    expect(page.root.outerHTML).toEqualHtml(`
      <mvx-explorer-link link="https://example.com">
        <template shadowrootmode="open">
          <a href="https://example.com" target="_blank" class="explorer-link" rel="noreferrer">
            <slot></slot>
          </a>
        </template>
        <mvx-arrow-right-icon></mvx-arrow-right-icon>
      </mvx-explorer-link>
    `);

    jest.restoreAllMocks();
  });
});
