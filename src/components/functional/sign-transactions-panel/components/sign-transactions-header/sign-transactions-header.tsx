import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop } from '@stencil/core';
import classNames from 'classnames';

const signTransactionsHeaderClasses: Record<string, string> = {
  pagerIcon: 'mvx:w-auto! mvx:h-5!',
};

@Component({
  tag: 'mvx-sign-transactions-header',
  styleUrl: 'sign-transactions-header.scss',
  shadow: true,
})
export class SignTransactionsHeader {
  @Event({ composed: false, bubbles: false }) nextClick: EventEmitter;
  @Event({ composed: false, bubbles: false }) backClick: EventEmitter;

  @Prop() transactionsCount: number = 1;
  @Prop() currentIndex: number = 0;
  @Prop() origin: string = '';

  render() {
    return (
      <div class="sign-transactions-header">
        {this.transactionsCount > 1 && (
          <div class="sign-transactions-header-pager">
            <mvx-angle-left-icon
              onClick={this.backClick.emit}
              class={classNames('sign-transactions-header-pager-icon', {
                [signTransactionsHeaderClasses.pagerIcon]: true,
                disabled: this.currentIndex === 0,
              })}
            />

            <div class="sign-transactions-header-pager-text">
              <div class="sign-transactions-header-pager-text-label">Transaction</div>
              <div class={{ 'sign-transactions-header-pager-text-value': true, 'large': this.transactionsCount >= 10 }}>
                {this.currentIndex + 1}
              </div>

              <div class="sign-transactions-header-pager-text-label">of</div>
              <div class={{ 'sign-transactions-header-pager-text-value': true, 'large': this.transactionsCount >= 10 }}>
                {this.transactionsCount}
              </div>
            </div>

            <mvx-angle-right-icon
              onClick={this.nextClick.emit}
              class={classNames('sign-transactions-header-pager-icon', {
                disabled: this.currentIndex + 1 === this.transactionsCount,
                [signTransactionsHeaderClasses.pagerIcon]: true,
              })}
            />
          </div>
        )}

        <div class={{ 'sign-transactions-header-origin': true, 'centered': this.transactionsCount <= 1 }}>
          <div class="sign-transactions-header-origin-label">Request from</div>

          <div class="sign-transactions-header-origin-image">
            <img class="sign-transactions-header-origin-image-icon" src={`${origin}/favicon.ico`} alt="favicon" />
          </div>

          <span class="sign-transactions-header-origin-name">{origin}</span>
        </div>
      </div>
    );
  }
}
