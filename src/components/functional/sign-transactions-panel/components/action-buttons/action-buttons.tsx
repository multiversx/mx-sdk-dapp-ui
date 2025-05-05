import { Component, h, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

import state from '../../signTransactionsPanelStore';

@Component({
  tag: 'mvx-action-buttons',
  styleUrl: 'action-buttons.css',
})
export class ActionButtons {
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
    const { needsSigning, providerName } = state.commonData;
    const confirmText = providerName ? `Confirm on ${providerName}` : 'Confirm';

    if (needsSigning) {
      return {
        'signText': this.isConfirming ? confirmText : 'Sign',
        'disabled': state.isWaitingForSignature || this.isConfirming,
        'data-testid': DataTestIdsEnum.signTransactionBtn,
        'onClick': this.onConfirm.bind(this),
      };
    }

    return {
      'signText': 'Next',
      'disabled': false,
      'data-testid': DataTestIdsEnum.signNextTransactionBtn,
      'onClick': this.onConfirm.bind(this),
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
    const { signText, ...signButtonProps } = this.getSignButtonProps();
    const { backButtonText, ...backButtonProps } = this.getBackButtonProps();

    console.log('signButtonProps', signButtonProps);
    console.log('backButtonProps', backButtonProps);

    return (
      <div class="action-buttons">
        {backButtonText ? (
          <button class="back-button" {...backButtonProps}>
            {backButtonText}
          </button>
        ) : (
          <button class="cancel-button" onClick={state.onCancel}>
            Cancel
          </button>
        )}

        <button class="confirm-button" {...signButtonProps}>
          {signText === 'Confirm' && <span class="confirm-icon">✓</span>}
          {signText}
        </button>
      </div>
    );
  }
}
