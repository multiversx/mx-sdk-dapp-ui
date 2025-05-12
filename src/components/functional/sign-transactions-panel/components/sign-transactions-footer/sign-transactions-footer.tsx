import type { EventEmitter } from '@stencil/core';
import { Component, Event, h, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import type { ISignTransactionsPanelCommonData } from '../../sign-transactions-panel.types';

@Component({
  tag: 'mvx-sign-transactions-footer',
  styleUrl: 'sign-transactions-footer.scss',
  shadow: true,
})
export class SignTransactionsFooter {
  @State() awaitsExternalConfirmation: boolean = false;

  @Prop() data: ISignTransactionsPanelCommonData;
  @Prop() addressExplorerLink?: string = '';
  @Prop() username?: string = '';
  @Prop() address?: string = '';

  @Event() confirm: EventEmitter;
  @Event() cancel: EventEmitter;
  @Event() back: EventEmitter;

  private handleBackButtonClick(event: MouseEvent) {
    event.preventDefault();
    this.back.emit(event);
  }

  private handleCancelButtonClick(event: MouseEvent) {
    event.preventDefault();
    this.cancel.emit(event);
  }

  handleSignButtonClick(event: MouseEvent) {
    this.awaitsExternalConfirmation = true;

    event.preventDefault();
    this.confirm.emit(event);
  }

  render() {
    const isFirstTransaction = this.data.currentIndex === 0;
    const currentIndexNeedsSigning = this.data.currentIndex === this.data.currentIndexToSign;
    const currentIndexCannotBeSignedYet = this.data.currentIndex > this.data.currentIndexToSign;
    const showForwardAction = currentIndexNeedsSigning || currentIndexCannotBeSignedYet;

    return (
      <div class="sign-transactions-footer">
        <div class="sign-transactions-footer-buttons">
          <div class="sign-transactions-footer-button-wrapper cancel">
            <button
              class={{ 'sign-transactions-footer-button': true, 'cancel': true }}
              data-testid={isFirstTransaction ? DataTestIdsEnum.signCancelBtn : DataTestIdsEnum.signBackBtn}
              onClick={isFirstTransaction ? this.handleCancelButtonClick.bind(this) : this.handleBackButtonClick.bind(this)}
            >
              {isFirstTransaction ? 'Cancel' : 'Back'}
            </button>
          </div>

          <div class="sign-transactions-footer-button-wrapper confirm">
            {currentIndexCannotBeSignedYet && (
              <div class="sign-transactions-footer-button-tooltip-wrapper" onClick={(event: MouseEvent) => event.stopPropagation()}>
                <mvx-tooltip trigger={<div class={{ 'sign-transactions-footer-button-tooltip': true }} />}>
                  You cannot sign this transaction yet, please go back and sign consecutively.
                </mvx-tooltip>
              </div>
            )}

            <button
              onClick={this.handleSignButtonClick.bind(this)}
              data-testid={DataTestIdsEnum.signNextTransactionBtn}
              class={{ 'sign-transactions-footer-button': true, 'confirm': true, 'disabled': currentIndexCannotBeSignedYet }}
            >
              {showForwardAction ? (
                <span class={{ 'sign-transactions-footer-button-icon': true, 'lighter': currentIndexCannotBeSignedYet }}>
                  {this.data.needsSigning ? <mvx-pencil-icon /> : <mvx-check-icon />}
                </span>
              ) : (
                <span class="sign-transactions-footer-button-icon next">
                  <mvx-arrow-right-icon />
                </span>
              )}

              {showForwardAction ? (
                <span class="sign-transactions-footer-button-label">{this.data.needsSigning ? 'Sign' : 'Confirm'}</span>
              ) : (
                <span class="sign-transactions-footer-button-label">Next</span>
              )}
            </button>
          </div>
        </div>

        <div class="sign-transactions-footer-identity">
          <div class="sign-transactions-footer-identity-label">Sign in with</div>

          {this.username ? (
            <div class="sign-transactions-footer-identity-username">
              <span class="sign-transactions-footer-identity-username-prefix">@</span>
              <span class="sign-transactions-footer-identity-username-text">{this.username}</span>
            </div>
          ) : (
            <mvx-trim-text text={this.address} class="sign-transactions-footer-identity-address" />
          )}

          <mvx-copy-button text={this.username ?? this.address} class="sign-transactions-footer-identity-copy" iconClass="sign-transactions-footer-identity-copy-icon" />
          <mvx-explorer-link link={this.addressExplorerLink} class="sign-transactions-footer-identity-explorer" iconClass="sign-transactions-footer-identity-explorer-icon" />
        </div>
      </div>
    );
  }
}
