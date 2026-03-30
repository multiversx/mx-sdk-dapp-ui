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
          <svg class="multiversx-symbol-icon mvx:text-primary transaction-value-amount-symbol" viewBox="0 0 33 24" xmlns="http://www.w3.org/2000/svg" style="width: 0.75rem; height: 0.75rem; fill: currentColor; flex-shrink: 0;">
            <path d="M17.8956 12.0018L32.0458 4.52327L29.6668 0L16.7098 5.18441C16.3761 5.31809 16.0062 5.31809 15.6726 5.18441L2.71192 0L0.333008 4.52327L14.4832 12.0018L0.333008 19.4767L2.71192 24L15.669 18.8156C16.0027 18.6819 16.3725 18.6819 16.7061 18.8156L29.6632 24L32.0421 19.4767L17.8919 11.9982L17.8956 12.0018Z"></path>
          </svg>
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
        <a class="explorer-link mvx:decoration-0 mvx:flex mvx:truncate transaction-value-text-truncate" href="https://example.com" rel="noreferrer" target="_blank">
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <span>Example Link</span>
          </div>
        </a>
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
        <a class="explorer-link mvx:decoration-0 mvx:flex transaction-value-link" href="https://example.com" rel="noreferrer" target="_blank">
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <img alt="Example Icon" class="mvx:border mvx:border-gray-200 mvx:h-6 mvx:min-h-6 mvx:min-w-6 mvx:overflow-hidden mvx:rounded-full mvx:text-transparent mvx:w-6 transaction-value-img" src="https://example.com/icon.svg">
            <span>Example Link</span>
          </div>
        </a>
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
          <a class="explorer-link mvx:decoration-0 mvx:flex mvx:truncate transaction-value-text-truncate" href="https://example.com" rel="noreferrer" target="_blank">
            <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
              <span class="mvx:truncate transaction-value-text-truncate">Example Link</span>
            </div>
          </a>
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
        <a class="explorer-link mvx:decoration-0 mvx:flex mvx:truncate transaction-value-text-truncate" href="https://example.com" rel="noreferrer" target="_blank">
          <div class="mvx:flex mvx:gap-1 mvx:items-center transaction-value">
            <span>Example Link</span>
          </div>
        </a>
        <mvx-tooltip>
          Title Text
        </mvx-tooltip>
      </div>
    `);
  });
});
