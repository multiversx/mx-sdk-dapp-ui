import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

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
      <div class={classNames(this.class, styles.transactionDirectionBadge)}>
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
