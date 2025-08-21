import { newSpecPage } from '@stencil/core/testing';

import { Trim } from '../trim';

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('trim', () => {
  beforeAll(() => {
    // @ts-ignore
    global.ResizeObserver = MockResizeObserver;
  });

  it('should render the full text when not overflowing', async () => {
    const page = await newSpecPage({
      components: [Trim],
      html: '<mvx-trim text="Short text"></mvx-trim>',
    });

    const trimElement = page.root;
    const component = page.rootInstance;

    component.shouldTrim = false;
    await page.waitForChanges();

    const fullTextElement = trimElement.querySelector('.trim-full.visible');
    expect(fullTextElement).toBeTruthy();
    expect(fullTextElement.textContent).toBe('Short text');
  });

  it('should handle overflow and truncate text', async () => {
    const page = await newSpecPage({
      components: [Trim],
      html: '<mvx-trim text="A very long text that should be truncated due to container width limitations"></mvx-trim>',
    });

    const component = page.rootInstance;
    component.shouldTrim = true;
    await page.waitForChanges();

    const trimElement = page.root;

    const trimWrapper = trimElement.querySelector('.trim-wrapper.visible');
    expect(trimWrapper).toBeTruthy();

    const leftWrapper = trimWrapper.querySelector('.trim-left-wrapper');
    const ellipsisWrapper = trimWrapper.querySelector('.trim-ellipsis-wrapper');
    const rightWrapper = trimWrapper.querySelector('.trim-right-wrapper');

    expect(leftWrapper).toBeTruthy();
    expect(ellipsisWrapper).toBeTruthy();
    expect(rightWrapper).toBeTruthy();

    const ellipsisElement = ellipsisWrapper.querySelector('.trim-ellipsis');
    expect(ellipsisElement.textContent).toBe('...');

    const leftText = leftWrapper.querySelector('.trim-left').textContent;
    const rightText = rightWrapper.querySelector('.trim-right').textContent;

    expect(leftText + rightText).toBe('A very long text that should be truncated due to container width limitations');
  });

  it('should use custom class', async () => {
    const page = await newSpecPage({
      components: [Trim],
      html: '<mvx-trim text="Custom" class="custom-class"></mvx-trim>',
    });

    const trimElement = page.root;
    const trimContainer = trimElement.querySelector('.trim');

    expect(trimContainer.classList.contains('custom-class')).toBe(true);
  });
});
