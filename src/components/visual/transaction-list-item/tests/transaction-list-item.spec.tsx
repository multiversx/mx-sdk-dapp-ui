import { newSpecPage } from '@stencil/core/testing';
import { TransactionAssetIcon } from 'components/common/transaction-asset-icon/transaction-asset-icon';
import { FormatAmount } from 'components/controlled/format-amount/format-amount';

import { TransactionListItem } from '../transaction-list-item';
import type { ITransactionListItem } from '../transaction-list-item.types';

describe('transaction-list-item', () => {
  const createPage = async (transaction: ITransactionListItem) => {
    const page = await newSpecPage({
      components: [TransactionListItem, TransactionAssetIcon, FormatAmount],
      html: '<mvx-transaction-list-item></mvx-transaction-list-item>',
    });

    page.root.transaction = transaction;
    await page.waitForChanges();
    return page;
  };

  const baseTransaction: ITransactionListItem = {
    action: {
      name: 'Test Transaction',
      description: 'To',
    },
    amount: '+100 EGLD',
    asset: {
      imageUrl: '/assets/icons/transaction.svg',
      text: 'Test Asset',
    },
    directionLabel: 'From',
    interactor: 'Test Address',
    interactorAsset: '/assets/icons/service.svg',
    hash: 'fe0eee477f7bcedf76bbcajklsd',
    status: 'success',
    link: 'https://explorer.multiversx.com/transactions/fe0eee477f7bcedf76bbcajklsd',
    timestamp: 1716537600,
  };

  describe('empty state', () => {
    it('renders empty when no transaction is provided', async () => {
      const page = await newSpecPage({
        components: [TransactionListItem],
        html: '<mvx-transaction-list-item></mvx-transaction-list-item>',
      });
      expect(page.root.querySelector('.transaction-item')).toBeFalsy();
    });
  });

  describe('primary icon rendering', () => {
    it('renders with asset image', async () => {
      const page = await createPage(baseTransaction);

      const assetIcon = page.root.querySelector('mvx-transaction-asset-icon');
      expect(assetIcon).not.toBeNull();

      const iconImg = assetIcon.shadowRoot.querySelector('img');
      expect(iconImg).not.toBeNull();
      expect(iconImg.getAttribute('src')).toBe(baseTransaction.asset.imageUrl);
      expect(iconImg.getAttribute('alt')).toBe('Transaction icon');
      expect(iconImg.getAttribute('loading')).toBe('lazy');
    });

    it('renders with asset icon', async () => {
      const transaction = { ...baseTransaction, asset: { icon: 'faArrowsRotate' } };
      const page = await createPage(transaction);
      const assetIcon = page.root.querySelector('mvx-transaction-asset-icon');

      expect(assetIcon).not.toBeNull();
      const iconComponent = assetIcon.shadowRoot.querySelector('mvx-fa-icon');
      expect(iconComponent).not.toBeNull();
      expect(iconComponent.getAttribute('icon')).toBe('faArrowsRotate');
    });

    it('renders with asset text', async () => {
      const transaction = { ...baseTransaction, asset: { text: 'TX' } };
      const page = await createPage(transaction);
      const assetIcon = page.root.querySelector('mvx-transaction-asset-icon');

      expect(assetIcon).not.toBeNull();
      const iconText = assetIcon.shadowRoot.querySelector('span');
      expect(iconText).not.toBeNull();
      expect(iconText.textContent).toBe('TX');
    });

    it('renders default icon when no asset properties are provided', async () => {
      const transaction = { ...baseTransaction, asset: {} };
      const page = await createPage(transaction);

      const assetIcon = page.root.querySelector('mvx-transaction-asset-icon');
      expect(assetIcon).not.toBeNull();

      const defaultIcon = assetIcon.shadowRoot.querySelector('mvx-default-transaction-icon-large');
      expect(defaultIcon).not.toBeNull();
    });

    it('renders default icon when asset is null', async () => {
      const transaction = { ...baseTransaction, asset: null };
      const page = await createPage(transaction);

      const regularIcon = page.root.querySelector('.icon-text');
      expect(regularIcon).toBeFalsy();

      const assetIcon = page.root.querySelector('mvx-transaction-asset-icon');
      expect(assetIcon).not.toBeNull();

      const defaultIcon = assetIcon.shadowRoot.querySelector('mvx-default-transaction-icon-large');
      expect(defaultIcon).not.toBeNull();
    });
  });

  describe('transaction details', () => {
    it('renders transaction details correctly', async () => {
      const page = await createPage(baseTransaction);

      const title = page.root.querySelector('.transaction-title');
      expect(title.textContent).toBe(baseTransaction.action.name);

      const directionLabel = page.root.querySelector('.transaction-details-info-text');
      expect(directionLabel.textContent).toBe(baseTransaction.directionLabel);

      const interactorAsset = page.root.querySelector('.transaction-details-info-icon img');
      expect(interactorAsset.getAttribute('src')).toBe(baseTransaction.interactorAsset);
      expect(interactorAsset.getAttribute('alt')).toBe('Service icon');
      expect(interactorAsset.getAttribute('loading')).toBe('lazy');

      const interactor = page.root.querySelector('mvx-trim');
      expect(interactor.getAttribute('text')).toBe(baseTransaction.interactor);
      expect(interactor.className).toBe('transaction-details-info-text');
    });

    it('renders without direction label when not provided', async () => {
      const transaction = {
        ...baseTransaction,
        directionLabel: undefined,
      };
      const page = await createPage(transaction);
      const directionLabel = page.root.querySelector('.transaction-details-info-text:not(mvx-trim)');
      expect(directionLabel).toBeFalsy();
    });

    it('renders without interactor asset when not provided', async () => {
      const transaction = {
        ...baseTransaction,
        interactorAsset: undefined,
      };
      const page = await createPage(transaction);
      const serviceIcon = page.root.querySelector('.transaction-details-info-icon img');
      expect(serviceIcon).toBeFalsy();
    });
  });

  describe('amount display', () => {
    it('renders amount with correct styling for positive value', async () => {
      const page = await createPage(baseTransaction);
      const amount = page.root.querySelector('.transaction-amount');

      expect(amount).toHaveClass('amount-positive');
      expect(amount).not.toHaveClass('amount-negative');
      expect(amount.textContent.trim()).toBe(baseTransaction.amount.replace(' ', ''));
    });

    it('renders amount with correct styling for negative value', async () => {
      const transaction = { ...baseTransaction, amount: '-100 EGLD' };
      const page = await createPage(transaction);
      const amount = page.root.querySelector('.transaction-amount');

      expect(amount).toHaveClass('amount-negative');
      expect(amount).not.toHaveClass('amount-positive');
      expect(amount.textContent.trim()).toBe(transaction.amount.replace(' ', ''));
    });
  });
});
