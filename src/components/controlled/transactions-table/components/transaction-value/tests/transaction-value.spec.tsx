import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type { TransactionValueType } from 'components/controlled/transactions-table/transactions-table.type';

import { TransactionValue } from '../transaction-value';

describe('TransactionValue', () => {
  it('renders with minimal props', async () => {
    const value: TransactionValueType = {
      egldLabel: '',
      link: '',
      linkText: '',
      name: '',
      ticker: '',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [TransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value"></div>
      </mvx-transaction-value>
    `);
  });

  it('renders with badge', async () => {
    const value: TransactionValueType = {
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
      components: [TransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <div class="mvx:align-baseline mvx:bg-transparent mvx:border mvx:border-transaction-method mvx:break-all mvx:duration-200 mvx:ease-in-out mvx:font-bold mvx:inline-block mvx:leading-none mvx:motion-reduce:transition-none mvx:px-1.5 mvx:py-1 mvx:rounded-sm mvx:text-xs mvx:text-center mvx:text-transaction-method mvx:transition-colors mvx:w-max mvx:whitespace-pre-wrap transaction-value-badge" data-testid="transactionNftBadge">
              NFT
            </div>
          </div>
      </mvx-transaction-value>
    `);
  });

  it('renders with formatted amount', async () => {
    const value: TransactionValueType = {
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
      components: [TransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
           <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value-amount">
            <mvx-multiversx-symbol-icon class="mvx:text-primary transaction-value-amount-symbol"></mvx-multiversx-symbol-icon>
            <mvx-format-amount class="mvx:mr-1 mvx:text-primary transaction-value-format-amount" datatestid="transactionActionFormattedAmount" decimalclass="opacity-70" isvalid="" label="xEGLD" labelclass="opacity-70" valuedecimal="123" valueinteger="123"></mvx-format-amount>
            </div>
          </div>
      </mvx-transaction-value>
    `);
  });

  it('renders with explorer link', async () => {
    const value: TransactionValueType = {
      egldLabel: '',
      link: 'https://example.com',
      linkText: 'Example Link',
      name: 'Example',
      ticker: 'EX',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [TransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <mvx-explorer-link class="mvx:truncate transaction-value-text-truncate" link="https://example.com">
              <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
                <span>Example Link</span>
              </div>
            </mvx-explorer-link>
          </div>
      </mvx-transaction-value>
    `);
  });

  it('renders with SVG icon', async () => {
    const value: TransactionValueType = {
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
      components: [TransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <mvx-explorer-link class="mvx:flex transaction-value-link" link="https://example.com">
              <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
                <img alt="Example Icon" class="mvx:border mvx:border-gray-200 mvx:h-6 mvx:min-h-6 mvx:min-w-6 mvx:overflow-hidden mvx:rounded-full mvx:text-transparent mvx:w-6 transaction-value-img" src="https://example.com/icon.svg">
                <span>Example Link</span>
              </div>
            </mvx-explorer-link>
          </div>
      </mvx-transaction-value>
    `);
  });

  it('renders with truncated text', async () => {
    const value: TransactionValueType = {
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
      components: [TransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <mvx-explorer-link class="mvx:truncate transaction-value-text-truncate" link="https://example.com">
              <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
                <span class="mvx:truncate transaction-value-text-truncate">Example Link</span>
              </div>
            </mvx-explorer-link>
          </div>
      </mvx-transaction-value>
    `);
  });

  it('renders with titleText', async () => {
    const value: TransactionValueType = {
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
      components: [TransactionValue],
      template: () => <mvx-transaction-value value={value}></mvx-transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <mvx-transaction-value>
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <mvx-explorer-link class="mvx:truncate transaction-value-text-truncate" link="https://example.com">
              <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
                <span>Example Link</span>
              </div>
            </mvx-explorer-link>
            <mvx-tooltip>
              Title Text
            </mvx-tooltip>
          </div>
      </mvx-transaction-value>
    `);
  });
});
