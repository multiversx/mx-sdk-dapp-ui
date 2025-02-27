import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import type { EventEmitter } from '@stencil/core';
import { Component, Event, forceUpdate, h, Method, Prop, State, Watch } from '@stencil/core';
import type { IEventBus } from 'utils/EventBus';
import { EventBus } from 'utils/EventBus';

import type { ITransactionListItem } from '../../visual/transaction-list-item/transaction-list-item.types';
import type { ITransactionToast } from '../toasts-list/components/transaction-toast/transaction-toast.type';
import { ToastEventsEnum } from '../toasts-list/toast-list.types';
import { NotificationFeedEventsEnum } from './notifications-feed.types';

@Component({
  tag: 'notifications-feed',
  styleUrl: 'notifications-feed.scss',
  shadow: true,
})
export class NotificationsFeed {
  @Prop() open: boolean = false;
  @Prop() transactionToasts: ITransactionToast[];
  @Prop() transactionsHistory: ITransactionListItem[] = [];

  @Event() close: EventEmitter;

  @State() isVisible: boolean = false;
  @State() shouldAnimate: boolean = false;

  private eventBus: IEventBus = new EventBus();
  private closeTimeout: NodeJS.Timeout | null = null;

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
      }
      this.isVisible = true;

      // Delay animation to allow rendering first
      return requestAnimationFrame(() => {
        this.shouldAnimate = true;
      });
    }

    this.shouldAnimate = false;
    this.closeTimeout = setTimeout(() => {
      this.isVisible = false;
    }, 300); // Delay unmounting after animation
  }

  disconnectedCallback() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

  @Method()
  async getEventBus() {
    return this.eventBus;
  }

  handleClose = () => {
    this.close.emit();
    this.eventBus.publish(NotificationFeedEventsEnum.CLOSE);
  };

  handleClear = () => {
    this.eventBus.publish(NotificationFeedEventsEnum.CLEAR);
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

    return (
      <div
        class={{
          overlay: true,
          visible: this.shouldAnimate,
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
            {/* Processing Status */}
            <div class="processing-status">Processing...</div>

            {/* Toast List */}
            <toast-list transactionToasts={this.transactionToasts}></toast-list>
          </div>

          {/* Activity Section */}
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
              {this.transactionsHistory.map(transaction => (
                <transaction-list-item key={transaction.hash} transaction={transaction} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private transactionToastUpdate(payload: ITransactionToast[]) {
    this.transactionToasts = [...payload];
    forceUpdate(this);
  }

  private transactionsHistoryUpdate(payload: ITransactionListItem[]) {
    this.transactionsHistory = [...payload];
    forceUpdate(this);
  }

  componentDidLoad() {
    this.eventBus.subscribe(ToastEventsEnum.TRANSACTION_TOAST_DATA_UPDATE, this.transactionToastUpdate.bind(this));
    this.eventBus.subscribe(NotificationFeedEventsEnum.TRANSACTIONS_HISTORY_UPDATE, this.transactionsHistoryUpdate.bind(this));
  }
}
