import { Component, Fragment, h, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';

@Component({
  tag: 'mvx-sign-transactions-footer',
  styleUrl: 'sign-transactions-footer.scss',
  shadow: true,
})
export class SignTransactionsFooter {
  @State() awaitsExternalConfirmation: boolean = false;

  render() {
    const {
      commonData: { currentIndex, currentIndexToSign, needsSigning, username, address, addressExplorerLink },
      onCancel,
      onBack,
      onNext,
      onConfirm,
    } = state;

    const isFirstTransaction = currentIndex === 0;
    const currentIndexNeedsSigning = currentIndex === currentIndexToSign;
    const currentIndexCannotBeSignedYet = currentIndex > currentIndexToSign;
    const showForwardAction = currentIndexNeedsSigning || currentIndexCannotBeSignedYet;

    return (
      <div class="sign-transactions-footer">
        <div class="sign-transactions-footer-buttons">
          <div class="sign-transactions-footer-button-wrapper cancel">
            <button
              class={{ 'sign-transactions-footer-button': true, 'cancel': true }}
              data-testid={isFirstTransaction ? DataTestIdsEnum.signCancelBtn : DataTestIdsEnum.signBackBtn}
              onClick={isFirstTransaction ? onCancel : onBack}
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
              data-testid={DataTestIdsEnum.signNextTransactionBtn}
              onClick={showForwardAction ? onConfirm : onNext}
              class={{ 'sign-transactions-footer-button': true, 'confirm': true, 'disabled': currentIndexCannotBeSignedYet }}
            >
              {showForwardAction ? (
                <Fragment>
                  <span class="sign-transactions-footer-button-label">{needsSigning ? 'Sign' : 'Confirm'}</span>

                  <span class={{ 'sign-transactions-footer-button-icon': true, 'lighter': currentIndexCannotBeSignedYet }}>
                    {needsSigning ? <mvx-pencil-icon /> : <mvx-check-icon />}
                  </span>
                </Fragment>
              ) : (
                <Fragment>
                  <span class="sign-transactions-footer-button-label">Next</span>

                  <span class="sign-transactions-footer-button-icon">
                    <mvx-arrow-right-icon />
                  </span>
                </Fragment>
              )}
            </button>
          </div>
        </div>

        <div class="sign-transactions-footer-identity">
          <div class="sign-transactions-footer-identity-label">Sign in with</div>

          {username ? (
            <div class="sign-transactions-footer-identity-username">
              <span class="sign-transactions-footer-identity-username-prefix">@</span>
              <span class="sign-transactions-footer-identity-username-text">{username}</span>
            </div>
          ) : (
            address && <mvx-trim-text text={address} class="sign-transactions-footer-identity-address" />
          )}

          <mvx-copy-button text={username ?? address} class="sign-transactions-footer-identity-copy" iconClass="sign-transactions-footer-identity-copy-icon" />
          <mvx-explorer-link link={addressExplorerLink} class="sign-transactions-footer-identity-explorer" iconClass="sign-transactions-footer-identity-explorer-icon" />
        </div>
      </div>
    );
  }
}
