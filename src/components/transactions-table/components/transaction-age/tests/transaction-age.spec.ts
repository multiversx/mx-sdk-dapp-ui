import { newSpecPage } from '@stencil/core/testing';
import { TransactionAge } from '../transaction-age';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

describe('TransactionAge', () => {
  it('renders with age prop', async () => {
    const page = await newSpecPage({
      components: [TransactionAge],
      html: '<transaction-age age="2 days ago"></transaction-age>',
    });

    const ageSpan = page.root.shadowRoot.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan).not.toBeNull();
    expect(ageSpan.textContent).toBe('2 days ago');
  });

  it('renders without tooltip when not provided', async () => {
    const page = await newSpecPage({
      components: [TransactionAge],
      html: '<transaction-age age="3 hours ago"></transaction-age>',
    });

    const ageSpan = page.root.shadowRoot.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan).not.toBeNull();
    expect(ageSpan.getAttribute('title')).toBeNull();
  });

  it('renders with tooltip when provided', async () => {
    const page = await newSpecPage({
      components: [TransactionAge],
      html: '<transaction-age age="1 minute ago" tooltip="2023-05-17 10:30:00 UTC"></transaction-age>',
    });

    const ageSpan = page.root.shadowRoot.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan).not.toBeNull();
    expect(ageSpan.getAttribute('title')).toBe('2023-05-17 10:30:00 UTC');
  });

  it('updates when age prop changes', async () => {
    const page = await newSpecPage({
      components: [TransactionAge],
      html: '<transaction-age age="5 minutes ago"></transaction-age>',
    });

    let ageSpan = page.root.shadowRoot.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan.textContent).toBe('5 minutes ago');

    page.root.age = '10 minutes ago';
    await page.waitForChanges();

    ageSpan = page.root.shadowRoot.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan.textContent).toBe('10 minutes ago');
  });

  it('updates when tooltip prop changes', async () => {
    const page = await newSpecPage({
      components: [TransactionAge],
      html: '<transaction-age age="1 hour ago" tooltip="2023-05-17 09:30:00 UTC"></transaction-age>',
    });

    let ageSpan = page.root.shadowRoot.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan.getAttribute('title')).toBe('2023-05-17 09:30:00 UTC');

    page.root.tooltip = '2023-05-17 10:30:00 UTC';
    await page.waitForChanges();

    ageSpan = page.root.shadowRoot.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan.getAttribute('title')).toBe('2023-05-17 10:30:00 UTC');
  });
});
