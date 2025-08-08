import { Component, Fragment, h, State } from '@stencil/core';
import classNames from 'classnames';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';

const signTransactionsFooterClasses: Record<string, string> = {
  buttonTooltip: 'mvx:absolute mvx:top-0 mvx:h-12 mvx:left-0 mvx:right-0',
  actionButton: 'mvx:text-base! mvx:w-full',
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
      state.onConfirm();
    }
  };

  render() {
    const { onCancel, onBack, onNext } = state;
    const { currentIndex, currentIndexToSign, needsSigning, username, address, explorerLink } = state.commonData;

    const isFirstTransaction = currentIndex === 0;
    const currentIndexNeedsSigning = currentIndex === currentIndexToSign;
    const currentIndexCannotBeSignedYet = currentIndex > currentIndexToSign;
    const showForwardAction = currentIndexNeedsSigning || currentIndexCannotBeSignedYet;

    return (
      <div class="sign-transactions-footer" data-testid={DataTestIdsEnum.signTransactionsFooter}>
        <div class="sign-transactions-footer-buttons" data-testid={DataTestIdsEnum.signTransactionsFooterButtons}>
          <div class="sign-transactions-footer-button-wrapper cancel">
            <mvx-button
              size="small"
              onButtonClick={isFirstTransaction ? onCancel : onBack}
              variant={currentIndexCannotBeSignedYet ? 'primary' : 'secondary'}
              data-testid={isFirstTransaction ? DataTestIdsEnum.signCancelBtn : DataTestIdsEnum.signBackBtn}
              class={classNames('sign-transactions-footer-button', signTransactionsFooterClasses.actionButton)}
            >
              {isFirstTransaction ? 'Cancel' : 'Back'}
            </mvx-button>
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

            <mvx-button
              size="small"
              data-testid={DataTestIdsEnum.signNextTransactionBtn}
              onClick={showForwardAction ? this.handleSignClick : onNext}
              disabled={currentIndexCannotBeSignedYet || this.isWaitingForSignature}
              class={classNames('sign-transactions-footer-button', signTransactionsFooterClasses.actionButton)}
            >
              {showForwardAction ? (
                <span class="sign-transactions-footer-button-label-wrapper">
                  {this.isWaitingForSignature ? (
                    <span class="sign-transactions-footer-button-label">Check your device</span>
                  ) : (
                    <span class="sign-transactions-footer-button-label">{needsSigning ? 'Sign' : 'Confirm'}</span>
                  )}
                </span>
              ) : (
                <span class="sign-transactions-footer-button-label-wrapper">
                  <span class="sign-transactions-footer-button-label">Next</span>
                </span>
              )}

              {showForwardAction ? (
                <span
                  class={{
                    'sign-transactions-footer-button-icon-wrapper': true,
                    'lighter': currentIndexCannotBeSignedYet,
                  }}
                >
                  {this.isWaitingForSignature ? (
                    <span class="sign-transactions-footer-button-icon">
                      <mvx-spinner-icon />
                    </span>
                  ) : (
                    <span class="sign-transactions-footer-button-icon">
                      {needsSigning ? <mvx-pencil-icon /> : <mvx-check-icon />}
                    </span>
                  )}
                </span>
              ) : (
                <span class="sign-transactions-footer-button-icon-wrapper">
                  <span class="sign-transactions-footer-button-icon">
                    <mvx-arrow-right-icon />
                  </span>
                </span>
              )}
            </mvx-button>
          </div>
        </div>

        <div class="sign-transactions-footer-identity" data-testid={DataTestIdsEnum.signTransactionsFooterIdentity}>
          <div class="sign-transactions-footer-identity-label">Sign with</div>

          {username && (
            <div
              class="sign-transactions-footer-identity-username"
              data-testid={DataTestIdsEnum.signTransactionsFooterIdentityUsername}
            >
              <span class="sign-transactions-footer-identity-username-prefix">@</span>
              <span class="sign-transactions-footer-identity-username-text">{username}</span>
            </div>
          )}

          {!username && address && (
            <mvx-trim
              text={address}
              class="sign-transactions-footer-identity-address"
              data-testid={DataTestIdsEnum.signTransactionsFooterIdentityAddress}
            />
          )}

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
