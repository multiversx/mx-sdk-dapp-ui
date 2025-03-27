import { newSpecPage } from '@stencil/core/testing';

import { TrimText } from '../trim-text';

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
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

    const trimElement = page.root;

    trimElement.overflow = false;
    await page.waitForChanges();

    const textElement = trimElement.querySelector('span:not(.hidden-text-ref)');
    expect(textElement.textContent).toBe('Short textShort text');
  });

  it('should handle overflow and truncate text', async () => {
    const page = await newSpecPage({
      components: [TrimText],
      html: '<trim-text text="A very long text that should be truncated due to container width limitations"></trim-text>',
    });

    const component = page.rootInstance;

    component.overflow = true;
    await page.waitForChanges();

    const trimElement = page.root;

    const trimRef = trimElement.querySelector('.trim');
    expect(trimRef.classList.contains('overflow')).toBe(true);

    const trimWrapper = trimElement.querySelector('.trim-wrapper');
    expect(trimWrapper).toBeTruthy();

    const leftSpan = trimWrapper.querySelector('.left');
    const ellipsisSpan = trimWrapper.querySelector('.ellipsis');
    const rightSpan = trimWrapper.querySelector('.right');

    expect(leftSpan).toBeTruthy();
    expect(ellipsisSpan.textContent).toBe('...');
    expect(rightSpan).toBeTruthy();

    const leftText = leftSpan.querySelector('span').textContent;
    const rightText = rightSpan.querySelector('span').textContent;

    expect(leftText + rightText).toBe('A very long text that should be truncated due to container width limitations');
  });

  it('should use custom class and data-testid', async () => {
    const page = await newSpecPage({
      components: [TrimText],
      html: '<trim-text text="Custom" class="custom-class" data-testid="custom-id"></trim-text>',
    });

    const trimElement = page.root;

    const trimSpan = trimElement.querySelector('.trim');
    expect(trimSpan.className).toContain('custom-class');

    expect(trimElement.getAttribute('data-testid')).toBe('custom-id');
  });
});
