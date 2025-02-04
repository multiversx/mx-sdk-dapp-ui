import { newSpecPage } from '@stencil/core/testing';
import { TransactionAccountName } from '../transaction-account-name';

describe('transaction-account-name', () => {
  // Test 1: Renders name with description title when available
  it('displays name with title when provided', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      html: `
        <transaction-account-name
          name="Savings Account"
          description="Primary savings account"
          data-test-id="account-1"
        ></transaction-account-name>
      `,
    });

    const div = page.root.shadowRoot.querySelector('div');
    expect(div.textContent).toContain('Savings Account');
    expect(div.getAttribute('title')).toBe('Primary savings account');
    expect(div.getAttribute('data-testid')).toBe('account-1');
    expect(div.classList.contains('text-truncate')).toBe(true);
  });

  // Test 2: Falls back to address when name is missing
  it('displays address when name is absent', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      html: `
        <transaction-account-name
          address="0x1234abcd"
          data-test-id="account-2"
        ></transaction-account-name>
      `,
    });

    const div = page.root.shadowRoot.querySelector('div');
    expect(div.textContent).toContain('0x1234abcd');
    expect(div.classList.contains('trim')).toBe(true);
    expect(div.hasAttribute('title')).toBe(false);
  });

  // Test 3: Combines custom classes with default
  it('merges custom classes with default styles', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      html: `
        <transaction-account-name
          class="custom-style"
          name="Checking"
        ></transaction-account-name>
      `,
    });

    const div = page.root.shadowRoot.querySelector('div');
    expect(div.classList.contains('custom-style')).toBe(true);
    expect(div.classList.contains('transaction-account-name')).toBe(true);
  });

  // Test 4: Handles missing optional props
  it('renders without data-testid when not provided', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      html: `<transaction-account-name name="Investment"></transaction-account-name>`,
    });

    const div = page.root.shadowRoot.querySelector('div');
    expect(div.hasAttribute('data-testid')).toBe(false);
  });
});
