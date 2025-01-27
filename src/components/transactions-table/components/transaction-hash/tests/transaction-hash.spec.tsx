import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TransactionHash } from '../transaction-hash';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ITransactionsTableRow } from '../../../transactions-table.type';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';

describe('TransactionHash', () => {
  it('renders with transaction data', async () => {
    const transaction: ITransactionsTableRow = {
      age: {
        timeAgo: '1h',
        tooltip: '1 hour ago',
      },
      iconInfo: { icon: faCircleInfo, tooltip: 'Test' },
      link: 'https://example.com/tx/123',
      method: {
        name: 'Smart Contract',
      },
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
      age: {
        timeAgo: '1h',
        tooltip: '1 hour ago',
      },
      iconInfo: { icon: faCircleInfo, tooltip: 'Initial' },
      link: 'https://example.com/tx/initial',
      method: {
        name: 'Smart Contract',
      },
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
      age: {
        timeAgo: '1h',
        tooltip: '1 hour ago',
      },
      iconInfo: { icon: faCircleCheck, tooltip: 'Updated' },
      link: 'https://example.com/tx/updated',
      method: {
        name: 'Smart Contract',
      },
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
