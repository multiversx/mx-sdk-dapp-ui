import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { TransactionMethod } from '../transaction-method';

describe('transaction-method', () => {
  const createPage = async (props: { method?: string; actionDescription?: string }) => {
    const page = await newSpecPage({
      components: [TransactionMethod],
      html: '<mvx-transaction-method></mvx-transaction-method>',
    });

    const component = page.rootInstance as TransactionMethod;
    component.method = props.method;
    component.actionDescription = props.actionDescription;
    await page.waitForChanges();
    return page;
  };

  describe('rendering', () => {
    it('renders with default props', async () => {
      const page = await newSpecPage({
        components: [TransactionMethod],
        html: '<mvx-transaction-method></mvx-transaction-method>',
      });

      expect(page.root).toBeTruthy();
    });

    it('has correct data-testid', async () => {
      const page = await newSpecPage({
        components: [TransactionMethod],
        html: '<mvx-transaction-method></mvx-transaction-method>',
      });

      const spanElement = page.root.querySelector(`[data-testid="${DataTestIdsEnum.method}"]`);
      expect(spanElement).toBeTruthy();
    });
  });

  describe('method display', () => {
    it('displays the transaction method', async () => {
      const page = await createPage({ method: 'testMethod' });
      const methodElement = page.root.querySelector('.text-truncate');
      expect(methodElement.textContent).toBe('testMethod');
    });

    it('handles empty method', async () => {
      const page = await createPage({ method: '' });
      const methodElement = page.root.querySelector('.text-truncate');
      expect(methodElement.textContent).toBe('');
    });

    it('handles undefined method', async () => {
      const page = await createPage({ method: undefined });
      const methodElement = page.root.querySelector('.text-truncate');
      expect(methodElement.textContent).toBe('');
    });
  });

  describe('action description', () => {
    it('sets the action description as title', async () => {
      const page = await createPage({ actionDescription: 'Test Description' });
      const spanElement = page.root.querySelector(`[data-testid="${DataTestIdsEnum.method}"]`);
      expect(spanElement.getAttribute('title')).toBe('Test Description');
    });

    it('handles empty action description', async () => {
      const page = await createPage({ actionDescription: '' });
      const spanElement = page.root.querySelector(`[data-testid="${DataTestIdsEnum.method}"]`);
      expect(spanElement.getAttribute('title')).toBe('');
    });

    it('handles undefined action description', async () => {
      const page = await createPage({ actionDescription: undefined });
      const spanElement = page.root.querySelector(`[data-testid="${DataTestIdsEnum.method}"]`);
      expect(spanElement.getAttribute('title')).toBeNull();
    });
  });

  describe('styling', () => {
    it('applies correct CSS classes to outer span', async () => {
      const page = await newSpecPage({
        components: [TransactionMethod],
        html: '<mvx-transaction-method></mvx-transaction-method>',
      });

      const outerSpan = page.root.querySelector('span');
      expect(outerSpan).toHaveClass('badge');
      expect(outerSpan).toHaveClass('badge-secondary');
      expect(outerSpan).toHaveClass('badge-pill');
      expect(outerSpan).toHaveClass('font-weight-light');
    });

    it('applies correct CSS classes to inner div', async () => {
      const page = await newSpecPage({
        components: [TransactionMethod],
        html: '<mvx-transaction-method></mvx-transaction-method>',
      });

      const innerDiv = page.root.querySelector('div > div');
      expect(innerDiv).toHaveClass('text-truncate');
      expect(innerDiv).toHaveClass('text-capitalize');
      expect(innerDiv).toHaveClass('text-white');
    });
  });
});
