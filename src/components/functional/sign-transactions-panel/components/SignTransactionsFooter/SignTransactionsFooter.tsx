import { Fragment, h } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';
import styles from './signTransactionsFooter.styles';
import { Trim } from 'common/Trim/Trim';
import { CopyButton } from 'common/CopyButton/CopyButton';

let isWaitingForSignature: boolean = false;
let lastCommonData = { ...state.commonData };

export function SignTransactionsFooter() {
  const currentCommonData = { ...state.commonData };
  const hasChanged = JSON.stringify(currentCommonData) !== JSON.stringify(lastCommonData);

  if (hasChanged && isWaitingForSignature) {
    // Reset the waiting state when data changes
    isWaitingForSignature = false;
  }

  lastCommonData = currentCommonData;

  const handleSignClick = () => {
    if (state.onConfirm) {
      isWaitingForSignature = true;
      state.onConfirm();
    }
  };

  const { onCancel, onBack, onNext } = state;
  const { currentIndex, currentIndexToSign, needsSigning, username, address, explorerLink, providerName } =
    state.commonData;

  const isFirstTransaction = currentIndex === 0;
  const currentIndexNeedsSigning = currentIndex === currentIndexToSign;
  const currentIndexCannotBeSignedYet = currentIndex > currentIndexToSign;
  const showForwardAction = currentIndexNeedsSigning || currentIndexCannotBeSignedYet;
  const checkButtonText = providerName ? `Check ${providerName}` : 'Check your device';

  return (
    <div class={styles.signTransactionsFooterContainer}>
      <div class={styles.signTransactionsFooter} data-testid={DataTestIdsEnum.signTransactionsFooter}>
        <div class={styles.signTransactionsFooterButtons} data-testid={DataTestIdsEnum.signTransactionsFooterButtons}>
          <div class={classNames(styles.signTransactionsFooterButtonWrapper, styles.signTransactionsFooterButtonWrapperCancel)}>
            <mvx-button
              size="small"
              onButtonClick={isFirstTransaction ? onCancel : onBack}
              variant={currentIndexCannotBeSignedYet ? 'primary' : 'secondary'}
              data-testid={isFirstTransaction ? DataTestIdsEnum.signCancelBtn : DataTestIdsEnum.signBackBtn}
              class={classNames(styles.signTransactionsFooterButton, styles.signTransactionsActionButton)}
            >
              {isFirstTransaction ? 'Cancel' : 'Back'}
            </mvx-button>
          </div>

          <div class={styles.signTransactionsFooterButtonWrapper}>
            {currentIndexCannotBeSignedYet && (
              <div
                class={styles.signTransactionsFooterButtonTooltipWrapper}
                onClick={(event: MouseEvent) => event.stopPropagation()}
              >
                <mvx-tooltip
                  trigger={
                    <div
                      class={{
                        [styles.signTransactionsButtonTooltip]: true,
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
              onClick={showForwardAction ? handleSignClick : onNext}
              disabled={currentIndexCannotBeSignedYet || isWaitingForSignature}
              class={classNames(styles.signTransactionsFooterButton, styles.signTransactionsActionButton)}
            >
              {showForwardAction ? (
                <span>
                  {isWaitingForSignature ? (
                    <span>{checkButtonText}</span>
                  ) : (
                    <span>{needsSigning ? 'Sign' : 'Confirm'}</span>
                  )}
                </span>
              ) : (
                <span>Next</span>
              )}

              {showForwardAction ? (
                <span
                  class={{
                    [styles.signTransactionsFooterButtonIconLighter]: currentIndexCannotBeSignedYet,
                  }}
                >
                  {isWaitingForSignature ? (
                    <span class={styles.signTransactionsFooterButtonIcon}>
                      <mvx-spinner-icon />
                    </span>
                  ) : (
                    <span class={styles.signTransactionsFooterButtonIcon}>
                      <Icon name={!needsSigning ? 'pencil' : 'check'} />
                    </span>
                  )}
                </span>
              ) : (
                <span class={styles.signTransactionsFooterButtonIcon}>
                  <mvx-arrow-right-icon />
                </span>
              )}
            </mvx-button>
          </div>
        </div>

        <div class={styles.signTransactionsFooterIdentity} data-testid={DataTestIdsEnum.signTransactionsFooterIdentity}>
          <div class={styles.signTransactionsFooterIdentityLabel}>Sign with</div>

          {username && (
            <div
              class={styles.signTransactionsFooterIdentityUsername}
              data-testid={DataTestIdsEnum.signTransactionsFooterIdentityUsername}
            >
              <span class={styles.signTransactionsFooterIdentityUsernamePrefix}>@</span>
              <span>{username}</span>
            </div>
          )}

          {!username && address && (
            <Trim
              text={address}
              class={styles.signTransactionsFooterIdentityAddress}
              data-testid={DataTestIdsEnum.signTransactionsFooterIdentityAddress}
            />
          )}

          <CopyButton text={username ?? address} class={styles.signTransactionsFooterIdentityCopy} />
          <mvx-explorer-link link={explorerLink} class={styles.signTransactionsExplorerLinkIcon} />
        </div>
      </div>
    </div>
  );
}
