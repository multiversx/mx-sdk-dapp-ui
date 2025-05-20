import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { newSpecPage } from '@stencil/core/testing';

import { ExplorerLink } from '../explorer-link';

describe('ExplorerLink', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com"></mvx-explorer-link>',
    });
    expect(page.root).toEqualHtml(`
      <mvx-explorer-link link="https://example.com">
        <a href="https://example.com" target="_blank" class="mvx:explorer-link" rel="noreferrer">
          <mvx-fa-icon class="explorer-link-icon" icon="faArrowUpRightFromSquare"></mvx-fa-icon>
        </a>
      </mvx-explorer-link>
    `);
  });

  it('renders with custom text', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com" text="View on Explorer"></mvx-explorer-link>',
    });
    expect(page.root).toEqualHtml(`
      <mvx-explorer-link link="https://example.com" text="View on Explorer">
        <a href="https://example.com" target="_blank" class="mvx:explorer-link" rel="noreferrer">
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
        <a href="https://example.com" target="_blank" class="mvx:explorer-link custom-class" rel="noreferrer">
          <mvx-fa-icon class="explorer-link-icon" icon="faArrowUpRightFromSquare"></mvx-fa-icon>
        </a>
      </mvx-explorer-link>
    `);
  });

  it('renders with custom icon', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<mvx-explorer-link link="https://example.com"></mvx-explorer-link>',
    });

    page.root.icon = faCheck;
    await page.waitForChanges();

    const iconEl = page.root.querySelector('mvx-fa-icon');
    expect(iconEl).toBeTruthy();
    expect(iconEl.getAttribute('class')).toBe('explorer-link-icon');
    const iconAttr = iconEl.getAttribute('icon');
    expect(iconAttr).toContain('<svg');
    expect(iconAttr).toContain('fa-check');

    jest.restoreAllMocks();
  });
});
