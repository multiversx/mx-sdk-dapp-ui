import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import { TransactionAccountName } from '../TransactionAccountName';

describe('TransactionAccountName tests', () => {
  it('renders name when provided', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => (
        <TransactionAccountName
          address="erd1q..."
          name="Alice"
          description="Alice's Wallet"
          dataTestId="account-name"
        />
      ),
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account-name mvx:w-max mvx:truncate" data-testid="account-name" title="Alice's Wallet">
        Alice
      </div>
    `);
  });

  it('uses trim component when name is missing', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAccountName address="erd1q..." description="" />,
    });

    expect(page.root).toEqualHtml(`
      <div class="mvx:flex mvx:max-w-full mvx:overflow-hidden mvx:relative mvx:truncate mvx:w-max mvx:whitespace-nowrap transaction-account-name trim" data-testid="${DataTestIdsEnum.trim}">
        <div class="mvx:!text-inherit mvx:absolute mvx:leading-5 mvx:relative mvx:text-transparent trim-full trim-full-visible" data-testid="${DataTestIdsEnum.trimFullAddress}">
          erd1q...
        </div>
        <div class="mvx:hidden trim-wrapper">
          <div class="mvx:flex-shrink mvx:overflow-hidden mvx:text-[1px] mvx:text-ellipsis mvx:text-left trim-left-wrapper">
            <div class="mvx:-webkit-letter-spacing mvx:inline mvx:leading-5 mvx:pointer-events-none mvx:select-none mvx:text-base trim-left" style="font-size: 1rem;">
              erd1
            </div>
          </div>
          <div class="mvx:block mvx:flex-shrink-0 mvx:pointer-events-none mvx:select-none trim-ellipsis-wrapper">
            <div class="mvx:block mvx:leading-5 trim-ellipsis">
              ...
            </div>
          </div>
          <div class="mvx:flex-shrink mvx:overflow-hidden mvx:text-[1px] mvx:text-ellipsis mvx:text-right mvx:whitespace-nowrap trim-right-wrapper" style="direction: rtl;">
            <div class="mvx:-webkit-letter-spacing mvx:inline mvx:leading-5 mvx:pointer-events-none mvx:select-none mvx:text-base mvx:text-clip trim-right" style="font-size: 1rem;">
              q...
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it('handles empty name string', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAccountName address="erd1q..." name="" description="" />,
    });

    expect(page.root).toEqualHtml(`
      <div class="mvx:flex mvx:max-w-full mvx:overflow-hidden mvx:relative mvx:truncate mvx:w-max mvx:whitespace-nowrap transaction-account-name trim" data-testid="${DataTestIdsEnum.trim}">
        <div class="mvx:!text-inherit mvx:absolute mvx:leading-5 mvx:relative mvx:text-transparent trim-full trim-full-visible" data-testid="${DataTestIdsEnum.trimFullAddress}">
          erd1q...
        </div>
        <div class="mvx:hidden trim-wrapper">
          <div class="mvx:flex-shrink mvx:overflow-hidden mvx:text-[1px] mvx:text-ellipsis mvx:text-left trim-left-wrapper">
            <div class="mvx:-webkit-letter-spacing mvx:inline mvx:leading-5 mvx:pointer-events-none mvx:select-none mvx:text-base trim-left" style="font-size: 1rem;">
              erd1
            </div>
          </div>
          <div class="mvx:block mvx:flex-shrink-0 mvx:pointer-events-none mvx:select-none trim-ellipsis-wrapper">
            <div class="mvx:block mvx:leading-5 trim-ellipsis">
              ...
            </div>
          </div>
          <div class="mvx:flex-shrink mvx:overflow-hidden mvx:text-[1px] mvx:text-ellipsis mvx:text-right mvx:whitespace-nowrap trim-right-wrapper" style="direction: rtl;">
            <div class="mvx:-webkit-letter-spacing mvx:inline mvx:leading-5 mvx:pointer-events-none mvx:select-none mvx:text-base mvx:text-clip trim-right" style="font-size: 1rem;">
              q...
            </div>
          </div>
        </div>
      </div>
    `);
  });

  it('applies correct class names', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAccountName address="erd1q..." name="Bob" class="custom-class" description="" />,
    });

    expect(page.root).toEqualHtml(`
      <div class="custom-class transaction-account-name mvx:w-max mvx:truncate" title="">
        Bob
      </div>
    `);
  });

  it('handles missing dataTestId', async () => {
    const page = await newSpecPage({
      components: [],
      template: () => <TransactionAccountName address="erd1q..." name="Charlie" description="" />,
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account-name mvx:w-max mvx:truncate" title="">
        Charlie
      </div>
    `);
  });

  it('uses description as title when name exists', async () => {
    const page = await newSpecPage({
      components: [TransactionAccountName],
      template: () => <TransactionAccountName address="erd1q..." name="Dave" description="Dave's Savings" />,
    });

    expect(page.root).toEqualHtml(`
      <div class="transaction-account-name mvx:w-max mvx:truncate" title="Dave's Savings">
        Dave
      </div>
    `);
  });
});
