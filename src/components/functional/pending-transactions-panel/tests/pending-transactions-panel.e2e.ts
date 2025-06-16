import { newE2EPage, newSpecPage } from '@stencil/core/testing';

import { PendingTransactionsPanel } from '../pending-transactions-panel';

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
    const page = await newSpecPage({
      components: [PendingTransactionsPanel],
      html: `<${tag}></${tag}>`,
    });

    page.rootInstance.provider = { name: title };
    await page.waitForChanges();

    const panel = page.root.shadowRoot.querySelector('mvx-side-panel');
    expect(panel).toBeTruthy();

    const panelTitle = panel.getAttribute('panelTitle');
    expect(panelTitle).toBe(title);
  });
});
