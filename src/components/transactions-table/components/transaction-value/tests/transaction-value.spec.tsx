import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TransactionValue } from '../transaction-value';
import { ITransactionValue } from 'components/transactions-table/transactions-table.type';

describe('TransactionValue', () => {
  it('renders with minimal props', async () => {
    const value: ITransactionValue = {
      link: '',
      linkText: '',
      name: '',
      ticker: '',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [TransactionValue],
      template: () => <transaction-value value={value}></transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <transaction-value>
        <mock:shadow-root>
          <div class="transaction-value"></div>
        </mock:shadow-root>
      </transaction-value>
    `);
  });

  it('renders with badge', async () => {
    const value: ITransactionValue = {
      badge: 'NFT',
      link: '',
      linkText: '',
      name: '',
      ticker: '',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [TransactionValue],
      template: () => <transaction-value value={value}></transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <transaction-value>
        <mock:shadow-root>
          <div class="transaction-value">
            <div class="badge badge-pill badge-secondary font-weight-light transaction-value" data-testid="transactionNftBadge">
              NFT
            </div>
          </div>
        </mock:shadow-root>
      </transaction-value>
    `);
  });

  it('renders with formatted amount', async () => {
    const value: ITransactionValue = {
      showFormattedAmount: true,
      valueDecimal: '123',
      valueInteger: '123',
      link: '',
      linkText: '',
      name: '',
      ticker: '',
    };

    const page = await newSpecPage({
      components: [TransactionValue],
      template: () => <transaction-value value={value}></transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <transaction-value>
        <mock:shadow-root>
          <div class="transaction-value">
            <format-amount class="mr-1" datatestid="transactionActionFormattedAmount" isvalid="" valuedecimal="123" valueinteger="123"></format-amount>
          </div>
        </mock:shadow-root>
      </transaction-value>
    `);
  });

  it('renders with explorer link', async () => {
    const value: ITransactionValue = {
      link: 'https://example.com',
      linkText: 'Example Link',
      name: 'Example',
      ticker: 'EX',
      valueDecimal: '',
      valueInteger: '',
    };

    const page = await newSpecPage({
      components: [TransactionValue],
      template: () => <transaction-value value={value}></transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <transaction-value>
        <mock:shadow-root>
          <div class="transaction-value">
            <explorer-link class="transaction-value-link text-truncate" link="https://example.com">
              <div class="transaction-value-content" slot="content">
                <span class="transaction-value-text">Example Link</span>
              </div>
            </explorer-link>
          </div>
        </mock:shadow-root>
      </transaction-value>
    `);
  });

  it('renders with SVG icon', async () => {
    const value: ITransactionValue = {
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
      template: () => <transaction-value value={value}></transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <transaction-value>
        <mock:shadow-root>
          <div class="transaction-value">
            <explorer-link class="transaction-value-link side-link d-flex" link="https://example.com">
              <div class="transaction-value-content" slot="content">
                <img alt="Example Icon" class="transaction-value-icon" src="https://example.com/icon.svg">
                <span class="transaction-value-text">Example Link</span>
              </div>
            </explorer-link>
          </div>
        </mock:shadow-root>
      </transaction-value>
    `);
  });

  it('renders with truncated text', async () => {
    const value: ITransactionValue = {
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
      template: () => <transaction-value value={value}></transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <transaction-value>
        <mock:shadow-root>
          <div class="transaction-value">
            <explorer-link class="transaction-value-link text-truncate" link="https://example.com">
              <div class="transaction-value-content" slot="content">
                <span class="transaction-value-text truncate">Example Link</span>
              </div>
            </explorer-link>
          </div>
        </mock:shadow-root>
      </transaction-value>
    `);
  });

  it('renders with titleText', async () => {
    const value: ITransactionValue = {
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
      template: () => <transaction-value value={value}></transaction-value>,
    });

    expect(page.root).toEqualHtml(`
      <transaction-value>
        <mock:shadow-root>
          <div class="transaction-value">
            <explorer-link class="transaction-value-link text-truncate" link="https://example.com">
              <div class="transaction-value-content" slot="content">
                <span class="transaction-value-text">Example Link</span>
              </div>
            </explorer-link>
            <fa-icon class="transaction-value-icon" title="Title Text"></fa-icon>
          </div>
        </mock:shadow-root>
      </transaction-value>
    `);
  });
});
