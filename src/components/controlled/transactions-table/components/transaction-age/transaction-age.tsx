import { Component, h, Prop } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

// prettier-ignore
const styles = {
  transactionAge: 'transaction-age mvx:w-max'
} satisfies Record<string, string>;

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
        class={{ [styles.transactionAge]: true, [this.class]: Boolean(this.class) }}
      >
        {this.age}
      </div>
    ) : (
      <div
        data-testid={DataTestIdsEnum.transactionAge}
        class={{ [styles.transactionAge]: true, [this.class]: Boolean(this.class) }}
      >
        {this.age}
      </div>
    );

    return <div class={classNames(this.class, [styles.transactionAge])}>{component}</div>;
  }
}
