import { newE2EPage } from '@stencil/core/testing';

describe('trim-text', () => {
  it('should render the full text when not overflowing', async () => {
    const page = await newE2EPage();
    await page.setContent('<trim-text text="Short text"></trim-text>');

    const element = await page.find('trim-text');
    const trimSpan = await element.find('trim-text >>> span');

    expect(trimSpan).not.toBeNull();
    expect(trimSpan.innerText).toBe('Short textShort text');
    expect(await element.find('.overflow')).toBe(null);
  });

  it('should use custom class and data-testid', async () => {
    const page = await newE2EPage();
    await page.setContent('<trim-text text="Custom" class="custom-class" data-test-id="custom-id"></trim-text>');
    const element = await page.find('trim-text');
    const trimSpan = await element.find('trim-text >>> span');

    expect(trimSpan).not.toBeNull();
    expect(trimSpan.getAttribute('class')).toContain('custom-class');
    expect(trimSpan.getAttribute('data-testid')).toBe('custom-id');
  });
});
