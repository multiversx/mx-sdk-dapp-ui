import { newE2EPage } from '@stencil/core/testing';

const tag = 'mvx-pending-transactions-panel';
const title = 'Confirm on MultiversX DeFi wallet';

describe('pending-transactions-panel', () => {
  it(`renders ${tag}`, async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const element = await page.find(tag);
    expect(element).toHaveClass('hydrated');
  });

  it('check title & subtitle', async () => {
    const page = await newE2EPage();

    await page.setContent(`<${tag}></${tag}>`);
    const component = await page.find(tag);
    component.setProperty('data', { title });

    await page.waitForChanges();
    const panel = await page.find('mvx-side-panel');
    const titleAttr = await panel.getProperty('panelTitle');
    expect(titleAttr).toBe(title);
  });
});
