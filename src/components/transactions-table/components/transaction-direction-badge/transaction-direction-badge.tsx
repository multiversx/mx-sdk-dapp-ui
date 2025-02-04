// transaction-direction-badge.tsx
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'transaction-direction-badge',
  styleUrl: 'transaction-direction-badge.css',
  shadow: true,
})
export class TransactionDirectionBadge {
  @Prop() class?: string = 'transaction-direction-badge';
  @Prop() direction: string;

  render() {
    return (
      <div class={this.class}>
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
