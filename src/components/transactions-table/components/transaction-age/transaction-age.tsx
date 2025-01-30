import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'transaction-age',
  shadow: true,
})
export class TransactionAge {
  @Prop() age: string;
  @Prop() class?: string = 'transaction-age';
  @Prop() tooltip?: string;

  render() {
    const component = this.tooltip ? (
      <span title={this.tooltip} data-testid={DataTestIdsEnum.transactionAge} class={this.class}>
        {this.age}
      </span>
    ) : (
      <span data-testid={DataTestIdsEnum.transactionAge} class={this.class}>
        {this.age}
      </span>
    );

    return <span>{component}</span>;
  }
}
