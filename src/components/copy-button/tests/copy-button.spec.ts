import { newSpecPage } from '@stencil/core/testing';
import { CopyButton } from '../copy-button';
import * as copyUtils from 'utils/copyToClipboard';

describe('CopyButton', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<copy-button text="Copy me"></copy-button>',
    });

    expect(page.root).toEqualHtml(`
      <copy-button text="Copy me">
        <mock:shadow-root>
          <a href="/#" class="copy-button">
            <fa-icon></fa-icon>
          </a>
        </mock:shadow-root>
      </copy-button>
    `);
  });

  it('renders with custom class', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<copy-button class="custom-class" text="Copy me"></copy-button>',
    });

    expect(page.root).toEqualHtml(`
      <copy-button class="custom-class" text="Copy me">
        <mock:shadow-root>
          <a href="/#" class="custom-class copy-button">
            <fa-icon></fa-icon>
          </a>
        </mock:shadow-root>
      </copy-button>
    `);
  });

  it('changes to success icon when clicked and copy succeeds', async () => {
    jest.spyOn(copyUtils, 'copyToClipboard').mockResolvedValue(true);

    const page = await newSpecPage({
      components: [CopyButton],
      html: '<copy-button text="Copy me"></copy-button>',
    });

    const copyButton = page.root;
    const anchor = copyButton.shadowRoot.querySelector('a');

    await anchor.click();
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <copy-button text="Copy me">
        <mock:shadow-root>
          <a href="/#" class="copy-button">
            <fa-icon></fa-icon>
          </a>
        </mock:shadow-root>
      </copy-button>
    `);
  });

  it('remains with copy icon when clicked and copy fails', async () => {
    jest.spyOn(copyUtils, 'copyToClipboard').mockResolvedValue(false);

    const page = await newSpecPage({
      components: [CopyButton],
      html: '<copy-button text="Copy me"></copy-button>',
    });

    const copyButton = page.root;
    const anchor = copyButton.shadowRoot.querySelector('a');

    await anchor.click();
    await page.waitForChanges();

    expect(copyButton).toEqualHtml(`
      <copy-button text="Copy me">
        <mock:shadow-root>
          <a href="/#" class="copy-button">
            <fa-icon></fa-icon>
          </a>
        </mock:shadow-root>
      </copy-button>
    `);
  });

  it('prevents default behavior and stops propagation on click', async () => {
    const page = await newSpecPage({
      components: [CopyButton],
      html: '<copy-button text="Copy me"></copy-button>',
    });

    const copyButton = page.root;
    const anchor = copyButton.shadowRoot.querySelector('a');

    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    anchor.dispatchEvent(new MouseEvent('click', mockEvent as any));

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });
});
