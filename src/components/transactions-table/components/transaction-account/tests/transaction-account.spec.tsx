import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TransactionAccount } from '../transaction-account';
import { ITransactionAccount } from '../../../transactions-table.type';

describe('TransactionAccount Component', () => {
  const baseAccount: ITransactionAccount = {
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
      components: [TransactionAccount],
      template: () => <transaction-account account={baseAccount} scope="sender"></transaction-account>,
    });

    const transactionAccountName = page.root.shadowRoot.querySelector('transaction-account-name');
    expect(transactionAccountName).not.toBeNull();
    expect(transactionAccountName.getAttribute('name')).toBe('John Doe');
    expect(transactionAccountName.getAttribute('description')).toBe('Test Account');
  });

  it('should render locked account icon when showLockedAccounts is true and account is locked', async () => {
    const lockedAccount: ITransactionAccount = { ...baseAccount, isTokenLocked: true };

    const page = await newSpecPage({
      components: [TransactionAccount],
      template: () => <transaction-account account={lockedAccount} showLockedAccounts={true} scope="receiver"></transaction-account>,
    });

    const lockedIcon = page.root.shadowRoot.querySelector('fontawesome-icon');
    expect(lockedIcon).not.toBeNull();
  });

  it('should render contract icon when account is a contract', async () => {
    const contractAccount: ITransactionAccount = { ...baseAccount, isContract: true };

    const page = await newSpecPage({
      components: [TransactionAccount],
      template: () => <transaction-account account={contractAccount} scope="sender"></transaction-account>,
    });

    const contractIcon = page.root.shadowRoot.querySelector('fontawesome-icon');
    expect(contractIcon).not.toBeNull();
  });

  it('should render explorer link when showLink is true', async () => {
    const linkedAccount: ITransactionAccount = { ...baseAccount, showLink: true };

    const page = await newSpecPage({
      components: [TransactionAccount],
      template: () => <transaction-account account={linkedAccount} scope="receiver"></transaction-account>,
    });

    const explorerLink = page.root.shadowRoot.querySelector('explorer-link');
    expect(explorerLink).not.toBeNull();
    expect(explorerLink.getAttribute('link')).toBe(linkedAccount.link);
    expect(explorerLink.getAttribute('data-testid')).toBe('receiverLink');
  });

  it('should apply custom class and data-testid', async () => {
    const page = await newSpecPage({
      components: [TransactionAccount],
      template: () => <transaction-account account={baseAccount} class="custom-class" dataTestId="test-id" scope="sender"></transaction-account>,
    });

    const div = page.root.shadowRoot.querySelector('div');
    expect(div.className).toBe('custom-class');
    expect(div.getAttribute('data-testid')).toBe('test-id');
  });
});
