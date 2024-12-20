import { Component, Prop, h } from '@stencil/core';
import { ITransactionData } from '../../sign-transactions-modal.types';
import { formatAddress } from 'utils/utils';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import state from '../../sign-transactions-modal-store';

type SignTransactionProps = {
  transaction: ITransactionData;
  onSign: () => void;
};

@Component({
  tag: 'mvx-sign-transaction',
  styleUrl: 'mvx-sign-transaction.css',
  shadow: true,
})
export class SignTransaction {
  @Prop() data: SignTransactionProps;
  render() {
    const { transaction, feeInFiatLimit, usdValue, onSign, tokenAmount, identifier } = state;

    return (
      <div class="transaction-container">
        <div class="transaction-inner-container">
          <p>You are sending</p>
          <mvx-balance amount={tokenAmount} ticker={identifier} usdValue={usdValue}></mvx-balance>
        </div>

        <div class="receiver-container">
          <p>To</p>
          <p>{formatAddress(transaction?.receiver, 40)}</p>
        </div>

        <div class="fee-container">
          <p>Transaction fee</p>
          <p>{feeInFiatLimit}</p>
        </div>

        <div class="data-container">
          <p>Data</p>
          <textarea class="data-content" readOnly draggable={false}>
            {transaction?.data}
          </textarea>
        </div>

        <button data-testid={DataTestIdsEnum.signTransactionBtn} class="sign-btn" onClick={onSign}>
          Sign
        </button>
      </div>
    );
  }
}
