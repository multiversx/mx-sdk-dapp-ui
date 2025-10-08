import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';

// prettier-ignore
const styles = {
  transactionAccountName: 'transaction-account-name mvx:w-max'
} satisfies Record<string, string>;
@Component({
  tag: 'mvx-transaction-account-name',
  styleUrl: 'transaction-account-name.scss',
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
        <div
          class={classNames('text-truncate', this.class, styles.transactionAccountName)}
          data-testid={this.dataTestId}
          title={this.description}
        >
          {this.name}
        </div>
      );
    }

    return (
      <mvx-trim
        text={this.address}
        class={classNames(this.class, styles.transactionAccountName)}
        dataTestId={this.dataTestId}
      />
    );
  }
}
