import { Component, Prop, h } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'transaction-account-name',
  styleUrl: 'transaction-account-name.css',
  shadow: true,
})
export class TransactionAccountName {
  @Prop() address: string;
  @Prop() class?: string;
  @Prop() dataTestId?: string;
  @Prop() description: string;
  @Prop() name?: string;

  render() {
    if (this.name) {
      return (
        <div class={classNames('text-truncate', this.class, 'transaction-account-name')} data-testid={this.dataTestId} title={this.description}>
          {this.name}
        </div>
      );
    }

    return (
      <div class={classNames('trim', this.class, 'transaction-account-name')} data-testid={this.dataTestId}>
        {this.address}
      </div>
    );
  }
}
