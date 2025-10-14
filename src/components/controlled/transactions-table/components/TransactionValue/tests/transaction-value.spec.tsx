import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import type { TransactionValueType } from 'components/controlled/transactions-table/transactions-table.type';
import { TransactionValue } from '../TransactionValue';

describe('TransactionValue tests', () => {
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
      components: [],
      template: () => <TransactionValue value={value} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value"></div>
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
      components: [],
      template: () => <TransactionValue value={value} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
        <div class="mvx:align-baseline mvx:bg-transparent mvx:border mvx:border-transaction-method mvx:break-all mvx:duration-200 mvx:ease-in-out mvx:font-bold mvx:inline-block mvx:leading-none mvx:motion-reduce:transition-none mvx:px-1.5 mvx:py-1 mvx:rounded-sm mvx:text-xs mvx:text-center mvx:text-transaction-method mvx:transition-colors mvx:w-max mvx:whitespace-pre-wrap transaction-value-badge" data-testid="transactionNftBadge">
          NFT
        </div>
      </div>
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
      components: [],
      template: () => <TransactionValue value={value} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
        <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value-amount">
          <mvx-multiversx-symbol-icon class="mvx:text-primary transaction-value-amount-symbol"></mvx-multiversx-symbol-icon>
          <span class="format-amount mvx:items-center mvx:mr-1 mvx:text-primary transaction-value-format-amount" data-testid="transactionActionFormattedAmount">
            <span class="int-amount mvx:text-inherit" data-testid="formatAmountInt">
             123
            </span>
            <span class="decimals mvx:text-inherit opacity-70" data-testid="formatAmountDecimals">
              123
            </span>
            <span class="mvx:ml-1 mvx:text-inherit opacity-70 symbol" data-testid="formatAmountSymbol">
                xEGLD
            </span>
          </span>
        </div>
      </div>
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
      components: [],
      template: () => <TransactionValue value={value} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
        <mvx-explorer-link class="mvx:truncate transaction-value-text-truncate" link="https://example.com">
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <span>Example Link</span>
          </div>
        </mvx-explorer-link>
      </div>
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
      components: [],
      template: () => <TransactionValue value={value} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
        <mvx-explorer-link class="mvx:flex transaction-value-link" link="https://example.com">
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <img alt="Example Icon" class="mvx:border mvx:border-gray-200 mvx:h-6 mvx:min-h-6 mvx:min-w-6 mvx:overflow-hidden mvx:rounded-full mvx:text-transparent mvx:w-6 transaction-value-img" src="https://example.com/icon.svg">
            <span>Example Link</span>
          </div>
        </mvx-explorer-link>
      </div>
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
      components: [],
      template: () => <TransactionValue value={value} />,
    });

    expect(page.root).toEqualHtml(`
      <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
        <mvx-explorer-link class="mvx:truncate transaction-value-text-truncate" link="https://example.com">
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <span class="mvx:truncate transaction-value-text-truncate">Example Link</span>
          </div>
        </mvx-explorer-link>
      </div>
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
      components: [],
      template: () => <TransactionValue value={value} />,
    });

    expect(page.root).toEqualHtml(`
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
    `);
  });
});
