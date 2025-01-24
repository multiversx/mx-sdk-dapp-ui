import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TransactionHash } from '../transaction-hash';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

describe('TransactionHash', () => {
  it('renders with transaction data', async () => {
    const transaction = {
      iconInfo: { icon: 'test-icon', tooltip: 'Test' },
      link: 'https://example.com/tx/123',
      txHash: '0x123456789abcdef',
    };

    const page = await newSpecPage({
      components: [TransactionHash],
      template: () => <transaction-hash transaction={transaction}></transaction-hash>,
    });

    expect(page.root).toEqualHtml(`
      <transaction-hash>
        <mock:shadow-root>
          <div class="transactions-table-body-cell">
            <transaction-icon></transaction-icon>
            <explorer-link datatestid="${DataTestIdsEnum.transactionLink}" link="https://example.com/tx/123" text="0x123456789abcdef"></explorer-link>
          </div>
        </mock:shadow-root>
      </transaction-hash>
    `);
  });

  it('updates when transaction prop changes', async () => {
    const initialTransaction = {
      iconInfo: { icon: 'initial-icon', tooltip: 'Initial' },
      link: 'https://example.com/tx/initial',
      txHash: '0xInitialHash',
    };

    const page = await newSpecPage({
      components: [TransactionHash],
      template: () => <transaction-hash transaction={initialTransaction}></transaction-hash>,
    });

    expect(page.root).toEqualHtml(`
      <transaction-hash>
        <mock:shadow-root>
          <div class="transactions-table-body-cell">
            <transaction-icon></transaction-icon>
            <explorer-link datatestid="${DataTestIdsEnum.transactionLink}" link="https://example.com/tx/initial" text="0xInitialHash"></explorer-link>
          </div>
        </mock:shadow-root>
      </transaction-hash>
    `);

    const updatedTransaction = {
      iconInfo: { icon: 'updated-icon', tooltip: 'Updated' },
      link: 'https://example.com/tx/updated',
      txHash: '0xUpdatedHash',
    };

    page.root.transaction = updatedTransaction;
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <transaction-hash>
        <mock:shadow-root>
          <div class="transactions-table-body-cell">
            <transaction-icon></transaction-icon>
            <explorer-link datatestid="${DataTestIdsEnum.transactionLink}" link="https://example.com/tx/updated" text="0xUpdatedHash"></explorer-link>
          </div>
        </mock:shadow-root>
      </transaction-hash>
    `);
  });
});
