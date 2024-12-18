import { newE2EPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

const tag = 'pending-transactions-modal';
const title = 'Pending Transaction';
const subtitle = 'Confirm transaction on wallet';

describe('pending-transactions-modal', () => {
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
    const titleElement = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.pendingTransactionsTitle}]`);
    expect(titleElement.textContent).toContain(title);

    const subtitleElement = await page.find(`${tag} >>> [data-testid=${DataTestIdsEnum.pendingTransactionsSubtitle}]`);
    expect(subtitleElement.textContent).toContain(subtitle);
  });
});
