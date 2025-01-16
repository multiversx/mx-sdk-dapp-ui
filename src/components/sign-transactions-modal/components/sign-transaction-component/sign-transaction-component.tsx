import { Component, Prop, VNode, h } from '@stencil/core';
import { formatAddress } from 'utils/utils';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import state from '../../signTransactionsModalStore';

@Component({
  tag: 'sign-transaction-component',
  styleUrl: 'sign-transaction-component.css',
  shadow: false
})
export class SignTransaction {
  @Prop() header: VNode;

  getSignButtonProps() {
    const { currentIndex, nextUnsignedTxIndex } = state.commonData;

    if (currentIndex === nextUnsignedTxIndex) {
      return {
        signText: 'Sign',
        disabled: state.isWaitingForSignature,
        'data-testid': DataTestIdsEnum.signTransactionBtn,
        onClick: state.onSign
      };
    }

    return {
      signText: 'Next',
      disabled: false,
      'data-testid': DataTestIdsEnum.signNextTransactionBtn,
      onClick: state.onNext
    };
  }

  getBackButtonProps() {
    const { transactionsCount, currentIndex } = state.commonData;
    const isMultipleTransactions = transactionsCount > 1;

    if (!isMultipleTransactions) {
      return null;
    }

    if (currentIndex === 0) {
      return {
        'data-testid': DataTestIdsEnum.signCancelBtn,
        backButtonText: 'Cancel',
        onClick: state.onCancel
      };
    }

    return {
      'data-testid': DataTestIdsEnum.signBackBtn,
      backButtonText: 'Back',
      onClick: state.onPrev,
      disabled: state.isWaitingForSignature
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
            {index < parts.length - 1 && (
              <span class="highlight">{highlight}</span>
            )}
          </span>
        ))}
      </span>
    );
  }

  render() {
    const { receiver, egldLabel, feeInFiatLimit, feeLimit, scCall } =
      state.commonData;

    const { signText, ...signButtonProps } = this.getSignButtonProps();
    const { backButtonText, ...backButtonProps } =
      this.getBackButtonProps() ?? {};

    const highlightedData = this.getHighlightedData();
    return (
      <div class="transaction-container">
        {this.header}

        <div class="receiver-container">
          <p>To</p>
          <p>{formatAddress(receiver, 40)}</p>
        </div>

        <div class="fee-container">
          <p>Transaction fee</p>
          {feeLimit && (
            <p>
              <span>{feeLimit}</span>&nbsp;
              <span>{egldLabel}</span>
            </p>
          )}
          <p>≈{feeInFiatLimit}</p>
        </div>

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
