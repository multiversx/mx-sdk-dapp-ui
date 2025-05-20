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
        <a href="/#" class="copy-button">
          <mvx-fa-icon class="copy-button-icon" icon="faCopy"></mvx-fa-icon>
        </a>
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
        <a href="/#" class="custom-class">
          <mvx-fa-icon class="copy-button-icon" icon="faCopy"></mvx-fa-icon>
        </a>
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
    const anchor = copyButton.querySelector('a');

    await anchor.click();
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <mvx-copy-button text="Copy me">
        <a href="/#" class="copy-button">
          <mvx-fa-icon class="copy-button-icon" icon="faCheck"></mvx-fa-icon>
        </a>
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
    const anchor = copyButton.querySelector('a');

    await anchor.click();
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <mvx-copy-button text="Copy me">
        <a href="/#" class="copy-button">
          <mvx-fa-icon class="copy-button-icon" icon="faCopy"></mvx-fa-icon>
        </a>
      </mvx-copy-button>
    `);
  });

  it('prevents default behavior and stops propagation on click', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<mvx-copy-button text="Copy me"></mvx-copy-button>',
    });

    const copyButton = page.root;
    const anchor = copyButton.querySelector('a');

    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    anchor.dispatchEvent(new MouseEvent('click', mockEvent as any));

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });
});
