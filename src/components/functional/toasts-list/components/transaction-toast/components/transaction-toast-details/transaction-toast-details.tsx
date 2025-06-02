import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import type { JSX } from '@stencil/core';
import { Component, h, Prop, State } from '@stencil/core';
import type { ITransactionListItem } from 'components/visual/transaction-list-item/transaction-list-item.types';

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

  render() {
    if (this.transactions == null) {
      return null;
    }

    const hasMoreTransactionsToShow = this.transactions.length > this.maxShownTransactions;
    const hiddenTransactionsCount = this.transactions.length - this.maxShownTransactions;
    const visibleTransactions = this.showAllTransactions
      ? this.transactions
      : this.transactions.slice(0, this.maxShownTransactions);

    return (
      <div class="transaction-details-container">
        <div class="transaction-details-status" onClick={this.toggleExpand.bind(this)}>
          <mvx-fa-icon
            icon={faChevronDown}
            class={`transaction-details-status-icon ${this.isExpanded ? 'rotate-up' : ''}`}
          ></mvx-fa-icon>
          <span class="transaction-details-status-text">{this.processedTransactionsStatus}</span>
        </div>

        <div
          class={{
            'transaction-details-list': true,
            'expanded': this.isExpanded,
          }}
        >
          {visibleTransactions.map(({ hash, status, link }, index) => (
            <mvx-transaction-toast-details-body
              transactionClass={this.transactionClass}
              hash={hash}
              status={status}
              link={link}
              index={`#${index + 1}`}
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
