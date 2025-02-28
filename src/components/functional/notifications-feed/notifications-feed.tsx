import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Method, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { ITransactionListItem } from '../../visual/transaction-list-item/transaction-list-item.types';
import type { ITransactionToast } from '../toasts-list/components/transaction-toast/transaction-toast.type';
import { NotificationsFeedEventsEnum } from './notifications-feed.types';

@Component({
  tag: 'notifications-feed',
  styleUrl: 'notifications-feed.scss',
  shadow: true,
})
export class NotificationsFeed {
  @State() open: boolean = false;
  @State() processingTransactions: ITransactionToast[] = [];
  @State() transactionsHistory: ITransactionListItem[] = [];
  @State() isVisible: boolean = false;
  @State() shouldAnimate: boolean = false;

  private eventBus: IEventBus = new EventBus();
  private closeTimeout: NodeJS.Timeout | null = null;
  private closeEventTimeout: NodeJS.Timeout | null = null;
  private readonly ANIMATION_DURATION = 300; // Duration in ms

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      // Opening
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
      if (this.closeEventTimeout) {
        clearTimeout(this.closeEventTimeout);
        this.closeEventTimeout = null;
      }
      this.isVisible = true;
      // Delay animation to next frame to ensure DOM is ready
      requestAnimationFrame(() => {
        this.shouldAnimate = true;
      });
    } else {
      // Closing
      this.shouldAnimate = false;
      // Wait for animation to complete before hiding
      this.closeTimeout = setTimeout(() => {
        this.isVisible = false;
      }, this.ANIMATION_DURATION);
    }
  }

  disconnectedCallback() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    if (this.closeEventTimeout) {
      clearTimeout(this.closeEventTimeout);
      this.closeEventTimeout = null;
    }
  }

  @Method()
  async getEventBus() {
    return this.eventBus;
  }

  handleClose = () => {
    this.open = false;
    // Wait for animation to complete before publishing close event
    this.closeEventTimeout = setTimeout(() => {
      this.eventBus.publish(NotificationsFeedEventsEnum.CLOSE_NOTIFICATIONS_FEED);
    }, this.ANIMATION_DURATION);
  };

  handleClear = () => {
    this.eventBus.publish(NotificationsFeedEventsEnum.CLEAR_NOTIFICATIONS_FEED_HISTORY);
  };

  handleViewAll = () => {
    this.open = true;
  };

  handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      this.handleClose();
    }
  };

  render() {
    if (!this.isVisible) {
      return null;
    }

    const hasActivity = this.transactionsHistory && this.transactionsHistory.length > 0;
    const hasProcessing = this.processingTransactions && this.processingTransactions.length > 0;

    return (
      <div
        class={{
          overlay: true,
          visible: this.shouldAnimate,
          hidden: !this.shouldAnimate,
        }}
        onClick={this.handleOverlayClick}
      >
        <div class="panel">
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
                this.transactionsHistory.map(transaction => (
                  <transaction-list-item key={transaction.hash} transaction={transaction} />
                ))
              ) : (
                <div class="no-activity">No activity to show</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private processingTransactionsUpdate(payload: ITransactionToast[]) {
    console.log('processingTransactionsUpdate', payload);
    this.processingTransactions = [...payload];
  }

  private transactionsHistoryUpdate(payload: ITransactionListItem[]) {
    console.log('transactionsHistoryUpdate', payload);
    this.transactionsHistory = [...payload];
  }

  componentDidLoad() {
    this.eventBus.subscribe(NotificationsFeedEventsEnum.PROCESSING_TRANSACTIONS_UPDATE, this.processingTransactionsUpdate.bind(this));
    this.eventBus.subscribe(NotificationsFeedEventsEnum.TRANSACTIONS_HISTORY_UPDATE, this.transactionsHistoryUpdate.bind(this));
    this.eventBus.subscribe(NotificationsFeedEventsEnum.OPEN_NOTIFICATIONS_FEED, this.handleViewAll.bind(this));
  }
}
