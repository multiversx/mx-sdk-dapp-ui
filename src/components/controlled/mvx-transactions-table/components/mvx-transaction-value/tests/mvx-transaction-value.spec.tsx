import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type { IMvxTransactionValue } from 'components/controlled/mvx-transactions-table/mvx-transactions-table.type';

import { MvxTransactionValue } from '../mvx-transaction-value';

describe('TransactionValue', () => {
  it('renders with minimal props', async () => {
    const value: IMvxTransactionValue = {
      egldLabel: '',
      link: '',
      linkText: '',
      name: '',
      ticker: '',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [MvxTransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="transaction-value"></div>
      </mvx-transaction-value>
    `);
  });

  it('renders with badge', async () => {
    const value: IMvxTransactionValue = {
      badge: 'NFT',
      egldLabel: '',
      link: '',
      linkText: '',
      name: '',
      ticker: '',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [MvxTransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="transaction-value">
            <div class="badge badge-pill badge-secondary font-weight-light transaction-value-badge" data-testid="transactionNftBadge">
              NFT
            </div>
          </div>
      </mvx-transaction-value>
    `);
  });

  it('renders with formatted amount', async () => {
    const value: IMvxTransactionValue = {
      showFormattedAmount: true,
      egldLabel: 'xEGLD',
      valueDecimal: '123',
      valueInteger: '123',
      link: '',
      linkText: '',
      name: '',
      ticker: '',
    };

    const page = await newSpecPage({
      components: [MvxTransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="transaction-value">
            <mvx-format-amount class="mr-1" datatestid="transactionActionFormattedAmount" isvalid="" label="xEGLD" valuedecimal="123" valueinteger="123"></mvx-format-amount>
          </div>
      </mvx-transaction-value>
    `);
  });

  it('renders with explorer link', async () => {
    const value: IMvxTransactionValue = {
      egldLabel: '',
      link: 'https://example.com',
      linkText: 'Example Link',
      name: 'Example',
      ticker: 'EX',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [MvxTransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="transaction-value">
            <explorer-link class="transaction-value-link text-truncate" link="https://example.com">
              <div class="transaction-value-content" slot="content">
                <span class="transaction-value-link-text">Example Link</span>
              </div>
            </explorer-link>
          </div>
      </mvx-transaction-value>
    `);
  });

  it('renders with SVG icon', async () => {
    const value: IMvxTransactionValue = {
      egldLabel: '',
      link: 'https://example.com',
      linkText: 'Example Link',
      svgUrl: 'https://example.com/icon.svg',
      name: 'Example Icon',
      ticker: 'EX',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [MvxTransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="transaction-value">
            <explorer-link class="transaction-value-link side-link d-flex" link="https://example.com">
              <div class="transaction-value-content" slot="content">
                <img alt="Example Icon" class="transaction-value-img" src="https://example.com/icon.svg">
                <span class="transaction-value-link-text">Example Link</span>
              </div>
            </explorer-link>
          </div>
      </mvx-transaction-value>
    `);
  });

  it('renders with truncated text', async () => {
    const value: IMvxTransactionValue = {
      egldLabel: '',
      link: 'https://example.com',
      linkText: 'Example Link',
      ticker: 'EXM',
      collection: 'EXM',
      name: 'Example',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [MvxTransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="transaction-value">
            <explorer-link class="transaction-value-link text-truncate" link="https://example.com">
              <div class="transaction-value-content" slot="content">
                <span class="transaction-value-link-text truncate">Example Link</span>
              </div>
            </explorer-link>
          </div>
      </mvxtransaction-value>
    `);
  });

  it('renders with titleText', async () => {
    const value: IMvxTransactionValue = {
      egldLabel: '',
      link: 'https://example.com',
      linkText: 'Example Link',
      name: 'Example',
      ticker: 'EX',
      valueDecimal: '',
      valueInteger: '',
      titleText: 'Title Text',
    };

    const page = await newSpecPage({
      components: [MvxTransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="transaction-value">
            <explorer-link class="transaction-value-link text-truncate" link="https://example.com">
              <div class="transaction-value-content" slot="content">
                <span class="transaction-value-link-text">Example Link</span>
              </div>
            </explorer-link>
            <fa-icon class="transaction-value-icon" title="Title Text"></fa-icon>
          </div>
      </mvx-transaction-value>
    `);
  });
});
