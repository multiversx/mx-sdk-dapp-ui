import { newE2EPage } from '@stencil/core/testing';

describe('trim-text', () => {
  it('should render the full text when not overflowing', async () => {
    const page = await newE2EPage();
    await page.setContent('<trim-text text="Short text"></trim-text>');

    // Wait for component to initialize
    await page.waitForChanges();

    // Verify rendered content matches expectations
    const textContent = await page.$eval('trim-text', el => {
      const span = el.shadowRoot?.querySelector('span:not(.hidden-text-ref)');
      return span?.textContent;
    });

    expect(textContent).toBe('Short textShort text');
  });

  it('should handle overflow and truncate text', async () => {
    const page = await newE2EPage();
    await page.setContent('<trim-text text="A very long text that should be truncated due to container width limitations"></trim-text>');

    // Force narrow viewport
    await page.setViewport({ width: 200, height: 600 });

    const content = await page.$eval('trim-text', el => {
      return {
        overflow: el.shadowRoot?.querySelector('.overflow') !== null,
        hasEllipsis: el.shadowRoot?.querySelector('.ellipsis')?.textContent === '...',
      };
    });

    expect(content.overflow).toBe(true);
    expect(content.hasEllipsis).toBe(true);
  });

  it('should use custom class and data-testid', async () => {
    const page = await newE2EPage();
    await page.setContent('<trim-text text="Custom" class="custom-class" data-test-id="custom-id"></trim-text>');

    const elementProps = await page.$eval('trim-text', el => ({
      class: el.shadowRoot?.querySelector('span')?.className,
      testId: el.getAttribute('data-test-id'),
    }));

    expect(elementProps.class).toContain('custom-class');
    expect(elementProps.testId).toBe('custom-id');
  });
});
