import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'mvx-transaction-age',
  styleUrl: 'transaction-age.scss',
})
export class TransactionAge {
  @Prop() age: string;
  @Prop() class?: string;
  @Prop() tooltip?: string;

  render() {
    const component = this.tooltip ? (
      <div
        title={this.tooltip}
        data-testid={DataTestIdsEnum.transactionAge}
        class={{ 'transaction-age': true, [this.class]: Boolean(this.class) }}
      >
        {this.age}
      </div>
    ) : (
      <div
        data-testid={DataTestIdsEnum.transactionAge}
        class={{ 'transaction-age': true, [this.class]: Boolean(this.class) }}
      >
        {this.age}
      </div>
    );

    return <div class={classNames(this.class, 'transaction-age')}>{component}</div>;
  }
}
