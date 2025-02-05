import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import classNames from 'classnames';

@Component({
  tag: 'transaction-method',
  styleUrl: 'transaction-method.css',
  shadow: true,
})
export class TransactionMethod {
  @Prop() class?: string;
  @Prop() actionDescription: string;
  @Prop() method: string;

  render() {
    return (
      <span
        class={classNames('badge badge-secondary badge-pill font-weight-light transaction-method', this.class)}
        data-testid={DataTestIdsEnum.method}
        title={this.actionDescription}
      >
        <div class="badge badge-secondary badge-pill">
          <div class="text-truncate text-capitalize text-white">{this.method}</div>
        </div>
      </span>
    );
  }
}
