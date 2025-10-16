import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { TransactionAge } from '../TransactionAge';


describe('TransactionAge tests', () => {
  it('renders with age prop', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAge age="2 days ago" />
    });

    const ageSpan = page.root.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan).not.toBeNull();
    expect(ageSpan.textContent).toBe('2 days ago');
  });

  it('renders without tooltip when not provided', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAge age="3 hours ago" />
    });

    const ageSpan = page.root.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan).not.toBeNull();
    expect(ageSpan.getAttribute('title')).toBeNull();
  });

  it('renders with tooltip when provided', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAge age="1 minute ago" tooltip="2023-05-17 10:30:00 UTC" />
    });

    const ageSpan = page.root.querySelector(`[data-testid="${DataTestIdsEnum.transactionAge}"]`);
    expect(ageSpan).not.toBeNull();
    expect(ageSpan.getAttribute('title')).toBe('2023-05-17 10:30:00 UTC');
  });
});
