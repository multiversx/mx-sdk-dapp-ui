import { Component, Prop, h } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'transaction-account-name',
  styleUrl: 'transaction-account-name.css',
  shadow: true,
})
export class TransactionAccountName {
  @Prop() class?: string = 'transaction-account-name';
  @Prop() dataTestId?: string;
  @Prop() description: string;
  @Prop() name: string;

  render() {
    if (this.name) {
      return (
        <span class={classNames('text-truncate', this.class)} data-testid={this.dataTestId} title={this.description}>
          {this.name}
        </span>
      );
    }

    return <span class="trim">{this.description}</span>;
  }
}
