import { Component, Prop, VNode, h } from '@stencil/core';
import { formatAddress } from 'utils/utils';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import state from '../../signTransactionsModalStore';

@Component({
  tag: 'sign-transaction-component',
  styleUrl: 'sign-transaction-component.css',
  shadow: false,
})
export class SignTransaction {
  @Prop() header: VNode;

  render() {
    const { receiver, egldLabel, data, feeInFiatLimit, feeLimit } = state.commonData;

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

        <div class="data-container">
          <p>Data</p>
          <textarea class="data-content" readOnly draggable={false}>
            {data}
          </textarea>
        </div>

        <button disabled={state.isWaitingForSignature} data-testid={DataTestIdsEnum.signTransactionBtn} class="sign-button" onClick={state.onSign}>
          Sign
        </button>
      </div>
    );
  }
}
