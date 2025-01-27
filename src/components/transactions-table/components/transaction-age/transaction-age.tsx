import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'transaction-age',
  styleUrl: 'transaction-age.css',
  shadow: true,
})
export class TransactionAge {
  @Prop() age: string;
  @Prop() tooltip?: string;

  render() {
    const component = this.tooltip ? (
      <span title={this.tooltip} data-testid={DataTestIdsEnum.transactionAge}>
        {this.age}
      </span>
    ) : (
      <span data-testid={DataTestIdsEnum.transactionAge}>{this.age}</span>
    );

    return <span>{component}</span>;
  }
}
