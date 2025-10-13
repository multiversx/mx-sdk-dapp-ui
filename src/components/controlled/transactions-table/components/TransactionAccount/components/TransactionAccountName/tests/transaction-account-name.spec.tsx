import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TransactionAccountName } from '../TransactionAccountName';

describe('TransactionAccountName', () => {
  it('renders name when provided', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionAccountName
          address="erd1q..."
          name="Alice"
          description="Alice's Wallet"
          dataTestId="account-name"
        />
      ),
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account-name mvx:w-max mvx:truncate" data-testid="account-name" title="Alice's Wallet">
        Alice
      </div>
    `);
  });

  it('uses trim component when name is missing', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionAccountName
          address="erd1q..."
          description=""
        />
      )
    });

    expect(page.root).toEqualHtml(`
      <mvx-trim text="erd1q..." class="transaction-account-name mvx:w-max mvx:truncate"></mvx-trim>
    `);
  });

  it('handles empty name string', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionAccountName
          address="erd1q..."
          name=""
          description=""
        />
      )
    });

    expect(page.root).toEqualHtml(`
      <mvx-trim text="erd1q..." class="transaction-account-name mvx:w-max mvx:truncate"></mvx-trim>
    `);
  });

  it('applies correct class names', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionAccountName
          address="erd1q..."
          name="Bob"
          class="custom-class"
          description=""
        />
      )
    });

    expect(page.root).toEqualHtml(`
      <div class="custom-class transaction-account-name mvx:w-max mvx:truncate" title="">
        Bob
      </div>
    `);
  });

  it('handles missing dataTestId', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionAccountName
          address="erd1q..."
          name="Charlie"
          description=""
        />
      )
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account-name mvx:w-max mvx:truncate" title="">
        Charlie
      </div>
    `);
  });

  it('uses description as title when name exists', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      template: () => (
        <TransactionAccountName
          address="erd1q..."
          name="Dave"
          description="Dave's Savings"
        />
      )
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account-name mvx:w-max mvx:truncate" title="Dave's Savings">
        Dave
      </div>
    `);
  })
});
