// transaction-direction-badge.tsx
import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'transaction-direction-badge',
  styleUrl: 'transaction-direction-badge.css',
  shadow: true,
})
export class TransactionDirectionBadge {
  @Prop() class?: string;
  @Prop() direction: string;

  render() {
    return (
      <div class={classNames(this.class, 'transaction-direction-badge')}>
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
