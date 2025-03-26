import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { newSpecPage } from '@stencil/core/testing';

import { ExplorerLink } from '../explorer-link';

describe('ExplorerLink', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<explorer-link link="https://example.com"></explorer-link>',
    });
    expect(page.root).toEqualHtml(`
      <explorer-link link="https://example.com">
        <mock:shadow-root>
          <a href="https://example.com" target="_blank" class="explorer-link" rel="noreferrer">
            <fa-icon class="explorer-link-icon"></fa-icon>
          </a>
        </mock:shadow-root>
      </explorer-link>
    `);
  });

  it('renders with custom text', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<explorer-link link="https://example.com" text="View on Explorer"></explorer-link>',
    });
    expect(page.root).toEqualHtml(`
      <explorer-link link="https://example.com" text="View on Explorer">
        <mock:shadow-root>
          <a href="https://example.com" target="_blank" class="explorer-link" rel="noreferrer">
            View on Explorer
          </a>
        </mock:shadow-root>
      </explorer-link>
    `);
  });

  it('renders with custom class', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<explorer-link link="https://example.com" class="custom-class"></explorer-link>',
    });
    expect(page.root).toEqualHtml(`
      <explorer-link link="https://example.com" class="custom-class">
        <mock:shadow-root>
          <a href="https://example.com" target="_blank" class="custom-class" rel="noreferrer">
            <fa-icon class="explorer-link-icon"></fa-icon>
          </a>
        </mock:shadow-root>
      </explorer-link>
    `);
  });

  it('renders with custom icon', async () => {
    const page = await newSpecPage({
      components: [ExplorerLink],
      html: '<explorer-link link="https://example.com"></explorer-link>',
    });

    page.root.icon = faCheck;
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <explorer-link link="https://example.com">
        <mock:shadow-root>
          <a href="https://example.com" target="_blank" class="explorer-link" rel="noreferrer">
            <fa-icon class="explorer-link-icon"></fa-icon>
          </a>
        </mock:shadow-root>
      </explorer-link>
    `);

    jest.restoreAllMocks();
  });
});
