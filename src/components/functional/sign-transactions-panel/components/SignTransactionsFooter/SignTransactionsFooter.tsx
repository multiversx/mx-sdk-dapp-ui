import { Fragment, h } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';
import styles from './signTransactionsFooter.styles';
import { CopyButton } from 'common/CopyButton/CopyButton';
import { Tooltip } from 'common/Tooltip/Tooltip';
import { Button } from 'common/Button/Button';
import { ExplorerLink } from 'common/ExplorerLink/ExplorerLink';
import { Trim } from 'common/Trim/Trim';

let isWaitingForSignature: boolean = false;
let lastCommonData = { ...state.commonData };

interface SignTransactionsFooterPropsType {
  tooltipVisible?: boolean;
  onTooltipVisibilityChange?: (visible: boolean) => void;
  isSuccessOnCopy?: boolean;
  handleCopyButtonClick?: (event: MouseEvent, text?: string) => void;
}

export function SignTransactionsFooter({ tooltipVisible, onTooltipVisibilityChange, isSuccessOnCopy, handleCopyButtonClick }: SignTransactionsFooterPropsType) {
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
            <Button
              size="small"
              onClick={isFirstTransaction ? onCancel : onBack}
              variant={currentIndexCannotBeSignedYet ? 'primary' : 'secondary'}
              data-testid={isFirstTransaction ? DataTestIdsEnum.signCancelBtn : DataTestIdsEnum.signBackBtn}
              class={classNames(styles.signTransactionsFooterButton, styles.signTransactionsActionButton)}
            >
              {isFirstTransaction ? 'Cancel' : 'Back'}
            </Button>
          </div>

          <div class={styles.signTransactionsFooterButtonWrapper}>
            {currentIndexCannotBeSignedYet && (
              <div
                class={styles.signTransactionsFooterButtonTooltipWrapper}
                onClick={(event: MouseEvent) => event.stopPropagation()}
              >
                <Tooltip
                  isTooltipVisible={tooltipVisible}
                  onVisibilityChange={onTooltipVisibilityChange}
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
                </Tooltip>
              </div>
            )}

            <Button
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
                <span class={{ [styles.signTransactionsFooterButtonIconLighter]: currentIndexCannotBeSignedYet }}>
                  <span class={styles.signTransactionsFooterButtonIcon}>
                    <Icon name={isWaitingForSignature ? 'spinner' : !needsSigning ? 'pencil' : 'check'} />
                  </span>
                </span>
              ) : (
                <span class={styles.signTransactionsFooterButtonIcon}>
                  <Icon name='arrow-right' />
                </span>
              )}
            </Button>
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

          <CopyButton text={username ?? address} class={styles.signTransactionsFooterIdentityCopy} isSuccessOnCopy={isSuccessOnCopy} handleCopyButtonClick={(event) => handleCopyButtonClick?.(event, username ?? address)} />
          <ExplorerLink link={explorerLink} iconClass={styles.signTransactionsExplorerLinkIcon} hasIcon />
        </div>
      </div>
    </div>
  );
}
