import { Component, h, Prop } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

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
      <div class="overview-container" data-testid={DataTestIdsEnum.signTransactionsOverview}>
        <div class="overview-content">
          <div class="detail-row amount-row" data-testid={DataTestIdsEnum.signTransactionsOverviewAmountRow}>
            <div class="detail-label">{this.isApp ? 'Amount' : 'Send'}</div>
            <div class="amount-display">
              <div class="amount-value-container">
                <div
                  class="amount-value"
                  data-testid={DataTestIdsEnum.signTransactionsOverviewAmountValue}
                  ref={el => (this.amountValueRef = el)}
                >
                  <span>
                    {this.amount} {this.identifier}
                  </span>
                </div>
                {this.identifier !== 'USD' && (
                  <div class="usd-value" data-testid={DataTestIdsEnum.signTransactionsOverviewUsdValue}>
                    {this.usdValue}
                  </div>
                )}
              </div>
              {this.tokenIconUrl && (
                <div class="token-icon">
                  <img src={this.tokenIconUrl} alt={this.identifier} />
                </div>
              )}
            </div>
          </div>
          <div class="sign-transactions-direction">
            <div class="sign-transactions-direction-icon">
              {!this.isApp && <mvx-single-angle-up-icon class="sign-transactions-direction-icon-arrow up" />}
              <span class="sign-transactions-direction-icon-dot" />
              <span class="sign-transactions-direction-icon-dot" />
              {this.isApp && <mvx-single-angle-down-icon class="sign-transactions-direction-icon-arrow down" />}
            </div>
          </div>
          <div class="detail-row interactor-row" data-testid={DataTestIdsEnum.signTransactionsOverviewInteractorRow}>
            <div class="detail-label">{this.isApp ? 'App' : 'To'}</div>
            <div class="interactor-info">
              {this.interactorIconUrl && (
                <div class="interactor-icon">
                  <img src={this.interactorIconUrl} alt={this.interactor} />
                </div>
              )}
              {this.interactor && (
                <mvx-trim
                  class="interactor-name"
                  data-testid={DataTestIdsEnum.signTransactionsOverviewInteractorName}
                  text={this.interactor}
                />
              )}
            </div>
          </div>
          {this.isApp && (
            <div class="detail-row action-row" data-testid={DataTestIdsEnum.signTransactionsOverviewActionRow}>
              <div class="detail-label">Action</div>
              <div class="action-value" data-testid={DataTestIdsEnum.signTransactionsOverviewActionValue}>
                {this.action}
              </div>
            </div>
          )}
        </div>

        <div class="fee-container">
          <div class="fee-row">
            <div class="fee-label-container">
              <span class="fee-label">Network Fee</span>
              <div class="info-icon"></div>
            </div>
            <div class="fee-value" data-testid={DataTestIdsEnum.signTransactionsOverviewNetworkFee}>
              {this.networkFee}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
