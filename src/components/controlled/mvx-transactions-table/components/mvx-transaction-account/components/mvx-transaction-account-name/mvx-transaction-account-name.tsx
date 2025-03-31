import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'mvx-transaction-account-name',
  styleUrl: 'mvx-transaction-account-name.css',
})
export class MvxTransactionAccountName {
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

    return <trim-text text={this.address} class={classNames(this.class, 'transaction-account-name')} dataTestId={this.dataTestId}></trim-text>;
  }
}
