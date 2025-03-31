import { newSpecPage } from '@stencil/core/testing';

import { TransactionDirectionBadge } from '../transaction-direction-badge';

describe('TransactionDirectionBadge', () => {
  it('renders with "in" direction', async () => {
    const page = await newSpecPage({
      components: [TransactionDirectionBadge],
      html: '<mvx-transaction-direction-badge direction="in"></mvx-transaction-direction-badge>',
    });
    expect(page.root).toEqualHtml(`
      <mvx-transaction-direction-badge direction="in">
          <div class="transaction-direction-badge">
            <span class="directionBadge in">
              IN
            </span>
          </div>
      </mvx-transaction-direction-badge>
    `);
  });

  it('renders with "out" direction', async () => {
    const page = await newSpecPage({
      components: [TransactionDirectionBadge],
      html: '<mvx-transaction-direction-badge direction="out"></mvx-transaction-direction-badge>',
    });
    expect(page.root).toEqualHtml(`
      <mvx-transaction-direction-badge direction="out">
          <div class="transaction-direction-badge">
            <span class="directionBadge out">
              OUT
            </span>
          </div>
      </mvx-transaction-direction-badge>
    `);
  });

  it('renders with custom direction', async () => {
    const page = await newSpecPage({
      components: [TransactionDirectionBadge],
      html: '<mvx-transaction-direction-badge direction="custom"></mvx-transaction-direction-badge>',
    });
    expect(page.root).toEqualHtml(`
      <mvx-transaction-direction-badge direction="custom">
          <div class="transaction-direction-badge">
            <span class="directionBadge custom">
              CUSTOM
            </span>
          </div>
      </mvx-transaction-direction-badge>
    `);
  });
});
