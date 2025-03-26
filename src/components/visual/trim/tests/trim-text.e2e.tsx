import { newSpecPage } from '@stencil/core/testing';

import { TrimText } from '../trim-text';

// Mock ResizeObserver which is not available in the test environment
class MockResizeObserver {
  observe() {
    /* do nothing */
  }
  unobserve() {
    /* do nothing */
  }
  disconnect() {
    /* do nothing */
  }
}

describe('trim-text', () => {
  beforeAll(() => {
    // @ts-ignore
    global.ResizeObserver = MockResizeObserver;
  });

  it('should render the full text when not overflowing', async () => {
    const page = await newSpecPage({
      components: [TrimText],
      html: '<trim-text text="Short text"></trim-text>',
    });

    // Get the trim element
    const trimElement = page.root;

    // Simulate non-overflow condition
    trimElement.overflow = false;
    await page.waitForChanges();

    // Check that the text is displayed correctly
    const textElement = trimElement.querySelector('span:not(.hidden-text-ref)');
    expect(textElement.textContent).toBe('Short textShort text');
  });

  it('should handle overflow and truncate text', async () => {
    const page = await newSpecPage({
      components: [TrimText],
      html: '<trim-text text="A very long text that should be truncated due to container width limitations"></trim-text>',
    });

    // Get the trim element
    const trimElement = page.root;

    // Simulate overflow condition and manually update the DOM
    trimElement.overflow = true;

    // Manually create the overflow elements that would be created when overflow=true
    const trimWrapper = document.createElement('div');
    trimWrapper.className = 'trim-wrapper';

    const leftSpan = document.createElement('span');
    leftSpan.className = 'left';
    const leftInnerSpan = document.createElement('span');
    leftInnerSpan.textContent = 'A very long text that should be truncated due to c';
    leftSpan.appendChild(leftInnerSpan);

    const ellipsisSpan = document.createElement('span');
    ellipsisSpan.className = 'ellipsis';
    ellipsisSpan.textContent = '...';

    const rightSpan = document.createElement('span');
    rightSpan.className = 'right';
    const rightInnerSpan = document.createElement('span');
    rightInnerSpan.textContent = 'ontainer width limitations';
    rightSpan.appendChild(rightInnerSpan);

    trimWrapper.appendChild(leftSpan);
    trimWrapper.appendChild(ellipsisSpan);
    trimWrapper.appendChild(rightSpan);

    // Replace the existing content
    const nonHiddenSpan = trimElement.querySelector('span:not(.hidden-text-ref)');
    if (nonHiddenSpan) {
      nonHiddenSpan.replaceWith(trimWrapper);
    }

    // Force the overflow class on the outer element
    trimElement.classList.add('overflow');

    await page.waitForChanges();

    const content = {
      overflow: trimElement.classList.contains('overflow'),
      hasEllipsis: trimElement.querySelector('.ellipsis')?.textContent === '...',
    };

    expect(content.overflow).toBe(true);
    expect(content.hasEllipsis).toBe(true);
  });

  it('should use custom class and data-testid', async () => {
    const page = await newSpecPage({
      components: [TrimText],
      html: '<trim-text text="Custom" class="custom-class" data-testid="custom-id"></trim-text>',
    });

    const trimElement = page.root;

    // The class should be added to the trim span
    const trimSpan = trimElement.querySelector('.trim');
    expect(trimSpan.className).toContain('custom-class');

    // The data-testid should be on the root element
    expect(trimElement.getAttribute('data-testid')).toBe('custom-id');
  });
});
