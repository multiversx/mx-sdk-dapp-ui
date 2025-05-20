import { Component, h, Method, State } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { ITransactionListItem } from '../../visual/transaction-list-item/transaction-list-item.types';
import type { ITransactionToast } from '../toasts-list/components/transaction-toast/transaction-toast.type';
import { NotificationsFeedEventsEnum } from './notifications-feed.types';

@Component({
  tag: 'mvx-notifications-feed',
  styleUrl: 'notifications-feed.scss',
})
export class NotificationsFeed {
  @State() isOpen: boolean = false;
  @State() pendingTransactions: ITransactionToast[] = [];
  @State() transactionsHistory: ITransactionListItem[] = [];

  private eventBus: IEventBus = new EventBus();
  private closeEventTimeout: NodeJS.Timeout | null = null;

  private clearTimeouts() {
    if (this.closeEventTimeout) {
      clearTimeout(this.closeEventTimeout);
      this.closeEventTimeout = null;
    }
  }

  disconnectedCallback() {
    this.clearTimeouts();
    this.eventBus.unsubscribe(NotificationsFeedEventsEnum.PENDING_TRANSACTIONS_UPDATE, this.pendingTransactionsUpdate.bind(this));
    this.eventBus.unsubscribe(NotificationsFeedEventsEnum.TRANSACTIONS_HISTORY_UPDATE, this.transactionsHistoryUpdate.bind(this));
    this.eventBus.unsubscribe(NotificationsFeedEventsEnum.OPEN_NOTIFICATIONS_FEED, this.handleViewAll.bind(this));
  }

  @Method()
  async getEventBus() {
    return this.eventBus;
  }

  handleClose = () => {
    this.isOpen = false;
    this.eventBus.publish(NotificationsFeedEventsEnum.CLOSE_NOTIFICATIONS_FEED);
  };

  handleClear = () => {
    this.eventBus.publish(NotificationsFeedEventsEnum.CLEAR_NOTIFICATIONS_FEED_HISTORY);
  };

  handleViewAll = () => {
    this.isOpen = true;
  };

  render() {
    const hasActivity = this.transactionsHistory?.length > 0;
    const hasPending = this.pendingTransactions?.length > 0;

    return (
      <mvx-side-panel isOpen={this.isOpen} panelTitle="Notifications Feed" onClose={this.handleClose}>
        <div class="feed-content">
          <div class="notifications-info">
            This feed is stored in your browser and will be reset when a new session is started.
            <mvx-circle-exclamation-icon class="info-icon" />
          </div>

          {hasPending && (
            <div class="notifications-container">
              <div class="processing-status">Processing...</div>
              {this.pendingTransactions?.map(toast => <mvx-transaction-toast fullWidth={true} {...toast} />)}
            </div>
          )}

          <div class="activity-section">
            <div class="activity-header">
              <h3 class="activity-title">Activity</h3>
              {hasActivity && (
                <button class="clear-button" onClick={this.handleClear}>
                  Clear
                </button>
              )}
            </div>

            <div class="activity-list">
              {hasActivity ? (
                this.transactionsHistory.map(transaction => <mvx-transaction-list-item transaction={transaction} />)
              ) : (
                <div class="no-activity">No activity to show</div>
              )}
            </div>
          </div>
        </div>
      </mvx-side-panel>
    );
  }

  private pendingTransactionsUpdate(payload: ITransactionToast[]) {
    this.pendingTransactions = [...payload];
  }

  private transactionsHistoryUpdate(payload: ITransactionListItem[]) {
    this.transactionsHistory = [...payload];
  }

  componentDidLoad() {
    this.eventBus.subscribe(NotificationsFeedEventsEnum.PENDING_TRANSACTIONS_UPDATE, this.pendingTransactionsUpdate.bind(this));
    this.eventBus.subscribe(NotificationsFeedEventsEnum.TRANSACTIONS_HISTORY_UPDATE, this.transactionsHistoryUpdate.bind(this));
    this.eventBus.subscribe(NotificationsFeedEventsEnum.OPEN_NOTIFICATIONS_FEED, this.handleViewAll.bind(this));
  }
}
