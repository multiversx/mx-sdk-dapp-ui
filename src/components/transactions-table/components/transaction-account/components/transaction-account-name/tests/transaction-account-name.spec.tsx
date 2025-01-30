import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TransactionAccountName } from '../transaction-account-name';

describe('TransactionAccount Component', () => {
  it('should render with name and description props', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      template: () => <transaction-account-name name="John Doe" description="This is a description"></transaction-account-name>,
    });

    const span = page.root.shadowRoot.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.textContent).toBe('John Doe');
    expect(span.getAttribute('title')).toBe('This is a description');
  });

  it('should apply custom class when the "class" prop is provided', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      template: () => <transaction-account-name name="John Doe" description="This is a description" class="custom-class"></transaction-account-name>,
    });

    const span = page.root.shadowRoot.querySelector('span');
    expect(span.classList.contains('custom-class')).toBe(true);
  });

  it('should render description when name is not provided', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      template: () => <transaction-account-name description="Fallback description"></transaction-account-name>,
    });

    const span = page.root.shadowRoot.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.textContent).toBe('Fallback description');
    expect(span.classList.contains('trim')).toBe(true);
  });

  it('should set the data-testid attribute when provided', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      template: () => <transaction-account-name name="John Doe" description="This is a description" dataTestId="test-id"></transaction-account-name>,
    });

    const span = page.root.shadowRoot.querySelector('span');
    expect(span.getAttribute('data-testid')).toBe('test-id');
  });

  it('should render with default styles when no class prop is provided', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      template: () => <transaction-account-name name="John Doe" description="This is a description"></transaction-account-name>,
    });

    const span = page.root.shadowRoot.querySelector('span');
    expect(span.classList.contains('text-truncate')).toBe(true);
  });
});
