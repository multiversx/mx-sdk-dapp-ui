import { Component, h, Prop } from '@stencil/core';

// prettier-ignore
const styles = {
  transactionDirectionBadge: 'transaction-direction-badge mvx:flex'
} satisfies Record<string, string>;

@Component({
  tag: 'mvx-transaction-direction-badge',
  styleUrl: 'transaction-direction-badge.scss',
})
export class TransactionDirectionBadge {
  @Prop() class?: string;
  @Prop() direction: string;

  render() {
    return (
      <div class={{ [this.class]: Boolean(this.class), [styles.transactionDirectionBadge]: true }}>
        <span
          class={{
            directionBadge: true,
            [this.direction.toLowerCase()]: true,
          }}
        >
          {this.direction.toUpperCase()}
        </span>
      </div>
    );
  }
}
