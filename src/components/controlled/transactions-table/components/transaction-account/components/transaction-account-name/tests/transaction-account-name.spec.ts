import { newSpecPage } from '@stencil/core/testing';

import { TransactionAccountName } from '../transaction-account-name';

describe('transaction-account-name', () => {
  it('renders name when provided', async () => {
    const { root } = await newSpecPage({
      components: [TransactionAccountName],
      html: `
        <mvx-transaction-account-name
          address="erd1q..."
          name="Alice"
          description="Alice's Wallet"
          data-test-id="account-name"
        />
      `,
    });

    const element = root?.querySelector('div');
    expect(element).not.toBeNull();
    expect(element?.textContent).toBe('Alice');
    expect(element?.getAttribute('title')).toBe("Alice's Wallet");
    expect(element?.getAttribute('data-testid')).toBe('account-name');
    expect(element?.className).toContain('text-truncate');
  });

  it('uses trim component when name is missing', async () => {
    const { root } = await newSpecPage({
      components: [TransactionAccountName],
      html: `
        <mvx-transaction-account-name
          address="erd1q..."
          data-test-id="account-trim"
        />
      `,
    });

    const trimElement = root?.querySelector('mvx-trim');
    expect(trimElement).not.toBeNull();
    expect(trimElement?.getAttribute('text')).toBe('erd1q...');
    expect(trimElement?.getAttribute('datatestid')).toBe('account-trim');
  });

  it('handles empty name string', async () => {
    const { root } = await newSpecPage({
      components: [TransactionAccountName],
      html: `
        <mvx-transaction-account-name
          address="erd1q..."
          name=""
        />
      `,
    });

    const trimElement = root?.querySelector('mvx-trim');
    expect(trimElement).not.toBeNull();
  });

  it('applies correct class names', async () => {
    const { root } = await newSpecPage({
      components: [TransactionAccountName],
      html: `
        <mvx-transaction-account-name
          address="erd1q..."
          name="Bob"
          class="custom-class"
        />
      `,
    });

    const element = root?.querySelector('div');
    expect(element?.className).toContain('custom-class');
    expect(element?.className).toContain('text-truncate');
    expect(element?.className).toContain('transaction-account-name');
  });

  it('handles missing dataTestId', async () => {
    const { root } = await newSpecPage({
      components: [TransactionAccountName],
      html: `
        <mvx-transaction-account-name
          address="erd1q..."
          name="Charlie"
        />
      `,
    });

    const element = root?.querySelector('div');
    expect(element?.hasAttribute('data-testid')).toBe(false);
  });

  it('uses description as title when name exists', async () => {
    const { root } = await newSpecPage({
      components: [TransactionAccountName],
      html: `
        <mvx-transaction-account-name
          address="erd1q..."
          name="Dave"
          description="Dave's Savings"
        />
      `,
    });

    const element = root?.querySelector('div');
    expect(element?.getAttribute('title')).toBe("Dave's Savings");
  });
});
