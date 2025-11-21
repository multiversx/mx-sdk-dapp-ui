import { newSpecPage } from '@stencil/core/testing';
import * as copyUtils from 'utils/copyToClipboard';

import { CopyButton } from '../copy-button';

describe('CopyButton', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<mvx-copy-button text="Copy me"></mvx-copy-button>',
    });

    expect(page.root).toEqualHtml(`
      <mvx-copy-button text="Copy me">
        <div class="copy-button mvx:flex">
          <svg class="copy-button-icon mvx:cursor-pointer mvx:duration-200 mvx:ease-in-out mvx:flex mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity" height="16" viewBox="0 0 448 512" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M384 0C419.3 0 448 28.7 448 64L448 320C448 355.3 419.3 384 384 384L192 384C156.7 384 128 355.3 128 320L128 119.4C128 102 135.1 85.3 147.7 73.2L205.4 17.8C217.3 6.4 233.2 0 249.7 0L384 0zM64 128C28.7 128 0 156.7 0 192L0 448C0 483.3 28.7 512 64 512L256 512C291.3 512 320 483.3 320 448L320 432L256 432L256 448L64 448L64 192L80 192L80 128L64 128z" fill="currentColor"></path>
          </svg>
        </div>
      </mvx-copy-button>
    `);
  });

  it('renders with custom class', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<mvx-copy-button class="custom-class" text="Copy me"></mvx-copy-button>',
    });

    expect(page.root).toEqualHtml(`
      <mvx-copy-button class="custom-class" text="Copy me">
        <div class="copy-button custom-class mvx:flex">
          <svg class="copy-button-icon mvx:cursor-pointer mvx:duration-200 mvx:ease-in-out mvx:flex mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity" height="16" viewBox="0 0 448 512" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M384 0C419.3 0 448 28.7 448 64L448 320C448 355.3 419.3 384 384 384L192 384C156.7 384 128 355.3 128 320L128 119.4C128 102 135.1 85.3 147.7 73.2L205.4 17.8C217.3 6.4 233.2 0 249.7 0L384 0zM64 128C28.7 128 0 156.7 0 192L0 448C0 483.3 28.7 512 64 512L256 512C291.3 512 320 483.3 320 448L320 432L256 432L256 448L64 448L64 192L80 192L80 128L64 128z" fill="currentColor"></path>
          </svg>
        </div>
      </mvx-copy-button>
    `);
  });

  it('changes to success icon when clicked and copy succeeds', async () => {
    jest.spyOn(copyUtils, 'copyToClipboard').mockResolvedValue(true);

    const page = await newSpecPage({
      components: [CopyButton],
      html: '<mvx-copy-button text="Copy me"></mvx-copy-button>',
    });

    const copyButton = page.root;
    const element = copyButton.querySelector('div');
    element.click();
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <mvx-copy-button text="Copy me">
        <div class="copy-button mvx:flex">
          <svg class="copy-button-icon copy-button-icon-check mvx:cursor-default! mvx:cursor-pointer mvx:duration-200 mvx:ease-in-out mvx:flex mvx:hover:opacity-100! mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity" height="16" viewBox="0 0 448 512" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" fill="currentColor"></path>
          </svg>
        </div>
      </mvx-copy-button>
    `);
  });

  it('remains with copy icon when clicked and copy fails', async () => {
    jest.spyOn(copyUtils, 'copyToClipboard').mockResolvedValue(false);

    const page = await newSpecPage({
      components: [CopyButton],
      html: '<mvx-copy-button text="Copy me"></mvx-copy-button>',
    });

    const copyButton = page.root;
    const element = copyButton.querySelector('div');
    element.click();
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <mvx-copy-button text="Copy me">
        <div class="copy-button mvx:flex">
          <svg class="copy-button-icon mvx:cursor-pointer mvx:duration-200 mvx:ease-in-out mvx:flex mvx:hover:opacity-80 mvx:justify-center mvx:transition-opacity" height="16" viewBox="0 0 448 512" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M384 0C419.3 0 448 28.7 448 64L448 320C448 355.3 419.3 384 384 384L192 384C156.7 384 128 355.3 128 320L128 119.4C128 102 135.1 85.3 147.7 73.2L205.4 17.8C217.3 6.4 233.2 0 249.7 0L384 0zM64 128C28.7 128 0 156.7 0 192L0 448C0 483.3 28.7 512 64 512L256 512C291.3 512 320 483.3 320 448L320 432L256 432L256 448L64 448L64 192L80 192L80 128L64 128z" fill="currentColor"></path>
          </svg>
        </div>
      </mvx-copy-button>
    `);
  });

  it('prevents default behavior and stops propagation on click', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<mvx-copy-button text="Copy me"></mvx-copy-button>',
    });

    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    const element = page.root.querySelector('div');
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    await page.waitForChanges();

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });
});
