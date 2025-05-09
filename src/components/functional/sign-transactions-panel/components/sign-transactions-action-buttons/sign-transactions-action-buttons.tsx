import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Component, h, Host, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';

@Component({
  tag: 'mvx-sign-transactions-action-buttons',
  styleUrl: 'sign-transactions-action-buttons.css',
})
export class SignTransactionsActionButtons {
  @State() isConfirming: boolean = false;

  private previousIndex: number = -1;

  componentWillRender() {
    const { currentIndex } = state.commonData;

    if (this.previousIndex !== -1 && currentIndex !== this.previousIndex) {
      this.isConfirming = false;
    }

    this.previousIndex = currentIndex;
  }

  onConfirm() {
    this.isConfirming = true;
    state.onConfirm();
  }

  getSignButtonProps() {
    const { needsSigning, providerName, currentIndexToSign, currentIndex, highlight } = state.commonData;
    const confirmText = providerName ? `Confirm on ${providerName}` : 'Confirm';

    const baseProps = {
      'data-testid': DataTestIdsEnum.signNextTransactionBtn,
      'onClick': this.onConfirm.bind(this),
    };

    if (currentIndex !== currentIndexToSign) {
      const signText = highlight && !needsSigning ? 'Confirm' : 'Sign';

      return {
        ...baseProps,
        signText,
        disabled: true,
      };
    }

    if (needsSigning) {
      return {
        ...baseProps,
        signText: this.isConfirming ? confirmText : 'Sign',
        disabled: state.isWaitingForSignature || this.isConfirming,
      };
    }

    return {
      ...baseProps,
      signText: 'Confirm',
      disabled: false,
    };
  }

  getBackButtonProps() {
    const { transactionsCount, currentIndex } = state.commonData;
    const isMultipleTransactions = transactionsCount > 1;

    if (!isMultipleTransactions) {
      return {};
    }

    if (currentIndex === 0) {
      return {
        'data-testid': DataTestIdsEnum.signCancelBtn,
        'backButtonText': 'Cancel',
        'onClick': state.onCancel,
      };
    }

    return {
      'data-testid': DataTestIdsEnum.signBackBtn,
      'backButtonText': 'Back',
      'onClick': state.onBack,
      'disabled': state.isWaitingForSignature || this.isConfirming,
    };
  }

  render() {
    const { signText, disabled, ...signButtonProps } = this.getSignButtonProps();
    const { backButtonText, ...backButtonProps } = this.getBackButtonProps();

    return (
      <Host style={{ width: '100%' }}>
        <div class="footer">
          <div class="action-buttons">
            {backButtonText ? (
              <button class="cancel-button" {...backButtonProps}>
                <span class="label">{backButtonText}</span>
              </button>
            ) : (
              <button class="cancel-button" onClick={state.onCancel}>
                <span class="label">Cancel</span>
              </button>
            )}

            <button class={`confirm-button ${disabled ? 'disabled' : ''}`} disabled={disabled} {...signButtonProps}>
              {signText.toLowerCase().includes('confirm') && (
                <div class="button-icon">
                  <mvx-fa-icon icon={faCheck} class="check-icon" />
                </div>
              )}
              <span class="label">{signText}</span>
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
