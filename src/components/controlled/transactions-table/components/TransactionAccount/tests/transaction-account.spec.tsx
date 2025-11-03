import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { TransactionAccountType } from '../../../transactions-table.type';
import { TransactionAccount } from '../TransactionAccount';

describe('TransactionAccount tests', () => {
  const baseAccount: TransactionAccountType = {
    address: '0x1234567890123456789012345678901234567890',
    name: 'John Doe',
    description: 'Test Account',
    isContract: false,
    isTokenLocked: false,
    link: 'https://example.com/account/0x1234567890123456789012345678901234567890',
    showLink: false,
  };

  it('should render basic account information', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAccount account={baseAccount} scope="sender" showLockedAccounts={false} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account mvx:flex mvx:items-center mvx:gap-2">
        <div class="transaction-account-name mvx:w-max mvx:truncate" title="Test Account">
          John Doe
        </div>
      </div>
    `);
  });

  it('should render locked account icon when showLockedAccounts is true and account is locked', async () => {
    const lockedAccount: TransactionAccountType = { ...baseAccount, isTokenLocked: true };

    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAccount account={lockedAccount} showLockedAccounts={true} scope="receiver" />,
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account mvx:flex mvx:items-center mvx:gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="96 32 448 544" width="16" height="16">
          <path fill="currentColor" d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"></path>
        </svg>
        <div class="transaction-account-name mvx:w-max mvx:truncate" title="Test Account">
          John Doe
        </div>
      </div>
    `);
  });

  it('should render contract icon when account is a contract', async () => {
    const contractAccount: TransactionAccountType = { ...baseAccount, isContract: true };

    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAccount account={contractAccount} scope="sender" showLockedAccounts={false} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account mvx:flex mvx:items-center mvx:gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="64 64 512 512" width="16" height="16">
          <path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM216 128C202.7 128 192 138.7 192 152C192 165.3 202.7 176 216 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L216 128zM216 224C202.7 224 192 234.7 192 248C192 261.3 202.7 272 216 272L264 272C277.3 272 288 261.3 288 248C288 234.7 277.3 224 264 224L216 224zM286.3 384C275 384 264.4 389.1 257.4 397.9L197.3 473C189 483.3 190.7 498.5 201 506.7C211.3 514.9 226.5 513.3 234.7 502.9L281.8 444.1L297 494.8C300 505 309.4 511.9 320 511.9L424 511.9C437.3 511.9 448 501.2 448 487.9C448 474.6 437.3 463.9 424 463.9L337.9 463.9L321.8 410.3C317.1 394.6 302.7 383.9 286.3 383.9z"></path>
        </svg>
        <div class="transaction-account-name mvx:w-max mvx:truncate" title="Test Account">
          John Doe
        </div>
      </div>
    `);
  });

  it('should render explorer link when showLink is true', async () => {
    const linkedAccount: TransactionAccountType = { ...baseAccount, showLink: true };

    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAccount account={linkedAccount} scope="receiver" showLockedAccounts={false} />,
    });

    expect(page.root).toEqualHtml(`
    <div class="transaction-account mvx:flex mvx:items-center mvx:gap-2">
      <a class="explorer-link mvx:decoration-0 mvx:flex mvx:text-primary! transaction-account-explorer-link" href="https://example.com/account/0x1234567890123456789012345678901234567890" rel="noreferrer" target="_blank">
        <span>0x1234567890123456789012345678901234567890</span>
      </a>
    </div>
  `);
  });

  it('should apply custom class and data-testid', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionAccount
          account={baseAccount}
          class="custom-class"
          dataTestId="test-id"
          scope="sender"
          showLockedAccounts={false}
        />
      ),
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account mvx:flex mvx:items-center mvx:gap-2 custom-class" data-testid="test-id">
        <div class="transaction-account-name mvx:w-max mvx:truncate" title="Test Account">
          John Doe
        </div>
      </div>
    `);
  });
});
