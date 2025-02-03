import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import classNames from 'classnames';

@Component({
  tag: 'transaction-method',
  shadow: true,
})
export class TransactionMethod {
  @Prop() class?: string = 'transaction-method';
  @Prop() actionDescription: string;
  @Prop() method: string;

  render() {
    return (
      <span class={classNames('badge badge-secondary badge-pill font-weight-light p-0', this.class)} data-testid={DataTestIdsEnum.method} title={this.actionDescription}>
        <div class="badge badge-secondary badge-pill">
          <div class="text-truncate text-capitalize text-white p-1">{this.method}</div>
        </div>
      </span>
    );
  }
}
