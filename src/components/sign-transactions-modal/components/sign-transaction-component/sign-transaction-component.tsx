import { Component, Prop, h } from '@stencil/core';
import { ITransactionData } from '../../sign-transactions-modal.types';
import { formatAddress } from 'utils/utils';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import state from '../../sign-transactions-modal-store';

type SignTransactionProps = ITransactionData & {
  onSign: () => void;
};

@Component({
  tag: 'sign-transaction-component',
  styleUrl: 'sign-transaction-component.css',
  shadow: true,
})
export class SignTransaction {
  @Prop() data: SignTransactionProps;
  render() {
    const { receiver, data, feeInFiatLimit, usdValue, onSign, tokenAmount, egldLabel, feeLimit } = state;

    return (
      <div class="transaction-container">
        <div class="transaction-inner-container">
          <p>You are sending</p>
          <balance-component amount={tokenAmount} ticker={egldLabel} usdValue={usdValue}></balance-component>
        </div>

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

        <div class="data-container">
          <p>Data</p>
          <textarea class="data-content" readOnly draggable={false}>
            {data}
          </textarea>
        </div>

        <button data-testid={DataTestIdsEnum.signTransactionBtn} class="sign-btn" onClick={onSign}>
          Sign
        </button>
      </div>
    );
  }
}
