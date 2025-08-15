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
          <mvx-copy-icon class="copy-button-icon mvx:flex mvx:cursor-pointer mvx:justify-center mvx:transition-opacity mvx:duration-200 mvx:ease-in-out mvx:hover:opacity-80"></mvx-copy-icon>
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
        <div class="copy-button mvx:flex custom-class">
          <mvx-copy-icon class="copy-button-icon mvx:flex mvx:cursor-pointer mvx:justify-center mvx:transition-opacity mvx:duration-200 mvx:ease-in-out mvx:hover:opacity-80"></mvx-copy-icon>
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
    const component = page.rootInstance as CopyButton;
    
    await component.handleClick(new MouseEvent('click') as any);
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <mvx-copy-button text="Copy me">
        <div class="copy-button mvx:flex">
          <mvx-check-icon></mvx-check-icon>
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
    const component = page.rootInstance as CopyButton;
    
    await component.handleClick(new MouseEvent('click') as any);
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <mvx-copy-button text="Copy me">
        <div class="copy-button mvx:flex">
          <mvx-copy-icon class="copy-button-icon mvx:flex mvx:cursor-pointer mvx:justify-center mvx:transition-opacity mvx:duration-200 mvx:ease-in-out mvx:hover:opacity-80"></mvx-copy-icon>
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

    const component = page.rootInstance as CopyButton;
    await component.handleClick(mockEvent as any);

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });
});
