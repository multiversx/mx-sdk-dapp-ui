import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import classNames from 'classnames';

@Component({
  tag: 'transaction-age',
  styleUrl: 'transaction-age.css',
  shadow: true,
})
export class TransactionAge {
  @Prop() age: string;
  @Prop() class?: string;
  @Prop() tooltip?: string;

  render() {
    const component = this.tooltip ? (
      <div class={classNames(this.class, 'transaction-age')} title={this.tooltip} data-testid={DataTestIdsEnum.transactionAge}>
        {this.age}
      </div>
    ) : (
      <div class={classNames(this.class, 'transaction-age')} data-testid={DataTestIdsEnum.transactionAge}>
        {this.age}
      </div>
    );

    return <div class={classNames(this.class, 'transaction-age')}>{component}</div>;
  }
}
