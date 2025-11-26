import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { TransactionMethod } from '../TransactionMethod';

describe('TransactionMethod tests', () => {
  const createPage = async (props: { method?: string; actionDescription?: string }) => {
    const page = await newSpecPage({
      components: [],
      template: () => <TransactionMethod method={props.method} actionDescription={props.actionDescription} />,
    });

    return page;
  };

  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [],
        template: () => <TransactionMethod method="" actionDescription="" />,
      });

      expect(page.root).toBeTruthy();
    });

    it('has correct data-testid', async () => {
      const page = await newSpecPage({
        components: [],
        template: () => <TransactionMethod method="testMethod" actionDescription="Test Description" />,
      });

      expect(page.root).toEqualHtml(`
        <span class="transaction-method-badge mvx:inline-block mvx:py-1 mvx:px-1.5 mvx:font-normal mvx:text-center mvx:whitespace-pre-wrap mvx:text-xs mvx:leading-none mvx:break-all mvx:align-baseline mvx:rounded-sm mvx:transition-colors mvx:duration-200 mvx:ease-in-out mvx:motion-reduce:transition-none mvx:text-transaction-method mvx:border-1 mvx:border-transaction-method mvx:bg-transparent mvx:font-light" data-testid="method" title="Test Description">
          <div class="transaction-method-text mvx:truncate mvx:capitalize">testMethod</div>
        </span>
      `);
    });
  });

  describe('method display', () => {
    it('displays the transaction method', async () => {
      const page = await createPage({ method: 'testMethod' });
      const methodElement = page.root.querySelector('.transaction-method-text');
      expect(methodElement.textContent).toBe('testMethod');
    });

    it('handles empty method', async () => {
      const page = await createPage({ method: '' });
      const methodElement = page.root.querySelector('.transaction-method-text');
      expect(methodElement.textContent).toBe('');
    });

    it('handles undefined method', async () => {
      const page = await createPage({ method: undefined });
      const methodElement = page.root.querySelector('.transaction-method-text');
      expect(methodElement.textContent).toBe('');
    });
  });

  describe('action description', () => {
    it('sets the action description as title', async () => {
      const page = await createPage({ actionDescription: 'Test Description' });
      expect(page.root).toEqualHtml(`
        <span class="transaction-method-badge mvx:inline-block mvx:py-1 mvx:px-1.5 mvx:font-normal mvx:text-center mvx:whitespace-pre-wrap mvx:text-xs mvx:leading-none mvx:break-all mvx:align-baseline mvx:rounded-sm mvx:transition-colors mvx:duration-200 mvx:ease-in-out mvx:motion-reduce:transition-none mvx:text-transaction-method mvx:border-1 mvx:border-transaction-method mvx:bg-transparent mvx:font-light" data-testid="method" title="Test Description">
          <div class="transaction-method-text mvx:truncate mvx:capitalize"></div>
        </span>
      `);
    });

    it('handles empty action description', async () => {
      const page = await createPage({ actionDescription: '' });
      expect(page.root).toEqualHtml(`
        <span class="transaction-method-badge mvx:inline-block mvx:py-1 mvx:px-1.5 mvx:font-normal mvx:text-center mvx:whitespace-pre-wrap mvx:text-xs mvx:leading-none mvx:break-all mvx:align-baseline mvx:rounded-sm mvx:transition-colors mvx:duration-200 mvx:ease-in-out mvx:motion-reduce:transition-none mvx:text-transaction-method mvx:border-1 mvx:border-transaction-method mvx:bg-transparent mvx:font-light" data-testid="method" title="">
          <div class="transaction-method-text mvx:truncate mvx:capitalize"></div>
        </span>
      `);
    });

    it('handles undefined action description', async () => {
      const page = await createPage({ actionDescription: undefined });
      expect(page.root).toEqualHtml(`
        <span class="transaction-method-badge mvx:inline-block mvx:py-1 mvx:px-1.5 mvx:font-normal mvx:text-center mvx:whitespace-pre-wrap mvx:text-xs mvx:leading-none mvx:break-all mvx:align-baseline mvx:rounded-sm mvx:transition-colors mvx:duration-200 mvx:ease-in-out mvx:motion-reduce:transition-none mvx:text-transaction-method mvx:border-1 mvx:border-transaction-method mvx:bg-transparent mvx:font-light" data-testid="method" title="">
          <div class="transaction-method-text mvx:truncate mvx:capitalize"></div>
        </span>
      `);
    });
  });

  describe('styling', () => {
    it('applies correct CSS classes to outer span', async () => {
      const page = await newSpecPage({
        components: [],
        template: () => <TransactionMethod method="testMethod" actionDescription="" />,
      });

      expect(page.root).toEqualHtml(`
        <span class="transaction-method-badge mvx:inline-block mvx:py-1 mvx:px-1.5 mvx:font-normal mvx:text-center mvx:whitespace-pre-wrap mvx:text-xs mvx:leading-none mvx:break-all mvx:align-baseline mvx:rounded-sm mvx:transition-colors mvx:duration-200 mvx:ease-in-out mvx:motion-reduce:transition-none mvx:text-transaction-method mvx:border-1 mvx:border-transaction-method mvx:bg-transparent mvx:font-light" data-testid="method" title="">
          <div class="transaction-method-text mvx:truncate mvx:capitalize">testMethod</div>
        </span>
      `);
    });

    it('applies correct CSS classes to inner div', async () => {
      const page = await newSpecPage({
        components: [],
        template: () => <TransactionMethod method="testMethod" actionDescription="" />,
      });

      expect(page.root).toEqualHtml(`
        <span class="transaction-method-badge mvx:inline-block mvx:py-1 mvx:px-1.5 mvx:font-normal mvx:text-center mvx:whitespace-pre-wrap mvx:text-xs mvx:leading-none mvx:break-all mvx:align-baseline mvx:rounded-sm mvx:transition-colors mvx:duration-200 mvx:ease-in-out mvx:motion-reduce:transition-none mvx:text-transaction-method mvx:border-1 mvx:border-transaction-method mvx:bg-transparent mvx:font-light" data-testid="method" title="">
          <div class="transaction-method-text mvx:truncate mvx:capitalize">testMethod</div>
        </span>
      `);
    });
  });
});
