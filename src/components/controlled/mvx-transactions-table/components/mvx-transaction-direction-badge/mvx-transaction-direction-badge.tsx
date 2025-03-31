import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'mvx-transaction-direction-badge',
  styleUrl: 'mvx-transaction-direction-badge.css',
})
export class MvxTransactionDirectionBadge {
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
