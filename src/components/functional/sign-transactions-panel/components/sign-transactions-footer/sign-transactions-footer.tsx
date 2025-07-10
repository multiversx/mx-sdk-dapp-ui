import { Component, Fragment, h, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';

const signTransactionsFooterClasses: Record<string, string> = {
  buttonTooltip: 'mvx:absolute mvx:top-0 mvx:h-12 mvx:left-0 mvx:right-0',
  explorerLinkIcon: 'mvx:fill-link!',
};

@Component({
  tag: 'mvx-sign-transactions-footer',
  styleUrl: 'sign-transactions-footer.scss',
  shadow: true,
})
export class SignTransactionsFooter {
  @State() awaitsExternalConfirmation: boolean = false;
  @State() isWaitingForSignature: boolean = false;
  @State() lastCommonData = { ...state.commonData };

  componentWillLoad() {
    this.lastCommonData = { ...state.commonData };
  }

  componentWillRender() {
    const currentCommonData = { ...state.commonData };
    const hasChanged = JSON.stringify(currentCommonData) !== JSON.stringify(this.lastCommonData);

    if (hasChanged && this.isWaitingForSignature) {
      // Reset the waiting state when data changes
      this.isWaitingForSignature = false;
    }

    this.lastCommonData = currentCommonData;
  }

  private handleSignClick = () => {
    if (state.onConfirm) {
      this.isWaitingForSignature = true;
      setTimeout(() => {
        state.onConfirm();
      }, 2000);
    }
  };

  render() {
    const { onCancel, onBack, onNext } = state;
    const { currentIndex, currentIndexToSign, needsSigning, username, address, explorerLink } = state.commonData;

    const isFirstTransaction = currentIndex === 0;
    const currentIndexNeedsSigning = currentIndex === currentIndexToSign;
    const currentIndexCannotBeSignedYet = currentIndex > currentIndexToSign;
    const showForwardAction = currentIndexNeedsSigning || currentIndexCannotBeSignedYet;

    let confirmText = needsSigning ? 'Sign' : 'Confirm';
    let icon = needsSigning ? <mvx-pencil-icon /> : <mvx-check-icon />;

    if (this.isWaitingForSignature) {
      confirmText = 'Check your device';
      icon = <mvx-spinner-icon />;
    }

    return (
      <div class="sign-transactions-footer">
        <div class="sign-transactions-footer-buttons">
          <div class="sign-transactions-footer-button-wrapper cancel">
            <button
              data-testid={isFirstTransaction ? DataTestIdsEnum.signCancelBtn : DataTestIdsEnum.signBackBtn}
              onClick={isFirstTransaction ? onCancel : onBack}
              class={{
                'sign-transactions-footer-button': true,
                'cancel': !currentIndexCannotBeSignedYet,
                'highlighted': currentIndexCannotBeSignedYet,
              }}
            >
              <span class="sign-transactions-footer-button-label">{isFirstTransaction ? 'Cancel' : 'Back'}</span>
            </button>
          </div>

          <div class="sign-transactions-footer-button-wrapper confirm">
            {currentIndexCannotBeSignedYet && (
              <div
                class="sign-transactions-footer-button-tooltip-wrapper"
                onClick={(event: MouseEvent) => event.stopPropagation()}
              >
                <mvx-tooltip
                  trigger={
                    <div
                      class={{
                        'sign-transactions-footer-button-tooltip': true,
                        [signTransactionsFooterClasses.buttonTooltip]: true,
                      }}
                    />
                  }
                >
                  {needsSigning ? (
                    <Fragment>
                      You cannot sign this transaction yet, <br /> please go back and sign consecutively.
                    </Fragment>
                  ) : (
                    <Fragment>
                      You cannot confirm this transaction yet, <br />
                      please go back and confirm consecutively.
                    </Fragment>
                  )}
                </mvx-tooltip>
              </div>
            )}

            <button
              data-testid={DataTestIdsEnum.signNextTransactionBtn}
              onClick={showForwardAction ? this.handleSignClick : onNext}
              class={{
                'sign-transactions-footer-button': true,
                'highlighted': true,
                'disabled': currentIndexCannotBeSignedYet || this.isWaitingForSignature,
              }}
            >
              {showForwardAction ? (
                <span class="sign-transactions-footer-button-label">{confirmText}</span>
              ) : (
                <span class="sign-transactions-footer-button-label">Next</span>
              )}

              {showForwardAction ? (
                <span
                  class={{ 'sign-transactions-footer-button-icon': true, 'lighter': currentIndexCannotBeSignedYet }}
                >
                  {icon}
                </span>
              ) : (
                <span class="sign-transactions-footer-button-icon">
                  <mvx-arrow-right-icon />
                </span>
              )}
            </button>
          </div>
        </div>

        <div class="sign-transactions-footer-identity">
          <div class="sign-transactions-footer-identity-label">Sign with</div>

          {username && (
            <div class="sign-transactions-footer-identity-username">
              <span class="sign-transactions-footer-identity-username-prefix">@</span>
              <span class="sign-transactions-footer-identity-username-text">{username}</span>
            </div>
          )}

          {!username && address && <mvx-trim text={address} class="sign-transactions-footer-identity-address" />}

          <mvx-copy-button
            text={username ?? address}
            class="sign-transactions-footer-identity-copy"
            iconClass="sign-transactions-footer-identity-copy-icon"
          />

          <mvx-explorer-link link={explorerLink} iconClass={signTransactionsFooterClasses.explorerLinkIcon} />
        </div>
      </div>
    );
  }
}
