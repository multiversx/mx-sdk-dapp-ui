import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Method, State } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import { SidePanelTypeEnum } from '../../visual/side-panel/side-panel.types';
import type { ITransactionListItem } from '../../visual/transaction-list-item/transaction-list-item.types';
import type { ITransactionToast } from '../toasts-list/components/transaction-toast/transaction-toast.type';
import { NotificationsFeedEventsEnum } from './notifications-feed.types';

@Component({
  tag: 'notifications-feed',
  styleUrl: 'notifications-feed.scss',
  shadow: true,
})
export class NotificationsFeed {
  @State() isOpen: boolean = false;
  @State() processingTransactions: ITransactionToast[] = [];
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
    this.eventBus.unsubscribe(NotificationsFeedEventsEnum.PENDING_TRANSACTIONS_UPDATE, this.processingTransactionsUpdate.bind(this));
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
    const hasActivity = this.transactionsHistory && this.transactionsHistory.length > 0;
    const hasProcessing = this.processingTransactions && this.processingTransactions.length > 0;

    return (
      <side-panel
        isOpen={this.isOpen}
        side={SidePanelTypeEnum.RIGHT}
        onClose={this.handleClose}
      >
        <div class="panel-header">
          <h2 class="panel-title">Notifications Feed</h2>
          <button class="close-button" onClick={this.handleClose}>
            <fa-icon icon={faTimes}></fa-icon>
          </button>
        </div>

        <div class="notifications-info">
          This feed is stored in your browser and will be reset when a new session is started.
          <fa-icon class="info-icon" icon={faInfoCircle}></fa-icon>
        </div>

        <div class="notifications-container">
          {hasProcessing && (
            <div>
              <div class="processing-status">Processing...</div>
              {this.processingTransactions?.map(toast => <transaction-toast {...toast}></transaction-toast>)}
            </div>
          )}
        </div>

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
              this.transactionsHistory.map(transaction => <transaction-list-item transaction={transaction} />)
            ) : (
              <div class="no-activity">No activity to show</div>
            )}
          </div>
        </div>
      </side-panel>
    );
  }

  private processingTransactionsUpdate(payload: ITransactionToast[]) {
    this.processingTransactions = [...payload];
  }

  private transactionsHistoryUpdate(payload: ITransactionListItem[]) {
    this.transactionsHistory = [...payload];
  }

  componentDidLoad() {
    this.eventBus.subscribe(NotificationsFeedEventsEnum.PENDING_TRANSACTIONS_UPDATE, this.processingTransactionsUpdate.bind(this));
    this.eventBus.subscribe(NotificationsFeedEventsEnum.TRANSACTIONS_HISTORY_UPDATE, this.transactionsHistoryUpdate.bind(this));
    this.eventBus.subscribe(NotificationsFeedEventsEnum.OPEN_NOTIFICATIONS_FEED, this.handleViewAll.bind(this));
  }
}
