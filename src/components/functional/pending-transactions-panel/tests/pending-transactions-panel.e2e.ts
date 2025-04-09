import { newE2EPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

const tag = 'mvx-pending-transactions-panel';
const title = 'Pending Transaction';
const subtitle = 'Confirm transaction on wallet';

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
    component.setProperty('data', { title, subtitle });

    await page.waitForChanges();
    const titleElement = await page.find(`[data-testid=${DataTestIdsEnum.pendingTransactionsTitle}]`);
    expect(titleElement.textContent).toContain(title);

    const subtitleElement = await page.find(`[data-testid=${DataTestIdsEnum.pendingTransactionsSubtitle}]`);
    expect(subtitleElement.textContent).toContain(subtitle);
  });
});
