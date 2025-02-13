import { newSpecPage } from '@stencil/core/testing';

import { TransactionDirectionBadge } from '../transaction-direction-badge';

describe('TransactionDirectionBadge', () => {
  it('renders with "in" direction', async () => {
    const page = await newSpecPage({
      components: [TransactionDirectionBadge],
      html: '<transaction-direction-badge direction="in"></transaction-direction-badge>',
    });
    expect(page.root).toEqualHtml(`
      <transaction-direction-badge direction="in">
        <mock:shadow-root>
          <div class="transaction-direction-badge">
            <span class="directionBadge in">
              IN
            </span>
          </div>
        </mock:shadow-root>
      </transaction-direction-badge>
    `);
  });

  it('renders with "out" direction', async () => {
    const page = await newSpecPage({
      components: [TransactionDirectionBadge],
      html: '<transaction-direction-badge direction="out"></transaction-direction-badge>',
    });
    expect(page.root).toEqualHtml(`
      <transaction-direction-badge direction="out">
        <mock:shadow-root>
          <div class="transaction-direction-badge">
            <span class="directionBadge out">
              OUT
            </span>
          </div>
        </mock:shadow-root>
      </transaction-direction-badge>
    `);
  });

  it('renders with custom direction', async () => {
    const page = await newSpecPage({
      components: [TransactionDirectionBadge],
      html: '<transaction-direction-badge direction="custom"></transaction-direction-badge>',
    });
    expect(page.root).toEqualHtml(`
      <transaction-direction-badge direction="custom">
        <mock:shadow-root>
          <div class="transaction-direction-badge">
            <span class="directionBadge custom">
              CUSTOM
            </span>
          </div>
        </mock:shadow-root>
      </transaction-direction-badge>
    `);
  });
});
