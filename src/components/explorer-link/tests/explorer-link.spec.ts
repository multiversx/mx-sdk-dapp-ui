import { newSpecPage } from '@stencil/core/testing';
import { ExplorerLink } from '../explorer-link';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import * as iconUtils from 'utils/icons/getIconHtmlFromIconDefinition';

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
            <span>
              <svg aria-hidden="true" class="fa-arrow-up-right-from-square svg-inline--fa" data-icon="arrow-up-right-from-square" data-prefix="fas" focusable="false" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" fill="currentColor"></path></svg>
            </span>
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
            <span>
              <svg aria-hidden="true" class="fa-arrow-up-right-from-square svg-inline--fa" data-icon="arrow-up-right-from-square" data-prefix="fas" focusable="false" role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z" fill="currentColor"></path></svg>
            </span>
          </a>
        </mock:shadow-root>
      </explorer-link>
    `);
  });

  it('renders with custom icon', async () => {
    const mockIconHtml = '<i class="fa-check"></i>';
    jest.spyOn(iconUtils, 'getIconHtmlFromIconDefinition').mockReturnValue(mockIconHtml);

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
            <span>${mockIconHtml}</span>
          </a>
        </mock:shadow-root>
      </explorer-link>
    `);

    jest.restoreAllMocks();
  });
});
