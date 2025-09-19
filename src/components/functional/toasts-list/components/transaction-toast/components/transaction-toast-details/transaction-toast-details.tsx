import type { JSX } from '@stencil/core';
import { Component, h, Prop, State } from '@stencil/core';
import classNames from 'classnames';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

@Component({
  tag: 'mvx-transaction-toast-details',
  styleUrl: 'transaction-toast-details.scss',
})
export class TransactionToastDetails {
  @Prop() processedTransactionsStatus?: string | JSX.Element;
  @Prop() transactions?: ITransactionListItem[];
  @Prop() transactionClass: string;
  @Prop() maxShownTransactions: number = 5;
  @State() isExpanded: boolean = false;
  @State() showAllTransactions: boolean = false;

  private toggleExpand() {
    this.isExpanded = !this.isExpanded;
    // Reset showAllTransactions when collapsing
    if (!this.isExpanded) {
      this.showAllTransactions = false;
    }
  }

  private showMoreTransactions() {
    this.showAllTransactions = true;
  }

  private initialTransactionsOrder = new Map<string, number>();

  private getOrderedTransactions(transactions: ITransactionListItem[]) {
    transactions.forEach((transaction, index) => {
      if (!this.initialTransactionsOrder.has(transaction.hash)) {
        this.initialTransactionsOrder.set(transaction.hash, index + 1);
      }
    });

    return [...transactions].sort(
      (a, b) => this.initialTransactionsOrder.get(a.hash) - this.initialTransactionsOrder.get(b.hash),
    );
  }

  render() {
    if (this.transactions == null) {
      return null;
    }

    const hasMoreTransactionsToShow = this.transactions.length > this.maxShownTransactions;
    const hiddenTransactionsCount = this.transactions.length - this.maxShownTransactions;
    const orderedTransactions = this.getOrderedTransactions(this.transactions);
    const visibleTransactions = this.showAllTransactions
      ? orderedTransactions
      : orderedTransactions.slice(0, this.maxShownTransactions);

    return (
      <div class="transaction-details-container">
        <div class="transaction-details-status" onClick={this.toggleExpand.bind(this)}>
          <mvx-icon
            name="single-angle-down"
            class={classNames('transaction-details-status-icon', {
              rotated: this.isExpanded,
            })}
          />

          <span data-testid={DataTestIdsEnum.transactionDetailsStatus} class="transaction-details-status-text">
            {this.processedTransactionsStatus}
          </span>
        </div>

        <div
          class={{
            'transaction-details-list': true,
            'expanded': this.isExpanded,
          }}
        >
          {visibleTransactions.map(({ hash, status, link }) => (
            <mvx-transaction-toast-details-body
              transactionClass={this.transactionClass}
              hash={hash}
              status={status}
              link={link}
              index={`#${this.initialTransactionsOrder.get(hash)}`}
              key={hash}
            />
          ))}

          {hasMoreTransactionsToShow && !this.showAllTransactions && (
            <div class="view-all-container">
              <button type="button" class="show-more-button" onClick={this.showMoreTransactions.bind(this)}>
                View {hiddenTransactionsCount} more
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
