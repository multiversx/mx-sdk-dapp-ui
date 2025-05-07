import type { VNode } from '@stencil/core';
import { Component, h, Prop, State } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { formatAddress } from 'utils/formatAddress';

import state from '../../signTransactionsPanelStore';

@Component({
  tag: 'mvx-sign-transaction-component',
  styleUrl: 'sign-transaction-component.css',
})
export class SignTransaction {
  @Prop() header: VNode;

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

  getHighlightedData() {
    const { data, highlight } = state.commonData;

    if (!highlight || !data) {
      return data;
    }

    const parts = data.split(highlight);

    return (
      <span>
        {parts.map((part, index) => (
          <span>
            <span class="data-content">{part}</span>
            {index < parts.length - 1 && <span class="highlight">{highlight}</span>}
          </span>
        ))}
      </span>
    );
  }

  render() {
    const { receiver, scCall } = state.commonData;

    const { signText, ...signButtonProps } = this.getSignButtonProps();
    const { backButtonText, ...backButtonProps } = this.getBackButtonProps();

    const highlightedData = this.getHighlightedData();
    return (
      <div class="transaction-container">
        {this.header}

        <div class="receiver-container">
          <p>To</p>
          <p>{formatAddress(receiver, 40)}</p>
        </div>

        <mvx-transaction-fee-component />

        {scCall && (
          <div class="data-container">
            <p>Smart Contract Call</p>
            <div class="data-content-container">{scCall}</div>
          </div>
        )}

        <div class="data-container">
          <p>Data</p>
          <div class="data-content-container">{highlightedData}</div>
        </div>

        <div class="sign-button-container">
          <button class="sign-button" {...signButtonProps}>
            {signText}
          </button>

          {backButtonText && (
            <button class="sign-back-button" {...backButtonProps}>
              {backButtonText}
            </button>
          )}
        </div>
      </div>
    );
  }
}
