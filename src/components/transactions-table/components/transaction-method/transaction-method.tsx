import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'transaction-method',
  styleUrl: 'transaction-method.css',
  shadow: true,
})
export class TransactionMethod {
  @Prop() transactionActionDescription: string;
  @Prop() transactionMethod: string;

  render() {
    return (
      <div>
        <span title={this.transactionActionDescription} class="badge badge-secondary badge-pill font-weight-light p-0" data-testid={DataTestIdsEnum.transactionMethod}>
          <div class="badge badge-secondary badge-pill">
            <div class="text-truncate text-capitalize text-white p-1">{this.transactionMethod}</div>
          </div>
        </span>
      </div>
    );
  }
}
