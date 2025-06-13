import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop } from '@stencil/core';

import { handleAmountResize } from '../../helpers';

@Component({
  tag: 'mvx-sign-transactions-overview',
  styleUrl: 'sign-transactions-overview.scss',
  shadow: true,
})
export class SignTransactionsOverview {
  @Prop() identifier: string;
  @Prop() usdValue: string;
  @Prop() amount: string;
  @Prop() tokenIconUrl: string;
  @Prop() interactor: string;
  @Prop() interactorIconUrl: string;
  @Prop() action: string;
  @Prop() networkFee: string = '~$0.00078';
  @Prop() isApp: boolean = false;

  private amountValueRef: HTMLElement;

  componentDidRender() {
    if (this.amountValueRef) {
      requestAnimationFrame(() => handleAmountResize(this.amountValueRef));
    }
  }

  render() {
    return (
      <div class="overview-container">
        <div class="overview-content">
          <div class="detail-row amount-row">
            <div class="detail-label">{this.isApp ? 'Amount' : 'Send'}</div>
            <div class="amount-display">
              <div class="amount-value-container">
                <div class="amount-value" ref={el => (this.amountValueRef = el)}>
                  <span>
                    {this.amount} {this.identifier}
                  </span>
                </div>
                {this.identifier !== 'USD' && <div class="usd-value">{this.usdValue}</div>}
              </div>
              {this.tokenIconUrl && (
                <div class="token-icon">
                  <img src={this.tokenIconUrl} alt={this.identifier} />
                </div>
              )}
            </div>
          </div>

          <div class="direction-indicator">
            <div class="direction-icon">
              {this.isApp && <mvx-fa-icon icon={faChevronUp} class="direction-arrow" />}
              <span class="ellipse" />
              <span class="ellipse" />
              {!this.isApp && <mvx-fa-icon icon={faChevronDown} class="direction-arrow" />}
            </div>
          </div>

          <div class="detail-row interactor-row">
            <div class="detail-label">{this.isApp ? 'App' : 'To'}</div>
            <div class="interactor-info">
              {this.interactorIconUrl && (
                <div class="interactor-icon">
                  <img src={this.interactorIconUrl} alt={this.interactor} />
                </div>
              )}
              {this.interactor && <mvx-trim class="interactor-name" text={this.interactor}></mvx-trim>}
            </div>
          </div>

          {this.isApp && (
            <div class="detail-row action-row">
              <div class="detail-label">Action</div>
              <div class="action-value">{this.action}</div>
            </div>
          )}
        </div>

        <div class="fee-container">
          <div class="fee-row">
            <div class="fee-label-container">
              <span class="fee-label">Network Fee</span>
              <div class="info-icon"></div>
            </div>
            <div class="fee-value">{this.networkFee}</div>
          </div>
        </div>
      </div>
    );
  }
}
