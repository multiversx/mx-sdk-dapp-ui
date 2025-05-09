import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'mvx-sign-transactions-overview',
  styleUrl: 'sign-transactions-overview.css',
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

  render() {
    return (
      <div class="overview-container">
        <div class="overview-content">
          <div class="detail-row amount-row">
            <div class="detail-label">{this.isApp ? 'Amount' : 'Send'}</div>
            <div class="amount-display">
              <div class="amount-value-container">
                <div class="amount-value">
                  {this.amount} {this.identifier}
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
            <mvx-fa-icon icon={this.isApp ? faArrowUp : faArrowDown} class="direction-arrow"></mvx-fa-icon>
          </div>

          <div class="detail-row interactor-row">
            <div class="detail-label">{this.isApp ? 'App' : 'To'}</div>
            <div class="interactor-info">
              {this.interactorIconUrl && (
                <div class="interactor-icon">
                  <img src={this.interactorIconUrl} alt={this.interactor} />
                </div>
              )}
              <mvx-trim-text class="interactor-name" text={this.interactor}></mvx-trim-text>
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
